const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const D=require('../js/foundation-data.js'),C=require('../js/foundation-core.js'),P=require('../js/ielts-plan.js'),R=require('../js/ielts-core.js');
let count=0;const eq=(a,b,msg)=>{assert.deepEqual(a,b,msg);count++;};
eq(D.chunks.length,100);eq(new Set(D.chunks.map(c=>c.id)).size,100);eq(new Set(D.chunks.map(c=>C.norm(c.phrase))).size,100);eq(D.packs.length,20);
for(const p of D.packs){eq(p.chunks.length,5);eq(p.chunks.every(id=>D.chunks.some(c=>c.id===id)),true);}
for(const c of D.chunks)assert.ok(C.norm(c.example).includes(C.norm(c.phrase)),c.phrase);count++;
eq(D.grammar.length,5);eq(D.grammar.reduce((n,g)=>n+g.diagnostic.length,0),50);eq(D.grammar.reduce((n,g)=>n+g.delayed.length,0),25);
for(const g of D.grammar){eq(g.diagnostic.some(q=>g.delayed.some(d=>d.prompt===q.prompt)),false,'Delayed grammar uses fresh questions');for(const q of [...g.diagnostic,...g.delayed]){assert.equal(q.options.filter(x=>x===q.answer).length,1);assert.equal(new Set(q.options).size,q.options.length);}}
count++;
const now=Date.parse('2026-10-20T08:00:00Z'),p=D.packs[0],answers=Object.fromEntries(C.items(D,'chunks',p.id).map(q=>[q.id,q.answer]));
const valid={answers,production:['I usually concentrate on a task before a difficult exam.','I hope to make steady progress with regular daily practice.'],selfCheck:true};
let state=C.empty(),result=C.assess(D,'chunks',p.id,'learn',valid,state,now);eq(result.passed,true);eq(result.score,5);
eq(C.assess(D,'chunks',p.id,'learn',{...valid,production:[]},state,now).passed,false,'Knowing translations is not active use');
eq(C.assess(D,'chunks',p.id,'learn',{...valid,production:[D.chunks[0].example,valid.production[1]]},state,now).passed,false,'Copying model sentence does not satisfy transfer');
eq(C.assess(D,'chunks',p.id,'learn',{...valid,production:[valid.production[0],valid.production[0]]},state,now).passed,false,'Two different chunks are required');
eq(C.assess(D,'chunks',p.id,'learn',{...valid,selfCheck:false},state,now).passed,false,'Self-check is explicitly required and not semantic AI grading');
eq(C.assess(D,'chunks',p.id,'learn',{...valid,answers:{}},state,now).attempted,false);
state=C.append(state,'chunks',p.id,result,'attempt-1');eq(state.records['chunks:p01'].completedAt,result.at);
eq(C.append(state,'chunks',p.id,result,'attempt-1').records['chunks:p01'].attempts.length,1,'Duplicate submission ID is idempotent');
eq(C.assess(D,'chunks',p.id,'review',valid,state,now+6*C.DAY).attempted,false,'Cannot claim retention before seven days');
eq(C.assess(D,'chunks',p.id,'review',valid,state,now+7*C.DAY).passed,true);
const review=C.assess(D,'chunks',p.id,'review',valid,state,now+7*C.DAY);state=C.append(state,'chunks',p.id,review,'attempt-2');eq(state.records['chunks:p01'].strongAt,review.at);
const failed=C.assess(D,'chunks',p.id,'review',{...valid,answers:Object.fromEntries(Object.keys(answers).map(k=>[k,'wrong']))},state,now+8*C.DAY);state=C.append(state,'chunks',p.id,failed,'attempt-3');eq(state.records['chunks:p01'].strongAt,null,'A failed later review removes current stable label');eq(state.records['chunks:p01'].attempts.length,3);
const grammar=D.grammar[0],gd={answers:Object.fromEntries(grammar.diagnostic.map(q=>[q.id,q.answer])),production:['I usually review my lessons in the evening.','My brother works at a small local company.','I study at home.','She does not watch television.','I read because I enjoy books.'],selfCheck:true};eq(C.assess(D,'grammar','g1','learn',gd,C.empty(),now).passed,true);
let seq=0;const uuid=()=>String(++seq);const imported=C.importPlan({data:D,packId:'p01',targetId:'__auto__',modules:[],cards:[],uuid});eq(imported.added,5);eq(imported.records.modules.length,1);eq(imported.records.cards.every(c=>c.reviewCount===0&&c.history.length===0),true,'Import never records study');
const existing=imported.records.cards.map(c=>({...c,reviewCount:12,srsStage:4}));const before=JSON.stringify(existing);const repeat=C.importPlan({data:D,packId:'p01',targetId:'__auto__',modules:imported.records.modules,cards:existing,uuid});eq(repeat.added,0);eq(repeat.skipped,5);eq(JSON.stringify(existing),before,'Existing meanings and SRS remain untouched');
const chosen=C.importPlan({data:D,packId:'p01',targetId:'chosen',modules:[{id:'chosen'}],cards:existing,uuid});eq(chosen.records.cards.every(c=>c.moduleId==='chosen'),true,'Chosen destination is honored');assert.throws(()=>C.importPlan({data:D,packId:'p01',targetId:'deleted',modules:[],cards:[]}));count++;
const fixture=s=>({scoreSource:'Synthetic exact-test score conversion',source:'Synthetic audit '+s.id,artifact:'Synthetic before and after answers, not real progress.',reflection:'Synthetic error: missing ending; recheck with a new item.',checks:s.checks.map(()=>true),fields:Object.fromEntries(s.fields.map(f=>[f.key,String(['listening','reading'].includes(f.key)?6.5:f.pass??0)])),feedbackBy:s.human?'human':'',feedbackSource:'Synthetic human feedback'});
let rs=R.empty();for(const id of ['s28','s29','s30']){const s=P.sessions.find(x=>x.id===id);rs=R.merge(rs,s,fixture(s),true).state;}
const fd=fixture(P.sessions[31]);fd.fields={listening:'7',reading:'7',speaking:'6',writing:'6'};rs=R.merge(rs,P.sessions[31],fd,true).state;eq(R.effectiveStatus(P.sessions[31],rs,P),'passed');
const changed=fixture(P.sessions[27]);changed.checks[0]=false;rs=R.merge(rs,P.sessions[27],changed,false).state;eq(rs.records.s32.status,'passed','Historical stored status is retained');eq(R.effectiveStatus(P.sessions[31],rs,P),'retry','Display recalculates validity when prerequisites change');
eq(rs.records.s28.history[0].feedbackSource,'Synthetic human feedback','Lightweight history keeps feedback provenance');
async function main(){
 let rejectWrite=true;const values=new Map(),nodes=new Map();const doc={getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:'',value:0});return nodes.get(id);}};
 const win={VMIELTSCore:R,VMIELTSPlan:P,VMFoundationCore:C,VMLearning:{escape:String},addEventListener(){},vmPremium:{notify(){}},vocabDB:{async get(_,k){return values.get(k)||null;},async put(_,v){if(rejectWrite)throw Error('synthetic quota failure');values.set(v.key,v);}}};
 const context={window:win,document:doc,navigator:{},console,clearTimeout,setTimeout,Date,URL,crypto:require('node:crypto').webcrypto};vm.runInNewContext(fs.readFileSync('./js/ielts-roadmap.js','utf8'),context);
 const ui=win.ieltsRoadmap;ui.pending={session:P.sessions[0],draft:fixture(P.sessions[0])};await assert.rejects(ui.flush());count++;eq(!!(ui.pending||ui.failed),true,'Failed write preserves retryable draft');eq(values.size,0);
 rejectWrite=false;await ui.flush();eq(!!values.get(R.KEY).value.records.s01,true,'Retry saves original draft');eq(ui.pending,null);eq(ui.failed,null);
 vm.runInNewContext(fs.readFileSync('./js/foundation-study.js','utf8'),context);const foundation=win.foundationStudy;foundation.pending={key:'chunks:p01:learn',draft:valid};rejectWrite=true;await assert.rejects(foundation.flush());count++;eq(!!foundation.pending,true,'Foundation draft survives DB error');rejectWrite=false;await foundation.flush();eq(!!values.get(C.KEY).value.drafts['chunks:p01:learn'],true);eq(foundation.pending,null);
 console.log(JSON.stringify({passed:true,assertions:count,coverage:['100 unique chunks and native import deduplication','75 grammar items with fresh delayed questions','active production and honest self-checking','seven-day retention gate','idempotent attempts and history','SRS preservation','effective dependent checkpoint status','DB failure recovery for both editors']}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
