'use strict';
(()=>{
const QUESTIONS=window.PREP_QUESTIONS||[];
const LEVELS=window.PREP_LEVELS||[];
const RULES=window.PREP_RULES||[];
const SOURCES=window.PREP_SOURCES||{};
const BYID=new Map(QUESTIONS.map(q=>[q.id,q]));
const KEY='fr-prepositions-v1';
const DUE_INTERVALS=[1,3,7,14,30,60,120];
const EMPTY={v:1,items:{},history:[],settings:{level:1,mode:'learn',format:'mix',count:10,dailyGoal:10,sound:true}};
const $=id=>document.getElementById(id);
const el=$('app');
let tab='home';
let session=null;
let state=load();
let toastHandle=null;

function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clampInt(n,min,max,defaultN){const a=Number(n);return Number.isFinite(a)?Math.max(min,Math.min(max,Math.floor(a))):defaultN;}
function defaults(){return JSON.parse(JSON.stringify(EMPTY));}
function load(){try{let raw=localStorage.getItem(KEY);if(!raw)return defaults();return sanitize(JSON.parse(raw));}catch(e){return defaults();}}
function sanitize(x){
 const out=defaults();if(!x||typeof x!=='object'||x.v!==1)return out;
 if(x.settings&&typeof x.settings==='object'){
  const s=x.settings;
  out.settings.level=[0,1,2,3,4,5].includes(+s.level)?+s.level:1;
  out.settings.mode=['learn','review','errors','exam'].includes(s.mode)?s.mode:'learn';
  out.settings.format=['mix','choice','type'].includes(s.format)?s.format:'mix';
  out.settings.count=[5,10,15,20].includes(+s.count)?+s.count:10;
  out.settings.dailyGoal=[5,10,15,20].includes(+s.dailyGoal)?+s.dailyGoal:10;
  out.settings.sound=s.sound!==false;
 }
 if(x.items&&typeof x.items==='object')for(const [id,item] of Object.entries(x.items)){
  if(!BYID.has(id)||!item||typeof item!=='object')continue;
  out.items[id]={seen:clampInt(item.seen,0,100000,0),correct:clampInt(item.correct,0,100000,0),wrong:clampInt(item.wrong,0,100000,0),box:clampInt(item.box,0,6,0),due:typeof item.due==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(item.due)?item.due:'2000-01-01',last:typeof item.last==='string'?item.last.slice(0,40):'',lastOutcome:item.lastOutcome==='correct'?'correct':'wrong'};
 }
 if(Array.isArray(x.history))out.history=x.history.slice(-20000).filter(h=>h&&BYID.has(h.id)&&typeof h.at==='string'&&/^\d{4}-\d{2}-\d{2}/.test(h.at)).map(h=>({id:h.id,at:h.at.slice(0,40),correct:!!h.correct,quality:['good','unsure','wrong'].includes(h.quality)?h.quality:'wrong'}));
 return out;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(e){toast('Speichern nicht möglich. Bitte den Datenspeicher prüfen.');return false;}}
function today(){const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);}
function plusDays(days){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);}
function dateOf(h){const d=new Date(h.at);if(Number.isNaN(d.getTime()))return h.at.slice(0,10);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function item(q){return state.items[q.id];}
function filtered(){return QUESTIONS.filter(q=>state.settings.level===0||q.level===state.settings.level);}
function dueQ(q){return !!item(q)&&item(q).due<=today();}
function countDue(){return QUESTIONS.filter(dueQ).length;}
function doneToday(){const t=today();return state.history.filter(h=>dateOf(h)===t).length;}
function dailyStreak(){
 const days=new Set(state.history.map(dateOf));let cur=today();if(!days.has(cur))cur=plusDays(-1);
 let n=0;const d=new Date(cur+'T12:00:00');while(days.has(cur)){n++;d.setDate(d.getDate()-1);cur=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}return n;
}
function pct(n,d){return d?Math.round(n/d*100):0;}
function shuffle(arr){const x=arr.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function diversify(list,max){
 let pool=shuffle(list),selected=[],recent=[];
 while(pool.length&&selected.length<max){let i=pool.findIndex(q=>!recent.includes(q.answer));if(i<0)i=0;const q=pool.splice(i,1)[0];selected.push(q);recent.push(q.answer);if(recent.length>2)recent.shift();}return selected;
}
function selectQuestions(){
 const mode=state.settings.mode,number=state.settings.count, all=filtered(), old=all.filter(q=>!!item(q)),due=old.filter(dueQ),fresh=all.filter(q=>!item(q));
 let selection=[];
 if(mode==='review'){selection=diversify(due,number);}
 else if(mode==='errors'){selection=diversify(old.filter(q=>item(q).wrong>0).sort((a,b)=>item(b).wrong-item(a).wrong),number);}
 else if(mode==='exam'){selection=diversify(all,number);}
 else{
  const nDue=Math.min(due.length,Math.ceil(number*.6));
  const a=diversify(due,nDue);
  const b=diversify(fresh,number-a.length);
  const c=diversify(due.filter(q=>!a.includes(q)),number-a.length-b.length);
  const d=diversify(old.filter(q=>!due.includes(q)&&!a.includes(q)),number-a.length-b.length-c.length);
  selection=diversify([...a,...b,...c,...d],number);
 }
 return selection;
}
function titleBlock(kicker,title,description){return `<header class="sectiontop"><p class="kicker">${kicker}</p><h1 class="hero-title">${title}</h1>${description?`<p class="lead">${description}</p>`:''}</header>`;}
function button(action,label,classes='btn',extra=''){return `<button type="button" class="${classes}" data-action="${action}" ${extra}>${label}</button>`;}
function sourceLink(id,label='Regel nachlesen'){const x=SOURCES[id];return x?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`:'';}
function home(){
 const d=doneToday(),goal=state.settings.dailyGoal;const read=Object.keys(state.items).length;const due=countDue();const acc=state.history.filter(h=>h.correct).length;
 return titleBlock('DEIN FRANZÖSISCH-TRAINER','Kleine Einheiten. Dauerhafte Fortschritte.','Französische Präpositionen im Zusammenhang lernen – mit kurzen täglichen Übungen und gezielten Wiederholungen.')+
 `<div class="stats-strip"><div class="stat-cell"><div class="big-number">${d}<span class="tiny"> / ${goal}</span></div><span class="stat-label">Heute geübt</span></div><div class="stat-cell"><div class="big-number">${due}</div><span class="stat-label">Heute fällig</span></div><div class="stat-cell"><div class="big-number">${dailyStreak()}</div><span class="stat-label">Tage in Folge</span></div></div>
 <section class="card"><span class="micro">DEIN HEUTIGES ZIEL</span><div class="meter" aria-label="Tagesziel ${pct(Math.min(d,goal),goal)} Prozent"><span style="width:${pct(Math.min(d,goal),goal)}%"></span></div><p class="subtext">${d>=goal?'Tagesziel erreicht. Du kannst weiterüben oder morgen die fälligen Aufgaben wiederholen.':`Noch ${goal-d} Aufgabe${goal-d===1?'':'n'} bis zum Tagesziel.`}</p><div class="btn-row gap-top">${button('quick-start','Training beginnen')}${button('quick-review',`Wiederholen (${due})`,'btn secondary')}</div></section>
 <section class="card"><h2 class="section-title">Deine fünf Lernstufen</h2><p class="subtext">${QUESTIONS.length} eigenständig formulierte Sätze. Lerne zuerst die Grundbegriffe und steigere anschließend die Schwierigkeit.</p><div class="level-list gap-top">${LEVELS.map(l=>{
 const qs=QUESTIONS.filter(q=>q.level===l.id),worked=qs.filter(q=>item(q)).length;
 return `<div class="level-item"><span class="level-no">${l.id}</span><div><div class="level-name">${esc(l.name)} <span class="tiny">${esc(l.unit)}</span></div><div class="level-sub">${esc(l.desc)}</div><div class="meter" style="margin:7px 0 0"><span style="width:${pct(worked,qs.length)}%"></span></div></div><span class="level-count">${worked}/${qs.length}</span></div>`;}).join('')}</div></section>
 <p class="small muted">${read} unterschiedliche Sätze bearbeitet · ${state.history.length} Antworten · ${pct(acc,state.history.length)} % richtig insgesamt. Fortschritt nur auf diesem Gerät gespeichert.</p>`;
}
function config(){const s=state.settings,options=[{value:0,label:'Alle Stufen (gemischt)'},...LEVELS.map(l=>({value:l.id,label:`${l.id} · ${l.name} (${l.unit})`}))];
 return titleBlock('TRAINING EINSTELLEN','Deine nächste Lerneinheit','Wähle, was du heute üben möchtest. Anfänger starten mit Stufe 1 und kurzen Einheiten.')+
 `<section class="card"><div class="field"><label class="group-label" for="level-select">Lernstufe</label><select class="select" id="level-select" data-setting="level">${options.map(o=>`<option value="${o.value}" ${s.level===o.value?'selected':''}>${esc(o.label)}</option>`).join('')}</select></div>
 <div class="field"><span class="group-label">Trainingsart</span><div class="choice-row">${[['learn','Lernen'],['review','Wiederholen'],['errors','Fehlertraining'],['exam','Wissenstest']].map(([v,t])=>`<button type="button" data-set="mode" data-value="${v}" class="${s.mode===v?'selected':''}">${t}</button>`).join('')}</div><p class="subtext">${modeDescription(s.mode)}</p></div>
 <div class="field"><span class="group-label">Antwortformat</span><div class="choice-row">${[['mix','Gemischt'],['choice','Auswahl'],['type','Selbst eingeben']].map(([v,t])=>`<button type="button" data-set="format" data-value="${v}" class="${s.format===v?'selected':''}">${t}</button>`).join('')}</div></div>
 <div class="field"><span class="group-label">Aufgaben je Einheit</span><div class="choice-row">${[5,10,15,20].map(v=>`<button type="button" data-set="count" data-value="${v}" class="${s.count===v?'selected':''}">${v}</button>`).join('')}</div></div>
 ${button('start-session','Einheit starten','btn full')}
 </section><div class="notice"><p class="callout-title">So funktioniert dein Wiederholungsplan</p>Richtig und sicher gelöste Fragen erhalten größere Wiederholungsabstände (1, 3, 7, 14, 30 … Tage). Unsichere und falsche Antworten werden früher wieder aufgegriffen. Das ist ein einfaches Lernintervall-System, keine wissenschaftlich individuell kalibrierte Gedächtnisprognose.</div>`;
}
function modeDescription(m){return ({learn:'Fällige Wiederholungen zuerst, dazu neue Sätze. Bereits bekannte Sätze als Reserve.',review:'Nur Sätze, deren Wiederholungsdatum erreicht ist.',errors:'Sätze, die du irgendwann falsch beantwortet hast.',exam:'Zufällige Prüfungssätze ohne Hinweise; Ergebnisse fließen in den Lernplan ein.'})[m]||'';}
function currentQ(){return session&&BYID.get(session.queue[session.index]);}
function answerFormat(){const f=state.settings.format;return f==='mix'?((session.index%3===2)?'type':'choice'):f;}
function completeSentence(q,answer){const gap=/[’']$/.test(answer)?'':' ';return `${q.before} ${answer}${gap}${q.after}`.replace(/\s+/g,' ').trim();}
function normal(s){return String(s||'').normalize('NFC').toLocaleLowerCase('fr').trim().replace(/[’`´]/g,"'").replace(/\s+/g,' ');}
function optionsFor(q){return shuffle(q.options);}
function renderQuestion(){
 const q=currentQ();if(!q){session.done=true;return renderDone();}
 if(session.optionId!==q.id||session.optionIndex!==session.index){session.optionId=q.id;session.optionIndex=session.index;session.optionOrder=optionsFor(q);}
 const f=session.feedback,form=answerFormat(),progress=session.index+1;
 const displayed=session.queue.length;
 return titleBlock('DEINE LERNEINHEIT',`Stufe ${q.level}: ${esc(LEVELS[q.level-1].name)}`,'Wähle die französische Form, die zur deutschen Bedeutung passt.')+
 `<div class="card question-card"><div class="q-meta"><span class="q-topic">${esc(q.topic)} · ${form==='choice'?'Auswahl':'Freie Eingabe'}${session.retries.includes(q.id)?' · Wiederholung':''}</span><span class="q-count">${progress} / ${displayed}</span></div>
 <div class="meter" aria-label="Aufgabe ${progress} von ${displayed}"><span style="width:${pct(session.index,displayed)}%"></span></div>
 <p class="micro push-top">DEUTSCHER HINWEIS</p><p class="de-cue">${esc(q.de)}</p>
 <p class="micro">FRANZÖSISCH – ERGÄNZE DIE LÜCKE</p><p class="fr-sentence" lang="fr">${esc(q.before)} <span class="blank ${f?'revealed':''}">${f?esc(q.answer):'…'}</span>${f&&/[’']$/.test(q.answer)?'':' '}${esc(q.after)}</p>
 ${form==='choice'?`<div class="options-grid">${session.optionOrder.map(o=>{let klass='option';if(f){if(o===q.answer)klass+=' correct';else if(o===f.submitted)klass+=' incorrect';}return `<button type="button" class="${klass}" data-answer="${esc(o)}" ${f?'disabled':''}>${esc(o)}</button>`;}).join('')}</div>`:
 `<form id="typing-form"><label class="sr-only" for="answer-input">Französische Präposition eintippen</label><input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="fr" inputmode="text" class="answer-field" id="answer-input" placeholder="Präposition eingeben …" ${f?'disabled':''} value="${f?esc(f.submitted):''}" /><p class="answer-help">Akzente zählen: à und a sind verschieden. Apostrophe ' und ’ gelten beide.</p><div class="choice-row gap-top">${['à','é','è','ê','ù','ç','’'].map(c=>`<button type="button" data-char="${c}" ${f?'disabled':''}>${c}</button>`).join('')}</div>${f?'':`<div class="gap-top"><button class="btn full" type="submit">Antwort prüfen</button></div>`}</form>`}
 ${f?feedbackHtml(q,f):`<div class="q-extra">${state.settings.mode!=='exam'?button('hint','Regel-Hinweis','btn secondary sm',session.hint?'disabled':''):''}${button('skip','Lösung zeigen','btn secondary sm')}</div>${session.hint?`<div class="notice gap-top"><strong>Hinweis:</strong> ${esc(q.rule)}</div>`:''}`}
 </div><p class="small muted">${session.index} Aufgaben abgeschlossen · ${session.correct} richtig · ${session.wrong} falsch</p>`;
}
function feedbackHtml(q,f){
 const feedbackName=f.correct?'Richtig.':'Noch nicht richtig.';
 return `<section class="feedback" aria-live="polite"><h3 class="feedback-title ${f.correct?'good':'bad'}">${feedbackName}</h3>
 <p class="spoken" lang="fr">${esc(completeSentence(q,q.answer))}</p><p class="feedback-rule">${esc(q.rule)}</p>
 <p class="src">${sourceLink(q.src,'Grammatikquelle')}</p><div class="q-extra">${button('speak','Satz anhören','btn secondary sm')}${f.correct?(session.hint||f.skipped?button('next-unsure','Weiter · wiederholen','btn sm'):button('next-sure','Sicher gewusst','btn sm')+button('next-unsure','Noch unsicher','btn secondary sm')):button('next-wrong','Erklärung verstanden · weiter','btn sm')}</div>
 ${f.correct?`<p class="small muted">${session.hint||f.skipped?'Mit Hilfe gelöst: Die Frage wird früher wiederholt.':'„Sicher“ vergrößert den Abstand bis zur nächsten Wiederholung; „Unsicher“ verkürzt ihn.'}</p>`:''}</section>`;
}
function renderDone(){
 const total=session.correct+session.wrong, success=pct(session.correct,total);
 return titleBlock('EINHEIT ABGESCHLOSSEN','Gut gearbeitet.','Die Ergebnisse wurden lokal gespeichert. Die nächste Einheit passt sich deinem bisherigen Lernstand an.')+
 `<section class="card"><p class="kicker">ERGEBNIS</p><h2 class="success-title">${success} % richtig</h2><div class="stats-strip"><div class="stat-cell"><div class="big-number">${total}</div><span class="stat-label">Antworten</span></div><div class="stat-cell"><div class="big-number">${session.correct}</div><span class="stat-label">Richtig</span></div><div class="stat-cell"><div class="big-number">${session.wrong}</div><span class="stat-label">Falsch</span></div></div><p class="subtext">Fällige Aufgaben: ${countDue()}. Heutiges Ziel: ${doneToday()} / ${state.settings.dailyGoal}.</p><div class="btn-row gap-top">${button('again','Weitere Einheit')}${button('go-home','Zur Übersicht','btn secondary')}</div></section><div class="notice">Lerne lieber regelmäßig in kurzen Einheiten. Wiederholungen sind an diesem Gerät fällig, wenn du die App wieder öffnest. Es werden keine automatischen Push-Mitteilungen versendet.</div>`;
}
function rules(){const groups=LEVELS.map(l=>({l,r:RULES.filter(r=>r.level===l.id)}));
 return titleBlock('WISSEN','Regeln zum Nachschlagen','Jede Regel mit einem französischen Beispielsatz, deutscher Übersetzung und einem Link zur offiziellen Grammatikreferenz.')+
 groups.map(({l,r})=>`<section class="card"><h2 class="section-title">${l.id}. ${esc(l.name)}</h2><p class="subtext">${esc(l.desc)}</p>${r.map(x=>`<details class="rule"><summary>${esc(x.title)}</summary><div class="rule-content"><div class="rule-formula">${esc(x.formula)}</div><p>${esc(x.desc)}</p><div class="rule-example"><div lang="fr">${esc(x.fr)}</div><div class="small muted">${esc(x.de)}</div></div><div class="btn-row">${button('speak-example','Anhören','btn secondary sm',`data-speech="${esc(x.fr)}"`)}<span class="src">${sourceLink(x.src,'Offizielle Regel')}</span></div></div></details>`).join('')}</section>`).join('')+
 `<div class="notice">Die Übungssätze und vereinfachten deutschen Regeltexte wurden für diese App erstellt; die verlinkten Institutionen sind Grammatikreferenzen, keine Bestätigung jedes einzelnen Übungssatzes. Manche Präpositionen erlauben weitere Formulierungen oder regionale Varianten.</div>`;
}
function stats(){const n=state.history.length,correct=state.history.filter(h=>h.correct).length,known=Object.keys(state.items).length,mastered=QUESTIONS.filter(q=>item(q)&&item(q).box>=3).length;
 const past=[];const base=new Date();base.setHours(12,0,0,0);for(let i=13;i>=0;i--){const d=new Date(base);d.setDate(d.getDate()-i);const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;past.push({key:k,n:state.history.filter(h=>dateOf(h)===k).length,label:`${d.getDate()}.${d.getMonth()+1}.`});}
 const max=Math.max(1,...past.map(d=>d.n));
 return titleBlock('DEIN VERLAUF','Lernen, das bleibt.','Überblick über Aktivität, Lernstand und anstehende Wiederholungen. Nicht bearbeitete Sätze sind keine Fehler.')+
 `<div class="stats-strip"><div class="stat-cell"><div class="big-number">${n}</div><span class="stat-label">Antworten</span></div><div class="stat-cell"><div class="big-number">${pct(correct,n)} %</div><span class="stat-label">Richtig</span></div><div class="stat-cell"><div class="big-number">${mastered}</div><span class="stat-label">Stufe ≥ 3</span></div></div>
 <section class="card"><h2 class="section-title">Aktivität der letzten 14 Tage</h2><div class="history-bars">${past.map(p=>`<div class="hist-col" title="${p.key}: ${p.n} Antworten"><span class="hist-bar" style="height:${Math.max(3,p.n/max*80)}px"></span><span class="hist-label">${esc(p.label)}</span></div>`).join('')}</div><p class="small muted">Jeder Balken zeigt beantwortete Fragen an diesem Kalendertag.</p></section>
 <section class="card"><h2 class="section-title">Fortschritt je Stufe</h2>${LEVELS.map(l=>{const qs=QUESTIONS.filter(q=>q.level===l.id),k=qs.filter(q=>item(q)).length,m=qs.filter(q=>item(q)&&item(q).box>=3).length;return `<div class="progress-row"><div class="progress-label"><strong>${l.id}. ${esc(l.name)}</strong><span>${k} / ${qs.length} bearbeitet · ${m} gefestigt</span></div><div class="meter" role="progressbar" aria-valuenow="${k}" aria-valuemin="0" aria-valuemax="${qs.length}"><span style="width:${pct(k,qs.length)}%"></span></div></div>`;}).join('')}<p class="small muted">„Gefestigt“ bedeutet hier: mindestens drei erfolgreiche Wiederholungsstufen. Es ist keine Messung echter Sprachkompetenz.</p></section>
 <div class="notice">${known} von ${QUESTIONS.length} Aufgaben schon bearbeitet. ${countDue()} Wiederholungen heute fällig. Der Fortschritt wird ausschließlich im lokalen Browser-Speicher auf diesem Gerät gesichert.</div>`;
}
function settings(){const s=state.settings;
 return titleBlock('EINSTELLUNGEN UND SICHERUNG','Deine Daten. Dein Gerät.','Ohne Konto, ohne Tracking und ohne Server-Synchronisierung. Hier sicherst du deinen Lernfortschritt.')+
 `<section class="card"><h2 class="section-title">Lernen</h2><div class="field"><span class="group-label">Tagesziel</span><div class="choice-row">${[5,10,15,20].map(v=>`<button type="button" data-set="dailyGoal" data-value="${v}" class="${s.dailyGoal===v?'selected':''}">${v}</button>`).join('')}</div></div><label class="check-line"><input id="sound-setting" type="checkbox" ${s.sound?'checked':''}><span>Französische Sätze nach dem Lösen automatisch vorlesen</span></label><p class="small muted">Die Wiedergabe nutzt die Sprachstimmen des Betriebssystems. Eine französische Stimme muss gegebenenfalls auf dem iPhone installiert sein; Offline-Sprachausgabe ist nicht garantiert.</p></section>
 <section class="card"><h2 class="section-title">Sicherung</h2><p class="subtext">Eine JSON-Datei enthält nur deinen Übungsstand und Einstellungen. Sie kann auf demselben oder einem anderen Gerät wieder eingelesen werden.</p><div class="btn-row gap-top">${button('export','Sicherung exportieren')}${button('import-open','Sicherung importieren','btn secondary')}</div><input type="file" id="import-file" accept=".json,application/json" hidden><p class="small muted gap-top">Vor einer Neuinstallation oder dem Löschen von Website-Daten bitte unbedingt exportieren. Beim Import wird der bisherige Stand dieses Geräts ersetzt.</p></section>
 <section class="card"><h2 class="section-title">Offline-Status</h2><p class="subtext">Die App und die Übungsdaten werden beim ersten Besuch über HTTPS zwischengespeichert. Nach einem erfolgreichen Erstaufruf kannst du die App ohne Internet nutzen. Grammatiklinks führen auf externe Websites und benötigen Internet.</p><div id="sw-info" class="notice gap-top">${'serviceWorker' in navigator?'Offline-Technik ist im Browser grundsätzlich verfügbar.':'Auf diesem Gerät oder mit dieser Öffnungsart ist kein Service Worker verfügbar.'}</div></section>
 <section class="card"><h2 class="section-title">Lernfortschritt löschen</h2><p class="subtext">Die App bleibt installiert. Gelöscht werden nur die gespeicherten Antworten und Einstellungen auf diesem Gerät.</p><div class="gap-top">${button('reset','Gesamten Fortschritt zurücksetzen','btn danger')}</div></section>`;
}
function emptyTraining(){const mode=state.settings.mode;return titleBlock('KEINE AUFGABEN FÄLLIG','Für den Moment alles erledigt.','Für diese Lernstufe und Trainingsart sind gerade keine geeigneten Fragen vorhanden.')+
 `<section class="card"><p class="subtext">${mode==='review'?'Heute sind in der ausgewählten Stufe keine Wiederholungen fällig.':'Für dieses Fehlertraining liegen noch keine früheren Fehlversuche vor.'} Du kannst eine andere Stufe wählen oder „Lernen“ starten.</p><div class="btn-row gap-top">${button('switch-learn','Neue Sätze lernen')}${button('choose-other','Andere Auswahl','btn secondary')}</div></section>`;}
function render(){
 document.querySelectorAll('.nav-btn').forEach(btn=>{btn.classList.toggle('active',btn.dataset.tab===tab);btn.setAttribute('aria-current',btn.dataset.tab===tab?'page':'false');});
 el.innerHTML=tab==='home'?home():tab==='train'?(!session?config():(session.empty?emptyTraining():(session.done?renderDone():renderQuestion()))):tab==='rules'?rules():tab==='stats'?stats():settings();
 updateNetwork();if(tab==='settings')updateSW();
}
function navigate(newTab){tab=newTab;render();window.scrollTo({top:0,behavior:'instant'});}
function toast(msg){const node=$('toast');node.textContent=msg;node.hidden=false;clearTimeout(toastHandle);toastHandle=setTimeout(()=>{node.hidden=true;},3500);}
function start(){let qq=selectQuestions();session={queue:qq.map(q=>q.id),index:0,correct:0,wrong:0,hint:false,feedback:null,retries:[],retried:new Set(),optionId:null,optionIndex:-1,optionOrder:[],empty:qq.length===0,done:false};navigate('train');}
function submitAnswer(value,skipped=false){if(!session||session.done||session.feedback)return;const q=currentQ();if(!q)return;
 if(!skipped&&!String(value).trim()){toast('Bitte zuerst eine Antwort eingeben.');return;}
 const correct=!skipped&&normal(value)===normal(q.answer);
 session.feedback={correct,submitted:String(value),skipped};if(correct)session.correct++;else session.wrong++;
 render();if(state.settings.sound)play(completeSentence(q,q.answer));
}
function finalize(quality){if(!session||!session.feedback)return;
 const q=currentQ(),f=session.feedback;const old=item(q)||{seen:0,correct:0,wrong:0,box:0,due:today(),last:'',lastOutcome:'wrong'};
 old.seen++;old.last=new Date().toISOString();
 if(f.correct){old.correct++;old.lastOutcome='correct';if(quality==='good'&&!session.hint){old.box=Math.min(6,old.box+1);old.due=plusDays(DUE_INTERVALS[old.box-1]);}else{old.box=0;old.due=plusDays(1);}}
 else{old.wrong++;old.box=0;old.lastOutcome='wrong';old.due=plusDays(1);if(!session.retried.has(q.id)){session.retried.add(q.id);session.queue.push(q.id);session.retries.push(q.id);}}
 state.items[q.id]=old;state.history.push({id:q.id,at:new Date().toISOString(),correct:f.correct,quality:f.correct?(quality==='good'?'good':'unsure'):'wrong'});if(state.history.length>20000)state.history.splice(0,state.history.length-20000);
 save();session.index++;session.hint=false;session.feedback=null;session.optionId=null;session.empty=false;if(session.index>=session.queue.length)session.done=true;render();window.scrollTo({top:0,behavior:'instant'});
}
function play(txt){
 if(!('speechSynthesis' in window)){toast('Auf diesem Gerät ist keine Sprachausgabe verfügbar.');return;}
 try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang='fr-FR';u.rate=.83;u.pitch=1;const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>v.lang.toLowerCase()==='fr-fr')||voices.find(v=>v.lang.toLowerCase().startsWith('fr'));if(voice)u.voice=voice;window.speechSynthesis.speak(u);}catch(e){toast('Die Sprachausgabe konnte nicht gestartet werden.');}
}
function exportData(){try{
 const payload={...state,exportedAt:new Date().toISOString(),app:'fr-prepositions'};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),link=document.createElement('a');const href=URL.createObjectURL(blob);link.href=href;link.download=`praepositionen-lernstand-${today()}.json`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(href),3000);toast('Sicherungsdatei erstellt. Bitte in „Dateien“ speichern.');
 }catch(e){toast('Die Exportdatei konnte nicht erstellt werden.');}}
async function importData(file){if(!file)return;if(file.size>2000000){toast('Sicherung ist zu groß (max. 2 MB).');return;}
 try{const raw=await file.text();const parsed=JSON.parse(raw);if(parsed.app!=='fr-prepositions'||parsed.v!==1)throw Error('Anderes Format');if(!confirm('Importieren? Dein bisheriger Lernfortschritt auf diesem Gerät wird ersetzt.'))return;state=sanitize(parsed);if(!save())return;session=null;navigate('stats');toast('Sicherung erfolgreich eingelesen.');}catch(e){toast('Die Datei ist keine passende Präpositionen-Sicherung.');}}
function insertChar(char){const field=$('answer-input');if(!field)return;const st=field.selectionStart,ed=field.selectionEnd,v=field.value;field.value=v.slice(0,st)+char+v.slice(ed);field.focus();field.setSelectionRange(st+char.length,st+char.length);}
function updateNetwork(){const node=$('network-label');if(!node)return;node.textContent=navigator.onLine?'LOKAL':'OFFLINE';}
function updateSW(){const n=$('sw-info');if(!n||!('serviceWorker' in navigator))return;n.textContent=navigator.serviceWorker.controller?'Offline-Cache aktiv. Nach dem ersten vollständigen Laden ist die App grundsätzlich ohne Netz verwendbar.':'Offline-Technik wird eingerichtet. Bitte die App einmal vollständig laden und danach erneut öffnen.';}
function runAction(action,btn){
 switch(action){case 'quick-start':state.settings.mode='learn';save();start();break;
 case 'quick-review':state.settings.mode='review';save();start();break;
 case 'start-session':start();break;
 case 'speak':{const q=currentQ();if(q)play(completeSentence(q,q.answer));break;}
 case 'speak-example':play(btn.dataset.speech||'');break;
 case 'hint':if(session&&!session.feedback){session.hint=true;render();}break;
 case 'skip':{const q=currentQ();if(q)submitAnswer('',true);break;}
 case 'next-sure':finalize('good');break;
 case 'next-unsure':finalize('unsure');break;
 case 'next-wrong':finalize('wrong');break;
 case 'again':session=null;start();break;
 case 'go-home':session=null;navigate('home');break;
 case 'choose-other':session=null;render();break;
 case 'switch-learn':state.settings.mode='learn';save();session=null;render();break;
 case 'export':exportData();break;
 case 'import-open':$('import-file')?.click();break;
 case 'reset':if(confirm('Wirklich den gesamten Lernfortschritt und alle Einstellungen auf diesem Gerät löschen?')){state=defaults();session=null;save();navigate('home');toast('Lernfortschritt zurückgesetzt.');}break;
 }
}
document.addEventListener('click',e=>{
 const nav=e.target.closest('[data-tab]');if(nav){navigate(nav.dataset.tab);return;}
 const set=e.target.closest('button[data-set]');if(set){const k=set.dataset.set;state.settings[k]=['count','dailyGoal'].includes(k)?Number(set.dataset.value):set.dataset.value;save();render();return;}
 const char=e.target.closest('button[data-char]');if(char){insertChar(char.dataset.char);return;}
 const btn=e.target.closest('button[data-action]');if(btn){runAction(btn.dataset.action,btn);return;}
 const answer=e.target.closest('button[data-answer]');if(answer){submitAnswer(answer.dataset.answer);}
});
document.addEventListener('submit',e=>{if(e.target.id==='typing-form'){e.preventDefault();submitAnswer($('answer-input')?.value||'');}});
document.addEventListener('change',e=>{
 if(e.target.dataset.setting==='level'){state.settings.level=Number(e.target.value);save();render();}
 if(e.target.id==='sound-setting'){state.settings.sound=e.target.checked;save();toast('Einstellung gespeichert.');}
 if(e.target.id==='import-file'){const file=e.target.files?.[0];importData(file);e.target.value='';}
});
window.addEventListener('online',updateNetwork);window.addEventListener('offline',updateNetwork);
if('serviceWorker' in navigator && (location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(()=>{if(tab==='settings')updateSW();}).catch(()=>{if(tab==='settings'){const n=$('sw-info');if(n)n.textContent='Offline-Cache konnte nicht eingerichtet werden. Bitte HTTPS und Browser-Einstellungen prüfen.';}}));
}
render();
})();
