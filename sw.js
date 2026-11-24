/* Gleicher-Origin Offline-Cache, passend für GitHub Pages-Unterverzeichnisse. */
'use strict';
const VERSION='prep-cache-v1.0.0';
const BASE=new URL('./',self.location.href);
const ASSETS=['./','./index.html','./style.css','./data.js','./app.js','./manifest.webmanifest','./apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('prep-cache-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin || !url.pathname.startsWith(BASE.pathname))return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(VERSION).then(c=>c.put(new URL('./index.html',BASE).href,copy));}return res;}).catch(()=>caches.match(new URL('./index.html',BASE).href)));
  return;
 }
 event.respondWith(fetch(req).then(res=>{if(res.ok&&ASSETS.includes(req.url)){const copy=res.clone();event.waitUntil(caches.open(VERSION).then(cache=>cache.put(req,copy)));}return res;}).catch(()=>caches.match(req)));
});
