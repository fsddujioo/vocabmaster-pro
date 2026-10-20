'use strict';
// Suggestions only; never returns a band or a mastery decision.
module.exports=function validate(data,text){
 if(!data||typeof data.summary!=='string'||!Array.isArray(data.criteria)||!Array.isArray(data.priorities)||!Array.isArray(data.strengths))throw Error('Phản hồi AI chưa đúng cấu trúc.');
 const str=(x,n=1600)=>String(x??'').trim().slice(0,n),norm=x=>String(x).normalize('NFKC').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim().toLowerCase(),source=norm(text);
 const criteria=data.criteria.slice(0,4).map(x=>({criterion:str(x.criterion,100),observation:str(x.observation),evidence:str(x.evidence,800)}));
 const priorities=data.priorities.slice(0,3).map(x=>({problem:str(x.problem),evidence:str(x.evidence,800),practice:str(x.practice)})).filter(x=>x.problem&&x.practice);
 for(const x of [...criteria,...priorities])if(x.evidence&&!source.includes(norm(x.evidence).replace(/^["']+|["']+$/g,''))){x.evidence='Chưa đối chiếu được trích dẫn này trong phần m đã gửi.';}
 return {summary:str(data.summary),strengths:data.strengths.slice(0,3).map(x=>str(x,700)),criteria,priorities,confidence:['low','medium'].includes(data.confidence)?data.confidence:'low',limitations:str(data.limitations)+' Chỉ phân tích văn bản m gửi; không đọc link/file hay audio. Không dùng để tự xác nhận band hoặc MASTERED.'};
};
