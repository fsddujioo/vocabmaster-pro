'use strict';
const workspaceFrame=document.getElementById('workspace');let workspaceStarted=false,workspaceRequest=null,workspaceReviewId=null;
function refreshWorkspace(){if(workspaceStarted)workspaceFrame.contentWindow?.postMessage({type:'VM_STUDY4_REFRESH',captureId:workspaceReviewId},'http://localhost:8080');}
async function loadWorkspace(){
  if(workspaceRequest)return workspaceRequest;
  workspaceRequest=(async()=>{
    const loading=document.getElementById('workspace-loading'),offline=document.getElementById('workspace-offline');loading.hidden=false;offline.hidden=true;
    try{const response=await fetch('http://localhost:8080/manifest.json',{cache:'no-store',signal:AbortSignal.timeout(4000)});if(!response.ok||!(await response.json()).name?.includes('VocabMaster'))throw Error('offline');
      if(!workspaceStarted){workspaceFrame.src='http://localhost:8080/index.html?embedded=study4#study4';workspaceStarted=true;}else refreshWorkspace();workspaceFrame.hidden=false;
    }catch{workspaceFrame.hidden=true;offline.hidden=false;workspaceStarted=false;workspaceFrame.removeAttribute('src');}finally{loading.hidden=true;workspaceRequest=null;}
  })();return workspaceRequest;
}
function showPanelTab(tab){const capture=tab==='capture';document.getElementById('capture-view').hidden=!capture;document.getElementById('workspace-view').hidden=capture;document.getElementById('tab-capture').setAttribute('aria-pressed',String(capture));document.getElementById('tab-workspace').setAttribute('aria-pressed',String(!capture));if(!capture)loadWorkspace();}
document.getElementById('tab-capture').onclick=()=>showPanelTab('capture');document.getElementById('tab-workspace').onclick=()=>showPanelTab('workspace');document.getElementById('workspace-retry').onclick=()=>loadWorkspace();workspaceFrame.onload=refreshWorkspace;
chrome.storage.session.get('pending').then(({pending})=>showPanelTab(pending?.captures?.length?'capture':'workspace'));
chrome.storage.onChanged.addListener((changes,area)=>{if(area==='session'&&changes.pending?.newValue?.captures?.length)showPanelTab('capture');});

window.addEventListener('message',event=>{if(event.origin!=='http://localhost:8080'||event.source!==workspaceFrame.contentWindow)return;if(event.data?.type==='VM_STUDY4_READY')refreshWorkspace();if(event.data?.type==='VM_STUDY4_REVIEW_OPENED'&&event.data.captureId===workspaceReviewId)workspaceReviewId=null;});
