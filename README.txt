PRÉPOSITIONS – iPhone Lerntrainer (Version 1.0)
===============================================

INHALT
- index.html              Startseite
- style.css               Design
- data.js                 278 Übungssätze und Regeln
- app.js                  Lernlogik und lokale Speicherung
- sw.js                   Offline-Zwischenspeicherung
- manifest.webmanifest    iPhone-Startbildschirm / App-Manifest
- icons/                  Startbildschirm-Icons (180, 192, 512 px)

INSTALLATION AUF GITHUB PAGES
1. Erstelle ein neues GitHub-Repository, zum Beispiel "franzoesisch-praepositionen".
   Für GitHub Pages mit einem kostenlosen Account kann ein öffentliches Repository verwendet werden.
2. Lade ALLE DATEIEN UND DEN ORDNER "icons" aus diesem Paket in die oberste
   Verzeichnisebene des Repositorys hoch. Nicht nur die ZIP-Datei hochladen!
3. In GitHub: Settings > Pages > Build and deployment:
   Source = Deploy from a branch; Branch = main; Folder = /(root); Save.
4. Öffne nach dem Veröffentlichen die Adresse
   https://DEIN-BENUTZERNAME.github.io/franzoesisch-praepositionen/
   (falls dein Repository anders heißt, verwende dessen Namen).
5. Auf dem iPhone die Adresse in SAFARI öffnen. Dann Teilen > Zum Home-Bildschirm.
6. Die App mindestens einmal mit Internet öffnen und vollständig laden.
   Anschließend WLAN und mobile Daten testweise ausschalten und das Icon öffnen.

WICHTIG
- Kein Backend, keine Anmeldung, keine Analyse oder Tracking-Skripte.
- Lernfortschritt bleibt lokal auf dem jeweiligen Gerät (localStorage), ohne Cloud-Synchronisation.
- Vor Browser-Datenlöschung, Gerätewechsel oder Neuinstallation: Unter "Daten" eine
  JSON-Sicherung exportieren und aufbewahren. Über "Importieren" wieder einlesen.
- Safari und die installierte Home-Bildschirm-App können getrennte Speicherbereiche
  verwenden; sichere bei einem Wechsel den Fortschritt und importiere bei Bedarf.
- Aussprachefunktion nutzt die Sprachausgabe des Betriebssystems. Offline-Stimmen
  hängen von iOS-Konfiguration und installierten französischen Stimmen ab.
- Die Regel-Links führen zu externen Websites und funktionieren nur online.
- Regeltexte sind bewusst vereinfacht; Übungen sind eigens formuliert, nicht
  einzeln von einer Sprachinstitution gegenredigiert.
- Der Wiederholungsalgorithmus nutzt feste Intervalle (1/3/7/14/30/60/120 Tage)
  und nicht FSRS oder eine wissenschaftlich validierte Vorhersage für Einzelpersonen.
- Kein Push-Benachrichtigungssystem, kein täglicher automatischer Alarm.

TRAININGSARTEN
- Lernen: fällige und neue Karten, gemischt
- Wiederholen: fällige Karten
- Fehlertraining: zuvor mindestens einmal falsch gelöste Karten
- Wissenstest: zufällige Aufgaben ohne Regel-Hinweise

DIDAKTISCHES FUNDAMENT – PRIMÄRQUELLEN
- Spacing, Feedback, Testing in einer Vokabellern-Web-App: https://pubmed.ncbi.nlm.nih.gov/34867656/
- Variierende Kontexte bei wiederholtem Abruf (6 Experimente): https://pubmed.ncbi.nlm.nih.gov/39453748/
- Lernintervalle und wiederholtes Abrufen: https://pubmed.ncbi.nlm.nih.gov/21707204/

GRAMMATIKREFERENZEN
- OQLF / Banque de dépannage linguistique: https://vitrinelinguistique.oqlf.gouv.qc.ca/la-syntaxe/les-prepositions
- Präpositionen vor Ländernamen: https://vitrinelinguistique.oqlf.gouv.qc.ca/23897/la-syntaxe/les-prepositions/preposition-devant-un-nom/les-prepositions-devant-un-nom-de-pays
- Kontrahierte Artikel: https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26506951/determinant-contracte
- Aller à / chez: https://vitrinelinguistique.oqlf.gouv.qc.ca/22018/la-syntaxe/les-prepositions/preposition-apres-un-verbe/prepositions-a-employer-apres-le-verbe-aller
- Verkehrsmittel: https://vitrinelinguistique.oqlf.gouv.qc.ca/24306/la-syntaxe/les-prepositions/preposition-devant-un-nom/les-prepositions-introduisant-un-moyen-de-transport
- Depuis: https://vitrinelinguistique.oqlf.gouv.qc.ca/21188/la-syntaxe/les-prepositions/preposition-devant-un-nom/preposition-depuis
