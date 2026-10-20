const CACHE_NAME = 'vocabmaster-v59-learning-engine';
const ASSETS = ['./data/study4-catalog.json','./js/study4-catalog-core.js?v=5.9','./js/study4-learning-engine.js?v=5.9','./js/study4-engine-ui.js?v=5.9','./js/study4-external-feedback.js?v=5.9','./js/study4-guided-data.js?v=5.9','./js/study4-guided-core.js?v=5.9','./js/study4-guided.js?v=5.9','./js/ielts-feedback.js?v=5.9','./css/foundation.css?v=5.9','./js/foundation-data.js?v=5.9','./js/foundation-core.js?v=5.9','./js/foundation-study.js?v=5.9','./css/ielts-roadmap.css?v=5.9','./js/ielts-plan.js?v=5.9','./js/ielts-core.js?v=5.9','./js/ielts-roadmap.js?v=5.9','./js/study4-save.js?v=5.3','./js/study4-editor.js?v=5.3','./css/study4.css?v=5.1','./js/study4-core.js?v=5.1','./js/study4.js?v=5.3','./study4-extension.json','./','./index.html','./manifest.json','./css/styles.css?v=4.0','./css/premium.css?v=5.0','./data/sampleDecks.js?v=4.0','./js/learning-core.js?v=5.0','./js/db.js?v=5.0','./js/audio.js?v=5.0','./js/dictionary.js?v=5.0','./js/srs.js?v=5.0','./js/swipe.js?v=5.0','./js/games.js?v=4.0','./js/quiz.js?v=5.0','./js/analytics.js?v=4.0','./js/premium.js?v=5.0','./js/learn.js?v=5.0','./js/app.js?v=5.0','./icons/icon-192.svg','./icons/icon-512.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('vocabmaster-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
  event.respondWith(fetch(event.request).then(async response=>{
    if(response.ok){const copy=response.clone();await caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});}
    return response;
  }).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||(event.request.mode==='navigate'?await cache.match('./index.html'):new Response('Offline asset unavailable',{status:503}));}));
});
