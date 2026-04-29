/**
 * DJ Academy - Contenu Pédagogique Progressif par Slides
 * Structure: Chaque niveau = progression en slides (3-5 slides)
 */

import { level4Module, level5Module } from "./courses-progressive-extended";

export type UserLevel = "beginner" | "intermediate" | "advanced";

export interface Slide {
  slideNumber: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  videoDescription: string;
  content: string;
  keyTakeaway: string;
  exercise: {
    title: string;
    description: string;
    steps: string[];
    estimatedTime: string;
  };
  tips: string[];
}

export interface CourseModule {
  level: number;
  title: string;
  description: string;
  userLevels: UserLevel[];
  totalSlides: number;
  estimatedDuration: string;
  slides: Slide[];
}

/**
 * NIVEAU 1: LES BASES DU DJING (Débutant)
 */
export const level1Module: CourseModule = {
  level: 1,
  title: "Les Bases du DJing : Setup, Rekordbox & synchronisation",
  description:
    "Configurer ta DDJ-FLX3 / FLX4 avec Rekordbox, puis maîtriser BPM, tempo et premières transitions",
  userLevels: ["beginner", "intermediate", "advanced"],
  totalSlides: 5,
  estimatedDuration: "40 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Rekordbox + DDJ-FLX3 / FLX4 : la bonne base",
      subtitle: "Modes du logiciel, analyse des morceaux, lecture d'une waveform",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Parcours Performance (et repères visuels) dans Rekordbox — idéal avant de brancher la table. Active les sous-titres YouTube si besoin.",
      content: `Ce parcours Mixy vise surtout les DJs sur **Pioneer DJ avec Rekordbox**, en particulier **DDJ-FLX4** et **DDJ-FLX3** (même logique : 2 decks, section mixer au centre, pads sous les jogs).

**Deux grands modes dans Rekordbox**
- **Export** : tu prépares la musique (playlists, grilles de BPM, mémoire de points cue), tu peux exporter vers une clé USB pour des lecteurs CDJ/XDJ en boîte.
- **Performance** : c'est le **mode DJ** avec la table branchée — deux pistes visibles, waveforms, platines A/B.

**Avant de mixer**
- Importe tes morceaux dans la **Collection**, crée une **playlist d'entraînement** avec des titres au BPM proche (ex. 124–128).
- Lance **l'analyse** (BPM / grille) pour que Rekordbox affiche le tempo et les repères sur la waveform.
- Vérifie que la **grid** (lignes sur les temps forts) suit bien le kick ; corrige si une piste a été mal analysée.

**Côté matériel (vue d'ensemble)**
- **Decks gauche / droite** : chargent chacun une piste, **jog** pour nudge ou scratch léger selon tes réglages.
- **Section mixer** : volumes par canal (**channel faders**), **crossfader**, **EQ 3 bandes**, filtres selon modèle, **section effets** (Smart CFX sur FLX3 / Merge FX sur FLX4 selon firmware — garde les idées simples au début : une couleur de son à la fois).
- **Pads** : **Hot Cues** pour marquer intros, drops, ponts ; tu gagneras un temps énorme sur les transitions.

**Ressources utiles (manuel officiel & visuels)**
- DDJ-FLX4 (son, branchements, panneau arrière) : https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx4/black/overview/
- DDJ-FLX3 : https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx3/black/overview/
- Télécharge le **mode d'emploi PDF** depuis la fiche « Support » du modèle : repère la page « Connections » et « Part names » pour mémoriser boutons + voyants.

**Théorie + pratique**
- Théorie courte ici + **vidéo ci-dessus** pour l'écran ; en pratique répète : importer → analyser → charger deck A/B → lire la grille au casque.`,
      keyTakeaway:
        "Export pour préparer, Performance pour jouer. Analyse toujours tes morceaux et vérifie la grille avant de te fier au tempo à l'écran.",
      exercise: {
        title: "Préparer 5 morceaux propres dans Rekordbox",
        description: "Même sans table branchée, c'est l'exercice n°1 des DJs Rekordbox",
        steps: [
          "Installe Rekordbox (dernière version stable) et ouvre le mode Performance en essai.",
          "Crée une playlist « Entraînement Mixy » avec 5 titres du même style.",
          "Sélectionne-les → clic droit → analyse (tempo / grille si proposé).",
          "Ouvre un morceau, zoome la waveform et vérifie que chaque kick tombe sur une ligne de grille.",
          "Pose 4 Hot Cues : intro, avant refrain, drop, outro (raccourcis affichés dans Rekordbox selon ton clavier).",
          "Charge le même titre sur les decks A et B : écoute A au casque, B en silence — entends-tu le beat identique des deux côtés ?",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "FLX4 peut ouvrir deux ports USB-C : lis la petite icône près de chaque port sur TON manuel (données vs charge).",
        "Si tu mixes du streaming, vérifie les conditions d'utilisation et la stabilité réseau.",
        "Garde un backup USB exporté si tu joues hors de chez toi.",
      ],
    },
    {
      slideNumber: 2,
      title: "Brancher la table : USB, Master, casque",
      subtitle: "FLX3 / FLX4 — enceintes actives, gain propre, écoute DJ",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Tour complet débutant sur la DDJ-FLX4 : vue matérielle, faders, branchements — en anglais mais très visuel ; active les sous-titres auto.",
      content: `**Chaîne audio simple (répète ce schéma mentalement)**
Ordinateur → **USB** → contrôleur → **MASTER OUT (RCA ou XLR selon modèle)** → enceintes **actives** ou table de son / ampli → enceintes passives.

**Étape par étape (sécurité + propre)**
- Mets tous les faders et le **master** à zéro avant d'allumer les enceintes.
- Branche **USB** entre PC/Mac et contrôleur (certains modèles ont deux ports : repère sur le manuel lequel est **données / alimentation**).
- **Sortie Master** : câble fourni souvent en **RCA** → entrée **LINE** des enceintes monitoring (pas « Phono »). Vis **rouge/blanc** cohérentes.
- **Casque** sur la prise **PHONES** 6,35 mm : tu pré-écoutes le deck que tu prépares avec le **cue** (écoute DJ) sans l'envoyer tout de suite dans la salle.

**Réglages de base avant le son fort**
- **Trim / Gain** par voie : monte jusqu'à voir le signal dans la zone **verte / orange** sans saturer en permanence dans le rouge.
- **EQ au centre** (12h) pour commencer — tu les bougeras pour les transitions (niveau 2).
- **Crossfader** : pour tes premiers exercices Mixy, laisse-le **au centre** et joue surtout des **channel faders** : c'est plus pédagogique.

**Si tu n'as pas de grosse sono**
- Des **enceintes monitoring** actives proches de toi suffisent pour t'entraîner ; baisse les basses si tu es en appart (voisins).

**Ressource visuelle complémentaire**
- Vidéo « allumer / USB » (très court) : https://www.youtube.com/watch?v=EIUd_xdBYGs

**Lien utile**
- Support Pioneer : https://support.pioneerdj.com (pilotes, firmware, manuels).`,
      keyTakeaway:
        "USB + Master vers une entrée ligne propre, casque sur PHONES pour préparer. Zéro saturation, trims calmes, puis tu montes le master.",
      exercise: {
        title: "Check-list branchement « sans grésillement »",
        description: "À refaire avant chaque session longue",
        steps: [
          "Table et PC éteints ou faders à zéro — branche les câbles Master.",
          "Branche le casque, allume la table puis le PC, ouvre Rekordbox Performance.",
          "Sur un seul deck, lance un morceau : vérifie le **VU-meter** et baisse le trim si tu touches le rouge en continu.",
          "Active le **cue** casque sur ce deck : tu dois l'entendre clairement sans que le master ne hurle.",
          "Notes sur un papier : « câble Master droit », « volume enceintes à -6 dB » pour te souvenir demain.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Note la position de ta prise Casque sur le manuel (bouton split cue / mix selon modèle).",
        "Un câble RCA trop long ou mal blindé peut ramasser du bruit : change de câble avant d'accuser Rekordbox.",
        "Firmware : une mise à jour peut corriger des bugs audio — fais-la tranquillement avant un live.",
      ],
    },
    {
      slideNumber: 3,
      title: "Le BPM: Le Coeur du Rythme",
      subtitle: "Pourquoi deux chansons ne sonnent pas toujours bien ensemble",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Tu vois le tempo affiché dans Rekordbox et la grille sur la waveform — utile pour relier oreille et écran.",
      content: `Imagine deux metronomes:
- Metronome 1: 120 clics par minute
- Metronome 2: 140 clics par minute
- Resultat: Chaos total

Le BPM (Beats Per Minute):
C'est simplement le nombre de battements par minute. C'est comme le pouls de la musique.

Exemples Reels:
- House Music: 120-130 BPM (c'est le groove regulier)
- Techno: 120-140 BPM (un peu plus rapide)
- Hip-Hop: 85-115 BPM (plus lent, plus groovy)
- Drum & Bass: 160-180 BPM (tres rapide!)

Le Secret du DJing:
Mettre deux chansons au MEME BPM = elles sonnent bien ensemble
Deux BPM differents = chaos

**Sur ta DDJ + Rekordbox**
- Le tempo affiché par deck (ex. 124,0) doit correspondre à ce que tu entends après analyse correcte.
- Les boutons **Sync** existent pour t'aider au début : apprends quand même à **sentir** le décalage au casque — c'est ce qui te sauve quand la grille est fausse ou en live sans écran.

C'est Tout Pour Maintenant:
Tu n'as pas besoin de comprendre la theorie musicale. Tu as juste besoin de comprendre que le BPM c'est le rythme, et que deux rythmes differents ne fonctionnent pas ensemble.`,
      keyTakeaway:
        "Le BPM c'est le rythme. Deux chansons au meme BPM sonnent bien ensemble.",
      exercise: {
        title: "Identifie le BPM en ecoutant",
        description: "Entraine-toi a sentir le BPM d'une chanson",
        steps: [
          "Choisis une chanson que tu aimes",
          "Ecoute-la et compte les battements: 1-2-3-4, 1-2-3-4...",
          "Compte pendant 15 secondes (environ 30-40 battements)",
          "Multiplie par 4 pour obtenir le BPM approximatif",
          "Utilise Shazam ou une app pour verifier",
          "Repete avec 5 chansons differentes",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Le BPM c'est juste un nombre - pas besoin de paniquer",
        "Tu peux sentir le BPM avec ton corps (danse!)",
        "Les chansons du meme genre ont souvent des BPM similaires",
      ],
    },
    {
      slideNumber: 4,
      title: "Le Pitch: Ajuster la Vitesse",
      subtitle: "Comment changer le BPM d'une chanson sans la deformer",
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
      videoDescription:
        "Exemple sur DDJ-FLX4 : tempo / beatmatch — relie ce que tu fais au doigt avec le BPM affiché.",
      content: `Le Probleme:
Tu as deux chansons que tu aimes, mais elles n'ont pas le meme BPM.
- Chanson A: 120 BPM
- Chanson B: 130 BPM
- Resultat: Elles ne sonnent pas bien ensemble

La Solution: Le Pitch
Le Pitch c'est un curseur qui change la vitesse de la chanson.
- Augmente le Pitch -> la chanson devient plus rapide
- Baisse le Pitch -> la chanson devient plus lente

Comment Ca Marche:
Imagine un disque vinyle:
- Si tu le fais tourner plus vite -> la musique est plus rapide
- Si tu le fais tourner plus lentement -> la musique est plus lente

Le Pitch digital fonctionne exactement comme ca.

Exemple Pratique:
- Chanson A: 120 BPM (tu la laisses a 120)
- Chanson B: 130 BPM (tu la ralentis a 120 avec le Pitch)
- Resultat: Les deux jouent a 120 BPM = parfait!

Important:
- Le Pitch change aussi la tonalite (la chanson sonne plus aigue ou plus grave)
- C'est normal et ca fait partie du DJing
- Les DJs professionnels acceptent ce changement

Limitation:
Tu ne peux pas changer le BPM de plus de +/- 10% sans que ca sonne bizarre.
- Si une chanson est a 100 BPM, tu peux la mettre jusqu'a 110 BPM max
- Au-dela, ca sonne deforme

**Hardware FLX3 / FLX4**
- Le **fader de tempo** (pitch) est en général au-dessus ou à côté du jog : vérifie sur ton manuel la plage **±%** et l'interrupteur « tempo range » si présent.
- **Key Lock / Master Tempo** (si activé dans Rekordbox) : change le tempo sans trop bouger la hauteur — pratique pour rester proche du BPM cible sans casser la voix.`,
      keyTakeaway:
        "Le Pitch te permet d'ajuster la vitesse d'une chanson pour qu'elle corresponde a une autre.",
      exercise: {
        title: "Pratique l'ajustement du Pitch",
        description: "Apprends a sentir comment le Pitch change le son",
        steps: [
          "Choisis une chanson que tu connais bien",
          "Imagine-toi la ralentir de 5 BPM - comment ca sonne?",
          "Imagine-toi l'accelerer de 5 BPM - comment ca sonne?",
          "Imagine-toi l'accelerer de 10 BPM - ca commence a sonner bizarre?",
          "Comprends maintenant pourquoi les DJs ne changent pas trop le Pitch",
        ],
        estimatedTime: "3 minutes",
      },
      tips: [
        "Les meilleurs DJs changent le Pitch tres legerement",
        "Ca demande de la pratique pour bien sentir",
        "Commence par des changements extremes, puis affine",
      ],
    },
    {
      slideNumber: 5,
      title: "La Synchronisation en Action",
      subtitle: "Mets deux chansons ensemble pour la premiere fois",
      videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
      videoDescription:
        "Transition type « drop mix » sur FLX4 : inspiration pour enchaîner proprement une fois le tempo aligné.",
      content: `Mise en Situation Reelle:
Tu es en train de mixer. Voici ce qui se passe:

Etape 1: Preparation (30 secondes avant)
- Tu as la Chanson A qui joue (120 BPM)
- Tu veux passer a la Chanson B (130 BPM)
- Tu mets la Chanson B dans ton autre platine
- Tu ajustes le Pitch a 120 BPM (pour qu'elle corresponde)

Etape 2: Ecoute (10 secondes)
- Tu ecoutes les deux chansons ensemble dans tes ecouteurs
- Tu verifies que les rythmes correspondent
- Si c'est parfait, tu passes a l'etape 3
- Si ce n'est pas parfait, tu ajustes le Pitch un peu plus

Etape 3: Le Mix (5 secondes)
- Tu augmentes le volume de la Chanson B
- Tu diminues le volume de la Chanson A
- Les deux jouent ensemble brievement
- La foule ne realise meme pas que tu as change de chanson

Etape 4: Le Coup (1 seconde)
- Tu coupes completement la Chanson A
- La Chanson B prend le controle
- C'est fait!

Pourquoi C'est Important:
- C'est la base du DJing
- Si tu maitrises ca, tu peux mixer n'importe quoi
- C'est ce qui rend un DJ professionnel

La Realite:
- Ca parait complique sur le papier
- En pratique, ca devient naturel apres quelques essais
- Les meilleurs DJs le font sans y penser`,
      keyTakeaway:
        "La synchronisation c'est: identifier le BPM, ajuster le Pitch, ecouter, puis mixer. C'est tout.",
      exercise: {
        title: "Pratique la synchronisation mentale",
        description: "Avant de toucher a un equipement, visualise le processus",
        steps: [
          "Choisis deux chansons: une a 120 BPM, une a 130 BPM",
          "Ecoute la premiere jusqu'a 30 secondes avant la fin",
          "Imagine que tu mets la deuxieme dans l'autre platine",
          "Imagine que tu ajustes le Pitch a 120 BPM",
          "Imagine que tu ecoutes les deux ensemble",
          "Imagine que tu les mixes (volume de l'une monte, l'autre baisse)",
          "Imagine que tu coupes la premiere",
          "Repete jusqu'a ce que ca te semble naturel",
        ],
        estimatedTime: "7 minutes",
      },
      tips: [
        "La synchronisation c'est 80% du DJing",
        "Les 20% restants c'est la creativite et la lecture de foule",
        "Maitrise d'abord la synchronisation, puis explore le reste",
      ],
    },
  ],
};

/**
 * NIVEAU 2: LES EQUALISEURS (Débutant+)
 */
export const level2Module: CourseModule = {
  level: 2,
  title: "Les Equaliseurs (EQ): Le Secret des Transitions Fluides",
  description: "Comment faire sonner deux chansons ensemble sans que ce soit horrible",
  userLevels: ["beginner", "intermediate", "advanced"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 Bandes de Frequences",
      subtitle: "Comprends ce que tu entends vraiment",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Decouvre les trois parties d'une chanson que tu peux controler avec l'EQ.",
      content: `**EQ sur ta FLX / Rekordbox**
- Chaque voie du mélangeur a 3 potentiomètres **High / Mid / Low** (parfois **Trim** au sommet de la voie pour le gain d'entrée).
- Dans Rekordbox Performance, les mêmes bandes existent à l'écran : bouger un **knob physique** ou le curseur logiciel, c'est le même principe.

Imagine une chanson comme un sandwich a 3 etages:

Etage 1: Les Basses (Low) - Le Fondement
- Frequences: 20-250 Hz
- C'est ce que tu SENS dans ton ventre
- C'est le "boom boom boom" du kick
- Exemple: Le battement du coeur de la musique

Etage 2: Les Mediums (Mid) - Le Coeur
- Frequences: 250-4000 Hz
- C'est ce que tu ENTENDS clairement
- C'est la voix, les melodies, les synthes
- Exemple: La melodie principale

Etage 3: Les Aigus (High) - L'Energie
- Frequences: 4000+ Hz
- C'est ce qui cree de la CLARTE et de l'ENERGIE
- C'est les cymbales, les hi-hats, les effets
- Exemple: Le "tss tss tss" des cymbales

Pourquoi C'est Important:
- Chaque chanson a un equilibre different
- Certaines ont beaucoup de basses, d'autres non
- L'EQ te permet d'ajuster cet equilibre
- Resultat: deux chansons qui sonnent bien ensemble`,
      keyTakeaway:
        "Chaque chanson a 3 etages: Basses (boom), Mediums (melodies), Aigus (energie). L'EQ te permet de les controler.",
      exercise: {
        title: "Ecoute les 3 bandes separement",
        description: "Entraine-toi a reconnaitre chaque bande",
        steps: [
          "Ecoute une chanson normale",
          "Imagine-toi enlever toutes les basses - ca sonne comment? (leger, creux)",
          "Imagine-toi enlever tous les mediums - ca sonne comment? (bizarre, pas de melodie)",
          "Imagine-toi enlever tous les aigus - ca sonne comment? (lourd, sans energie)",
          "Maintenant ecoute la chanson complete - tu entends mieux chaque partie",
          "Repete avec 3 chansons differentes",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Les basses c'est ce que tu SENS",
        "Les mediums c'est ce que tu ENTENDS",
        "Les aigus c'est ce qui cree de la CLARTE",
      ],
    },
    {
      slideNumber: 2,
      title: "Comment Utiliser l'EQ pour Mixer",
      subtitle: "La technique de base pour des transitions fluides",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Vois comment un DJ utilise l'EQ pour melanger deux chansons sans saturation.",
      content: `Le Probleme:
Tu as deux chansons avec beaucoup de basses. Si tu les mixes directement:
- Trop de basses = saturation
- Ca sonne lourd et desagrable
- La foule n'aime pas

La Solution: L'EQ

Technique de Base (La Regle d'Or):

1. Avant le Mix (30 secondes avant)
   - Baisse les BASSES de la chanson qui arrive
   - Augmente les AIGUS pour creer de la tension
   - Resultat: la chanson qui arrive sonne legere et claire

2. Pendant le Mix (5-10 secondes)
   - Augmente le volume de la chanson qui arrive
   - Diminue le volume de la chanson actuelle
   - Les deux jouent ensemble
   - Resultat: un melange fluide

3. Apres le Mix (1-2 secondes)
   - Coupe la chanson actuelle
   - Augmente progressivement les basses de la nouvelle chanson
   - Resultat: la nouvelle chanson prend le controle avec toute son energie

Pourquoi Ca Marche:
- Les basses de deux chansons ensemble = saturation
- En baissant les basses de l'une, tu crees de l'espace
- Ca rend la transition fluide et professionnelle

Important:
- C'est une technique, pas une regle stricte
- Les meilleurs DJs l'adaptent a chaque situation
- Ca demande de la pratique pour bien sentir`,
      keyTakeaway:
        "Baisse les basses de la chanson qui arrive, augmente les aigus. Ca cree une transition fluide.",
      exercise: {
        title: "Pratique l'EQ mentalement",
        description: "Visualise comment l'EQ change le son",
        steps: [
          "Choisis deux chansons que tu aimes",
          "Ecoute la premiere jusqu'a 30 secondes avant la fin",
          "Imagine que tu mets la deuxieme dans l'autre platine",
          "Imagine que tu baisses les basses de la deuxieme (elle sonne legere)",
          "Imagine que tu augmentes les aigus (elle sonne claire)",
          "Imagine que tu les mixes (les deux jouent ensemble)",
          "Imagine que tu augmentes les basses de la deuxieme (elle reprend son energie)",
          "Repete jusqu'a ce que ca te semble naturel",
        ],
        estimatedTime: "7 minutes",
      },
      tips: [
        "L'EQ c'est pas pour detruire le son, c'est pour l'ameliorer",
        "Les changements subtils sont plus professionnels que les changements extremes",
        "Ecoute des DJs professionnels pour comprendre le timing",
      ],
    },
    {
      slideNumber: 3,
      title: "L'EQ en Action: Cas Reels",
      subtitle: "Comment les DJs professionnels utilisent l'EQ",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Regarde comment les meilleurs DJs utilisent l'EQ pour creer des transitions parfaites.",
      content: `Cas Reel 1: Deux Chansons House Lourdes

Situation:
- Chanson A: House lourde avec beaucoup de basses (120 BPM)
- Chanson B: House lourde avec beaucoup de basses (120 BPM)
- Probleme: Si tu les mixes directement, c'est une saturation totale

Solution du DJ Pro:
1. Baisse les basses de la Chanson B a 0%
2. Augmente les aigus de la Chanson B a 100%
3. Melange les deux (la Chanson B sonne legere et claire)
4. Augmente progressivement les basses de la Chanson B
5. Resultat: une transition fluide et professionnelle

Cas Reel 2: Transition d'une Chanson Lourde a une Chanson Legere

Situation:
- Chanson A: House lourde (beaucoup de basses)
- Chanson B: Deep House legere (peu de basses)
- Probleme: Contraste trop grand

Solution du DJ Pro:
1. Augmente les basses de la Chanson B legerement
2. Baisse les aigus de la Chanson A
3. Melange les deux (elles se rencontrent au milieu)
4. Resultat: une transition progressive et naturelle

Cas Reel 3: Creer de la Tension

Situation:
- Tu veux creer un moment de tension avant un pic
- Tu veux que la foule sente que quelque chose arrive

Solution du DJ Pro:
1. Baisse progressivement les basses de la chanson actuelle
2. Augmente progressivement les aigus
3. La foule sent la tension (pas de basses = pas de groove)
4. Puis tu laches une nouvelle chanson avec beaucoup de basses
5. La foule explose!

Lecon Importante:
- L'EQ c'est pas une technique rigide
- C'est un outil pour creer des emotions
- Les meilleurs DJs l'utilisent intuitivement
- Ca demande de la pratique et de l'ecoute`,
      keyTakeaway:
        "L'EQ c'est un outil pour creer des transitions fluides et des moments de tension. Utilise-le intuitivement.",
      exercise: {
        title: "Analyse des transitions de DJs professionnels",
        description: "Apprends en regardant comment les pros font",
        steps: [
          "Regarde 3 videos de DJs en club",
          "Observe comment ils utilisent l'EQ",
          "Note les moments ou ils baissent les basses",
          "Note les moments ou ils augmentent les aigus",
          "Essaie de predire ce qu'ils vont faire",
          "Regarde si tu avais raison",
          "Repete jusqu'a ce que tu reconnaisses les patterns",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "L'EQ c'est l'outil le plus puissant d'un DJ",
        "Les meilleurs DJs sont subtils avec l'EQ",
        "Moins c'est plus",
      ],
    },
  ],
};

/**
 * NIVEAU 3: LES TRANSITIONS BASIQUES (Débutant+)
 */
export const level3Module: CourseModule = {
  level: 3,
  title: "Les Transitions Basiques: Passer d'une Chanson a l'Autre",
  description: "Comment passer d'une chanson a l'autre sans que ca soit bizarre",
  userLevels: ["beginner", "intermediate", "advanced"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 Phases d'une Transition",
      subtitle: "Comprends la structure d'une bonne transition",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Decouvre les 3 phases que tu dois maitriser pour une transition parfaite.",
      content: `Une Bonne Transition c'est Invisible

Les gens ne realisent meme pas que tu as change de chanson. C'est ca, l'art du DJing.

Les 3 Phases:

Phase 1: La Preparation (10-15 secondes avant)
- Objectif: Preparer la foule pour le changement
- Actions:
  - Baisse les basses de la chanson actuelle
  - Augmente les aigus (cree de la tension)
  - La foule sent que quelque chose arrive
- Ressenti: Tension, attente, suspense

Phase 2: Le Mix (5-10 secondes)
- Objectif: Melanger les deux chansons
- Actions:
  - Augmente le volume de la nouvelle chanson
  - Diminue le volume de l'ancienne
  - Les deux jouent ensemble brievement
  - Utilise l'EQ pour eviter la saturation
- Ressenti: Transition fluide, progression naturelle

Phase 3: Le Coup (1-2 secondes)
- Objectif: Prendre le controle avec la nouvelle chanson
- Actions:
  - Coupe completement l'ancienne chanson
  - La nouvelle chanson prend le controle
  - Augmente les basses progressivement
- Ressenti: Liberation, energie nouvelle, excitation

Pourquoi C'est Important:
- C'est ce qui rend un DJ professionnel
- Ca maintient l'energie sur la piste
- Ca cree de la tension et du plaisir
- C'est la difference entre un DJ et un jukebox`,
      keyTakeaway:
        "Une transition a 3 phases: Preparation (tension), Mix (transition), Coup (liberation).",
      exercise: {
        title: "Identifie les 3 phases en ecoutant",
        description: "Apprends a reconnaitre les phases dans une transition reelle",
        steps: [
          "Regarde une video d'un DJ en club",
          "Ecoute attentivement une transition",
          "Essaie d'identifier la Phase 1 (preparation)",
          "Essaie d'identifier la Phase 2 (mix)",
          "Essaie d'identifier la Phase 3 (coup)",
          "Repete avec 3 transitions differentes",
          "Note les durees approximatives de chaque phase",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Les phases ne sont pas rigides - adapte-toi a la chanson",
        "Parfois la preparation dure 5 secondes, parfois 20 secondes",
        "Lis la foule pour savoir quand faire le coup",
      ],
    },
    {
      slideNumber: 2,
      title: "Les Variations de Transitions",
      subtitle: "Il existe plusieurs facons de faire une transition",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Decouvre les variations de transitions que les DJs utilisent.",
      content: `Il N'y A Pas Une Seule Facon de Faire une Transition

Les meilleurs DJs adaptent leur transition a la situation.

Variation 1: La Transition Rapide (Coup Sec)
- Duree totale: 5-10 secondes
- Utilisation: Quand tu veux creer un moment de surprise
- Technique:
  - Preparation tres courte (2-3 secondes)
  - Mix tres rapide (1-2 secondes)
  - Coup immediat
- Ressenti: Choc, energie, surprise

Variation 2: La Transition Lente (Progression Douce)
- Duree totale: 30-45 secondes
- Utilisation: Quand tu veux creer une progression progressive
- Technique:
  - Preparation longue (15-20 secondes)
  - Mix long (15-20 secondes)
  - Coup progressif
- Ressenti: Progression, construction, climax

Variation 3: La Transition Harmonique
- Utilisation: Quand les deux chansons sont en cles differentes
- Technique:
  - Utilise l'EQ pour creer une harmonie
  - Melange les deux chansons plus longtemps
  - Laisse les musiciens apprecier la progression
- Ressenti: Sophistication, musicalite

Variation 4: La Transition Creative (Avec Effets)
- Utilisation: Quand tu veux montrer ta creativite
- Technique:
  - Utilise des boucles (repete une section)
  - Ajoute des effets (reverb, delay)
  - Cree un moment unique
- Ressenti: Creativite, originalite, wow

Quand Utiliser Quelle Variation:
- Pic de la soiree? -> Transition rapide (coup sec)
- Debut de soiree? -> Transition lente (progression)
- Foule musicale? -> Transition harmonique
- Moment creatif? -> Transition avec effets`,
      keyTakeaway:
        "Il existe plusieurs facons de faire une transition. Adapte-toi a la situation et a la foule.",
      exercise: {
        title: "Analyse differents styles de transitions",
        description: "Ecoute et compare differentes transitions",
        steps: [
          "Trouve 4 videos de DJs differents",
          "Regarde une transition rapide",
          "Regarde une transition lente",
          "Regarde une transition harmonique",
          "Regarde une transition creative",
          "Note les differences que tu observes",
          "Essaie de predire quel style tu preferes",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Les meilleurs DJs melangent les styles",
        "Lis la foule pour savoir quel style utiliser",
        "Pratique d'abord les transitions simples, puis explore les variations",
      ],
    },
    {
      slideNumber: 3,
      title: "Transitions en Situation Reelle",
      subtitle: "Mets tout ensemble et fais ta premiere transition",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Regarde comment un DJ professionnel fait une transition parfaite en direct.",
      content: `Mise en Situation Complete:

Tu es en train de mixer. C'est 22h, la foule commence a danser. Voici ce qui se passe:

Etape 1: Preparation (15 secondes avant)
- La Chanson A joue (120 BPM, House)
- Tu veux passer a la Chanson B (120 BPM, House)
- Tu mets la Chanson B dans l'autre platine
- Tu ajustes le Pitch a 120 BPM
- Tu baisses les basses de la Chanson B a 0%
- Tu augmentes les aigus de la Chanson B a 100%
- La foule sent la tension (pas de basses = pas de groove)

Etape 2: Ecoute (5 secondes)
- Tu ecoutes les deux chansons ensemble dans tes ecouteurs
- Tu verifies que les rythmes correspondent
- Tu verifies que l'EQ sonne bien
- Si c'est parfait, tu passes a l'etape 3

Etape 3: Le Mix (8 secondes)
- Tu augmentes le volume de la Chanson B (de 0% a 50%)
- Tu diminues le volume de la Chanson A (de 100% a 50%)
- Les deux jouent ensemble
- La foule entend une progression naturelle
- Tu augmentes progressivement les basses de la Chanson B (de 0% a 100%)

Etape 4: Le Coup (2 secondes)
- Tu coupes completement la Chanson A
- La Chanson B prend le controle a 100%
- La foule explose!

Duree Totale: 30 secondes

Ce Qui S'est Passe:
- 15 secondes: Preparation (tension)
- 5 secondes: Ecoute (verification)
- 8 secondes: Mix (transition)
- 2 secondes: Coup (liberation)

La Realite:
- Ca parait complique sur le papier
- En pratique, ca devient naturel apres quelques essais
- Les meilleurs DJs le font sans y penser
- C'est comme apprendre a conduire: au debut c'est complique, puis ca devient automatique

Conseils Pratiques:
1. Pratique d'abord mentalement (visualisation)
2. Puis pratique avec du materiel (si tu en as)
3. Enregistre-toi et ecoute
4. Demande des retours a d'autres DJs
5. Repete, repete, repete`,
      keyTakeaway:
        "Une transition complete: Preparation -> Ecoute -> Mix -> Coup. 30 secondes pour changer de chanson.",
      exercise: {
        title: "Fais ta premiere transition (mentalement)",
        description: "Visualise une transition complete du debut a la fin",
        steps: [
          "Choisis deux chansons au meme BPM",
          "Ecoute la premiere jusqu'a 30 secondes avant la fin",
          "Imagine que tu mets la deuxieme dans l'autre platine",
          "Imagine que tu ajustes le Pitch",
          "Imagine que tu baisses les basses de la deuxieme",
          "Imagine que tu augmentes les aigus",
          "Imagine que tu ecoutes les deux ensemble",
          "Imagine que tu les mixes (volumes qui changent)",
          "Imagine que tu augmentes les basses de la deuxieme",
          "Imagine que tu coupes la premiere",
          "Repete jusqu'a ce que ca te semble naturel",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "La premiere transition est la plus difficile",
        "Apres ca, ca devient de plus en plus facile",
        "Les meilleurs DJs font des transitions sans y penser",
      ],
    },
  ],
};

export const allModules: CourseModule[] = [
  level1Module,
  level2Module,
  level3Module,
  level4Module,
  level5Module,
  {
    level: 6,
    title: "Techniques Avancées: Loops et Effets",
    description: "Développe des transitions créatives avec les outils avancés.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 1,
    estimatedDuration: "20 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Loops, FX et timing",
        subtitle: "Créer une transition expressive sans perdre le groove",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Introduction rapide aux techniques avancées de performance.",
        content:
          "Dans ce niveau, tu apprends à manipuler des loops et des effets pour prolonger les transitions et créer des moments marquants.",
        keyTakeaway: "Un effet bien dosé amplifie l'énergie sans casser le mix.",
        exercise: {
          title: "Créer une transition avec loop",
          description: "Pratique un enchaînement simple avec loop + filtre.",
          steps: [
            "Choisis deux morceaux au BPM proche",
            "Active un loop 4 temps sur la sortie du morceau A",
            "Lance le morceau B et ajuste le volume progressivement",
            "Ajoute un filtre léger puis enlève le loop",
          ],
          estimatedTime: "8 minutes",
        },
        tips: ["Reste subtil", "Évite d'empiler trop d'effets", "Privilégie le timing"],
      },
    ],
  },
  {
    level: 7,
    title: "Lire la Foule",
    description: "Adapter ton set en temps réel selon la piste.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 1,
    estimatedDuration: "15 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Signaux de la piste",
        subtitle: "Observer pour mieux décider",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Comment choisir le prochain morceau en observant la salle.",
        content:
          "Tu vas apprendre à reconnaître les signes d'engagement et à ajuster ton énergie musicale selon la réaction du public.",
        keyTakeaway: "Un bon DJ lit la foule avant de choisir son prochain move.",
        exercise: {
          title: "Décision en 10 secondes",
          description: "Travaille la prise de décision rapide.",
          steps: [
            "Observe 3 indicateurs: danse, déplacements, interactions",
            "Note si l'énergie monte, stagne ou baisse",
            "Choisis un morceau qui corrige la dynamique",
          ],
          estimatedTime: "5 minutes",
        },
        tips: ["Reste flexible", "Prépare des alternatives", "Observe en continu"],
      },
    ],
  },
  {
    level: 8,
    title: "Construction de Set",
    description: "Organiser une montée d'énergie cohérente.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 1,
    estimatedDuration: "20 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Architecture d'un set",
        subtitle: "Intro, montée, pic, respiration",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Les blocs clés pour structurer une session efficace.",
        content:
          "Ce niveau te guide pour structurer ton set avec une logique claire et conserver l'attention du public sur toute la durée.",
        keyTakeaway: "Un set réussi suit une trajectoire émotionnelle lisible.",
        exercise: {
          title: "Plan de set en 4 blocs",
          description: "Créer un mini plan de 30 minutes.",
          steps: [
            "Choisis 2 morceaux d'intro",
            "Ajoute 3 morceaux de montée",
            "Place 2 morceaux forts pour le pic",
            "Prévois 1 morceau de respiration",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Prépare des transitions clés", "Garde une marge d'impro", "Teste ton plan"],
      },
    ],
  },
  {
    level: 9,
    title: "Performance Club",
    description: "Gérer pression, transitions longues et timing réel.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 1,
    estimatedDuration: "20 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Routine live",
        subtitle: "Rester solide sous pression",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Préparer et exécuter une performance club maîtrisée.",
        content:
          "Tu vas cadrer ta routine live: préparation, check rapide, gestion du stress et maintien de la qualité sonore.",
        keyTakeaway: "La préparation réduit le stress et sécurise la performance.",
        exercise: {
          title: "Checklist pré-set",
          description: "Valide les points critiques avant de jouer.",
          steps: [
            "Vérifie niveau de sortie et casque",
            "Teste un enchaînement de secours",
            "Prépare 3 morceaux sûrs pour relancer",
          ],
          estimatedTime: "6 minutes",
        },
        tips: ["Respire", "Reste simple", "Sécurise ton intro"],
      },
    ],
  },
  {
    level: 10,
    title: "Maîtrise Complète",
    description: "Consolider ta signature artistique et technique.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 1,
    estimatedDuration: "25 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Ton style DJ",
        subtitle: "Construire une identité claire",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Transformer ta technique en identité de performance.",
        content:
          "Dernier niveau: tu alignes technique, sélection musicale et storytelling pour créer une identité cohérente.",
        keyTakeaway: "Le niveau pro, c'est la constance et une identité forte.",
        exercise: {
          title: "Mini set signature",
          description: "Composer un set court qui te ressemble.",
          steps: [
            "Sélectionne 5 morceaux qui définissent ton univers",
            "Écris ton intention d'énergie pour chaque transition",
            "Répète le set 2 fois en notant les ajustements",
          ],
          estimatedTime: "12 minutes",
        },
        tips: ["Sois cohérent", "Mets en avant ta couleur", "Répète régulièrement"],
      },
    ],
  },
];

export function getModuleByLevel(level: number): CourseModule | null {
  return allModules.find((m) => m.level === level) || null;
}

export function getSlideFromModule(
  level: number,
  slideNumber: number
): Slide | null {
  const module = getModuleByLevel(level);
  if (!module) return null;
  return module.slides.find((s) => s.slideNumber === slideNumber) || null;
}
