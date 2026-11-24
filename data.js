/* Eigene, kontextualisierte Übungssätze. Regelerläuterungen: OQLF / BDL. */
'use strict';
window.PREP_SOURCES = {
  ort: {title:'OQLF – Präpositionen und Präpositionalgruppen',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24327/la-grammaire/la-grammaire-actuelle/les-classes-de-mots-et-les-groupes/la-preposition-et-le-groupe-prepositionnel'},
  land:{title:'OQLF – Präpositionen bei Ländernamen',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/23897/la-syntaxe/les-prepositions/preposition-devant-un-nom/les-prepositions-devant-un-nom-de-pays'},
  kontr:{title:'OQLF – Zusammengezogene Artikel',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26506951/determinant-contracte'},
  chez:{title:'OQLF – Aller à / aller chez',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/22018/la-syntaxe/les-prepositions/preposition-apres-un-verbe/prepositions-a-employer-apres-le-verbe-aller'},
  verkehr:{title:'OQLF – Präpositionen für Verkehrsmittel',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/24306/la-syntaxe/les-prepositions/preposition-devant-un-nom/les-prepositions-introduisant-un-moyen-de-transport'},
  zeit:{title:'OQLF – Seit / depuis',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/21188/la-syntaxe/les-prepositions/preposition-devant-un-nom/preposition-depuis'},
  verb:{title:'OQLF – Präpositionen nach Verben',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/la-syntaxe/les-prepositions'},
  verb2:{title:'OQLF – Verben und Ergänzungen',url:'https://vitrinelinguistique.oqlf.gouv.qc.ca/banque-de-depannage-linguistique/la-syntaxe'}
};
window.PREP_LEVELS = [
 {id:1,name:'Grundlagen',desc:'Ort, Position und Begleitung',unit:'A1'},
 {id:2,name:'Unterwegs',desc:'Städte, Länder und Verkehr',unit:'A1–A2'},
 {id:3,name:'Zeit',desc:'Beginn, Dauer und Zeitpunkt',unit:'A2'},
 {id:4,name:'Verben',desc:'Feste Verbindungen',unit:'A2–B1'},
 {id:5,name:'Anwendung',desc:'Feine Bedeutungsunterschiede',unit:'A2–B1'}
];
window.PREP_RULES = [
 {level:1,title:'Wo befindet sich etwas?',formula:'sur · sous · dans · devant · derrière',desc:'sur = auf, sous = unter, dans = in, devant = vor, derrière = hinter. Der Kontext entscheidet.',fr:'Le livre est sur la table.',de:'Das Buch liegt auf dem Tisch.',src:'ort'},
 {level:1,title:'Beziehungen beschreiben',formula:'avec · sans · pour · contre',desc:'avec = mit, sans = ohne, pour = für, contre = gegen. Achte auf die Bedeutung des ganzen Satzes.',fr:'Je bois du café sans sucre.',de:'Ich trinke Kaffee ohne Zucker.',src:'ort'},
 {level:2,title:'Städte und Länder',formula:'à Paris · en France · au Japon · aux États-Unis',desc:'Städte meist mit à. Ländernamen meist en (feminin oder Vokalanfang), au (maskulin + Konsonant) oder aux (Plural).',fr:'Nous allons en France.',de:'Wir fahren nach Frankreich.',src:'land'},
 {level:2,title:'Zusammenziehungen',formula:'à + le → au · à + les → aux · de + le → du · de + les → des',desc:'Diese Verbindungen werden in der Standardsprache zusammengezogen.',fr:'Je reviens du marché.',de:'Ich komme vom Markt zurück.',src:'kontr'},
 {level:2,title:'Menschen und Orte',formula:'chez le médecin · à la pharmacie',desc:'chez betont die Person oder ihr Geschäft; à bezeichnet einen Ort.',fr:'Je vais chez le médecin.',de:'Ich gehe zum Arzt.',src:'chez'},
 {level:2,title:'Unterwegs',formula:'à pied · à vélo · en train · en voiture',desc:'Bei Verkehrsmitteln gibt es Gebrauchsvarianten. Für den Einstieg lernst du hier häufige Standardformulierungen.',fr:'Nous voyageons en train.',de:'Wir reisen mit dem Zug.',src:'verkehr'},
 {level:3,title:'Ein Zustand dauert noch an',formula:'depuis + Beginn / Dauer',desc:'depuis bezeichnet den Beginn oder die Dauer eines Zustands, der noch andauert.',fr:'J’habite ici depuis 2020.',de:'Ich wohne seit 2020 hier.',src:'zeit'},
 {level:3,title:'Zeitliche Kontraste',formula:'pendant · en · dans · il y a',desc:'pendant = während / lang; en = in (benötigte Zeit); dans = in (ab jetzt); il y a = vor (vergangener Zeitpunkt).',fr:'Je pars dans dix minutes.',de:'Ich fahre in zehn Minuten ab.',src:'ort'},
 {level:4,title:'Verb + Präposition als Einheit lernen',formula:'penser à · avoir besoin de · réussir à',desc:'Lerne die Verbindung immer als ganze Wortgruppe und mit einem vollständigen Beispielsatz. Einzelne Verben können je nach Bedeutung anders konstruiert sein.',fr:'Je pense à mes amis.',de:'Ich denke an meine Freunde.',src:'verb'},
 {level:5,title:'Bedeutung statt 1:1-Übersetzung',formula:'pour ≠ par · chez ≠ à · grâce à ≠ à cause de',desc:'Dieselbe deutsche Präposition kann im Französischen je nach Bedeutung unterschiedlich ausgedrückt werden. Der gesamte Satz ist entscheidend.',fr:'Ce livre est pour toi.',de:'Dieses Buch ist für dich.',src:'ort'}
];
(()=>{
 const a=[]; let n=0;
 function D(level,topic,answer,rule,src,options,examples){
  examples.forEach(([before,after,de])=>a.push({id:'p'+(++n),level,topic,answer,rule,src,options:options.slice(),before,after,de}));
 }
 // 1 – Grundbegriffe: deutsche Bedeutung sorgt bei möglichen Mehrdeutigkeiten für Eindeutigkeit.
 D(1,'Position','sur','sur bedeutet „auf“ (mit Kontakt).','ort',['sur','sous','dans','devant'],[
  ['Le livre est','la table.','Das Buch liegt auf dem Tisch.'],['La tasse est','le bureau.','Die Tasse steht auf dem Schreibtisch.'],['Le téléphone est','le canapé.','Das Telefon liegt auf dem Sofa.'],['Le sac est','la chaise.','Die Tasche liegt auf dem Stuhl.'],['La carte est','la table.','Die Karte liegt auf dem Tisch.']]);
 D(1,'Position','sous','sous bedeutet „unter“.','ort',['sous','sur','devant','dans'],[
  ['Le chat est','le lit.','Die Katze ist unter dem Bett.'],['Le ballon est','la chaise.','Der Ball liegt unter dem Stuhl.'],['Mes chaussures sont','la table.','Meine Schuhe stehen unter dem Tisch.'],['Le chien dort','le bureau.','Der Hund schläft unter dem Schreibtisch.'],['La boîte est','le banc.','Die Schachtel ist unter der Bank.']]);
 D(1,'Position','dans','dans bedeutet „in“ oder „im Inneren“.','ort',['dans','sur','sous','devant'],[
  ['Les clés sont','le sac.','Die Schlüssel sind in der Tasche.'],['Le lait est','le réfrigérateur.','Die Milch ist im Kühlschrank.'],['La lettre est','une enveloppe.','Der Brief steckt in einem Umschlag.'],['Les pommes sont','le panier.','Die Äpfel sind im Korb.'],['Mon passeport est','ma poche.','Mein Reisepass ist in meiner Tasche (Hosentasche).']]);
 D(1,'Position','devant','devant bedeutet „vor“ (räumlich).','ort',['devant','derrière','sous','entre'],[
  ['Le vélo est','la maison.','Das Fahrrad steht vor dem Haus.'],['Le bus s’arrête','la gare.','Der Bus hält vor dem Bahnhof.'],['Le chien attend','la porte.','Der Hund wartet vor der Tür.'],['Nous sommes','le cinéma.','Wir stehen vor dem Kino.']]);
 D(1,'Position','derrière','derrière bedeutet „hinter“.','ort',['derrière','devant','sur','dans'],[
  ['Le jardin est','la maison.','Der Garten liegt hinter dem Haus.'],['Le chat se cache','le fauteuil.','Die Katze versteckt sich hinter dem Sessel.'],['La voiture est','le bâtiment.','Das Auto steht hinter dem Gebäude.'],['La terrasse est','l’hôtel.','Die Terrasse liegt hinter dem Hotel.']]);
 D(1,'Position','entre','entre bedeutet „zwischen“.','ort',['entre','sur','sous','contre'],[
  ['La pharmacie est','la banque et la boulangerie.','Die Apotheke liegt zwischen der Bank und der Bäckerei.'],['Je suis assis','deux amis.','Ich sitze zwischen zwei Freunden.'],['Le banc est','deux arbres.','Die Bank steht zwischen zwei Bäumen.'],['La rue passe','les deux bâtiments.','Die Straße verläuft zwischen den beiden Gebäuden.']]);
 D(1,'Position','près de','près de bedeutet „in der Nähe von“.','ort',['près de','loin de','derrière','sous'],[
  ['J’habite','la gare.','Ich wohne in der Nähe des Bahnhofs.'],['Le parc est','la rivière.','Der Park liegt nahe am Fluss.'],['Nous attendons','la sortie.','Wir warten in der Nähe des Ausgangs.']]);
 D(1,'Position','loin de','loin de bedeutet „weit entfernt von“.','ort',['loin de','près de','sur','entre'],[
  ['Mon hôtel est','la gare.','Mein Hotel liegt weit entfernt vom Bahnhof.'],['La plage est','la ville.','Der Strand liegt weit weg von der Stadt.'],['Ils habitent','Paris.','Sie wohnen weit entfernt von Paris.']]);
 D(1,'Position','à côté de','à côté de bedeutet „neben“.','ort',['à côté de','en face de','derrière','sur'],[
  ['La bibliothèque est','la mairie.','Die Bibliothek liegt neben dem Rathaus.'],['Je suis assis','Marie.','Ich sitze neben Marie.'],['Le restaurant est','l’hôtel.','Das Restaurant liegt neben dem Hotel.']]);
 D(1,'Position','en face de','en face de bedeutet „gegenüber“.','ort',['en face de','à côté de','sous','loin de'],[
  ['La poste est','la gare.','Die Post liegt gegenüber dem Bahnhof.'],['Nous habitons','l’école.','Wir wohnen gegenüber der Schule.'],['Le café est','la banque.','Das Café liegt gegenüber der Bank.']]);
 D(1,'Alltag','avec','avec bedeutet „mit“.','ort',['avec','sans','pour','contre'],[
  ['Je voyage','mon frère.','Ich reise mit meinem Bruder.'],['Elle parle','sa sœur.','Sie spricht mit ihrer Schwester.'],['Nous mangeons','nos amis.','Wir essen mit unseren Freunden.'],['Je prends un café','du lait.','Ich trinke einen Kaffee mit Milch.']]);
 D(1,'Alltag','sans','sans bedeutet „ohne“.','ort',['sans','avec','pour','par'],[
  ['Je bois du thé','sucre.','Ich trinke Tee ohne Zucker.'],['Il part','son parapluie.','Er geht ohne seinen Regenschirm los.'],['Nous cuisinons','sel.','Wir kochen ohne Salz.'],['Elle travaille','ordinateur.','Sie arbeitet ohne Computer.']]);
 D(1,'Alltag','pour','pour bedeutet hier „für“.','ort',['pour','par','sans','avec'],[
  ['Ce cadeau est','toi.','Dieses Geschenk ist für dich.'],['Je prépare le dîner','ma famille.','Ich bereite das Abendessen für meine Familie zu.'],['Cette lettre est','Paul.','Dieser Brief ist für Paul.'],['Je fais ce gâteau','mes amis.','Ich backe diesen Kuchen für meine Freunde.']]);
 D(1,'Alltag','contre','contre bedeutet hier „gegen“.','ort',['contre','pour','avec','sans'],[
  ['Nous jouons','une autre équipe.','Wir spielen gegen eine andere Mannschaft.'],['Ils votent','cette proposition.','Sie stimmen gegen diesen Vorschlag.'],['Le vélo est appuyé','le mur.','Das Fahrrad lehnt an der Mauer.']]);
 // 2 – Reise und Land
 D(2,'Städte','à','Bei Städtenamen verwendet man normalerweise à.','land',['à','en','au','aux'],[
  ['J’habite','Berlin.','Ich wohne in Berlin.'],['Elle travaille','Paris.','Sie arbeitet in Paris.'],['Nous allons','Lyon.','Wir fahren nach Lyon.'],['Ils restent','Nice.','Sie bleiben in Nizza.'],['Je suis','Rome.','Ich bin in Rom.'],['Il arrive','Madrid.','Er kommt in Madrid an.'],['Nous passons deux jours','Vienne.','Wir verbringen zwei Tage in Wien.'],['Tu vas','Marseille.','Du fährst nach Marseille.']]);
 D(2,'Länder','en','en vor femininen Ländernamen oder solchen mit Vokalanfang.','land',['en','au','aux','à'],[
  ['Je voyage','France.','Ich reise nach Frankreich.'],['Nous partons','Italie.','Wir fahren nach Italien.'],['Elle habite','Allemagne.','Sie wohnt in Deutschland.'],['Ils vont','Espagne.','Sie fahren nach Spanien.'],['Il travaille','Suisse.','Er arbeitet in der Schweiz.'],['Nous sommes','Autriche.','Wir sind in Österreich.'],['Je passe mes vacances','Grèce.','Ich verbringe meinen Urlaub in Griechenland.'],['Elle étudie','Égypte.','Sie studiert in Ägypten.'],['Nous allons','Iran.','Wir fahren in den Iran.'],['Mon amie habite','Argentine.','Meine Freundin wohnt in Argentinien.']]);
 D(2,'Länder','au','au = à + le; oft vor maskulinen Ländernamen mit Konsonant.','land',['au','en','aux','à'],[
  ['Nous allons','Japon.','Wir reisen nach Japan.'],['Il habite','Canada.','Er wohnt in Kanada.'],['Elle travaille','Maroc.','Sie arbeitet in Marokko.'],['Nous partons','Portugal.','Wir fahren nach Portugal.'],['Je voyage','Mexique.','Ich reise nach Mexiko.'],['Ils vivent','Brésil.','Sie leben in Brasilien.'],['Mon ami est','Danemark.','Mein Freund ist in Dänemark.'],['Elle va','Vietnam.','Sie fährt nach Vietnam.']]);
 D(2,'Länder','aux','aux = à + les; bei Ländernamen im Plural.','land',['aux','au','en','à'],[
  ['Elle habite','États-Unis.','Sie wohnt in den Vereinigten Staaten.'],['Nous allons','Pays-Bas.','Wir fahren in die Niederlande.'],['Ils travaillent','États-Unis.','Sie arbeiten in den Vereinigten Staaten.'],['Je passe une semaine','Pays-Bas.','Ich verbringe eine Woche in den Niederlanden.']]);
 D(2,'Herkunft','de','Herkunft aus Städten: de; aus Frankreich: de France.','land',['de','du','des','à'],[
  ['Je viens','Berlin.','Ich komme aus Berlin.'],['Elle arrive','Paris.','Sie kommt aus Paris.'],['Nous revenons','Lyon.','Wir kommen aus Lyon zurück.'],['Ils viennent','France.','Sie kommen aus Frankreich.'],['Je rentre','Nice.','Ich komme aus Nizza zurück.']]);
 D(2,'Herkunft','du','du = de + le, z. B. Herkunft aus einem maskulinen Land.','kontr',['du','de','des','au'],[
  ['Je reviens','Japon.','Ich komme aus Japan zurück.'],['Elle vient','Canada.','Sie kommt aus Kanada.'],['Nous rentrons','Portugal.','Wir kehren aus Portugal zurück.'],['Ils viennent','Maroc.','Sie kommen aus Marokko.'],['Il arrive','Brésil.','Er kommt aus Brasilien.']]);
 D(2,'Herkunft','des','des = de + les, z. B. aus den USA.','kontr',['des','de','du','aux'],[
  ['Je reviens','États-Unis.','Ich komme aus den USA zurück.'],['Elle arrive','Pays-Bas.','Sie kommt aus den Niederlanden.'],['Ils viennent','États-Unis.','Sie kommen aus den USA.']]);
 D(2,'Herkunft',"d’",'Vor einem Vokal wird de zu d’.','land',["d’",'de','du','des'],[
  ['Je reviens','Italie.','Ich komme aus Italien zurück.'],['Elle arrive','Allemagne.','Sie kommt aus Deutschland.'],['Nous rentrons','Autriche.','Wir kehren aus Österreich zurück.']]);
 D(2,'Verkehr','à','Man sagt gewöhnlich à pied, à vélo, à cheval.','verkehr',['à','en','par','sur'],[
  ['Je vais au marché','pied.','Ich gehe zu Fuß zum Markt.'],['Nous allons au parc','vélo.','Wir fahren mit dem Fahrrad zum Park.'],['Ils font une promenade','cheval.','Sie machen einen Ausritt zu Pferd.']]);
 D(2,'Verkehr','en','Bei vielen Verkehrsmitteln verwendet man en.','verkehr',['en','à','sur','pour'],[
  ['Nous partons','train.','Wir fahren mit dem Zug los.'],['Je vais au travail','voiture.','Ich fahre mit dem Auto zur Arbeit.'],['Elle voyage','avion.','Sie reist mit dem Flugzeug.'],['Ils viennent','bus.','Sie kommen mit dem Bus.'],['Nous visitons la ville','métro.','Wir erkunden die Stadt mit der Metro.']]);
 D(2,'Menschen/Orte','chez','chez steht vor einer Person bzw. ihrem Geschäft oder Arbeitsplatz.','chez',['chez','à','dans','en'],[
  ['Je vais','le médecin.','Ich gehe zum Arzt.'],['Elle va','le coiffeur.','Sie geht zum Friseur.'],['Nous dînons','nos amis.','Wir essen bei unseren Freunden zu Abend.'],['Je suis','mes parents.','Ich bin bei meinen Eltern.']]);
 D(2,'Menschen/Orte','à la','à la verwendet man hier vor femininen Ortsbezeichnungen.','chez',['à la','chez','au','dans'],[
  ['Je vais','pharmacie.','Ich gehe zur Apotheke.'],['Nous sommes','gare.','Wir sind am Bahnhof.'],['Elle va','bibliothèque.','Sie geht in die Bibliothek.']]);
 D(2,'Menschen/Orte','au','au = à + le vor maskulinen Ortsbezeichnungen.','kontr',['au','aux','à','en'],[
  ['Je vais','marché.','Ich gehe zum Markt.'],['Nous allons','cinéma.','Wir gehen ins Kino.'],['Elle est','bureau.','Sie ist im Büro.'],['Ils vont','restaurant.','Sie gehen ins Restaurant.']]);
 D(2,'Menschen/Orte','aux','aux = à + les.','kontr',['aux','au','à la','chez'],[
  ['Nous allons','toilettes.','Wir gehen zur Toilette.'],['Les enfants vont','cours de musique.','Die Kinder gehen zum Musikunterricht.'],['Elle parle','voisins.','Sie spricht mit den Nachbarn.']]);
 // 3 – Zeit
 D(3,'Zeitdauer','depuis','depuis bei einem noch andauernden Zustand: „seit“.','zeit',['depuis','pendant','dans','il y a'],[
  ['J’habite ici','2020.','Ich wohne seit 2020 hier.'],['Il apprend le français','un an.','Er lernt seit einem Jahr Französisch.'],['Nous attendons','dix minutes.','Wir warten seit zehn Minuten.'],['Elle travaille ici','lundi.','Sie arbeitet seit Montag hier.'],['Je connais Marie','cinq ans.','Ich kenne Marie seit fünf Jahren.'],['Il pleut','ce matin.','Es regnet seit heute Morgen.'],['Nous sommes amis','longtemps.','Wir sind schon seit langer Zeit befreundet.'],['Elle est malade','trois jours.','Sie ist seit drei Tagen krank.']]);
 D(3,'Zeitdauer','pendant','pendant betont eine abgegrenzte Zeitspanne: „während“ oder „lang“.','ort',['pendant','depuis','dans','en'],[
  ['J’ai lu','deux heures.','Ich habe zwei Stunden lang gelesen.'],['Elle a dormi','huit heures.','Sie hat acht Stunden lang geschlafen.'],['Nous avons marché','trois heures.','Wir sind drei Stunden lang gewandert.'],['Il a travaillé','tout le week-end.','Er hat das ganze Wochenende über gearbeitet.'],['Nous sommes restés à Paris','trois jours.','Wir sind drei Tage lang in Paris geblieben.'],['Le musée était fermé','une semaine.','Das Museum war eine Woche lang geschlossen.'],['Ils ont parlé','une heure.','Sie haben eine Stunde lang gesprochen.']]);
 D(3,'Zeitdauer','en','en bezeichnet hier die für eine fertige Handlung benötigte Zeit.','ort',['en','pendant','dans','depuis'],[
  ['J’ai terminé le livre','trois jours.','Ich habe das Buch innerhalb von drei Tagen fertig gelesen.'],['Elle a fini l’exercice','cinq minutes.','Sie hat die Übung in fünf Minuten geschafft.'],['Nous avons construit la table','une heure.','Wir haben den Tisch in einer Stunde aufgebaut.'],['Il a appris cette chanson','deux jours.','Er hat dieses Lied innerhalb von zwei Tagen gelernt.'],['Elle a préparé le dîner','quarante minutes.','Sie hat das Abendessen in vierzig Minuten zubereitet.'],['J’ai écrit la lettre','dix minutes.','Ich habe den Brief in zehn Minuten geschrieben.']]);
 D(3,'Zukunft','dans','dans + Dauer: in dieser Zeit ab jetzt (Zukunft).','ort',['dans','depuis','pendant','il y a'],[
  ['Le train part','dix minutes.','Der Zug fährt in zehn Minuten ab.'],['Je reviens','une heure.','Ich komme in einer Stunde zurück.'],['Nous partons','deux jours.','Wir fahren in zwei Tagen los.'],['Le film commence','cinq minutes.','Der Film beginnt in fünf Minuten.'],['Elle arrive','une demi-heure.','Sie kommt in einer halben Stunde an.'],['Je t’appelle','vingt minutes.','Ich rufe dich in zwanzig Minuten an.'],['La réunion commence','un quart d’heure.','Die Besprechung beginnt in einer Viertelstunde.']]);
 D(3,'Vergangenheit','il y a','il y a + Dauer: „vor“ (Zeitabstand zur Vergangenheit).','ort',['il y a','dans','depuis','pendant'],[
  ['Il est parti','trois heures.','Er ist vor drei Stunden gegangen.'],['Nous sommes arrivés','dix minutes.','Wir sind vor zehn Minuten angekommen.'],['Elle a téléphoné','une heure.','Sie hat vor einer Stunde angerufen.'],['J’ai acheté ce livre','deux jours.','Ich habe dieses Buch vor zwei Tagen gekauft.'],['Ils ont déménagé','un an.','Sie sind vor einem Jahr umgezogen.'],['Le concert a commencé','cinq minutes.','Das Konzert hat vor fünf Minuten begonnen.']]);
 D(3,'Reihenfolge','avant','avant bedeutet „vor“ (früher als ein Ereignis).','ort',['avant','après','pendant','depuis'],[
  ['Je bois un café','le travail.','Ich trinke einen Kaffee vor der Arbeit.'],['Il se lave les mains','le dîner.','Er wäscht sich vor dem Abendessen die Hände.'],['Nous arrivons','midi.','Wir kommen vor Mittag an.'],['Elle lit','de dormir.','Sie liest vor dem Schlafengehen.']]);
 D(3,'Reihenfolge','après','après bedeutet „nach“.','ort',['après','avant','depuis','dans'],[
  ['Nous sortons','le dîner.','Wir gehen nach dem Abendessen aus.'],['Elle travaille','le déjeuner.','Sie arbeitet nach dem Mittagessen.'],['Je rentre','le film.','Ich komme nach dem Film nach Hause.'],['Ils se reposent','le sport.','Sie ruhen sich nach dem Sport aus.']]);
 D(3,'Uhrzeit','à','Für exakte Uhrzeiten verwendet man à.','ort',['à','en','dans','depuis'],[
  ['Nous partons','huit heures.','Wir fahren um acht Uhr los.'],['Le train arrive','midi.','Der Zug kommt um zwölf Uhr mittags an.'],['Le film commence','vingt heures.','Der Film beginnt um zwanzig Uhr.'],['Elle se lève','sept heures.','Sie steht um sieben Uhr auf.']]);
 D(3,'Ungefähr','vers','vers bedeutet hier „gegen / ungefähr“ (Uhrzeit).','ort',['vers','depuis','pendant','dans'],[
  ['Je viens','huit heures.','Ich komme gegen acht Uhr.'],['Nous arrivons','midi.','Wir kommen ungefähr gegen Mittag.'],['Le magasin ferme','dix-neuf heures.','Das Geschäft schließt gegen neunzehn Uhr.']]);
 D(3,'Endpunkt',"jusqu’à",'jusqu’à bezeichnet eine zeitliche Grenze: „bis“.','ort',["jusqu’à",'depuis','pendant','après'],[
  ['Je travaille','midi.','Ich arbeite bis Mittag.'],['Nous restons ici','demain.','Wir bleiben bis morgen hier.'],['Il dort','neuf heures.','Er schläft bis neun Uhr.']]);
 // 4 – gängige Verb-Präposition-Verbindungen; keine absichtlich doppeldeutigen Konstruktionen.
 D(4,'Verbverbindung','à','penser à = an jemanden / etwas denken.','verb',['à','de','pour','sur'],[
  ['Je pense','ma famille.','Ich denke an meine Familie.'],['Elle pense','ses vacances.','Sie denkt an ihren Urlaub.'],['Nous pensons','notre voyage.','Wir denken an unsere Reise.'],['Il pense','son examen.','Er denkt an seine Prüfung.']]);
 D(4,'Verbverbindung','de','parler de = über etwas sprechen.','verb',['de','à','avec','pour'],[
  ['Nous parlons','notre voyage.','Wir sprechen über unsere Reise.'],['Elle parle','son travail.','Sie spricht über ihre Arbeit.'],['Je parle','ce livre.','Ich spreche über dieses Buch.'],['Ils parlent','la météo.','Sie sprechen über das Wetter.']]);
 D(4,'Verbverbindung','à','parler à = jemanden ansprechen / mit jemandem sprechen.','verb',['à','de','pour','sur'],[
  ['Je parle','Marie.','Ich spreche mit Marie.'],['Nous parlons','notre professeur.','Wir sprechen mit unserem Lehrer.'],['Elle parle','Paul.','Sie spricht mit Paul.']]);
 D(4,'Verbverbindung','à','répondre à = auf eine Frage / jemandem antworten.','verb',['à','de','pour','avec'],[
  ['Je réponds','la question.','Ich antworte auf die Frage.'],['Elle répond','son frère.','Sie antwortet ihrem Bruder.'],['Nous répondons','ce message.','Wir antworten auf diese Nachricht.']]);
 D(4,'Verbverbindung','de','avoir besoin de = brauchen.','verb',['de','à','pour','en'],[
  ['J’ai besoin','repos.','Ich brauche Ruhe.'],['Nous avons besoin','temps.','Wir brauchen Zeit.'],['Elle a besoin','son ordinateur.','Sie braucht ihren Computer.'],['Il a besoin','conseils.','Er braucht Ratschläge.']]);
 D(4,'Verbverbindung','de','avoir envie de = Lust haben auf / etwas tun wollen.','verb',['de','à','pour','avec'],[
  ['J’ai envie','voyager.','Ich habe Lust zu reisen.'],['Elle a envie','danser.','Sie hat Lust zu tanzen.'],['Nous avons envie','sortir.','Wir haben Lust auszugehen.'],['Ils ont envie','dormir.','Sie möchten schlafen.']]);
 D(4,'Verbverbindung','de','rêver de = von etwas träumen.','verb',['de','à','en','pour'],[
  ['Je rêve','vacances.','Ich träume von Urlaub.'],['Elle rêve','son enfance.','Sie träumt von ihrer Kindheit.'],['Nous rêvons','ce voyage.','Wir träumen von dieser Reise.']]);
 D(4,'Verbverbindung','de','essayer de + Infinitiv = versuchen, etwas zu tun.','verb',['de','à','pour','en'],[
  ['J’essaie','comprendre.','Ich versuche zu verstehen.'],['Elle essaie','dormir.','Sie versucht zu schlafen.'],['Nous essayons','parler français.','Wir versuchen Französisch zu sprechen.']]);
 D(4,'Verbverbindung','à','réussir à + Infinitiv = schaffen, etwas zu tun.','verb2',['à','de','en','pour'],[
  ['Je réussis','ouvrir la porte.','Ich schaffe es, die Tür zu öffnen.'],['Elle a réussi','terminer son travail.','Sie hat es geschafft, ihre Arbeit zu beenden.'],['Nous avons réussi','comprendre le texte.','Wir haben es geschafft, den Text zu verstehen.']]);
 D(4,'Verbverbindung','à','apprendre à + Infinitiv = lernen, etwas zu tun.','verb',['à','de','pour','en'],[
  ['J’apprends','nager.','Ich lerne schwimmen.'],['Elle apprend','conduire.','Sie lernt Auto fahren.'],['Nous apprenons','cuisiner.','Wir lernen kochen.']]);
 D(4,'Verbverbindung','de','arrêter de + Infinitiv = aufhören, etwas zu tun.','verb',['de','à','pour','en'],[
  ['Il arrête','fumer.','Er hört auf zu rauchen.'],['Nous arrêtons','parler.','Wir hören auf zu sprechen.'],['Elle a arrêté','travailler.','Sie hat aufgehört zu arbeiten.']]);
 D(4,'Verbverbindung','à','participer à = an etwas teilnehmen.','verb',['à','de','pour','dans'],[
  ['Je participe','la réunion.','Ich nehme an der Besprechung teil.'],['Nous participons','un cours.','Wir nehmen an einem Kurs teil.'],['Elle participe','ce projet.','Sie beteiligt sich an diesem Projekt.']]);
 D(4,'Verbverbindung','à','s’intéresser à = sich für etwas interessieren.','verb',['à','de','pour','sur'],[
  ['Je m’intéresse','la musique.','Ich interessiere mich für Musik.'],['Elle s’intéresse','l’histoire.','Sie interessiert sich für Geschichte.'],['Nous nous intéressons','ce film.','Wir interessieren uns für diesen Film.']]);
 D(4,'Verbverbindung','de','se souvenir de = sich an etwas erinnern.','verb',['de','à','pour','sur'],[
  ['Je me souviens','cette soirée.','Ich erinnere mich an diesen Abend.'],['Elle se souvient','son école.','Sie erinnert sich an ihre Schule.'],['Nous nous souvenons','ce restaurant.','Wir erinnern uns an dieses Restaurant.']]);
 D(4,'Verbverbindung','de','décider de + Infinitiv = beschließen, etwas zu tun.','verb',['de','à','pour','en'],[
  ['Je décide','rester.','Ich beschließe zu bleiben.'],['Ils ont décidé','partir.','Sie haben beschlossen wegzufahren.'],['Nous décidons','commencer.','Wir beschließen anzufangen.']]);
 D(4,'Verbverbindung','sur','compter sur = auf jemanden zählen.','verb',['sur','à','de','en'],[
  ['Je compte','toi.','Ich zähle auf dich.'],['Elle compte','ses amis.','Sie zählt auf ihre Freunde.'],['Nous comptons','votre aide.','Wir zählen auf Ihre Hilfe.']]);
 D(4,'Verbverbindung','de','dépendre de = von etwas abhängen.','verb',['de','à','pour','sur'],[
  ['Cela dépend','la météo.','Das hängt vom Wetter ab.'],['Tout dépend','ton choix.','Alles hängt von deiner Wahl ab.'],['La réponse dépend','la question.','Die Antwort hängt von der Frage ab.']]);
 D(4,'Verbverbindung','de','être fier de = stolz sein auf.','verb',['de','à','sur','pour'],[
  ['Je suis fier','toi.','Ich bin stolz auf dich.'],['Elle est fière','son équipe.','Sie ist stolz auf ihre Mannschaft.'],['Nous sommes fiers','notre travail.','Wir sind stolz auf unsere Arbeit.']]);
 D(4,'Verbverbindung','à','être prêt à = bereit sein zu.','verb',['à','de','pour','dans'],[
  ['Je suis prêt','partir.','Ich bin bereit aufzubrechen.'],['Elle est prête','commencer.','Sie ist bereit anzufangen.'],['Nous sommes prêts','répondre.','Wir sind bereit zu antworten.']]);
 // 5 – Alltagstransfer: bewusst unterschiedliche Satzbedeutungen.
 D(5,'Person oder Ort','chez','chez betont eine Person bzw. deren Praxis oder Geschäft.','chez',['chez','au','à la','dans'],[
  ['Nous allons','le dentiste.','Wir gehen zum Zahnarzt.'],['Je prends rendez-vous','le médecin.','Ich vereinbare einen Termin beim Arzt.'],['Elle passe la soirée','ses grands-parents.','Sie verbringt den Abend bei ihren Großeltern.'],['Nous allons','Paul.','Wir gehen zu Paul nach Hause.']]);
 D(5,'Person oder Ort','à la','à la bezeichnet hier einen femininen Ort.','chez',['à la','chez','au','pour'],[
  ['Elle se rend','clinique.','Sie fährt zur Klinik.'],['Je vais','boulangerie.','Ich gehe zur Bäckerei.'],['Nous allons','piscine.','Wir gehen ins Schwimmbad.']]);
 D(5,'Person oder Ort','au','au bezeichnet einen maskulinen Ort.','chez',['au','chez','à la','aux'],[
  ['Je vais','garage.','Ich gehe in die Autowerkstatt.'],['Elle va','théâtre.','Sie geht ins Theater.'],['Nous sommes','musée.','Wir sind im Museum.']]);
 D(5,'Bedeutung','pour','pour = für (Empfänger / Zweck).','ort',['pour','par','avec','sans'],[
  ['Cette place est','vous.','Dieser Platz ist für Sie.'],['J’ai acheté des fleurs','ma mère.','Ich habe Blumen für meine Mutter gekauft.'],['Je garde ce billet','toi.','Ich bewahre diese Eintrittskarte für dich auf.']]);
 D(5,'Bedeutung','par','par benennt bei Passivsätzen den Handelnden.','ort',['par','pour','avec','chez'],[
  ['Ce tableau a été peint','Marie.','Dieses Bild wurde von Marie gemalt.'],['La lettre a été écrite','Paul.','Der Brief wurde von Paul geschrieben.'],['Ce livre a été traduit','une spécialiste.','Dieses Buch wurde von einer Spezialistin übersetzt.']]);
 D(5,'Begründung','grâce à','grâce à = dank (günstiger Anlass).','ort',['grâce à','à cause de','malgré','sans'],[
  ['Nous avons réussi','ton aide.','Dank deiner Hilfe haben wir es geschafft.'],['Elle a trouvé le chemin','la carte.','Dank der Karte hat sie den Weg gefunden.'],['Le projet avance','votre travail.','Dank Ihrer Arbeit kommt das Projekt voran.']]);
 D(5,'Begründung','à cause de','à cause de = wegen (hier negativ).','ort',['à cause de','grâce à','malgré','pour'],[
  ['Le train est en retard','la neige.','Der Zug hat wegen des Schnees Verspätung.'],['Nous restons à la maison','la pluie.','Wegen des Regens bleiben wir zu Hause.'],['Le match est annulé','la tempête.','Das Spiel fällt wegen des Sturms aus.']]);
 D(5,'Gegensatz','malgré','malgré = trotz.','ort',['malgré','à cause de','grâce à','pendant'],[
  ['Nous sortons','la pluie.','Wir gehen trotz des Regens raus.'],['Elle continue','la fatigue.','Sie macht trotz der Müdigkeit weiter.'],['Il sourit','la douleur.','Er lächelt trotz der Schmerzen.']]);
 D(5,'Räumlich','au-dessus de','au-dessus de = oberhalb (ohne Kontakt).','ort',['au-dessus de','sur','sous','dans'],[
  ['La lampe est suspendue','la table.','Die Lampe hängt oberhalb des Tisches.'],['Un tableau est accroché','la cheminée.','Ein Bild hängt oberhalb des Kamins.'],['Le nuage passe','la montagne.','Die Wolke zieht oberhalb des Berges vorbei.']]);
 D(5,'Räumlich','en dessous de','en dessous de = unterhalb.','ort',['en dessous de','au-dessus de','sur','dans'],[
  ['Le garage est','l’appartement.','Die Garage liegt unterhalb der Wohnung.'],['Le sous-sol est','la cuisine.','Der Keller befindet sich unterhalb der Küche.'],['La cave est','la salle à manger.','Der Kellerraum liegt unter dem Esszimmer.']]);
 D(5,'Räumlich','à travers','à travers = durch / quer durch.','ort',['à travers','autour de','contre','vers'],[
  ['Nous marchons','la forêt.','Wir laufen durch den Wald.'],['La lumière passe','la fenêtre.','Das Licht fällt durch das Fenster.'],['Ils voyagent','le pays.','Sie reisen quer durch das Land.']]);
 D(5,'Räumlich','autour de','autour de = um ... herum.','ort',['autour de','à travers','devant','chez'],[
  ['Nous marchons','la maison.','Wir gehen um das Haus herum.'],['Les enfants jouent','la table.','Die Kinder spielen um den Tisch herum.'],['Ils font un tour','la place.','Sie gehen um den Platz herum.']]);
 D(5,'Richtung','vers','vers = in Richtung.','ort',['vers','depuis','dans','avec'],[
  ['Nous marchons','la plage.','Wir laufen in Richtung Strand.'],['Le bateau avance','le port.','Das Boot bewegt sich in Richtung Hafen.'],['Elle court','la sortie.','Sie läuft in Richtung Ausgang.']]);
 D(5,'Verhältnis','sans','sans = ohne.','ort',['sans','avec','pour','contre'],[
  ['Nous partons','bagages.','Wir fahren ohne Gepäck los.'],['Il prend son café','lait.','Er trinkt seinen Kaffee ohne Milch.'],['Elle voyage','ses parents.','Sie verreist ohne ihre Eltern.']]);
 window.PREP_QUESTIONS=a;
})();
