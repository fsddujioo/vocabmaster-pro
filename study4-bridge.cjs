'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const core=require('./js/study4-core.js');
module.exports=function createBridge(root,port){
  const directory=path.join(root,'.study4-private'),file=path.join(directory,'bridge.json');
  let serial=Promise.resolve();
  async function read(){try{const value=JSON.parse(await fs.readFile(file,'utf8'));if(!Array.isArray(value.captures)||typeof value.token!=='string')throw new Error('Dữ liệu cầu nối hỏng.');return value;}catch(e){if(e.code!=='ENOENT')throw e;return {token:crypto.randomBytes(32).toString('hex'),captures:[],extensionId:''};}}
  async function save(state){await fs.mkdir(directory,{recursive:true});const temp=file+'.tmp';await fs.writeFile(temp,JSON.stringify(state),{mode:0o600});await fs.rename(temp,file);}
  function transaction(fn){const next=serial.then(async()=>{const state=await read();const result=await fn(state);await save(state);return result;});serial=next.catch(()=>{});return next;}
  const appOrigins=new Set([`http://localhost:${port}`,`http://127.0.0.1:${port}`]);
  const reply=(res,status,data,origin)=>{if(res.writableEnded)return;const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};if(origin)headers['Access-Control-Allow-Origin']=origin;res.writeHead(status,headers);res.end(JSON.stringify(data));};
  async function body(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>1_000_000)throw new Error('Mỗi lần chỉ lưu tối đa 50 mục, dưới 1 MB.');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}
  return async function handle(req,res,url){
    if(!url.pathname.startsWith('/api/study4/'))return false;
    const origin=String(req.headers.origin||''),app=appOrigins.has(origin),localRead=!origin&&req.headers['sec-fetch-site']==='same-origin';
    const state=await serial.then(read);
    const extensionOrigin=state.extensionId?'chrome-extension://'+state.extensionId:'';
    const extension=!!extensionOrigin&&origin===extensionOrigin;
    const token=String(req.headers.authorization||'').replace(/^Bearer /,'');
    const tokenValid=/^[a-f0-9]{64}$/.test(token)&&token.length===state.token.length&&crypto.timingSafeEqual(Buffer.from(token),Buffer.from(state.token));
    // Chrome extension fetch may omit Origin; the bearer token is still mandatory.
    const authenticatedExtension=tokenValid&&(!origin||extension);
    const cors=extension?origin:undefined;
    if(req.method==='OPTIONS'){
      if(!extension){reply(res,403,{error:'Tiện ích chưa được kết nối.'});return true;}
      res.writeHead(204,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization','Access-Control-Max-Age':'300','Vary':'Origin'});res.end();return true;
    }
    const isAppRead=app||localRead;
    if(req.method==='POST'&&!req.headers['content-type']?.startsWith('application/json')){reply(res,415,{error:'Cần dữ liệu JSON.'},cors);return true;}
    try{
      if(url.pathname==='/api/study4/connect'&&req.method==='POST'){
        if(!app){reply(res,403,{error:'Kết nối từ cửa sổ VocabMaster trên máy.'});return true;}
        const input=await body(req);if(!/^[a-p]{32}$/.test(input.extensionId||''))throw new Error('ID tiện ích không hợp lệ.');
        const result=await transaction(s=>{s.extensionId=input.extensionId;s.token=crypto.randomBytes(32).toString('hex');return {token:s.token};});reply(res,200,result);return true;
      }
      if(url.pathname==='/api/study4/status'&&req.method==='GET'){
        if(!isAppRead&&!authenticatedExtension){reply(res,403,{error:'Chưa kết nối VocabMaster.'},cors);return true;}
        reply(res,200,{app:'VocabMaster Pro',version:'5.3',pending:state.captures.length,connected:!!state.extensionId},cors);return true;
      }
      if(url.pathname==='/api/study4/captures'&&req.method==='GET'){
        if(!isAppRead){reply(res,403,{error:'Chỉ xem bản nháp trong app.'},cors);return true;}
        reply(res,200,{captures:state.captures});return true;
      }
      if(url.pathname==='/api/study4/captures'&&req.method==='POST'){
        if(!app&&!authenticatedExtension){reply(res,403,{error:'Tiện ích chưa kết nối. Mở app → Study4 → Kết nối tiện ích.'},cors);return true;}
        const input=await body(req),items=input.captures;
        if(!Array.isArray(items)||!items.length||items.length>50)throw new Error('Chọn từ 1 đến 50 mục.');
        const captures=items.map(core.validate);const result=await transaction(s=>{let added=0;const ids=[];for(const item of captures){const old=s.captures.find(c=>c.id===item.id||core.key(c)===core.key(item));if(old){ids.push(old.id);continue;}if(s.captures.length>=500)throw new Error('Hộp chờ đã đầy 500 mục. Xem lại trong app trước.');item.id=item.id||crypto.randomUUID();s.captures.push(item);ids.push(item.id);added++;}return {added,ids,pending:s.captures.length};});reply(res,200,result,cors);return true;
      }
      if(url.pathname==='/api/study4/ack'&&req.method==='POST'){
        if(!app){reply(res,403,{error:'Chỉ xử lý bản nháp từ app.'});return true;}
        const input=await body(req);if(!Array.isArray(input.ids)||input.ids.length>500)throw new Error('Danh sách không hợp lệ.');
        const result=await transaction(s=>{const ids=new Set(input.ids);s.captures=s.captures.filter(c=>!ids.has(c.id));return {pending:s.captures.length};});reply(res,200,result);return true;
      }
      reply(res,404,{error:'API không tồn tại.'},cors);return true;
    }catch(error){reply(res,400,{error:error.message},cors);return true;}
  };
};
