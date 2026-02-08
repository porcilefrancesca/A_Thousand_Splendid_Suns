[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/7-MKnzKQ)
# P5-empty-project
This repository is the starting point of the assignments given in the course [Computergrafica per l'Information Design](https://www11.ceda.polimi.it/schedaincarico/schedaincarico/controller/scheda_pubblica/SchedaPublic.do?&evn_default=evento&c_classe=834257&lang=IT&__pj0=0&__pj1=9c10fe379e96db59d55d49b6b4252c5e).

# **A Thousand Splendid Suns**
di Ambrosi Arianna, Cucchetti Chiara, Dominante Syria, Mazzoleni Marta, Popolizio Giacinta, Porcile Francesca

## IL TEAM
Siamo sei studentesse del Politecnico di Milano.
Insieme, abbiamo sviluppato *A Thousand Splendid Suns*, un progetto di Information Design a cui ognuna di noi ha contribuito con le proprie competenze: 
- **Francesca e Syria** si sono occupate del design visivo e hanno sviluppato il codice HTML, CSS e JavaScript del sito web del progetto.  
- **Arianna e Marta** hanno gestito l'elaborazione dei dataset, la ricerca dei contenuti e lo sviluppo del concept.  
- **Giacinta e Chiara** sono state responsabili della creazione del codice p5.js, della visualizzazione globale e di quella individuale dei singoli soli, compresa la progettazione visiva.

## IL PROGETTO
*A Thousand Splendid Suns* è un progetto che esplora come opportunità e percezioni individuali vengano spesso plasmate da diversi fattori - quali ambiente, famiglia, società e cultura - alimentando le diseguaglianze e la discriminazione sistemica verso le donne.

Ispirato al romanzo di Khaled Hosseini *A Thousand Splendid Suns*, il progetto riflette le sfide universali che le donne affrontano nei diversi ambiti della vita quotidiana. Il romanzo racconta le vite di due donne afghane: due percorsi distinti, ma intrecciati dalla stessa lotta universale contro il controllo esercitato dalle aspettative sociali e familiari. Hosseini cattura questa dinamica dal punto di vista della forza e della resistenza femminile di fronte all’oppressione. Il titolo, ripreso dalla poesia del XVII secolo di Saib-e-Tabrizi, simboleggia tenacia, speranza e il valore intrinseco delle donne nella società.

*A Thousand Splendid Suns* utilizza una rappresentazione geografica per dar vita a questa narrazione. Ogni paese è rappresentato come un sole, la cui luminosità simboleggia i progressi in partecipazione economica, sicurezza e rappresentanza. I soli più luminosi indicano le zone in cui, secondo dati raccolti da testimonianze femminili, le donne vivono in condizioni migliori, mentre quelli più scuri rivelano ancora la presenza di barriere significative. I paesi con dati mancanti appaiono meno luminosi, indipendentemente dalla loro condizione effettiva: in questo modo si evidenziano le lacune nei dati, pur mostrando lo stato generale dei diritti delle donne. 

Il progetto adotta un sistema di visualizzazione a due livelli per rappresentare efficacemente i dati:
- una **visualizzazione globale** che mostra ogni paese come un punto organizzato geograficamente.
- una **visualizzazione individuale** in cui ogni sole diventa un glifo dettagliato con 14 raggi, ciascuno corrispondente a un parametro.

Questa metafora ha l'obbiettivo di trasformare dati astratti ed invisibili in un’immagine intuitiva e tangibile delle disparità e dei progressi globali percepiti da un punto di vista unicamente femminile.


## IL DATASET
Il dataset , tratto dall’OECD Gender, Institutions and Development Database ( https://data-explorer.oecd.org/vis?lc=en&pg=0&snb=1&vw=tb&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_GID%40DF_GID_2023&df[ag]=OECD.DEV.NPG&df[vs]=&pd=2023%2C2023&dq=OECD ) e da contributi del 2023 di SIGI, UNICEF, Nazioni Unite e Organizzazione Mondiale della Sanità, fornisce una panoramica globale delle condizioni femminili e la analizza su due aspetti:

- **realtà pratiche:** accesso a servizi finanziari, sicurezza e diritti.
- **percezioni culturali**: percezione femminile riguardo violenza di genere, uguaglianza e valore della donna nella società.

Questo dataset è stato rielaborato rispetto al dataset originale per fornire una panoramica globale e oggettiva sulla condizione femminile.
Il dataset si sviluppa su diverse colonne principali:
- **Country, Area, Continent**: specificano il paese, l'area geografica e il continente per supportare una visualizzazione globale e un analisi geografica del fenomeno.
- **Parameter**: descrive il parametro specifico tra i 14 scelti (es. 'Feeling of safety at night').
- **Age e Sex**: fascia d’età e sesso delle persone coinvolte nel parametro analizzato (focalizzato esclusivamente sulle donne).
- **Variable e SIGI Categories**: indicano la variabile specifica e la categoria generale del parametro (es. 'Access to financial assets').
- **Value**: specifica il valore del parametro come percentuale positiva.
- **Average**: rappresenta la media in % su 14 parametri scelti per ogni paese, utile per una visione globale.
- **Latitude e Longitude**: specificano le coordinate geografiche dei paesi, fondamentali per una visualizzazione globale realistica.

Modifiche apportate rispetto al dataset originale:

- **Colonne Area, Continent, Latitude e Longitude**: aggiunte per una visualizzazione geografica a livelli e più chiara.
- **Selezione dei parametri**: Sono stati analizzati 14 dei 21 parametri originari, eliminando quelli legati a percezioni o scelte femminili personali, per concentrarsi su pratiche e condizioni esterne.
- **Percentuali convertite**: i valori negativi originali sono stati convertiti in percentuali positive.
- **Colonna Average**: la media in % dei 14 parametri di ogni paese, utile per la visualizzazione globale.
- **Focalizzazione sui pareri femminili**: eliminazione di eventuali opinioni maschili (nella colonna SEX) presenti nel dataset originale per favorire un esercizio di autoconsapevolezza delle donne stesse.

