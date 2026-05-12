/**
 * DJ Academy - Contenu Pédagogique Progressif par Slides
 * Structure: Chaque niveau = progression en slides (3-5 slides)
 */

import { level4Module, level5Module } from "./courses-progressive-extended";
import { buildAcceleratedLevels123 } from "./courses-accelerated-first-levels";
import { buildIntermediateLevels4to10 } from "./courses-intermediate-levels";
import { buildProLevels4to10 } from "./courses-pro-levels";
import type { CourseTrackId, TargetDeck, UserGoal } from "./learning-profile";
import type { Language } from "./i18n";

export type UserLevel = "beginner" | "intermediate" | "advanced";

export interface SlideIllustration {
  url: string;
  alt: string;
  caption?: string;
}

export interface Slide {
  slideNumber: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  videoDescription: string;
  content: string;
  /** Schémas / photos (boutons table, captures Rekordbox…) */
  illustrations?: SlideIllustration[];
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

type LocalizedSlideOverride = Omit<Slide, "illustrations" | "videoUrl" | "slideNumber">;
type LocalizedModuleOverride = {
  title: string;
  description: string;
  slides: Record<number, LocalizedSlideOverride>;
};

const EN_LEVEL_6_TO_10_OVERRIDES: Record<number, LocalizedModuleOverride> = {
  1: {
    title: "DJ Fundamentals",
    description: "Welcome to your DJ journey! We're building rock-solid foundations with your FLX controller and Rekordbox — the stuff every great DJ wishes they'd nailed from day one.",
    slides: {
      1: {
        title: "Rekordbox and controller fundamentals",
        subtitle: "Preparation mode vs performance mode",
        videoDescription:
          "Your first real look behind the curtain — how working DJs prepare before they ever hit play in front of a crowd.",
        content:
          "Welcome aboard! Before you start mixing bangers, let's make sure your workspace is dialed in. Think of Rekordbox as your DJ command center — it's where you import tracks, analyze their BPM and beat grids, set hot cues, and build playlists that actually make sense for a live set. Right now your only mission is to get comfortable navigating this tool so loading a track feels like second nature. Every pro DJ you admire started right here, getting their library tight. Nail this step, and everything that follows — transitions, EQ work, reading a crowd — becomes ten times easier because you're never fighting your own setup.",
        keyTakeaway:
          "A well-prepared library is your secret weapon. When your tracks are organized and your cues are set, you can focus on the fun stuff — actually mixing.",
        exercise: {
          title: "Build your first battle-ready playlist",
          description: "Let's get hands-on! You're going to prepare 5 tracks like a pro would before a gig.",
          steps: [
            "Pick 5 tracks you love that sit in a similar BPM range (try to stay within ±5 BPM).",
            "Import them into Rekordbox and run the auto-analysis — then double-check that the downbeats actually land on the 1.",
            "Set at least 4 hot cues per track: think intro, drop, breakdown, and outro. Label them so future-you knows what they mean!",
            "Load tracks onto both decks and tap each cue to make sure they fire where you expect — fix any that feel off.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Always double-check your beat grids manually — auto-analysis is good but not perfect, especially on tracks with live drums or tempo changes.",
          "Name your hot cues something meaningful like 'Drop' or 'Vocal In' instead of leaving them blank — your future self will thank you mid-set.",
          "Start a backup playlist now. Seriously. Lost playlists happen, and rebuilding from scratch is no fun.",
        ],
      },
      2: {
        title: "Hardware and signal flow",
        subtitle: "Headphones, monitor, gain staging basics",
        videoDescription: "How to set up your headphones and levels so you can actually hear what you're doing — the skill nobody talks about but everyone needs.",
        content:
          "Here's something most beginners skip: learning how to actually hear your mix properly. Your headphones are your preview window — they let you listen to the next track before the audience hears it. You need to get comfortable switching between cueing the incoming track and monitoring the master output. And gain staging? That's just making sure both tracks sit at a similar volume before you blend them. If one track is way louder than the other, no amount of fancy EQ work will save you. Get this right and every transition you practice from here on will sound cleaner and feel more confident.",
        keyTakeaway:
          "If you can't hear your mix clearly, you can't mix well — period. Solid monitoring and clean gain staging are the invisible foundations of every smooth transition.",
        exercise: {
          title: "Headphone confidence challenge",
          description: "Time to get your ears trained! This quick drill builds the monitoring habits you'll use in every single session going forward.",
          steps: [
            "Load two tracks and set your cue/master blend in your headphones — find the sweet spot where you can hear both clearly.",
            "Match the gain on both tracks so they feel equally loud (use your ears more than the meters!).",
            "Practice flipping between cue and master every 8 bars — get used to that mental switch of 'what the crowd hears' vs 'what I'm preparing'.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "If your master meter is hitting red, you're too loud — back it off. Distortion kills vibe faster than anything.",
          "Train your ears to be the boss, not your eyes. Meters are helpful guides, but your hearing is the final judge.",
          "Getting gain staging right now makes EQ work so much easier later — think of it as laying a clean foundation before building the house.",
        ],
      },
      3: {
        title: "Tempo and phrasing intro",
        subtitle: "Align timing before EQ tricks",
        videoDescription: "This is where the magic starts — understanding why some mixes sound seamless and others sound like a train wreck.",
        content:
          "Okay, this is a big one. Tempo matching means getting two tracks running at the same speed so the beats line up. Phrasing means starting your blend at musically logical moments — usually every 8 or 16 bars where a new section begins. When you nail both, transitions feel invisible. When you don't, even the best track selection sounds messy. Don't stress if your first attempts drift a bit — that's completely normal. The jog wheel and pitch fader are your correction tools, and the more you use them, the more instinctive it becomes. Think of it like learning to drive: clunky at first, smooth as butter once the muscle memory kicks in.",
        keyTakeaway:
          "Timing is everything. No effect, no EQ trick, and no fancy technique can fix a transition where the beats aren't aligned and the phrases don't match up.",
        exercise: {
          title: "Phrase-lock challenge",
          description: "Let's train your timing instincts with a focused drill — this is the exercise that separates 'playing songs' from 'actually DJing'.",
          steps: [
            "Queue up track B and drop it right on the start of a new phrase in track A (listen for that energy shift every 8 or 16 bars).",
            "Let them run together and gently correct any drift using the jog wheel or pitch fader — small nudges, not big swings!",
            "Repeat this with 5 different track pairs. You'll start to feel the rhythm of when phrases begin naturally.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Tiny corrections beat big panicked moves every time — a gentle nudge of the jog wheel is all you usually need.",
          "Phrase timing is just as important as BPM matching. Two tracks at identical BPM will still sound terrible if you start the blend mid-phrase.",
          "Record yourself doing these drills and listen back — you'll catch timing issues your ears miss in the moment.",
        ],
      },
      4: {
        title: "First clean blend",
        subtitle: "Simple transition with control",
        videoDescription: "Your very first real transition — this is the moment it all starts to feel like DJing.",
        content:
          "This is it — your first real blend! Keep it simple: align the tempos, pre-listen to track B in your headphones to find the right entry point, bring it in with the volume fader or EQ, and then release track A cleanly. That's the whole recipe. You're not trying to impress anyone right now — you're building the foundation that every advanced technique sits on top of. A clean, simple transition that flows naturally will always sound better than a complicated one that falls apart halfway through. Don't overthink it. Trust the process you've been practicing, take a breath, and let the tracks do the work.",
        keyTakeaway:
          "A smooth, simple blend will always beat a messy complex one. Master the basics and the creative stuff becomes way easier to add later.",
        exercise: {
          title: "Your first real mix!",
          description: "Time to put it all together! This is the moment where preparation meets performance — and it's going to feel awesome.",
          steps: [
            "Pick two tracks you prepped earlier. Match the BPM and find a phrase start where track B will enter naturally.",
            "Blend track B in using smooth volume and EQ adjustments — don't rush it, let the overlap breathe for 8-16 bars.",
            "Bring track A out cleanly at a phrase boundary. Listen to the result — did it feel smooth? That's what we're chasing!",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Less is more right now — resist the urge to touch every knob. A steady hand on the volume fader is more powerful than you think.",
          "Stay aware of phrase boundaries throughout the blend. Starting and ending on phrases is what makes a transition feel 'right'.",
          "If it doesn't go perfectly, that's totally fine! Every DJ on the planet has botched transitions. What matters is you tried and you'll learn from it.",
        ],
      },
      5: {
        title: "Level 1 graduation",
        subtitle: "From setup confidence to repeatability",
        videoDescription: "Nice work getting this far! Let's lock in everything you've learned and prove to yourself that you've got real DJ skills now.",
        content:
          "Look at you — you've gone from zero to actually mixing tracks! This final slide is about proving that your skills are consistent, not just lucky. You're going to chain multiple transitions together, which is what real DJing actually is: an ongoing flow, not just one good blend in isolation. Don't stress if it's not perfect yet — every pro DJ started exactly where you are right now. The goal here is repeatability. If you can do three clean transitions in a row without stopping, you've genuinely built a solid foundation. That's a real achievement, and everything from here builds on this confidence.",
        keyTakeaway:
          "Repeatability is your first real DJ superpower. Anyone can get lucky once — being able to do it again and again is what makes you a DJ.",
        exercise: {
          title: "The three-in-a-row challenge",
          description: "This is your Level 1 graduation test! Chain three transitions without stopping — no resets, no do-overs. You've got this!",
          steps: [
            "Line up 4 tracks from your prepared playlist — think of this as a mini-set.",
            "Mix through all 3 transitions back-to-back without pausing. Keep breathing, stay in the groove, and trust your prep.",
            "Listen back to the recording. Note where things felt smooth and where timing or levels drifted — that's your roadmap for Level 2!",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Don't chase speed — smooth and controlled at a comfortable pace is worth way more than fast and sloppy right now.",
          "Consistency is the name of the game at this stage. If you can repeat it, you own it.",
          "After each run, write down one specific thing to improve. Not five things — just one. That focused approach compounds fast.",
        ],
      },
    },
  },
  2: {
    title: "EQ Fundamentals",
    description: "Time to unlock one of the most powerful tools on your mixer! EQ is how you carve out space so two tracks can coexist beautifully instead of fighting each other.",
    slides: {
      1: {
        title: "Frequency roles in a transition",
        subtitle: "Bass, mids, highs and energy balance",
        videoDescription: "Ever wonder why some blends sound clean while others turn to mush? This is the answer — understanding what each EQ knob actually does to your music.",
        content:
          "Let's break down what's actually happening when you twist those three EQ knobs. The bass (low) carries the weight and groove — it's what makes people move their feet. The mids hold the melody, vocals, and the identity of the track — it's how people recognize what's playing. The highs bring clarity, sparkle, and energy — think hi-hats, cymbals, and the airiness on top. When you're blending two tracks, the problem is that both tracks have all three of these layers. If you just slam both tracks together at full volume, the frequencies stack on top of each other and everything turns muddy. Your job as a DJ is to manage this frequency space — making room for the incoming track while gracefully reducing the outgoing one. It's like a conversation: one voice rises while the other lowers.",
        keyTakeaway:
          "EQ isn't about random knob twisting — it's about managing space. When you control which frequencies dominate at each moment, your blends go from messy to magical.",
        exercise: {
          title: "Frequency detective challenge",
          description: "Train your ears to hear each frequency band separately — this is the listening skill that separates good DJs from great ones!",
          steps: [
            "Pick a track you know well. Play it and close your eyes — focus only on the bass. Feel it in your chest. Notice when it hits hardest.",
            "Play it again and this time tune your attention to the mids only. Can you follow the melody? Notice how vocals and synths live here.",
            "One more time — now focus only on the highs. Listen for the hi-hats, the crispness, the shimmer. Note which sections feel brighter vs darker.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Mids clash first and hardest during a blend — two melodies fighting for attention is the fastest way to ruin a transition.",
          "Low-end should be handed over like a baton, not stacked. Two full basslines at the same time is almost always mud city.",
          "Subtle EQ moves are almost always better than dramatic ones. The crowd should feel the change, not hear you yanking knobs.",
        ],
      },
      2: {
        title: "Bass handover logic",
        subtitle: "Avoid mud while keeping impact",
        videoDescription: "The bass swap is one of the most important DJ techniques you'll ever learn — this is how the pros keep the dancefloor locked during every transition.",
        content:
          "Here's a golden rule: never run full bass from both tracks at the same time for more than a couple of bars. It sounds muddy, loses punch, and confuses the groove. Instead, think of the bass as a baton in a relay race — one track hands it off to the other at a clean moment. The technique: bring in your new track with the bass cut or reduced, let the mids and highs establish presence first, then at a phrase boundary swap the bass over — cut the outgoing bass and bring in the incoming bass simultaneously. When done right, the crowd feels a seamless shift of energy without any muddy overlap. This single technique will make your transitions sound 10x more professional overnight.",
        keyTakeaway:
          "A clean bass handover is the difference between a transition that sounds amateur and one that sounds professional. Swap, don't stack!",
        exercise: {
          title: "The bass relay drill",
          description: "Time to practice the most satisfying moment in DJing — that clean bass swap that makes everything click into place!",
          steps: [
            "Start blending your incoming track with its bass dialed down — let the mids and highs introduce themselves over 8 bars.",
            "When you hit a phrase start, swap the bass: cut the outgoing track's low end and bring in the incoming track's bass in one smooth move.",
            "Listen to the master output — did the energy stay consistent? The low-end should feel like one continuous groove, not two separate ones.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Phrase boundaries are your best friend for bass swaps — the musical structure naturally supports a clean handover at these points.",
          "Avoid abrupt bass jumps. Even a fast swap should feel intentional, not like something broke. Smooth the movement over a beat or two if needed.",
          "Record yourself and listen back. Bass mud is sometimes hard to hear in the moment but super obvious in a recording.",
        ],
      },
      3: {
        title: "EQ transition execution",
        subtitle: "One full transition with controlled spectrum",
        videoDescription: "Let's put it all together — everything you've learned about frequencies, bass handovers, and space management in one complete transition.",
        content:
          "Alright, this is where theory becomes real. You're going to plan and execute a full transition using deliberate EQ decisions from start to finish. Before you start, map it out: how will you introduce the incoming track? Which frequencies will you bring in first? Where will you swap the bass? When will you pull back the outgoing track? Having a plan doesn't make you rigid — it makes you confident. During the blend, keep your movements intentional. Every knob turn should have a reason. If you catch yourself fidgeting with EQ just because you're nervous, take your hands off and listen. The best EQ work often involves fewer moves than you'd expect. After you're done, listen back and ask yourself: did it sound like two tracks coexisting, or two tracks fighting?",
        keyTakeaway:
          "Controlled, intentional EQ movements are what create that buttery-smooth professional sound. Plan your moves, execute with confidence, and remember — less is usually more.",
        exercise: {
          title: "The full EQ transition showdown",
          description: "Your EQ graduation challenge! Plan every frequency move before you start, then execute it in one clean take.",
          steps: [
            "Before touching any controls, map out your plan: when will the incoming track enter? Where's the bass swap? When does the outgoing track exit?",
            "Execute the transition with minimal, deliberate movements. If a knob doesn't need turning, leave it alone — confident stillness is a skill!",
            "Listen back critically. Was there any moment where things got muddy or the energy dipped? Simplify that section and try again.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Chase clarity, not volume. A clean, clear mix at moderate volume always beats a loud, muddy one.",
          "When in doubt, do less. Some of the best transitions in the world use just two or three subtle EQ adjustments total.",
          "Consistency beats drama every time. A smooth blend that barely anyone notices is way more professional than a showy one that draws attention to itself.",
        ],
      },
    },
  },
  3: {
    title: "Core Transitions",
    description: "This is where it starts clicking! You're going to build a repeatable transition framework — prepare, blend, release — that makes every mix feel intentional and smooth.",
    slides: {
      1: {
        title: "Three-phase transition model",
        subtitle: "Prepare, blend, release",
        videoDescription: "The secret framework that working DJs use for every single transition — once you learn this, you'll never feel lost in a blend again.",
        content:
          "Every great transition follows the same three phases, whether the DJ is playing a warehouse rave or a sunset beach set. Phase one: Prepare — you've got your next track selected, BPM matched, and you know exactly which phrase you're dropping it on. Phase two: Blend — the tracks overlap for a controlled period, usually 16 to 32 bars, while you manage EQ and levels to keep things clean. Phase three: Release — you pull the outgoing track out at a phrase boundary so the new track takes over seamlessly. Having this framework in your head eliminates that 'what do I do now?' feeling mid-transition. You always know where you are in the process. It's like having GPS for your mix — you might take different routes, but you always know the destination.",
        keyTakeaway:
          "The three-phase model gives you a clear roadmap for every transition. When you know the structure, you stop hesitating and start flowing.",
        exercise: {
          title: "Blueprint your blend",
          description: "Let's plan a transition on paper before you touch the decks — this planning habit is what separates pros from amateurs!",
          steps: [
            "Pick two tracks and identify the phrase windows — where are the 8-bar and 16-bar sections? Mark where energy shifts happen.",
            "Map out your three phases: at which bar will you start the blend? How long is the overlap? Where exactly will you release the outgoing track?",
            "Now execute it for real and compare with your plan. Did you stick to it? Where did you deviate, and was that deviation a good instinct or a panic move?",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Plan before you play — even spending 30 seconds mentally mapping a transition makes it dramatically smoother.",
          "Stay phrase-aware throughout all three phases. Phrases are the grammar of dance music; mix with them, not against them.",
          "Don't rush the release phase. Pulling the outgoing track too early is one of the most common beginner mistakes. Let it breathe out naturally.",
        ],
      },
      2: {
        title: "Timing under control",
        subtitle: "Keep groove stable during overlap",
        videoDescription: "The overlap is where transitions live or die — let's make sure yours stay rock-solid even when two tracks are running together for 16+ bars.",
        content:
          "The overlap phase is where most transitions fall apart, and it's almost always because of small timing drift that snowballs. Here's the thing: even when BPMs are matched perfectly, tracks can drift slightly out of phase. Your job during the overlap is to monitor this and make tiny corrections before it becomes audible to anyone else. Use your headphones actively — flip between cue and master to check alignment. If you hear the beats starting to flam (that stuttery double-hit sound), gently nudge the jog wheel. The keyword is gently. Big corrections sound worse than the drift itself. Think of it like steering a car: small, constant adjustments keep you in the lane. Jerking the wheel causes a crash. The confidence you build here — holding two tracks in perfect sync for 16, 32, even 64 bars — is what lets you attempt longer, more creative transitions later.",
        keyTakeaway:
          "Small, early timing corrections keep the groove alive. Catch drift before it becomes a problem and you'll hold transitions together with total confidence.",
        exercise: {
          title: "The 16-bar groove lock",
          description: "Can you hold two tracks perfectly synced for 16 bars straight? This drill builds the micro-correction instincts that every pro relies on!",
          steps: [
            "Blend two tracks and let them run together for a full 16 bars — focus entirely on keeping the beats locked together.",
            "When you hear any drift, correct it with the smallest possible jog wheel nudge. Challenge yourself to make corrections so small that nobody watching would even notice your hand moved.",
            "Release cleanly on a phrase start. If you held it tight for the full 16 bars, congratulations — that's genuinely solid! Try 32 bars next.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Use your headphones aggressively during overlap — alternate between cue and master to catch drift the instant it starts.",
          "Correct early, correct small. A tiny nudge at bar 2 is invisible. A big correction at bar 14 is a trainwreck everyone hears.",
          "If you feel the urge to make a big, panicked correction, take a breath first. Rushed moves almost always make things worse.",
        ],
      },
      3: {
        title: "Invisible transition target",
        subtitle: "Smoothness as core quality metric",
        videoDescription: "The ultimate goal — transitions so smooth that someone listening wouldn't even realize the track changed. This is where you start thinking like a pro.",
        content:
          "Here's the benchmark you're aiming for: a transition so seamless that if someone was dancing with their eyes closed, they'd feel the music evolve but never feel a jarring 'change.' That's an invisible transition, and it's the gold standard. Everything you've learned — EQ management, phrase timing, bass handovers, groove locking — comes together here. An invisible transition isn't about tricks or complexity; it's about making the right moves at exactly the right moments. The crowd should feel continuity, like one long musical journey. When you pull off your first truly invisible blend, it's one of the best feelings in DJing. And once you can do it consistently, you've earned the right to break the rules creatively — because you understand what the rules are for.",
        keyTakeaway:
          "Invisible transitions are the ultimate proof that you're in control. When the music flows like water and nobody notices the switch, that's mastery in action.",
        exercise: {
          title: "The blind test challenge",
          description: "Time for the real test — can you fool yourself? Record two transitions and listen back without looking at the waveforms. Pure ears only!",
          steps: [
            "Perform two transitions using everything you've learned — three-phase model, EQ management, bass handover, groove locking. Give it your best shot.",
            "Hit record, then listen back with your eyes closed or looking away from the screen. Can you pinpoint the exact moment each transition happens?",
            "If you can hear the transition clearly, identify what gave it away and refine that specific element. If you can't tell — you nailed it!",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Chase continuity, not flash. The most impressive thing a DJ can do is make 20 tracks feel like one unbroken journey.",
          "Trust your ears over your screen. Waveforms can look messy while sounding perfect, and vice versa. Your ears are always the final judge.",
          "Refinement beats repetition. Don't just do more reps — identify the one weak spot in each transition and fix that specifically before your next attempt.",
        ],
      },
    },
  },
  4: {
    title: "Harmonic Mixing",
    description: "Ready for the thing that separates good DJs from the ones who give you chills? Harmonic mixing is about choosing tracks whose musical keys work together — and when you get it right, your transitions go from 'that was smooth' to 'how did they do that?'",
    slides: {
      1: {
        title: "Understanding musical keys",
        subtitle: "Why some blends sound magical and others sound like a car crash",
        videoDescription: "Your first deep dive into the world of musical keys — this is the secret ingredient that makes certain transitions feel effortless and emotional while others clash painfully.",
        content:
          "Alright, let's talk about something that's going to completely change the way you hear music: musical keys. Every track has a key — think of it like the track's emotional color. You've got C major, A minor, D major, G minor… there are 24 in total, and each one has a distinct feel. Here's the thing: when you mix two tracks together, if their keys are compatible, the transition sounds natural, musical, almost magical. The crowd won't know why, but they'll feel it in their gut — something just sounds right. But if you slam a track in C major against one in F-sharp major? Ouch. It clashes. It sounds off-key. And the dancefloor feels it immediately, even if they can't explain why. That's where harmonic mixing comes in. Instead of leaving it to chance, you deliberately choose tracks whose keys play well together. The result? Your transitions go from 'technically correct' to 'wow, this DJ is on another level.' And here's the best part: there's a beautifully simple tool called the Camelot Wheel that makes all of this easy — no music theory degree required. It's a circle that shows you at a glance which keys are compatible. We're going to dive deep into it in the next slide. Trust me on this one — once you start mixing harmonically, you'll never go back. This is where your mixes start having a real musical identity.",
        keyTakeaway:
          "When keys are compatible, your transition becomes musical and emotional — not just technical. This is the single biggest upgrade you can make to the way your mixes sound and feel.",
        exercise: {
          title: "Discover the keys in your library",
          description: "Start seeing your music through a harmonic lens — this quick exercise will change how you think about track selection forever!",
          steps: [
            "Pick 5-6 tracks you love and play regularly. These are your go-to weapons — let's learn their harmonic DNA.",
            "Use Rekordbox's key analysis, Mixed In Key, or even Shazam to identify each track's musical key. Write the key next to each track title.",
            "Look for pairs that share the same key or keys that are close together (like A minor and C major). Try playing those pairs together and really listen — notice how they blend more naturally than random pairings.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Don't stress about memorizing all 24 keys right now — the Camelot Wheel (next slide) turns this into a simple number game that anyone can master.",
          "Start paying attention to keys even when you're just listening to music casually. Over time, your ears will start recognizing compatible keys instinctively.",
          "Key compatibility is a powerful guide, but it's not the only factor in a great transition. BPM, energy, and timing still matter — harmonic mixing is the cherry on top that makes everything sing.",
        ],
      },
      2: {
        title: "The Camelot Wheel: your secret weapon",
        subtitle: "The simplest system for finding keys that match — no music theory needed",
        videoDescription: "Meet the tool that pro DJs keep open on every gig — the Camelot Wheel turns complex music theory into a dead-simple number game you can learn in five minutes.",
        content:
          "OK, the Camelot Wheel — this is about to become your best friend. It's a circle with 12 positions, and each position represents a musical key using a simple code: a number (1-12) and a letter (A or B). So you'll see things like 8A, 5B, 11A. That's it. No sharps, no flats, no music theory headaches. And the rule is stupidly simple. If your current track is in 8A, your three safe options for the next track are: 8B (same number, other letter — always a safe move), 9A (one step up — gentle energy lift), and 7A (one step down — smooth descent). Three options, every single time. That's the whole system. You don't need to be a musician. You don't need to understand chord progressions. You just look at the number, stay close, and your transitions will sound harmonically beautiful. Here's a concrete example: your current track is in 8A (A minor). You can follow it with 8B (A major), 9A (E minor), or 7A (D minor). Anything else? Skip it for now until you've built your confidence. For finding the Camelot key of your tracks, you've got great tools: Rekordbox and Serato analyze keys automatically, Mixed In Key is incredibly accurate (paid but worth it), and even free tools like KeyFinder work well. Here's what blows most people's minds: the biggest DJs in the world — the ones playing sold-out festivals — use exactly this system. It's not cheating. It's professional preparation. And now you know the secret too.",
        keyTakeaway:
          "The Camelot Wheel gives you three guaranteed compatible options for every track. Use it consistently and your transitions will sound professional overnight — no music degree required.",
        exercise: {
          title: "Your first harmonic transition",
          description: "Put the Camelot Wheel into practice right now — you're about to hear the difference it makes, and it's going to blow your mind!",
          steps: [
            "Pick a track and find its Camelot key (e.g., 8A). Now search your library for a track in 8B, 9A, or 7A — any of those three will work perfectly.",
            "Load both tracks on your decks, match the BPM, and do your transition the way you normally would. But this time, really listen to how the two tracks interact harmonically during the overlap. Notice how they complement each other instead of clashing?",
            "Repeat with at least 2 more compatible pairs to lock in the habit. The more you do this, the more automatic it becomes — and soon you won't even need to think about it.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Print out the Camelot Wheel or set it as your phone wallpaper — you'll be checking it constantly at first, and that's totally normal. Within a few weeks, you'll have the positions memorized.",
          "The Camelot system works across every genre — House, Techno, Hip-Hop, Drum & Bass, Pop, everything. Musical keys are universal, so this tool is universal too.",
          "When preparing a set, try planning your key journey in advance. Moving around the wheel smoothly (8A → 9A → 10A) creates a subtle but powerful sense of musical progression that audiences love.",
        ],
      },
      3: {
        title: "Breaking the rules on purpose",
        subtitle: "When to ignore the Camelot Wheel — and why the pros do it",
        videoDescription: "You've learned the rules — now learn when and how to break them like a seasoned pro. Controlled contrast is what creates truly unforgettable DJ moments.",
        content:
          "You've got the fundamentals locked down — now let's talk about when to throw the rulebook out the window. The Camelot Wheel is an incredible guide, but it's not a law. The best DJs in the world know exactly when to break harmonic rules to create something special. First scenario: creative tension. Sometimes a little dissonance is exactly what the moment needs. You intentionally mix two clashing keys, the crowd feels the tension building… and then you resolve it with a perfectly compatible track. Boom — the impact is ten times stronger than a safe transition. It's like a movie building suspense before the big reveal. Second scenario: genre context matters. In Hip-Hop, Trap, and certain styles of Techno, the rhythm and energy dominate so heavily that key compatibility takes a back seat. The beats and the vibe carry the mix more than the harmony. In these genres, trust your ears over the numbers. Third scenario: effects as bridges. You can use reverb, delay, or filter sweeps to 'blur' the passage between two incompatible keys. A well-timed reverb wash creates a sonic bridge that masks the dissonance just long enough for the transition to work. It's a pro technique that sounds incredibly smooth when executed well. Here's the golden rule: master the Camelot Wheel completely first. When you know it inside out, you can bend the rules with intention. There's a world of difference between someone who ignores key compatibility out of ignorance and someone who breaks the rules as a deliberate artistic choice. The best DJs in the world? They follow the Camelot Wheel about 80% of the time. The other 20%? That's where they create magic.",
        keyTakeaway:
          "Master the rules first, then break them with intention. The most unforgettable DJ moments come from controlled contrast — not random chaos.",
        exercise: {
          title: "The contrast experiment",
          description: "Experience the difference between harmonic safety and intentional tension — this is where you start developing real artistic instincts!",
          steps: [
            "Run a transition between two harmonically compatible tracks (using the Camelot Wheel). Listen to how smooth and natural it sounds. That's your baseline.",
            "Now try the same transition between two tracks with incompatible keys — listen to the clash. Then try it again, but this time add a reverb or filter sweep during the overlap to soften the dissonance. Notice the difference?",
            "Finally, create a tension-resolution sequence: start with an incompatible blend (the tension), then immediately follow with a perfectly compatible transition (the resolution). Feel how the contrast makes the resolution hit even harder.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Start with keys that are only slightly incompatible — don't jump to the opposite side of the Camelot Wheel right away. Small clashes are easier to control and can sound surprisingly cool.",
          "Always have a recovery plan. If your intentional rule-break isn't landing, know which compatible key to jump to next so you can get back on safe ground quickly.",
          "Study how DJs like Solomun, Dixon, or Jamie XX play with key tension in their sets — they're masters of controlled contrast and listening to them will train your instincts.",
        ],
      },
      4: {
        title: "The harmonic transition in action",
        subtitle: "Putting key logic, EQ, and phrasing together in one clean move",
        videoDescription: "Watch how all the pieces come together — key selection, EQ sculpting, phrase timing, and a confident execution that makes the whole thing sound effortless.",
        content:
          "This is where it all clicks. You're going to combine everything — key compatibility, EQ management, phrase timing — into one polished harmonic transition. Let me walk you through exactly how it goes. Your current track is in 8A (A minor). Your next track is in 9A (E minor) — compatible, let's go. Step one — Preparation (about 15 seconds before the transition). Track A is playing. You load Track B on the other deck. You check: 9A, compatible, perfect. You cut B's bass to zero and bring the highs up slightly. The crowd can feel something building. Step two — The headphone check (5 seconds). You cue Track B in your headphones and listen to both together. No clashing, no dissonance — the keys complement each other beautifully. You know it's going to work. Step three — The blend (about 8 seconds). You start bringing Track B's volume up while gently lowering Track A. Both tracks are playing together and it sounds harmonious — the crowd is locked in without even realizing a new track is entering. You gradually bring B's bass back in. Step four — The switch (2 seconds). You cut Track A cleanly. Track B takes over completely. The dancefloor erupts. Seamless. The whole thing takes about 30 seconds. And the result is genuinely magical. The big difference between this and a standard transition? Here, the two tracks are singing together instead of fighting each other. It's musical, not just mechanical. And that's exactly what makes a DJ sound truly professional.",
        keyTakeaway:
          "A well-executed harmonic transition is invisible to the crowd — and that's exactly the point. When nobody notices the track changed but everyone feels the energy shift, you've nailed it.",
        exercise: {
          title: "Execute three harmonic transitions in a row",
          description: "Your Level 4 graduation — chain three key-compatible transitions in one take. This is where preparation meets performance and you prove to yourself that harmonic mixing is now part of your toolkit!",
          steps: [
            "Prepare a mini-set of 4 tracks with a planned Camelot key path (e.g., 8A → 8B → 9B → 10A). Make sure each consecutive pair is compatible. This planning step is just as important as the mixing!",
            "Mix through all 3 transitions in one continuous take. For each transition, follow the full sequence: cut incoming bass, preview in headphones, blend in, swap the bass, cut the outgoing track. Focus on making each transition feel musical, not just technically correct.",
            "Record the whole thing and listen back. For each transition, ask yourself: did the two tracks complement each other harmonically? Was there any moment of clash or mud? Rate each one honestly, then replay your weakest transition until it shines.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Plan your key path before you start mixing. Knowing the harmonic journey in advance lets you focus entirely on execution instead of scrambling to find compatible tracks mid-set.",
          "Always use your ears as the final judge — the Camelot Wheel is incredibly reliable, but every now and then two 'compatible' tracks just don't vibe together. If it sounds off, trust your hearing and move on.",
          "Make harmonic awareness a habit, not a chore. After a few weeks of checking keys before every transition, it becomes second nature — like checking your mirrors when you drive.",
        ],
      },
    },
  },
  5: {
    title: "Set Structure",
    description: "You've mastered individual transitions — now it's time to think bigger. This level is about designing a full set that takes your audience on an emotional journey from the first track to the last.",
    slides: {
      1: {
        title: "Energy architecture",
        subtitle: "Intro, build, peak, release — the four phases every great set follows",
        videoDescription: "The difference between a DJ who plays great tracks and a DJ who delivers an unforgettable experience? It's energy architecture — and you're about to learn it.",
        content:
          "Think about the best DJ set you've ever heard. Chances are it wasn't just a random collection of bangers — it was a journey. It started somewhere calm, built anticipation, hit incredible peaks, gave you moments to breathe, and left you wanting more. That's energy architecture, and it's what separates a playlist from a performance. Here are the four phases that every great DJ uses, whether they're playing a warehouse or a festival main stage. Phase 1 — The Intro (first 10-15 minutes). You're setting the mood. Energy sits around 30-40%. Simple grooves, clear melodies, nothing too aggressive. People are arriving, settling in, starting to feel the vibe. No rush. Phase 2 — The Build (15-45 minutes). Now you start constructing. Energy climbs to 50-70%. The tempo nudges up gently. You add layers — more complex rhythms, bigger synths, building anticipation. The crowd is engaging more and more, and they can feel something coming. Phase 3 — The Peak (45-75 minutes). This is the moment. Energy hits 90-100%. Maximum intensity, maximum release. Everything you've built toward lands right here. This is why people came — that moment of collective euphoria on the dancefloor. Phase 4 — The Cooldown (last 15 minutes). You bring everyone back to earth, gently. Energy drifts back down to 30-50%. The tempo eases off. People catch their breath, smile at each other, and carry that feeling home. Why does this matter so much? Because a set without structure is like a movie without a plot — people drift away. A well-architected set is a complete emotional experience, and that's what makes people remember your name.",
        keyTakeaway:
          "Intro, Build, Peak, Cooldown. When you structure your set like a story with these four phases, the crowd doesn't just hear songs — they live an experience they'll remember.",
        exercise: {
          title: "Design your dream mini-set",
          description: "Let's architect a set on paper before you play it! This is how the big-name DJs prepare — and it's more fun than you'd expect.",
          steps: [
            "Define your 4 energy phases with specific numbers: what BPM range, what energy percentage (30%, 60%, 100%, etc.), and what mood does each phase carry? Imagine the crowd's face at each stage.",
            "Assign 2-3 tracks from your library to each phase. Think about how each track's energy, BPM, and Camelot key fits the story you're trying to tell. Use what you learned in Level 4 — plan compatible key paths between phases too.",
            "Plan your transition strategy between phases. The shift from Build to Peak is especially critical — how will you make that climactic moment land? And the cooldown after Peak needs to feel like a gentle exhale, not a sudden stop.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Think journey, not playlist. A playlist is a list of good songs. A set is a story told with music. Always ask yourself: where am I taking the listener next, and why?",
          "Pacing is everything. The best DJs know when to push hard and when to let the crowd breathe. Non-stop bangers actually kills energy — people need contrast to feel the peaks. A quiet moment makes the next drop hit ten times harder.",
          "Leave room to adapt. Your energy map is a guide, not a script. If the moment calls for a change, trust your instincts and adjust on the fly. The structure keeps you grounded; your ears keep you alive.",
        ],
      },
      2: {
        title: "Reading the room and adapting",
        subtitle: "When to push, hold, or reset — the art of real-time decisions",
        videoDescription: "Your plan meets reality — here's how to read the room and make smart decisions on the fly without losing your set's direction.",
        content:
          "Here's the truth every experienced DJ knows: no set goes exactly as planned, and that's actually a good thing. Your energy map is your compass, but the crowd is the terrain — and terrain changes. The first skill is learning to read the dancefloor. People jumping, hands in the air, big smiles? You're in the sweet spot — keep pushing or ride the wave. People standing still, chatting at the bar, checking their phones? Energy is off — you need to adjust. A few people starting to move? That's a spark — feed it carefully and it'll catch fire. Reading body language becomes instinctive over time, but you have to actively practice it. Now, the adaptation framework. Think of three simple moves: Push (increase energy, bump the BPM up by 2-4, go for a bigger track), Hold (stay at the current level because it's working — don't fix what isn't broken), or Reset (drop things down to create breathing room and set up a bigger peak later). Every few transitions, check in with the room and consciously choose one of these three. Maybe you planned a big build but the crowd is already at peak energy — do you push harder or ride the wave? Maybe your chill intro is losing people's attention — do you accelerate or trust the process? These are the decisions that make live DJing an art. And here's the real secret: the best DJs never have a 100% fixed setlist. They have a direction, a vibe they're chasing, and a library of tracks ready for any situation. They adapt constantly to what they see and feel. That's the invisible art of DJing — and it's what makes a live set infinitely better than a pre-recorded mix.",
        keyTakeaway:
          "Flexibility within structure is what makes a DJ feel live and connected. Plan your journey, but let the crowd guide how fast you travel. Your eyes and ears are your most important tools.",
        exercise: {
          title: "The DJ decision game",
          description: "Practice making push/hold/reset decisions in real time — this drill builds the read-the-room instincts that separate bedroom DJs from real performers!",
          steps: [
            "Start mixing your planned set, but set a checkpoint every 2 transitions. At each checkpoint, pause mentally and imagine a crowd reaction — are they feeling it? Getting bored? Going wild? Be specific: picture actual people dancing, standing still, or leaving.",
            "Based on your imagined crowd state, consciously choose: Push (pick a higher-energy next track, bump BPM up), Hold (stay on course — the vibe is right), or Reset (drop the energy with a mellower track to build back up stronger).",
            "After the set, review your decisions. Did each push/hold/reset feel intentional and motivated? Would you make the same call again? Try noting what triggered each decision — this reflection builds the instincts you'll rely on in a real booth.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Stay observant and present. It's easy to get lost in your own headphones and forget you're playing for people. Make it a habit to look up from the decks every 30 seconds — the dancefloor is giving you constant feedback.",
          "Make your decisions quickly and commit to them. A confident wrong call is better than a hesitant right one — audiences feel your energy and your confidence. If you made the wrong choice, adjust at the next checkpoint.",
          "Protect your momentum. The worst thing you can do is kill a good vibe with an indecisive transition. When in doubt, hold what's working. You can always push harder on the next transition — but a broken groove is hard to recover from.",
        ],
      },
      3: {
        title: "Structure validation",
        subtitle: "Run and review a complete mini-set",
        videoDescription: "This is your Level 5 final — a complete mini-set from intro to outro, recorded and reviewed. You're about to see how far you've come!",
        content:
          "This is it — the culmination of everything you've built across all five levels. You're going to play a complete mini-set with intentional energy architecture, live adaptation decisions, clean transitions, harmonic awareness, and solid EQ work. Record the whole thing, because you're going to review it like a pro afterward. Here's your game plan: pick 8-10 tracks that follow a clear progression. Start low — maybe 120 BPM, chill groove, compatible Camelot keys. Build gradually: nudge the BPM up by 2 every couple of tracks, add layers of energy, follow the Camelot path you planned. Hit your peak around track 6 or 7 — everything firing, maximum intensity. Then bring it back down for the last 2-3 tracks, easing the energy and tempo back to a place of calm. The review is just as important as the performance. Listen for your strong moments — the transitions where everything clicked, the harmonic blends that sounded seamless — and your weak spots where energy dipped, timing wavered, or keys clashed. This isn't about being perfect; it's about developing awareness of your own mixing and building a feedback loop that accelerates your growth. Every pro DJ records their sets and reviews them. It's how they find their blind spots and level up session after session. When you can play a structured mini-set, review it honestly, fix the weak points, and replay it better — you've developed the single most powerful practice habit in DJing. This habit will compound forever.",
        keyTakeaway:
          "Recording and reviewing your sets is the single most powerful improvement habit in DJing. It turns every session into a learning opportunity and every weakness into a clear action item.",
        exercise: {
          title: "The mini-set masterclass",
          description: "Your Level 5 graduation! Play a full 25-minute mini-set with planned energy architecture, then review it like a pro coach would. This is where everything comes together!",
          steps: [
            "Hit record and play your full planned mini-set in one take — intro through peak through outro, no stopping. Follow your energy map: start mellow, build up, hit the peak, bring it down. Trust your preparation and let the music flow.",
            "Listen back and mark your 2 strongest moments (the transitions that made you smile — maybe a perfect harmonic blend or a bass swap that just clicked) and 2 weakest moments (where things felt off — maybe a key clash or a timing drift). Be honest but kind with yourself!",
            "Rebuild the weak transitions with specific fixes — was it timing? EQ? Track selection? Key clash? Energy mismatch? Fix the root cause and replay those sections until they shine. Then run the full set again and compare.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Record every single full run. Even the messy ones. Comparing this week's recording to last week's is the most motivating thing in the world when you can actually hear your progress.",
          "Score your own set honestly but fairly. You're not comparing yourself to Carl Cox — you're comparing yourself to yesterday's you. That's the only benchmark that matters. Growth is personal.",
          "Make this a weekly ritual. One structured mini-set per week, recorded and reviewed, will make you better faster than hours of aimless noodling on the decks. Consistency beats talent every single time.",
        ],
      },
    },
  },
  6: {
    title: "Advanced Techniques: Loops, FX & Energy Control",
    description: "You've nailed the fundamentals — now it's time to add flair. This is where your mixes start sounding truly yours.",
    slides: {
      1: {
        title: "Loops that actually work",
        subtitle: "Use loops as a weapon, not a crutch",
        videoDescription: "Learn to use loops like a pro — with purpose, timing, and confidence.",
        content:
          "Here's a secret most beginners don't get: a loop isn't there to buy you time — it's there to build a moment. The best DJs in the world use a 4-beat loop to stretch the tension right before a drop, or to hold a groove while they bring in the next track seamlessly. But if you let it run too long, the crowd feels it — the energy just… deflates. Think of a loop like a held breath: powerful for a few seconds, awkward after ten. Your goal is surgical precision — get in, create the moment, get out clean.",
        keyTakeaway: "A great loop has one job — solve one problem, create one moment, then disappear before anyone notices it was there.",
        exercise: {
          title: "The Loop Sniper Challenge",
          description: "Train yourself to make loops short, intentional, and perfectly timed.",
          steps: [
            "Grab two tracks with close BPMs but different intro energy.",
            "On Track A, drop a 4-beat loop right at the end of a phrase — feel the tension build.",
            "Cue up Track B in your headphones, get it locked, and start blending it in.",
            "Release the loop exactly on the next phrase start — nail that timing and feel the payoff.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Pro move: always know your exit point BEFORE you hit the loop button. Never loop without a plan.",
          "If you're using loops to cover up shaky beatmatching, go back and tighten that skill first — loops should enhance, not hide.",
          "Record yourself and listen back — over-looping is one of the easiest habits to catch on tape.",
        ],
      },
      2: {
        title: "FX that tell a story",
        subtitle: "Filters, echoes & reverbs that build emotion — not noise",
        videoDescription: "Discover how to use effects like seasoning — just enough to elevate, never enough to overpower.",
        content:
          "Let's talk about the number one mistake intermediate DJs make with effects: they use too many, too loud, too often. Here's the truth — a single, well-timed filter sweep can give the crowd chills. A subtle echo trail on an outgoing vocal can make a transition feel cinematic. But stack three effects at once? You just turned your mix into a muddy mess. The best club DJs in the world barely touch their FX — but when they do, it's magic. Clarity always beats complexity on a big sound system.",
        keyTakeaway: "One perfectly timed effect will always hit harder than three stacked on top of each other. Less is more — always.",
        exercise: {
          title: "The Minimalist FX Challenge",
          description: "Prove to yourself that restraint is the ultimate superpower.",
          steps: [
            "Mix one full transition with zero effects — just EQ and faders. Notice how clean it sounds.",
            "Now run the same transition with only a gentle filter movement on the outgoing track.",
            "Third attempt: add a short echo tail on the outgoing track as it exits. Keep it subtle.",
            "Listen to all three back-to-back. Which one actually sounds the best? You might be surprised.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Golden rule: if you can hear the effect more than the music, your wet level is too high. Pull it back.",
          "Time your effects to phrase boundaries — a reverb that starts mid-phrase sounds random, but one on the downbeat sounds intentional.",
          "Always keep your finger near the dry/kill button. The ability to instantly cut an effect clean is a pro skill most people overlook.",
        ],
      },
      3: {
        title: "The full creative transition",
        subtitle: "Loop + EQ + FX + clean exit — all in one flow",
        videoDescription: "Combine everything you've learned into transitions that feel effortless and sound incredible.",
        content:
          "This is where it all comes together, and honestly? This is where DJing gets really fun. A creative transition isn't just technical — it's like choreography. You set the loop, sculpt the EQ, add a touch of FX for drama, and release everything right on the phrase. When you nail it, the crowd doesn't even realize a new track started — they just feel the energy shift. The key is sequencing: know what happens first, second, third. And always have a bail-out plan, because even the pros don't land every creative transition perfectly on the first try.",
        keyTakeaway: "True creativity isn't chaos — it's controlled moves with fast recovery. The best transitions look effortless because they were practiced relentlessly.",
        exercise: {
          title: "The Pressure Cooker — Back-to-Back Creative Transitions",
          description: "Simulate real booth pressure with two creative transitions in a row, no breaks.",
          steps: [
            "Transition 1: Set a short loop, execute a bass swap, add a subtle FX, release clean on the phrase.",
            "Transition 2: Filter sweep into an echo tail — no loop this time. Different technique, same control.",
            "Record both in one continuous take. No restarts. Then listen back and honestly identify your weak spots.",
          ],
          estimatedTime: "13 minutes",
        },
        tips: [
          "The crowd remembers how the energy felt, not how many buttons you pressed. Prioritize flow over flash.",
          "For every creative move, have a simplified backup version ready. If the complex version isn't clicking, go simple — nobody will know.",
          "Knowing when to kill an effect is just as important as knowing when to trigger it. A clean cut at the right moment? That's peak pro behavior.",
        ],
      },
    },
  },
  7: {
    title: "Reading the Crowd",
    description: "This is what separates a playlist-player from a real DJ. You're about to learn the most underrated skill in the game.",
    slides: {
      1: {
        title: "Spotting the signs before energy drops",
        subtitle: "Read the room like a pro — before it's too late",
        videoDescription: "Train your eyes to catch what most DJs miss: the early warning signs of a fading dancefloor.",
        content:
          "Here's something nobody teaches in YouTube tutorials: the best DJs aren't reacting to the crowd — they're anticipating. By the time the dancefloor is obviously dying, you're already two tracks too late. What you want to watch for are the micro-signals: people checking their phones more, small groups drifting toward the bar, delayed reactions to drops, the edges of the floor thinning out. These are whispers before the scream. When you catch them early, you can adjust with one track instead of scrambling for three. This skill alone will make you better than 80% of DJs out there.",
        keyTakeaway: "The pros don't wait for the floor to empty — they read the micro-signals and adjust within 1-2 tracks. Train your eyes as much as your ears.",
        exercise: {
          title: "The 60-Second Crowd Scan",
          description: "Build a habit of actively reading the room — even during practice sessions with videos.",
          steps: [
            "During a mix, pause and scan: floor density, body movement intensity, reaction timing to drops.",
            "Label the current state in your head: rising, stable, or dropping.",
            "Based on your read, decide your intent for the next track: push harder, hold steady, or pivot direction.",
          ],
          estimatedTime: "8 minutes",
        },
        tips: [
          "A loud crowd isn't always an engaged crowd — watch the feet, not the mouths. Dancing tells the truth.",
          "Quick course corrections are cheap. Waiting and hoping things improve? That's expensive. Act early.",
          "Always have 2-3 emergency tracks loaded that can shift energy in completely different directions. Your safety net should be ready before you need it.",
        ],
      },
      2: {
        title: "Making fast decisions under pressure",
        subtitle: "When doubt creeps in, your framework kicks in",
        videoDescription: "Build a bulletproof decision system so you never freeze behind the decks.",
        content:
          "Picture this: the floor energy is ambiguous, you've got 30 seconds before the current track winds down, and you're not sure which direction to go. This is where most DJs freeze — and freezing is the worst thing you can do. The solution? A dead-simple framework: Keep, Push, or Pivot. Keep means you stay in the same lane — similar energy, similar vibe. Push means you crank it up a notch. Pivot means you change direction entirely. That's it. Three options. Pick one in under 10 seconds and commit. A fast, good-enough decision will always beat a perfect decision that came 30 seconds too late.",
        keyTakeaway: "Hesitation is your enemy behind the decks. A simple Keep/Push/Pivot framework eliminates panic and keeps your sets flowing.",
        exercise: {
          title: "The 10-Second Decision Drill",
          description: "Train your brain to make fast, confident choices — because in the booth, you won't have time to think twice.",
          steps: [
            "Imagine three scenarios: cold crowd (barely moving), stable crowd (vibing but not peaking), peak crowd (hands up, going wild).",
            "For each scenario, give yourself exactly 10 seconds to choose: Keep, Push, or Pivot. Say it out loud.",
            "Now execute one transition that matches your decision. Commit fully — no second-guessing mid-transition.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "A fast good-enough call beats no call every single time. Commit and adjust later if needed.",
          "Tag your utility tracks by crowd scenario — 'floor saver', 'peak builder', 'cool down'. When pressure hits, you'll thank yourself.",
          "When you genuinely can't tell what the crowd needs? Stabilize. Hold the current energy, buy yourself a track to observe, then decide.",
        ],
      },
      3: {
        title: "Live error recovery",
        subtitle: "Every great DJ has messed up live — what separates them is recovery speed",
        videoDescription: "Learn recovery techniques that turn mistakes into moments nobody even notices.",
        content:
          "Let me tell you something that might change your entire perspective: every single DJ you admire has botched a transition in front of a crowd. Every. Single. One. The difference between a pro and an amateur isn't the absence of mistakes — it's what happens in the five seconds after. Pros simplify instantly: they cut back to one clean track, restore the groove, and relaunch with confidence. The crowd forgives a stumble they barely noticed. They never forgive a DJ who panics, fumbles for 30 seconds, and kills the energy. Recovery speed is a trainable skill, and this exercise is going to build that muscle.",
        keyTakeaway: "Nobody judges you for making a mistake. They judge you for how long it takes to fix it. Fast, calm recovery is the hallmark of a professional.",
        exercise: {
          title: "The Recovery Drill",
          description: "Deliberately create a mess — then prove you can get out of it clean. This builds real confidence.",
          steps: [
            "Intentionally let a transition drift — misalign the beats slightly or bring in a clashing key.",
            "Immediately simplify: pull back to clean EQ, kill the problem source, restore clear timing on one deck.",
            "Within 20 seconds, relaunch with a safe, reliable track. The goal: nobody would know anything went wrong.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "A calm 2-second breath behind the decks can save your entire set. Panic is contagious — composure is too.",
          "Your emergency track should be pre-loaded and pre-tagged at all times. When disaster strikes, you don't have time to browse.",
          "Simplifying in a crisis isn't a sign of weakness — it's the most professional thing you can do. The crowd respects groove over ego.",
        ],
      },
    },
  },
  8: {
    title: "Set Construction",
    description: "You're not just mixing tracks anymore — you're building journeys. This is where you learn to think like a storyteller.",
    slides: {
      1: {
        title: "Designing your set architecture",
        subtitle: "Every great set tells a story — intro, rise, peak, breathe, exit",
        videoDescription: "Learn to plan a set like a movie director plans a film — with intention, emotion, and a killer ending.",
        content:
          "Here's what separates a DJ set from a playlist on shuffle: a story. Think about the best sets you've ever heard — they took you somewhere. They started mellow, built anticipation, hit a peak that gave you chills, let you breathe, then brought you back up before landing perfectly. That's not an accident — that's architecture. You need to know where you are in the emotional arc at every single moment. Are you in the intro? The climb? The peak? The cooldown? If you can't answer that question at any point during your set, you're just playing songs. From now on, you're telling stories.",
        keyTakeaway: "A great set follows a clear emotional curve that the crowd can feel even if they can't describe it. Plan the journey before you hit Play.",
        exercise: {
          title: "The 45-Minute Blueprint Challenge",
          description: "Design a complete set structure on paper before you touch the decks — this is how pros prepare.",
          steps: [
            "Map out 5 energy blocks: Opening (low/mid), Build (rising), Peak (maximum energy), Breathing Room (cooldown), and Finale (strong exit).",
            "Assign 2-3 key tracks to each block — tracks you know will deliver the right energy.",
            "For each block, prepare one alternative track in case the vibe calls for a different direction. Flexibility is power.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Write the plan, then be ready to throw parts of it away. A blueprint gives you direction — the dancefloor gives you the final say.",
          "The transitions between energy blocks are the make-or-break moments. Nail those, and the rest takes care of itself.",
          "Always plan your landing. The last 2-3 tracks of your set are what people remember. Don't just fade out — close with purpose.",
        ],
      },
      2: {
        title: "Pivot points — the transitions that define your set",
        subtitle: "Your set lives or dies on 4-5 key moments",
        videoDescription: "Identify and master the handful of critical transitions that make or break your entire set.",
        content:
          "Here's an insider truth: a 45-minute set has maybe 12-15 transitions, but only 4 or 5 of them really matter. These are your pivot points — the moments where you shift energy direction, change the vibe, or take the crowd somewhere new. The transition from your build to your peak? That's a pivot. The cooldown after a massive drop? Pivot. The surprise genre shift that makes the crowd lose their minds? Huge pivot. These moments need to be rehearsed like scripted scenes in a movie. You can improvise the connecting transitions, but your pivots should be bulletproof.",
        keyTakeaway: "Don't try to make every transition a masterpiece. Focus your energy on the 4-5 pivot points that actually shape the crowd's experience.",
        exercise: {
          title: "Master Your Four Key Pivots",
          description: "Identify and rehearse the transitions that will define your set — these are your money moments.",
          steps: [
            "From your blueprint, identify 4 high-risk transitions — the moments where energy direction changes significantly.",
            "For each one, write out: the entry cue, what you'll do with EQ/FX during the blend, and the exit cue.",
            "Rehearse these 4 transitions on repeat until they're second nature. You should be able to nail them with your eyes closed.",
          ],
          estimatedTime: "11 minutes",
        },
        tips: [
          "Every critical transition needs a simpler fallback version. If the complex version isn't landing, pivot to the safe option — the crowd will never know.",
          "Don't change too many things at once during a pivot. EQ shift + FX + loop + volume change all at once? That's a recipe for chaos. Sequence your moves.",
          "Consistency will always beat forced originality. A reliable transition that lands every time is worth more than a flashy one that works 50% of the time.",
        ],
      },
      3: {
        title: "From bedroom to booth — real-world preparation",
        subtitle: "Professionalism starts before you ever press Play",
        videoDescription: "Get your set club-ready with the same prep routine professional DJs use before every gig.",
        content:
          "You've come a long way — your mixing is tight, your set is planned, your pivots are rehearsed. But here's where a lot of talented bedroom DJs stumble: the technical prep for a real gig. A corrupt USB, a track with a bad BPM grid, a missing file — any of these can unravel an otherwise perfect set. The pros don't leave this to chance. They have systems: primary and backup USBs, verified grids on every critical track, and an emergency crate of crowd-pleasers ready to go. This isn't the glamorous part of DJing, but it's what separates the DJs who get rebooked from the ones who don't.",
        keyTakeaway: "Technical preparation is the unsexy secret behind every smooth performance. The crowd sees confidence — but behind it is obsessive preparation.",
        exercise: {
          title: "The Pre-Gig Checklist",
          description: "Run through this as if you're playing a club tomorrow night. Build the habit now — it'll save you when it counts.",
          steps: [
            "Prepare your primary USB with your full set. Then prepare a backup USB with the same content. Always two copies.",
            "Open every critical track and verify: BPM is correct, beat grid is locked, no audio glitches in the waveform.",
            "Build a 10-track emergency crate — tracks that work in any situation, any energy level. This is your panic button playlist.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "If you can test your USB on a different setup before the gig, do it. File compatibility issues are real and they're devastating to discover mid-set.",
          "Name your playlists by energy intent, not genre. 'Floor Savers', 'Peak Bangers', 'Smooth Openers' — when adrenaline hits, you want instant clarity.",
          "The DJ who prepares for the worst case delivers the best performance. Over-preparation isn't paranoia — it's professionalism.",
        ],
      },
    },
  },
  9: {
    title: "Club Performance",
    description: "This is it — the real stage. Everything you've learned comes together under the lights. Let's make sure you're ready.",
    slides: {
      1: {
        title: "Your pre-performance mental routine",
        subtitle: "How to stay sharp when the adrenaline hits",
        videoDescription: "Build a pre-gig ritual that keeps you calm, focused, and ready to deliver your best.",
        content:
          "Let's be real: the first time you stand behind real decks with a crowd watching, your heart is going to pound. Your hands might shake a little. Your brain might go blank for a second. That's completely normal — it happens to everyone, even DJs with hundreds of gigs under their belt. The difference is that pros have a ritual. They don't rely on willpower or 'hoping they'll feel ready.' They have a 5-minute routine they run every single time: controlled breathing to calm the nervous system, a quick technical check so there are no surprises, and a mental visualization of their first two transitions. By the time they press Play, they're not reacting to stress — they're executing a plan.",
        keyTakeaway: "Nerves are normal and never fully go away. The pros don't fight them — they have a routine that turns anxiety into focused energy.",
        exercise: {
          title: "The 5-Minute Pre-Game Ritual",
          description: "Practice this every time you mix — even at home. When game day comes, it'll be second nature.",
          steps: [
            "60 seconds of controlled breathing: 4 seconds in, 4 seconds hold, 6 seconds out. Feel your heart rate drop.",
            "Technical check: gain levels, cue point, booth monitor volume, opening track loaded and cued. No surprises.",
            "Close your eyes and visualize your first two transitions — hear them in your head before they happen in the room.",
          ],
          estimatedTime: "6 minutes",
        },
        tips: [
          "Your opening transition should always be your safest, most reliable one. Save the creative risks for when you've settled into the groove.",
          "Have a mental script for common incidents: track won't load, crowd is cold, sound cuts out. Knowing your response in advance prevents panic.",
          "Set up your booth exactly how you like it before the set starts. Comfort with your equipment directly improves your decision-making under pressure.",
        ],
      },
      2: {
        title: "Adapting to the room and sound system",
        subtitle: "The same mix sounds different in every venue — learn to adjust fast",
        videoDescription: "Discover how professional DJs calibrate their style to any room within the first three tracks.",
        content:
          "Here's something that surprises a lot of bedroom DJs the first time they play out: that transition you perfected at home? It sounds completely different on a club system. The bass might be overwhelming, the highs might cut through too sharply, the reverb in the room might blur your clean blends. Every venue is different, and the best DJs in the world spend their first 2-3 tracks calibrating — not showing off. They're listening to how bass sits in the room, testing how their transitions translate on the PA, and making EQ adjustments based on what they actually hear, not what they remember from practice. This is advanced territory — be proud you're here, because most DJs never learn this.",
        keyTakeaway: "Pro DJs don't play the same way everywhere — they adapt to every room within the first few tracks. Your ears are your most important piece of equipment.",
        exercise: {
          title: "The 3-Track Room Calibration",
          description: "Train yourself to read a sound system and adapt your style quickly — this is what booked DJs do instinctively.",
          steps: [
            "Track 1: Play a track you know intimately. Listen for how the bass sits, whether mids are clear, if highs feel harsh. Read the room.",
            "Track 2: Execute one clean transition. How does it feel through the PA? Does the blend sound muddy or tight?",
            "Track 3: Based on what you've heard, adjust your EQ approach and gain staging. This is your calibrated baseline for the rest of the set.",
          ],
          estimatedTime: "9 minutes",
        },
        tips: [
          "If the room sounds boomy and bass-heavy, your first move should be simplifying your low-end work. Less bass layering, cleaner swaps.",
          "Always keep headroom. If you're pushing your meters into the red to 'sound louder,' you're actually making it worse. Leave space for dynamics.",
          "Never try to fix clarity issues by just turning up the volume. That makes everything louder AND muddier. Fix the EQ first, always.",
        ],
      },
      3: {
        title: "Handling real incidents like a pro",
        subtitle: "Cables fail, tracks glitch, crowds drop — here's how you survive",
        videoDescription: "Build the operational toughness that separates reliable, bookable DJs from one-hit wonders.",
        content:
          "Here's the truth about live performance: things will go wrong. A track you didn't analyze properly has a weird intro. A cable comes loose. The crowd that was going crazy suddenly gets distracted by something at the bar. These aren't hypothetical — these are Tuesday night realities for working DJs. What defines you in these moments isn't technical skill — it's operational toughness. Can you diagnose the problem in 3 seconds? Can you stabilize in 10? Can you relaunch the energy within two tracks? If yes, you're a professional. If you panic and fumble? You won't get called back. This is the skill that gets you rebooked.",
        keyTakeaway: "Live performance isn't about perfection — it's about continuity. Diagnose fast, stabilize immediately, relaunch confidently. That's the pro loop.",
        exercise: {
          title: "The Incident Simulation Challenge",
          description: "Deliberately create three different problems during a practice set — then prove you can handle all of them without stopping.",
          steps: [
            "Scenario 1: Load a track with bad analysis (wrong BPM grid). Catch it and correct before the audience would notice.",
            "Scenario 2: Botch a transition on purpose. Immediately recover with a safe track — smooth and confident.",
            "Scenario 3: Simulate an energy drop mid-set. Relaunch the dancefloor within two tracks using your emergency crate.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Your anti-panic crate should always be loaded and ready. 5-8 tracks that work in any situation. This is your insurance policy.",
          "Drill the recovery loop until it's automatic: Diagnose → Act → Stabilize. The shorter that loop, the more professional you are.",
          "Calm behavior is literally audible in your mix. When you're panicking, you rush transitions, over-EQ, and make things worse. Breathe, then act.",
        ],
      },
    },
  },
  10: {
    title: "Complete Mastery",
    description: "Look how far you've come. This is where you stop being 'someone who DJs' and start being a DJ. Let's make it official.",
    slides: {
      1: {
        title: "Finding your artistic identity",
        subtitle: "Your sound, your energy, your signature — this is what makes you bookable",
        videoDescription: "Transform your technical skills into something more powerful: a recognizable identity that's uniquely yours.",
        content:
          "Here's the biggest shift that happens at this level: it's no longer about mixing cleanly. You already know how to do that. Now it's about identity. When someone hears your set, can they tell it's you? Not because of a gimmick — but because of how you curate tracks, how you build energy, the transitions you favor, the moments you create. Think about the DJs you admire most — they have a vibe, a fingerprint. That's what you're building now. Your track selection tells people who you are more than any amount of technical skill ever could. A DJ who plays the same tracks as everyone else but mixes perfectly is forgettable. A DJ with a clear sonic identity and decent mixing? Unforgettable.",
        keyTakeaway: "Mastery isn't about mixing perfectly — it's about being consistently, recognizably you. Identity is built through curation, not complexity.",
        exercise: {
          title: "Your 20-Minute Signature Set",
          description: "Build a mini-set that sounds like nobody else. This is your artistic fingerprint.",
          steps: [
            "Hand-pick 6-8 tracks that genuinely represent YOUR taste — not what's trending, not what other DJs play. Tracks that feel like you.",
            "For each transition, write one sentence describing your intent: 'Build tension slowly,' 'Surprise key change,' 'Let the vocal breathe.'",
            "Record the full mini-set, listen back, and identify 3 things that feel uniquely yours. Those are your strengths — double down on them.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Your track selection is your identity. Spend more time on curation than on learning new FX tricks — that's what gets you remembered.",
          "Study DJs you love, but never try to clone their sets. Absorb their philosophy, then express it in your own voice.",
          "Reliable quality beats occasional brilliance every time. The DJ who delivers 8/10 every night gets booked more than the one who swings between 6 and 10.",
        ],
      },
      2: {
        title: "The Capstone: your 45-minute club set",
        subtitle: "Everything you've learned, in one uninterrupted performance",
        videoDescription: "This is your final Mixy challenge — a full set that proves you're ready for any stage.",
        content:
          "This is the moment. Everything — the beatmatching, the phrasing, the EQ work, the creative transitions, the crowd reading, the set architecture, the error recovery, the booth preparation — it all comes together in one 45-minute set. No pauses. No restarts. Just you, your tracks, and the story you're telling. This isn't a test you can fail — it's a performance you learn from. Record it, review it honestly, identify what worked and what didn't, then do it again with corrections. When you can run a full set that feels stable, intentional, and emotionally compelling from start to finish? That's not just a Mixy milestone — that's a real, operational DJ skill that venues will pay for.",
        keyTakeaway: "If you can deliver a stable, emotionally compelling 45-minute set in one take, your DJ skills are real. This isn't a certificate — it's proof.",
        exercise: {
          title: "The Final Mixy Set",
          description: "Design it. Perform it. Review it. Improve it. This is your graduation project — give it everything you've got.",
          steps: [
            "Build your full 45-minute set using your blueprint method. Include A/B alternatives for key moments in case you need to adapt.",
            "Perform the entire set in one take. No pausing, no restarting. Treat it like a real gig with a real crowd watching.",
            "Listen back critically. Review every transition, every energy shift, every recovery moment. Be honest with yourself.",
            "Identify your top 3 weak points, fix them, and perform the set again. Notice how much better the second run feels.",
          ],
          estimatedTime: "20 minutes",
        },
        tips: [
          "The goal isn't zero mistakes — it's zero panic. Mistakes happen to everyone. What matters is that you handle them with composure.",
          "Your set should be 'readable' from start to finish — meaning anyone listening can feel the emotional journey, even if they can't explain it.",
          "Archive every recording. Seriously. Six months from now, you'll listen back to today's set and be amazed at how far you've come. That's the most motivating thing in the world.",
        ],
      },
      3: {
        title: "Beyond Level 10: your pro roadmap",
        subtitle: "The best DJs never stop training — here's how to keep growing",
        videoDescription: "Build a sustainable long-term practice system so you keep improving for years, not weeks.",
        content:
          "Congratulations — reaching Level 10 is a genuine achievement, and you should be incredibly proud. But here's the honest truth from every working DJ: this isn't the finish line. It's the starting line of your professional journey. The DJs who build real careers aren't the ones with the most talent — they're the ones with the most discipline. They have a weekly practice routine: technical drills to keep their skills sharp, full-set sessions to build stamina, review rituals to catch bad habits early, and measurable KPIs to track real progress. The path from here isn't about learning new tricks — it's about deepening everything you already know and making it bulletproof under any conditions.",
        keyTakeaway: "Level 10 isn't the end — it's where the real journey begins. The pros who stay at the top do it with structured, disciplined practice. Week after week, year after year.",
        exercise: {
          title: "Your 8-Week Pro Development Plan",
          description: "Build a sustainable practice routine that keeps you improving long after Mixy. This is how careers are built.",
          steps: [
            "Schedule your week: 2 focused technical sessions (transitions, EQ, FX) + 1 full-set session. Put it in your calendar like a real commitment.",
            "Track your KPIs every session: transition quality, tempo consistency, energy flow, recovery speed. Numbers don't lie.",
            "Share one clip per week publicly and ask for specific, focused feedback. Growth accelerates when you open yourself to outside perspective.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "What you don't measure, you can't improve. Track your progress with the same seriousness a pro athlete tracks their stats.",
          "After every set — practice or live — run a quick review: what worked, what didn't, what do I drill next? Make this ritual non-negotiable.",
          "Long-term progress isn't about motivation — it's about discipline. Motivation fades. Systems don't. Build the system and trust the process.",
        ],
      },
    },
  },
};

const EN_LEVEL_1_FLX3_XDJ: LocalizedModuleOverride = {
  title: "Your First Steps as a DJ",
  description:
    "We're laying the foundations together: your software, your controller, your first reflexes. After this, you'll already be able to launch your tracks and understand how everything works. Let's go!",
  slides: {
    1: {
      title: "Welcome to the world of DJing!",
      subtitle: "Rekordbox, your FLX3 / XDJ-RX setup, and your very first reflexes",
      videoDescription:
        "Export & Performance modes in Rekordbox — essential before plugging in your FLX3, and for preparing USB sticks for an XDJ-RX.",
      content: `**Hey, welcome! You're officially on your way to becoming a DJ.**

No stress — we're going through everything together. Today we discover Rekordbox and your setup (DDJ-FLX3 or XDJ-RX) — gear you'll find in tons of clubs and gigs.

**Rekordbox — what's the deal?**
It's the software that bridges your laptop and your deck. It shows your tracks, the tempo (BPM), and the waveforms so you can **see** your music as well as hear it.

**Two modes to remember**
- **Export**: your workshop. You prep your music at home (playlists, tempo, cue points). **Essential if you're using an XDJ-RX with USB sticks.**
- **Performance**: the stage! Plug in your FLX3 and mix live.

**Your setup at a glance**
- **DDJ-FLX3**: more visible buttons than an FLX4, direct access to effects (Smart CFX, Beat FX) — we'll explore those step by step.
- **XDJ-RX**: you can mix **without a laptop** using USB sticks. The built-in screen replaces the computer — real club vibes!

**Your very first DJ reflexes**
1. Import a few tracks into Rekordbox
2. Create a small practice playlist (5 tracks with close tempos, say 124–128 BPM)
3. Run the analysis so the software detects the tempo automatically
4. Load a track on each deck and listen through your headphones

It's totally normal if everything doesn't click right away. The important thing is to get hands-on and explore — that's how you learn!`,
      keyTakeaway:
        "Export to prepare, Performance to mix. Whether it's FLX3 or XDJ-RX, the method stays the same: import, analyze, listen on headphones. You just laid your first brick!",
      exercise: {
        title: "Prep your first 5 tracks + Export test",
        description:
          "The common starting point for both machines — everything begins here!",
        steps: [
          "Create a playlist called 'Mixy FLX3/XDJ' with 5 tracks in a style you love.",
          "Analyze them (BPM / grid) and fix a grid if the kick doesn't land right on the lines.",
          "Set 4 Hot Cues per track: intro, bridge, drop, outro.",
          "If you're aiming for an **XDJ-RX**: export the playlist to a USB stick (Export mode) and check it shows up correctly.",
          "If you're aiming for a **FLX3**: load a track on A and B in Performance mode and verify the beat through your headphones.",
        ],
        estimatedTime: "18 minutes",
      },
      tips: [
        "On FLX3, note the pad names in the manual — they change depending on the active layer.",
        "On XDJ-RX, keep a backup USB stick — your USBs are your 'stage hard drive'.",
        "Don't crank the master until the trims are calibrated. Patience!",
      ],
    },
    2: {
      title: "Let's plug everything in: FLX3 or XDJ-RX",
      subtitle: "FLX3: USB + headphones + master — XDJ: USB sticks + speakers + headphones",
      videoDescription:
        "Example FLX controller video (port visuals) — for XDJ-RX, add the 'playlists on USB stick' step before powering on.",
      content: `**Alright, let's get everything hooked up!** It's not the most exciting part, but clean connections = clean sound. And that changes everything.

**DDJ-FLX3 (with laptop)**
Laptop → **USB** → controller → **MASTER OUT** → active speakers (LINE input). **Headphones** on **PHONES**. Check **your** manual for any extra MIC or AUX inputs.

**XDJ-RX (no PC while mixing)**
- Connect **speakers** to the **Master** output (RCA/XLR depending on model).
- **Headphones** into the DJ / booth jack.
- Insert one or two **USB sticks** with your exported playlists; browse tracks from the **screens**.
- The PC is only for prep at home — during a mix, the XDJ is fully standalone!

**Common ground (both machines)**
- Faders and master at **zero** before powering on the speakers. Always!
- Set the **trims**: signal in the green/orange zone, never sitting in the red.
- No big speakers? Small active monitors work perfectly fine for practice.

**Support & manuals**
- Manuals, firmware, drivers: https://www.pioneerdj.com/en/support/`,
      keyTakeaway:
        "FLX3 = laptop–controller–speakers chain. XDJ-RX = USB stick + speakers + headphones, the PC is just for prep. Either way, the reflex is: faders to zero, bring it up gradually!",
      exercise: {
        title: "Connection checklist for your machine",
        description:
          "A routine to run before every session — done in 5 minutes flat!",
        steps: [
          "Write down: 'FLX3 + PC' or 'XDJ standalone'.",
          "FLX3: data USB cable OK? XDJ: stick recognized on the player?",
          "Speakers on LINE input (not phono!); master brought up gradually.",
          "Headphones: preview one deck in your headphones without clipping the master.",
          "If everything's clean, play a track and enjoy — you've got a working setup!",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "XDJ: format your USB sticks as FAT32 if the manual recommends it — avoids nasty surprises.",
        "FLX3: update Rekordbox and the firmware on the same day to dodge compatibility issues.",
        "Always keep a clean power strip and a spare cable in your DJ bag.",
      ],
    },
    3: {
      title: "BPM: The heartbeat of your music",
      subtitle: "Understanding the fundamental rhythm that drives every mix",
      videoDescription:
        "You can see the tempo displayed in Rekordbox and the grid on the waveform — super helpful for connecting your ear to the screen, whether you're on FLX3 or XDJ-RX.",
      content: `**OK, now we're getting into the real stuff.** BPM is THE fundamental concept of DJing. But don't worry — it's way simpler than it sounds.

**BPM (Beats Per Minute) — what is it?**
It's simply the number of beats per minute. It's the pulse of your music, its heartbeat.

**Picture two metronomes:**
- Metronome 1: 120 clicks per minute
- Metronome 2: 140 clicks per minute
- Result: total chaos! Beats clashing all over the place.

**BPM by genre (to help you navigate):**
- House: 120–130 BPM (steady groove, perfect for beginners)
- Techno: 125–140 BPM (a bit faster, more energy)
- Hip-Hop: 85–115 BPM (slower, more groovy)
- Drum & Bass: 160–180 BPM (now we're flying!)

**The secret of DJing is this:**
Two tracks at the **same BPM** = they sound great together. Two different BPMs = chaos. It's that simple.

**On your DDJ-FLX3**
- The tempo is displayed per deck in Rekordbox (e.g. 124.0). After analysis, that number should match what you hear.
- The **tempo fader** sits right on the front panel — you can fine-tune it easily. The **Smart CFX** zone lets you color the sound, but we'll cover that later; for now, focus on BPM.
- The **Sync** button is there to help you at the start — and it's totally OK to use it! But also practice **feeling** the drift in your headphones.

**On your XDJ-RX**
- The BPM shows directly on the player's **screen**, no computer needed. That's the club way!
- You adjust the tempo with the **pitch fader** or via the **jog wheels** depending on the model. The on-screen readout confirms the BPM in real time.
- Practice **feeling** the drift in your headphones — when you're mixing without a laptop, that instinct is what'll save you.

**Just remember this for now:**
BPM is the rhythm. Two identical rhythms = harmony. Two different rhythms = train wreck. Simple, effective, fundamental.`,
      keyTakeaway:
        "BPM is the pulse of your music. Two tracks at the same BPM = magic. On FLX3 you see it in Rekordbox, on XDJ-RX it's right on the screen — same reflex, same principle!",
      exercise: {
        title: "Feel the BPM with your body",
        description:
          "Before you even touch your FLX3 or XDJ-RX, learn to feel the rhythm — it's your best tool!",
        steps: [
          "Pick a track you love and hit play.",
          "Tap your foot or nod your head on every beat: 1-2-3-4, 1-2-3-4…",
          "Count the beats for 15 seconds.",
          "Multiply by 4 → you've got the approximate BPM!",
          "Check with Rekordbox (FLX3) or directly on the screen (XDJ-RX): were you close?",
          "Repeat with 4 more tracks in different genres — you'll notice your ear sharpens quickly.",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "On FLX3, locate the tempo fader for each deck — that's the one you'll be using next lesson to align BPMs.",
        "On XDJ-RX, the screen gives you the BPM without a computer: get used to reading the display rather than the laptop.",
        "Tracks in the same genre usually have similar BPMs — that's why DJs start by mixing within one genre.",
      ],
    },
    4: {
      title: "Pitch: your tempo alignment tool",
      subtitle: "Master the fader that makes beatmatching possible",
      videoDescription:
        "Tempo / beatmatch example — the logic is the same on FLX3 and XDJ-RX, only the fader placement differs.",
      content: `**Now that we understand BPM, let's move on to the tool that lets you line everything up: the Pitch.**

**The problem:**
You've got two tracks you love, but they're not at the same BPM.
- Track A: 120 BPM
- Track B: 128 BPM
- Result: they don't fit together

**The solution: the Pitch fader**
This slider speeds up or slows down a track.
- Push the pitch down → the track speeds up
- Pull the pitch up → the track slows down
(Careful — it's sometimes reversed depending on the model — check yours!)

**Concrete example:**
- Track A: 120 BPM (leave it as is)
- Track B: 128 BPM (slow it down to 120 with the pitch)
- Result: both are running at 120 BPM = aligned, clean!

**Good to know:**
- Pitch also slightly changes the key. That's normal — it's part of the game.
- Beyond ±8–10%, things start sounding weird. Stay within a reasonable range.

**On your DDJ-FLX3**
- The **pitch** fader is on the front panel per deck; **Tempo Range** widens or narrows the usable range. **Smart CFX** colors the sound — one knob at a time when you're starting out!

**On your XDJ-RX**
- The tempo is controlled via the **screen** / the deck **jog wheel**: the displayed BPM should match what you hear. **Key Lock / Master Tempo** in the menu keeps vocals from warping.

**Rekordbox (for both)**
- Enable **Key Lock / Master Tempo** if you want to change the tempo without affecting the pitch too much — test it in your headphones.

This is where it gets really fun: you're starting to **control** your music!`,
      keyTakeaway:
        "Same pitch logic everywhere: FLX3 = visible faders; XDJ-RX = on-screen control. You now hold the key tool for beatmatching!",
      exercise: {
        title: "Pitch alignment drill",
        description:
          "Time to put theory into practice — align two tracks by ear and by sight!",
        steps: [
          "Load two tracks with a 3–5 BPM difference onto decks A and B.",
          "Use the pitch fader to bring Track B's BPM in line with Track A.",
          "Hit play on both and listen in your headphones — are the kicks landing together?",
          "If they drift apart, nudge the jog wheel to push them back in sync.",
          "Try it 3 times with different pairs — you'll feel the improvement each round.",
        ],
        estimatedTime: "8 minutes",
      },
      tips: [
        "On FLX3, the pitch fader is clearly accessible — practice nudging it in tiny increments rather than big jumps.",
        "On XDJ-RX, use the on-screen BPM readout as a guide, but always confirm with your ears.",
        "Enable Key Lock if the vocals start sounding chipmunk-y — it preserves the original key while you change tempo.",
      ],
    },
    5: {
      title: "Your very first transition!",
      subtitle: "Prepare, listen, blend, switch — you've got this",
      videoDescription:
        "A 'drop mix' style transition: inspiration for a clean handover once the tempo is aligned. Apply this on your FLX3 or XDJ-RX!",
      content: `**This is the moment you've been waiting for: your very first transition!** Everything we've covered before was building up to this. You're ready.

**Here's how it goes, step by step:**

**Step 1 — Preparation (30 seconds before)**
- Track A is playing on deck A (e.g. 124 BPM)
- Load Track B on deck B
- Adjust the pitch so B is also at 124 BPM
- Preview B in your headphones with the **Cue** button

**Step 2 — Listen and align (10 seconds)**
- Listen to A and B together in your headphones
- Check that the kicks land at the same time
- If it drifts a bit, give the jog wheel a little nudge to realign
- When it's locked in → on to the next step!

**Step 3 — The blend (5–10 seconds)**
- Slowly bring up the channel fader for B
- Gradually bring down the one for A
- Both tracks are playing together — and it sounds good!
- The crowd doesn't even notice you're switching tracks

**Step 4 — The handover (1–2 seconds)**
- Cut A completely
- B takes over
- That's it! Your first transition!

**Bonus tips for your machine:**
- **FLX3**: you have access to **Smart CFX** to add a filter or echo during the transition — makes the handover even smoother. Try it once the basic transition is clean.
- **XDJ-RX**: browse your tracks directly on the screen and select the next one from the USB stick. The advantage? No laptop to manage — you stay 100% focused on the mix.

**The truth:**
- It looks complicated written out like this, but in reality it becomes natural super fast
- Your first transition might not be perfect — and that's **totally normal**
- Even the biggest DJs struggled at the beginning
- The key is to practice, have fun, and do it again

**You just hit a huge milestone.** You now know how to prepare your tracks, hook up your gear, understand BPM, adjust the pitch, and make a transition. That's the foundation of ALL DJing. The rest is practice and creativity!`,
      keyTakeaway:
        "Prepare, listen, blend, switch — that's all there is to it! Whether on FLX3 or XDJ-RX, the method is identical. Be proud of yourself — you're officially a DJ!",
      exercise: {
        title: "Do your first real transition on FLX3 or XDJ-RX",
        description:
          "This is the big moment — go for it, you've got this!",
        steps: [
          "Load two tracks with close BPMs (3 BPM apart max) onto decks A and B.",
          "Align B's tempo to A's using the pitch fader.",
          "Launch B and preview it in your headphones with the Cue button. Tap your foot to check the beats lock in.",
          "When you feel it's locked, slowly bring up B's channel fader.",
          "Gradually bring down A's fader over 8 beats (count in your head: 1-2-3-4-5-6-7-8).",
          "Cut A. B is playing solo. Congratulations — you just nailed your first transition!",
          "Repeat 3 times with different tracks — each time, it gets easier.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "On FLX3, Smart CFX can smooth a transition: try a low-pass filter as you bring up B's fader.",
        "On XDJ-RX, prep your USB stick with tracks in order — it saves you a ton of time during a mix.",
        "Record your sessions! Listening back is the single best way to improve.",
      ],
    },
  },
};

function localizeModules(modules: CourseModule[], language: Language): CourseModule[] {
  if (language !== "en") return modules;
  return modules.map((module) => {
    const override = EN_LEVEL_6_TO_10_OVERRIDES[module.level];
    if (!override) return module;
    return {
      ...module,
      title: override.title,
      description: override.description,
      slides: module.slides.map((slide) => {
        const os = override.slides[slide.slideNumber];
        if (!os) return slide;
        return {
          ...slide,
          title: os.title,
          subtitle: os.subtitle,
          videoDescription: os.videoDescription,
          content: os.content,
          keyTakeaway: os.keyTakeaway,
          exercise: os.exercise,
          tips: os.tips,
        };
      }),
    };
  });
}

/**
 * NIVEAU 1 — parcours FLX4 (débutant, surface compacte, touches Shift / Merge FX)
 */
export const level1ModuleFlx4: CourseModule = {
  level: 1,
  title: "Tes premiers pas de DJ",
  description:
    "On pose les bases ensemble : ton logiciel, ton contrôleur, tes premiers réflexes. Après ça, tu seras déjà capable de lancer tes morceaux et de comprendre comment tout fonctionne. C'est parti !",
  userLevels: ["beginner"],
  totalSlides: 5,
  estimatedDuration: "40 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Bienvenue dans le monde du DJing !",
      subtitle: "Rekordbox, ta FLX4 et tes tout premiers réflexes",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription:
        "Découvre le mode Performance de Rekordbox — regarde cette vidéo tranquillement avant de brancher ta table. Active les sous-titres si besoin !",
      illustrations: [
        {
          url: "https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-flx4/black/ddj-flx4-angle-ttl-1200.jpg",
          alt: "Contrôleur DJ DDJ-FLX4 — vue en plongée",
          caption:
            "FLX4 : jogs, faders, mixer au centre, pads en dessous. Garde en tête que **Shift** + pad ou bouton ouvre souvent la « 2e couche » (voir le manuel Layer).",
        },
      ],
      content: `**Hey, bienvenue ! Tu es officiellement en route pour devenir DJ.**

Pas de stress, on va tout voir ensemble, étape par étape. Aujourd'hui, on s'attaque à Rekordbox et à ta DDJ-FLX4 — un super setup pour débuter.

**Rekordbox, c'est quoi en gros ?**
C'est le logiciel qui fait le pont entre ton ordi et ta table. Il affiche tes morceaux, le tempo (BPM), et les formes d'onde pour que tu puisses **voir** ta musique en plus de l'entendre. C'est un peu ton tableau de bord de DJ.

**Les deux modes à retenir**
- **Export** : c'est ton atelier. Tu prépares ta musique (playlists, tempo, repères) — tranquille chez toi, sans pression.
- **Performance** : c'est la scène ! Tu branches ta FLX4 et tu mixes en direct.

**Ta DDJ-FLX4 en un coup d'œil**
Deux platines, un mixer au centre, des pads en bas. Plein de fonctions passent par la touche **Shift** (une sorte de « deuxième couche ») — on les découvrira au fur et à mesure, pas besoin de tout maîtriser maintenant.

**Tes tout premiers réflexes de DJ**
1. Importe quelques morceaux dans Rekordbox
2. Crée une petite playlist d'entraînement (5 titres au tempo proche, genre 124–128 BPM)
3. Lance l'analyse pour que le logiciel détecte le tempo automatiquement
4. Charge un morceau sur chaque platine et écoute au casque

T'inquiète, c'est normal si tout n'est pas clair du premier coup. L'important c'est de manipuler, de toucher aux boutons, d'explorer. C'est comme ça qu'on apprend !`,
      keyTakeaway:
        "Export pour préparer, Performance pour mixer. Importe, analyse, écoute au casque — c'est la routine de tout DJ. Tu viens de poser ta première brique !",
      exercise: {
        title: "Prépare tes 5 premiers morceaux dans Rekordbox",
        description:
          "C'est l'exercice n°1 de tout DJ — même les pros font ça avant chaque set !",
        steps: [
          "Installe Rekordbox (dernière version stable) et ouvre le mode Performance.",
          "Crée une playlist « Entraînement Mixy » avec 5 titres du même style que tu kiffes.",
          "Sélectionne-les → clic droit → Analyse (tempo / grille).",
          "Ouvre un morceau, zoome sur la waveform et vérifie que chaque kick tombe bien sur une ligne de grille.",
          "Pose 4 Hot Cues par morceau : intro, avant le refrain, drop, outro.",
          "Charge le même titre sur les decks A et B : écoute A au casque, B en silence — tu entends le beat identique des deux côtés ?",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "La FLX4 a parfois deux ports USB-C : vérifie dans ton manuel lequel est données et lequel est charge.",
        "Si tu utilises du streaming, vérifie la stabilité de ta connexion — rien de pire qu'un morceau qui coupe en plein mix !",
        "Garde toujours une clé USB de backup exportée, au cas où tu joues ailleurs que chez toi.",
      ],
    },
    {
      slideNumber: 2,
      title: "On branche tout : USB, enceintes, casque",
      subtitle: "La chaîne audio de A à Z — propre et sans grésillements",
      videoUrl: "https://www.youtube.com/embed/kZKBeztMbZY",
      videoDescription:
        "Tour complet débutant sur la DDJ-FLX4 : branchements, faders, vue du matériel — en anglais mais très visuel, active les sous-titres auto.",
      content: `**Allez, on passe aux choses sérieuses : le branchement !** C'est pas la partie la plus glamour, mais crois-moi, un bon branchement c'est la base d'un bon son.

**La chaîne audio, c'est simple :**
Ordinateur → **USB** → contrôleur → **MASTER OUT (RCA)** → enceintes actives (ou ampli + enceintes passives).

**Étape par étape (pour un son propre dès le départ)**
- Mets **tous les faders et le master à zéro** avant d'allumer quoi que ce soit. C'est un réflexe de pro !
- Branche le câble **USB** entre ton PC/Mac et la FLX4.
- **Sortie Master** : câble RCA fourni → entrée **LINE** des enceintes (pas « Phono » !). Rouge avec rouge, blanc avec blanc.
- **Casque** sur la prise **PHONES** (6,35 mm) : c'est là que tu prépares ton prochain morceau en secret, sans que le public entende.

**Les réglages de base avant de monter le son**
- **Trim / Gain** par voie : monte doucement jusqu'à voir le signal dans le vert/orange. Si ça tape dans le rouge, c'est trop fort — baisse !
- **EQ** : laisse tout au centre (position midi) pour commencer. On verra les EQ en détail au niveau 2.
- **Crossfader** : pour tes premiers exercices, laisse-le **au centre** et joue plutôt avec les **channel faders** — c'est beaucoup plus précis pour apprendre.

**Pas de grosse sono ? Pas de souci !**
Des petites enceintes monitoring actives font très bien l'affaire pour s'entraîner. Et si tu es en appart, baisse un peu les basses — tes voisins te remercieront.`,
      keyTakeaway:
        "USB vers la table, Master vers les enceintes en LINE, casque sur PHONES pour préparer. Zéro saturation, on monte doucement. T'as le setup d'un vrai DJ !",
      exercise: {
        title: "Check-list branchement « zéro grésillement »",
        description:
          "Fais cette check-list avant chaque session — ça deviendra un automatisme !",
        steps: [
          "Faders à zéro, enceintes éteintes — branche les câbles Master (RCA → LINE).",
          "Branche le casque, allume la FLX4 puis l'ordi, ouvre Rekordbox en mode Performance.",
          "Lance un morceau sur un seul deck : vérifie le VU-mètre. Si ça touche le rouge en continu, baisse le trim.",
          "Active le **cue** casque sur ce deck : tu dois l'entendre clairement au casque sans que le master envoie du son.",
          "Note tes réglages quelque part : « volume enceintes à -6 dB, trim à 2h » — comme ça demain tu retrouves ton setup direct.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Repère le bouton split cue / mix sur ta FLX4 — ça change comment tu entends le casque.",
        "Un câble RCA trop long ou mal blindé peut ramasser du bruit parasite : change de câble avant d'accuser Rekordbox !",
        "Pense à mettre à jour le firmware de ta table — ça corrige parfois des bugs audio. Fais-le tranquillement, jamais juste avant un live.",
      ],
    },
    {
      slideNumber: 3,
      title: "Le BPM : le cœur de ta musique",
      subtitle: "Pourquoi deux morceaux ne sonnent pas toujours bien ensemble",
      videoUrl: "https://www.youtube.com/embed/3Gn8p0taPUg",
      videoDescription:
        "Tu vois le tempo affiché dans Rekordbox et la grille sur la waveform — super utile pour relier l'oreille et l'écran.",
      content: `**OK, là on rentre dans le vif du sujet.** Le BPM, c'est LE concept fondamental du DJing. Mais t'inquiète, c'est beaucoup plus simple que ça en a l'air.

**Le BPM (Beats Per Minute), c'est quoi ?**
C'est tout simplement le nombre de battements par minute. C'est le pouls de ta musique, son rythme cardiaque.

**Imagine deux métronomes :**
- Métronome 1 : 120 clics par minute
- Métronome 2 : 140 clics par minute
- Résultat : chaos total ! Ça claque dans tous les sens.

**Les BPM par genre (pour te repérer) :**
- House : 120–130 BPM (le groove régulier, parfait pour débuter)
- Techno : 125–140 BPM (un peu plus rapide, plus d'énergie)
- Hip-Hop : 85–115 BPM (plus lent, plus groovy)
- Drum & Bass : 160–180 BPM (là ça envoie du lourd !)

**Le secret du DJing, c'est ça :**
Deux morceaux au **même BPM** = ils sonnent bien ensemble. Deux BPM différents = le chaos. C'est aussi simple que ça.

**Sur ta FLX4 + Rekordbox**
- Le tempo est affiché par deck (ex. 124,0). Après analyse, ce chiffre doit correspondre à ce que tu entends.
- Le bouton **Sync** existe pour t'aider au début — et c'est OK de l'utiliser ! Mais entraîne-toi aussi à **sentir** le décalage au casque. C'est ce réflexe-là qui te sauvera quand la grille sera fausse ou en live sans écran.

**Tu retiens juste ça pour l'instant :**
Le BPM c'est le rythme. Deux rythmes identiques = harmonie. Deux rythmes différents = on court à la catastrophe. Simple, efficace, fondamental.`,
      keyTakeaway:
        "Le BPM c'est le pouls de ta musique. Deux morceaux au même BPM = magie. Tu viens de comprendre le concept le plus important du DJing, bravo !",
      exercise: {
        title: "Ressens le BPM avec ton corps",
        description:
          "Avant même de toucher la table, apprends à sentir le rythme — c'est ton meilleur outil !",
        steps: [
          "Choisis un morceau que tu kiffes et lance-le.",
          "Tape du pied ou hoche la tête sur chaque battement : 1-2-3-4, 1-2-3-4…",
          "Compte les battements pendant 15 secondes.",
          "Multiplie par 4 → tu as le BPM approximatif !",
          "Vérifie avec Rekordbox ou Shazam : t'étais proche ?",
          "Recommence avec 4 autres morceaux de styles différents — tu vas voir, ton oreille s'affine vite.",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Le BPM c'est juste un nombre — pas besoin de stresser, ça vient naturellement.",
        "Tu peux sentir le BPM avec ton corps : danse, tape du pied, bouge la tête !",
        "Les morceaux du même genre ont souvent des BPM proches — c'est pour ça que les DJs mixent par genre au début.",
      ],
    },
    {
      slideNumber: 4,
      title: "Le Pitch : ajuster la vitesse comme un pro",
      subtitle: "Comment aligner deux morceaux qui n'ont pas le même BPM",
      videoUrl: "https://www.youtube.com/embed/EQeEyyipaDE",
      videoDescription:
        "Exemple sur DDJ-FLX4 : tempo / beatmatch — tu vas voir le lien entre le mouvement du fader et le BPM affiché.",
      content: `**Maintenant qu'on a compris le BPM, on passe à l'outil qui va te permettre de tout aligner : le Pitch.**

**Le problème :**
Tu as deux morceaux que tu adores, mais ils n'ont pas le même BPM.
- Morceau A : 120 BPM
- Morceau B : 128 BPM
- Résultat : ils ne collent pas ensemble

**La solution : le fader de Pitch**
C'est ce curseur sur ta FLX4 qui accélère ou ralentit un morceau.
- Tu pousses le pitch vers le bas → le morceau accélère
- Tu tires le pitch vers le haut → le morceau ralentit
(Attention, c'est parfois inversé selon les modèles — vérifie sur le tien !)

**Exemple concret :**
- Morceau A : 120 BPM (tu le laisses tel quel)
- Morceau B : 128 BPM (tu le ralentis à 120 avec le pitch)
- Résultat : les deux tournent à 120 BPM = c'est aligné, c'est propre !

**Bon à savoir :**
- Le pitch change aussi légèrement la tonalité (le morceau sonne un poil plus aigu ou plus grave). C'est normal, ça fait partie du jeu.
- **Key Lock / Master Tempo** dans Rekordbox permet de limiter cet effet sur les voix — teste-le au casque, tu vas entendre la différence.
- Au-delà de ±8–10 %, ça commence à sonner bizarre. Reste dans une fourchette raisonnable.

**Sur ta DDJ-FLX4**
- Le fader de tempo est en général à côté du jog. Vérifie sur ton manuel la plage (±6 %, ±10 %, etc.) et le bouton « tempo range » si ta table en a un.
- Commence par des ajustements doux : 2-3 BPM max. Tu verras, ça suffit souvent.

C'est là que ça devient vraiment fun : tu commences à **contrôler** ta musique !`,
      keyTakeaway:
        "Le pitch te permet d'aligner la vitesse de deux morceaux. Petits ajustements = gros résultats. Tu tiens l'outil clé du beatmatching !",
      exercise: {
        title: "Joue avec le pitch sur ta FLX4",
        description:
          "C'est en manipulant qu'on comprend — on y va !",
        steps: [
          "Charge un morceau que tu connais bien sur le deck A. Lance-le.",
          "Bouge le fader de pitch doucement vers le bas : tu entends le morceau accélérer ?",
          "Remonte-le doucement : il ralentit. Tu sens la différence ?",
          "Maintenant charge le même morceau sur le deck B. Décale le pitch de +3 BPM sur B.",
          "Écoute les deux au casque en même temps : tu entends le décalage rythmique ? C'est ça qu'on va apprendre à corriger !",
          "Remets les deux au même BPM et savoure : quand c'est aligné, c'est magique.",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Les meilleurs DJs font des ajustements très légers — la finesse, c'est la clé.",
        "Commence par des morceaux proches en BPM (2-3 BPM d'écart max), puis augmente la difficulté.",
        "Active Key Lock si les voix sonnent bizarre après un gros changement de tempo.",
      ],
    },
    {
      slideNumber: 5,
      title: "Ta première transition !",
      subtitle: "Allez, on met deux morceaux ensemble pour de vrai",
      videoUrl: "https://www.youtube.com/embed/SR1xPdJs1k4",
      videoDescription:
        "Transition type « drop mix » sur DDJ-FLX4 : inspiration pour enchaîner proprement une fois le tempo aligné.",
      content: `**C'est le moment que tu attendais : ta toute première transition !** Tout ce qu'on a vu avant, c'était pour arriver là. Tu es prêt.

**Voilà comment ça se passe, étape par étape :**

**Étape 1 — Préparation (30 secondes avant)**
- Le morceau A tourne sur le deck A (ex. 124 BPM)
- Tu charges le morceau B sur le deck B
- Tu ajustes le pitch pour que B soit aussi à 124 BPM
- Tu écoutes B au casque avec le bouton **Cue**

**Étape 2 — Écoute et calage (10 secondes)**
- Tu écoutes A et B ensemble dans ton casque
- Tu vérifies que les kicks tombent en même temps
- Si ça décale un peu, tu donnes un petit coup de jog pour recaler
- Quand c'est calé → on passe à la suite !

**Étape 3 — Le mix (5-10 secondes)**
- Tu montes doucement le channel fader de B
- Tu baisses progressivement celui de A
- Les deux morceaux jouent ensemble — et ça sonne bien !
- Le public ne se rend même pas compte que tu changes de morceau

**Étape 4 — La bascule (1-2 secondes)**
- Tu coupes complètement A
- B prend le contrôle
- C'est fait ! Ta première transition !

**La vérité :**
- Ça a l'air compliqué écrit comme ça, mais en vrai ça devient naturel très vite
- Ta première transition sera peut-être pas parfaite — et c'est **totalement normal**
- Même les plus grands DJs ont galéré au début
- L'important c'est de s'entraîner, de s'amuser, et de recommencer

**Tu viens de franchir un cap énorme.** Tu sais maintenant préparer tes morceaux, brancher ta table, comprendre le BPM, ajuster le pitch, et faire une transition. C'est la base de TOUT le DJing. Le reste, c'est de la pratique et de la créativité !`,
      keyTakeaway:
        "Préparer, écouter, mixer, basculer — c'est tout ! Ta première transition est un moment magique. Sois fier de toi, tu es officiellement DJ !",
      exercise: {
        title: "Fais ta première vraie transition sur la FLX4",
        description:
          "C'est le grand moment — lance-toi, on y croit !",
        steps: [
          "Charge deux morceaux au BPM proche (max 3 BPM d'écart) sur les decks A et B.",
          "Aligne le tempo de B sur celui de A avec le pitch.",
          "Lance B et écoute-le au casque avec le bouton Cue. Tape du pied pour vérifier que les beats collent.",
          "Quand tu sens que c'est calé, monte doucement le fader de B.",
          "Baisse progressivement le fader de A pendant 8 temps (compte dans ta tête : 1-2-3-4-5-6-7-8).",
          "Coupe A. B joue tout seul. Félicitations, t'as fait ta première transition !",
          "Recommence 3 fois avec des morceaux différents — chaque fois, ça sera plus facile.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "La synchronisation, c'est 80 % du DJing. Le reste, c'est ta personnalité et ta créativité.",
        "Si ça décale pendant le mix, un petit coup de jog rattrape tout — personne ne remarquera.",
        "Enregistre tes sessions ! Réécouter, c'est le meilleur moyen de progresser.",
      ],
    },
  ],
};

/**
 * NIVEAU 1 — parcours DDJ-FLX3 & XDJ-RX (plus de contrôles visibles, logique type CDJ / club)
 */
export const level1ModuleFlx3Xdj: CourseModule = {
  level: 1,
  title: "Tes premiers pas de DJ",
  description:
    "On pose les bases ensemble : ton logiciel, ton contrôleur, tes premiers réflexes. Après ça, tu seras déjà capable de lancer tes morceaux et de comprendre comment tout fonctionne. C'est parti !",
  userLevels: ["beginner"],
  totalSlides: 5,
  estimatedDuration: "40 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Bienvenue dans le monde du DJing !",
      subtitle: "Rekordbox, ton setup FLX3 / XDJ-RX et tes tout premiers réflexes",
      videoUrl: "https://www.youtube.com/embed/EIUd_xdBYGs",
      videoDescription:
        "Modes Export & Performance dans Rekordbox — indispensable avant de brancher ta FLX3, et pour préparer les clés USB d'un XDJ-RX.",
      illustrations: [
        {
          url: "https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-flx3/black/ddj-flx3-angle-ttl-1200.jpg",
          alt: "Contrôleur DJ DDJ-FLX3 — voie mixer et sections effets",
          caption:
            "Sur FLX3, beaucoup de fonctions ont un bouton dédié (ex. Smart CFX). Sur XDJ-RX, l'équivalent se règle souvent à l'écran + molettes, comme sur des CDJ.",
        },
      ],
      content: `**Hey, bienvenue ! Tu es officiellement en route pour devenir DJ.**

Pas de stress, on va tout voir ensemble. Aujourd'hui, on découvre Rekordbox et ton setup (DDJ-FLX3 ou XDJ-RX) — des machines qu'on retrouve dans beaucoup de clubs et de soirées.

**Rekordbox, c'est quoi en gros ?**
C'est le logiciel qui fait le pont entre ton ordi et ta table. Il affiche tes morceaux, le tempo (BPM), et les formes d'onde pour que tu puisses **voir** ta musique en plus de l'entendre.

**Les deux modes à retenir**
- **Export** : c'est ton atelier. Tu prépares ta musique chez toi (playlists, tempo, repères). **Indispensable si tu utilises un XDJ-RX avec clé USB.**
- **Performance** : c'est la scène ! Tu branches ta FLX3 et tu mixes en direct.

**Ton setup en un coup d'œil**
- **DDJ-FLX3** : plus de boutons visibles qu'une FLX4, accès direct aux effets (Smart CFX, Beat FX) — on les découvrira progressivement.
- **XDJ-RX** : tu peux mixer **sans ordinateur** grâce aux clés USB. L'écran intégré remplace le laptop — la logique club, quoi !

**Tes tout premiers réflexes de DJ**
1. Importe quelques morceaux dans Rekordbox
2. Crée une petite playlist d'entraînement (5 titres au tempo proche, genre 124–128 BPM)
3. Lance l'analyse pour que le logiciel détecte le tempo automatiquement
4. Charge un morceau sur chaque platine et écoute au casque

C'est normal si tout n'est pas clair du premier coup. L'important c'est de manipuler et d'explorer — c'est comme ça qu'on apprend !`,
      keyTakeaway:
        "Export pour préparer, Performance pour mixer. Que ce soit FLX3 ou XDJ-RX, la méthode reste la même : importe, analyse, écoute au casque. Tu viens de poser ta première brique !",
      exercise: {
        title: "Prépare tes 5 premiers morceaux + test Export",
        description:
          "La base commune aux deux machines — c'est par là que tout commence !",
        steps: [
          "Crée une playlist « Mixy FLX3/XDJ » avec 5 morceaux du même style que tu adores.",
          "Analyse-les (BPM / grille) et corrige une grille si le kick ne tombe pas pile sur les lignes.",
          "Pose 4 Hot Cues par morceau : intro, pont, drop, outro.",
          "Si tu vises un **XDJ-RX** : exporte la playlist sur une clé USB (mode Export) et vérifie qu'elle s'affiche correctement.",
          "Si tu vises une **FLX3** : charge un titre sur A et B en Performance et vérifie le beat au casque.",
        ],
        estimatedTime: "18 minutes",
      },
      tips: [
        "Sur FLX3, note les noms des pads dans le mode d'emploi : ils changent selon la couche active.",
        "Sur XDJ-RX, garde une clé de backup — les USB, c'est ton « disque dur scène ».",
        "Ne monte pas le master tant que les trims ne sont pas calibrés. Patience !",
      ],
    },
    {
      slideNumber: 2,
      title: "On branche tout : FLX3 ou XDJ-RX",
      subtitle: "FLX3 : USB + casque + master — XDJ : clés USB + enceintes + casque",
      videoUrl: "https://www.youtube.com/embed/jHaANgaTClU",
      videoDescription:
        "Vidéo exemple contrôleur FLX (visuel des ports) — pour XDJ-RX, ajoute l'étape « playlists sur clé USB » avant d'allumer.",
      content: `**Allez, on branche tout !** C'est pas la partie la plus fun, mais un branchement propre = un son propre. Et ça, ça change tout.

**DDJ-FLX3 (avec ordinateur)**
Ordinateur → **USB** → contrôleur → **MASTER OUT** → enceintes actives (entrée LINE). **Casque** sur **PHONES**. Vérifie sur **ton** manuel s'il y a des entrées MIC ou AUX en plus.

**XDJ-RX (sans PC en mix)**
- Branche les **enceintes** sur la sortie **Master** (RCA/XLR selon modèle).
- **Casque** sur la prise DJ / booth.
- Insère une ou deux **clés USB** avec tes playlists exportées ; sélectionne les morceaux depuis les **écrans**.
- Le PC, tu ne t'en sers que pour préparer chez toi — en mix, l'XDJ est autonome !

**Points communs (les deux machines)**
- Faders et master à **zéro** avant d'allumer la sono. Toujours !
- Règle les **trims** : signal dans le vert/orange, jamais dans le rouge en continu.
- Pas de grosse sono ? Des petites enceintes actives font très bien l'affaire pour s'entraîner.

**Support & manuels**
- Manuels, firmware, pilotes : https://www.pioneerdj.com/fr-fr/support/`,
      keyTakeaway:
        "FLX3 = chaîne laptop–contrôleur–sono. XDJ-RX = clé USB + enceintes + casque, le PC sert juste pour la prépa. Dans les deux cas, le réflexe c'est : faders à zéro, on monte progressivement !",
      exercise: {
        title: "Check-list branchement selon ta machine",
        description:
          "Une routine à faire avant chaque session — en 5 minutes c'est plié !",
        steps: [
          "Note sur un papier : « FLX3 + PC » ou « XDJ seul ».",
          "FLX3 : câble USB données OK ? XDJ : clé reconnue sur le lecteur ?",
          "Enceintes sur entrée LINE (pas phono !) ; master monté progressivement.",
          "Casque : pré-écoute un deck au casque sans saturer le master.",
          "Si tout est clean, lance un morceau et savoure — t'as un setup qui tourne !",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "XDJ : formate tes clés en FAT32 si le manuel le recommande — ça évite les mauvaises surprises.",
        "FLX3 : mets à jour Rekordbox et le firmware le même jour pour éviter les incompatibilités.",
        "Garde toujours une multiprise propre et un câble de secours dans ton sac de DJ.",
      ],
    },
    {
      ...level1ModuleFlx4.slides[2],
      videoDescription:
        "Tu vois le tempo affiché dans Rekordbox et la grille sur la waveform — super utile pour relier l'oreille et l'écran, que tu sois sur FLX3 ou XDJ-RX.",
      content: `**OK, là on rentre dans le vif du sujet.** Le BPM, c'est LE concept fondamental du DJing. Mais t'inquiète, c'est beaucoup plus simple que ça en a l'air.

**Le BPM (Beats Per Minute), c'est quoi ?**
C'est tout simplement le nombre de battements par minute. C'est le pouls de ta musique, son rythme cardiaque.

**Imagine deux métronomes :**
- Métronome 1 : 120 clics par minute
- Métronome 2 : 140 clics par minute
- Résultat : chaos total ! Ça claque dans tous les sens.

**Les BPM par genre (pour te repérer) :**
- House : 120–130 BPM (le groove régulier, parfait pour débuter)
- Techno : 125–140 BPM (un peu plus rapide, plus d'énergie)
- Hip-Hop : 85–115 BPM (plus lent, plus groovy)
- Drum & Bass : 160–180 BPM (là ça envoie du lourd !)

**Le secret du DJing, c'est ça :**
Deux morceaux au **même BPM** = ils sonnent bien ensemble. Deux BPM différents = le chaos. C'est aussi simple que ça.

**Sur ta DDJ-FLX3**
- Le tempo est affiché par deck dans Rekordbox (ex. 124,0). Après analyse, ce chiffre doit correspondre à ce que tu entends.
- Le **fader de tempo** est bien visible en façade — tu peux ajuster finement. La zone **Smart CFX** te permet de colorer le son, mais on verra ça plus tard ; pour l'instant, concentre-toi sur le BPM.
- Le bouton **Sync** est là pour t'aider au début — et c'est OK de l'utiliser ! Mais entraîne-toi aussi à **sentir** le décalage au casque.

**Sur ton XDJ-RX**
- Le BPM s'affiche directement sur **l'écran** du lecteur, sans ordinateur. C'est la logique club !
- Tu ajustes le tempo avec le **fader pitch** ou via les **molettes** selon le modèle. Le retour visuel à l'écran te confirme le BPM en temps réel.
- Entraîne-toi à **sentir** le décalage au casque — quand tu mixeras sans laptop, c'est ce réflexe-là qui te sauvera.

**Tu retiens juste ça pour l'instant :**
Le BPM c'est le rythme. Deux rythmes identiques = harmonie. Deux rythmes différents = on court à la catastrophe. Simple, efficace, fondamental.`,
      keyTakeaway:
        "Le BPM c'est le pouls de ta musique. Deux morceaux au même BPM = magie. Sur FLX3 tu le vois dans Rekordbox, sur XDJ-RX c'est direct à l'écran — même réflexe, même principe !",
      exercise: {
        title: "Ressens le BPM avec ton corps",
        description:
          "Avant même de toucher ta FLX3 ou ton XDJ-RX, apprends à sentir le rythme — c'est ton meilleur outil !",
        steps: [
          "Choisis un morceau que tu kiffes et lance-le.",
          "Tape du pied ou hoche la tête sur chaque battement : 1-2-3-4, 1-2-3-4…",
          "Compte les battements pendant 15 secondes.",
          "Multiplie par 4 → tu as le BPM approximatif !",
          "Vérifie avec Rekordbox (FLX3) ou directement sur l'écran (XDJ-RX) : t'étais proche ?",
          "Recommence avec 4 autres morceaux de styles différents — tu vas voir, ton oreille s'affine vite.",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Sur FLX3, repère bien le fader de tempo par deck — c'est lui que tu vas manipuler au prochain cours pour aligner les BPM.",
        "Sur XDJ-RX, l'écran te donne le BPM sans ordi : habitue-toi à lire l'affichage plutôt que le laptop.",
        "Les morceaux du même genre ont souvent des BPM proches — c'est pour ça que les DJs mixent par genre au début.",
      ],
    },
    {
      ...level1ModuleFlx4.slides[3],
      videoDescription:
        "Exemple de tempo / beatmatch — la logique est la même sur FLX3 et XDJ-RX, seul l'emplacement du fader change.",
      content: `**Maintenant qu'on a compris le BPM, on passe à l'outil qui va te permettre de tout aligner : le Pitch.**

**Le problème :**
Tu as deux morceaux que tu adores, mais ils n'ont pas le même BPM.
- Morceau A : 120 BPM
- Morceau B : 128 BPM
- Résultat : ils ne collent pas ensemble

**La solution : le fader de Pitch**
C'est ce curseur qui accélère ou ralentit un morceau.
- Tu pousses le pitch vers le bas → le morceau accélère
- Tu tires le pitch vers le haut → le morceau ralentit
(Attention, c'est parfois inversé selon les modèles — vérifie sur le tien !)

**Exemple concret :**
- Morceau A : 120 BPM (tu le laisses tel quel)
- Morceau B : 128 BPM (tu le ralentis à 120 avec le pitch)
- Résultat : les deux tournent à 120 BPM = c'est aligné, c'est propre !

**Bon à savoir :**
- Le pitch change aussi légèrement la tonalité. C'est normal, ça fait partie du jeu.
- Au-delà de ±8–10 %, ça commence à sonner bizarre. Reste dans une fourchette raisonnable.

**Sur ta DDJ-FLX3**
- Le **pitch** est en façade par deck ; **Tempo Range** élargit ou réduit la plage utile. **Smart CFX** colore le son — un réglage à la fois au début !

**Sur ton XDJ-RX**
- Le tempo se pilote via **l'écran** / la **molette** du deck : le BPM affiché doit coller à ce que tu entends. **Key Lock / Master Tempo** dans le menu pour limiter la déformation des voix.

**Rekordbox (pour les deux)**
- Active **Key Lock / Master Tempo** si tu veux changer le tempo sans trop affecter la hauteur — à tester au casque.

C'est là que ça devient vraiment fun : tu commences à **contrôler** ta musique !`,
      keyTakeaway:
        "Même logique de pitch partout : FLX3 = faders visibles ; XDJ-RX = contrôle à l'écran. Tu tiens l'outil clé du beatmatching !",
    },
    {
      ...level1ModuleFlx4.slides[4],
      videoDescription:
        "Transition type « drop mix » : inspiration pour enchaîner proprement une fois le tempo aligné. Applique ça sur ta FLX3 ou ton XDJ-RX !",
      content: `**C'est le moment que tu attendais : ta toute première transition !** Tout ce qu'on a vu avant, c'était pour arriver là. Tu es prêt.

**Voilà comment ça se passe, étape par étape :**

**Étape 1 — Préparation (30 secondes avant)**
- Le morceau A tourne sur le deck A (ex. 124 BPM)
- Tu charges le morceau B sur le deck B
- Tu ajustes le pitch pour que B soit aussi à 124 BPM
- Tu écoutes B au casque avec le bouton **Cue**

**Étape 2 — Écoute et calage (10 secondes)**
- Tu écoutes A et B ensemble dans ton casque
- Tu vérifies que les kicks tombent en même temps
- Si ça décale un peu, tu donnes un petit coup de jog pour recaler
- Quand c'est calé → on passe à la suite !

**Étape 3 — Le mix (5-10 secondes)**
- Tu montes doucement le channel fader de B
- Tu baisses progressivement celui de A
- Les deux morceaux jouent ensemble — et ça sonne bien !
- Le public ne se rend même pas compte que tu changes de morceau

**Étape 4 — La bascule (1-2 secondes)**
- Tu coupes complètement A
- B prend le contrôle
- C'est fait ! Ta première transition !

**Petit bonus selon ta machine :**
- **FLX3** : tu as accès au **Smart CFX** pour ajouter un filtre ou un écho pendant la transition — ça rend le passage encore plus smooth. Teste-le une fois que la transition de base est propre.
- **XDJ-RX** : navigue dans tes morceaux directement à l'écran et sélectionne le prochain titre depuis la clé USB. L'avantage ? Pas d'ordi à gérer, tu restes 100 % concentré sur le mix.

**La vérité :**
- Ça a l'air compliqué écrit comme ça, mais en vrai ça devient naturel très vite
- Ta première transition sera peut-être pas parfaite — et c'est **totalement normal**
- Même les plus grands DJs ont galéré au début
- L'important c'est de s'entraîner, de s'amuser, et de recommencer

**Tu viens de franchir un cap énorme.** Tu sais maintenant préparer tes morceaux, brancher ta table, comprendre le BPM, ajuster le pitch, et faire une transition. C'est la base de TOUT le DJing. Le reste, c'est de la pratique et de la créativité !`,
      keyTakeaway:
        "Préparer, écouter, mixer, basculer — c'est tout ! Que ce soit sur FLX3 ou XDJ-RX, la méthode est identique. Sois fier de toi, tu es officiellement DJ !",
      exercise: {
        title: "Fais ta première vraie transition sur FLX3 ou XDJ-RX",
        description:
          "C'est le grand moment — lance-toi, on y croit !",
        steps: [
          "Charge deux morceaux au BPM proche (max 3 BPM d'écart) sur les decks A et B.",
          "Aligne le tempo de B sur celui de A avec le pitch.",
          "Lance B et écoute-le au casque avec le bouton Cue. Tape du pied pour vérifier que les beats collent.",
          "Quand tu sens que c'est calé, monte doucement le fader de B.",
          "Baisse progressivement le fader de A pendant 8 temps (compte dans ta tête : 1-2-3-4-5-6-7-8).",
          "Coupe A. B joue tout seul. Félicitations, t'as fait ta première transition !",
          "Recommence 3 fois avec des morceaux différents — chaque fois, ça sera plus facile.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Sur FLX3, le Smart CFX peut adoucir une transition : teste un filtre passe-bas en montant le fader de B.",
        "Sur XDJ-RX, prépare ta clé USB avec les morceaux dans l'ordre — ça te fait gagner un temps fou en mix.",
        "Enregistre tes sessions ! Réécouter, c'est le meilleur moyen de progresser.",
      ],
    },
  ],
};

/**
 * NIVEAU 2: LES ÉQUALISEURS (Débutant+)
 */
export const level2Module: CourseModule = {
  level: 2,
  title: "Les Équaliseurs (EQ) : ton arme secrète pour des transitions propres",
  description:
    "Apprends à sculpter le son pour que deux morceaux se mélangent sans saturer — c'est ça qui fait la différence entre un mix amateur et un mix pro !",
  userLevels: ["beginner"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 bandes de fréquences",
      subtitle: "Comprends ce que tu entends vraiment dans un morceau",
      videoUrl: "https://www.youtube.com/embed/Fd9jEpFG6II",
      videoDescription:
        "Découvre les trois couches d'un morceau que tu peux contrôler avec l'EQ — ça va changer ta façon d'écouter la musique !",
      content: `**Allez, on passe au niveau supérieur !** Tu sais déjà lancer tes morceaux et faire une transition. Maintenant on va apprendre à **sculpter le son** — et crois-moi, c'est là que ça devient vraiment intéressant.

**L'EQ sur ta table / Rekordbox**
Chaque voie du mixer a 3 potards **High / Mid / Low** (plus le **Trim** en haut pour le volume d'entrée). Dans Rekordbox, les mêmes bandes existent à l'écran — bouger un potard physique ou le curseur logiciel, c'est exactement la même chose.

**Imagine un morceau comme un gâteau à 3 étages :**

**Étage 1 : Les Basses (Low) — Le fondement**
- Fréquences : 20–250 Hz
- C'est ce que tu **SENS** dans ton ventre, dans ta poitrine
- C'est le « boum boum boum » du kick, la grosse caisse
- C'est ce qui fait danser les gens

**Étage 2 : Les Médiums (Mid) — Le cœur**
- Fréquences : 250–4000 Hz
- C'est ce que tu **ENTENDS** le plus clairement
- Les voix, les mélodies, les synthés, les instruments
- C'est le contenu « musical » principal

**Étage 3 : Les Aigus (High) — L'énergie**
- Fréquences : 4000+ Hz
- C'est ce qui crée de la **clarté** et du **pétillant**
- Les cymbales, les hi-hats, les effets brillants
- C'est le « tss tss tss » qui donne de l'air au mix

**Pourquoi c'est important pour toi ?**
Quand tu mixes deux morceaux en même temps, leurs basses s'additionnent, leurs médiums s'additionnent, leurs aigus s'additionnent. Si tu ne gères pas ça, le résultat est une bouillie sonore. L'EQ te permet de **faire de la place** pour que les deux morceaux cohabitent proprement.

Tu vas voir, une fois que tu comprends ça, tu n'écoutes plus jamais la musique de la même façon !`,
      keyTakeaway:
        "Basses = ce que tu sens, Médiums = ce que tu entends, Aigus = ce qui brille. L'EQ te donne le contrôle sur chaque couche. Tu viens de débloquer une super-compétence !",
      exercise: {
        title: "Isole les 3 bandes sur ta table",
        description:
          "Rien de mieux que de l'entendre par toi-même — c'est un exercice qui va te bluffer !",
        steps: [
          "Lance un morceau sur un deck. Écoute-le normalement 15 secondes.",
          "Tourne le potard **Low** à fond à gauche (coupe les basses) : tu entends ? Le morceau perd toute sa puissance, il « flotte ».",
          "Remets le Low au centre. Maintenant coupe les **Mid** : bizarre, non ? La mélodie et les voix disparaissent.",
          "Remets le Mid. Coupe les **High** : le morceau sonne étouffé, sans éclat.",
          "Remets tout au centre et réécoute : tu entends maintenant chaque couche séparément. Bienvenue dans l'oreille d'un DJ !",
          "Recommence avec 2 autres morceaux de styles différents — chaque genre a un équilibre différent.",
        ],
        estimatedTime: "5 minutes",
      },
      tips: [
        "Les basses, c'est ce qui fait danser — c'est la bande la plus importante à gérer en transition.",
        "Les médiums, c'est là où se joue l'identité du morceau : voix, mélodie, ambiance.",
        "Les aigus donnent de l'énergie et de l'air — un mix sans aigus sonne plat et triste.",
      ],
    },
    {
      slideNumber: 2,
      title: "La technique EQ pour des transitions fluides",
      subtitle: "La méthode que tous les DJs pros utilisent (et que tu vas adorer)",
      videoUrl: "https://www.youtube.com/embed/pV-NJndPFtw",
      videoDescription:
        "Regarde comment un DJ utilise l'EQ pour mélanger deux morceaux sans saturation — observe bien les mains sur les potards !",
      content: `**OK, maintenant on passe à la pratique !** Tu sais ce que sont les 3 bandes. Voilà comment les utiliser pour des transitions de ouf.

**Le problème :**
Tu as deux morceaux House avec des grosses basses. Si tu montes les deux volumes en même temps : BOOM, saturation ! Ça sonne lourd, brouillon, désagréable. Le public grimace.

**La solution : la technique du « swap de basses »**
C'est LA technique fondamentale. Tous les DJs pros l'utilisent, et c'est beaucoup plus simple que ça en a l'air :

**1. Avant le mix (30 secondes avant)**
- Coupe les **basses** du morceau qui arrive (Low à fond à gauche)
- Les aigus et médiums passent, mais sans la grosse caisse — le morceau sonne léger, aérien
- C'est comme si tu entrouvrais une porte sans encore entrer dans la pièce

**2. Pendant le mix (5-10 secondes)**
- Monte doucement le volume du morceau qui arrive
- Les deux morceaux jouent ensemble, mais sans conflit de basses
- Le public sent que quelque chose change, sans savoir exactement quoi — c'est ça la magie !

**3. La bascule (1-2 secondes)**
- D'un geste : remonte les basses du nouveau morceau ET coupe celles de l'ancien
- C'est le « swap » — les basses passent d'un morceau à l'autre
- Le public sent le changement d'énergie, la nouvelle grosse caisse prend le contrôle

**4. Nettoyage**
- Baisse le volume de l'ancien morceau, puis coupe-le
- Remets les EQ au centre sur la voie libre
- C'est propre, c'est pro !

**L'idée clé :** on ne veut **jamais** deux grosses caisses en même temps à plein volume. C'est ça le secret d'une transition fluide.`,
      keyTakeaway:
        "Coupe les basses du morceau qui arrive, mixe, puis swappe les basses. C'est LA technique de base — et tu viens de l'apprendre. Les pros font exactement ça !",
      exercise: {
        title: "Fais ton premier swap de basses",
        description:
          "Allez, on le fait pour de vrai sur ta table — tu vas kiffer !",
        steps: [
          "Charge deux morceaux au même BPM sur tes decks A et B.",
          "Lance A à volume normal, EQ au centre.",
          "Sur le deck B : coupe les basses (Low à fond à gauche). Lance B.",
          "Monte doucement le fader de B : tu entends les aigus et médiums de B se glisser dans le mix ? Ça sonne propre !",
          "Quand tu es prêt : d'un geste, remonte le Low de B au centre ET coupe le Low de A.",
          "Baisse le fader de A. B joue seul avec toutes ses basses. Transition faite !",
          "Recommence 3 fois — à chaque fois, ça sera plus fluide et plus naturel.",
        ],
        estimatedTime: "8 minutes",
      },
      tips: [
        "La subtilité fait tout : des petits mouvements d'EQ sont plus pros que des gestes brusques.",
        "Écoute des sets de DJs pro sur YouTube et regarde leurs mains sur les EQ — tu vas repérer le swap de basses à chaque transition !",
        "Si ça sature pendant le mix, c'est que les deux basses jouent ensemble — coupe plus fort le Low de l'un des deux.",
      ],
    },
    {
      slideNumber: 3,
      title: "L'EQ en situation réelle : 3 scénarios",
      subtitle: "Adapte ta technique au contexte — comme un vrai pro",
      videoUrl: "https://www.youtube.com/embed/Lk0a6U6m2Zg",
      videoDescription:
        "Observe comment les DJs adaptent leur EQ selon les morceaux — chaque transition est différente !",
      content: `**Maintenant que tu maîtrises le swap de basses, voyons comment l'adapter selon la situation.** Parce qu'en vrai, chaque transition est unique !

**Scénario 1 : Deux morceaux House bien lourds**
Les deux ont des grosses basses bien présentes. C'est le cas classique.
→ **Swap de basses net** : tu coupes les basses de B, tu mixes, puis tu fais le swap d'un coup. Propre et efficace. Pas besoin de compliquer.

**Scénario 2 : D'un morceau lourd vers un morceau léger**
Genre passer d'une House bien grasse à une Deep House aérienne.
→ **Transition douce** : tu n'as pas besoin de couper les basses de B autant, parce qu'elles sont déjà légères. Par contre, baisse les aigus de A progressivement pour « éteindre » le morceau en douceur. Laisse les deux cohabiter un peu plus longtemps.

**Scénario 3 : Créer un moment de tension**
Tu veux que le public sente que quelque chose de gros arrive.
→ **Le build-up EQ** :
1. Baisse progressivement les basses du morceau en cours sur 16 ou 32 temps
2. Le groove disparaît peu à peu, la tension monte
3. Le public sent que ça va exploser
4. Tu lâches le nouveau morceau avec toutes ses basses d'un coup
5. BOOM — le dancefloor repart de plus belle !

**La leçon importante :**
L'EQ, c'est pas une formule rigide. C'est un outil **créatif** — comme un pinceau. La technique de base (swap de basses) reste la même, mais tu l'adaptes à chaque moment. Avec la pratique, ça devient instinctif.

Tu commences à penser comme un DJ. Et ça, c'est énorme !`,
      keyTakeaway:
        "Le swap de basses s'adapte à chaque situation : net pour les morceaux lourds, doux pour les légers, dramatique pour la tension. Tu as maintenant un vrai outil créatif entre les mains !",
      exercise: {
        title: "Teste les 3 scénarios sur ta table",
        description:
          "3 transitions, 3 ambiances différentes — le meilleur entraînement possible !",
        steps: [
          "Prépare 4 morceaux : 2 avec des grosses basses et 2 plus légers/aériens.",
          "**Scénario 1** : mixe les 2 morceaux lourds avec un swap de basses net. Simple et efficace.",
          "**Scénario 2** : passe d'un morceau lourd à un léger. Baisse les aigus de A doucement et laisse B entrer en douceur.",
          "**Scénario 3** : sur un morceau lourd, baisse les basses progressivement sur 16 temps. Puis lâche le nouveau morceau avec les basses à fond. Tu sens la tension et le release ?",
          "Enregistre-toi et réécoute : quelle transition sonne le mieux ? C'est super instructif !",
        ],
        estimatedTime: "12 minutes",
      },
      tips: [
        "L'EQ, c'est l'outil le plus puissant de ton mixer — même plus que les effets. Maîtrise-le, et tout le reste suivra.",
        "Les meilleurs DJs sont subtils : de petits mouvements de potard font souvent plus d'effet que des gestes dramatiques.",
        "La règle d'or : moins c'est plus. Un mix propre vaut mieux qu'un mix « impressionnant » qui sature.",
      ],
    },
  ],
};

/**
 * NIVEAU 3: LES TRANSITIONS BASIQUES (Débutant+)
 */
export const level3Module: CourseModule = {
  level: 3,
  title: "Les transitions : l'art de passer d'un morceau à l'autre",
  description:
    "Tu sais caler et utiliser l'EQ — maintenant on assemble tout pour faire des transitions qui claquent. C'est ici que tu deviens vraiment DJ !",
  userLevels: ["beginner"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 phases d'une transition réussie",
      subtitle: "Chaque bonne transition suit ce schéma — même chez les pros",
      videoUrl: "https://www.youtube.com/embed/vdbcvsUKY2s",
      videoDescription:
        "Découvre les 3 phases qui font la différence entre une transition amateur et une transition pro.",
      content: `**Tu sais quoi ? Une bonne transition, c'est invisible.** Les gens dansent, s'amusent, et ne réalisent même pas que tu as changé de morceau. C'est ça, le vrai talent d'un DJ.

**Les 3 phases de toute bonne transition :**

**Phase 1 — La préparation (10-15 secondes avant)**
C'est ta phase « en coulisses ». Le public ne sait pas encore ce qui se prépare.
- Tu charges le prochain morceau, tu cales le tempo
- Tu coupes les basses du morceau qui arrive (ce qu'on a vu au niveau 2 !)
- Tu écoutes au casque pour vérifier que tout est calé
- Le public sent inconsciemment que quelque chose se prépare — la tension monte

**Phase 2 — Le mix (5-10 secondes)**
C'est le moment où les deux morceaux cohabitent.
- Tu montes le volume du nouveau morceau
- Les deux jouent ensemble — grâce à l'EQ, ça ne sature pas
- Tu baisses progressivement l'ancien morceau
- Le public entend une progression naturelle, fluide

**Phase 3 — La bascule (1-2 secondes)**
Le grand moment ! Le nouveau morceau prend le contrôle.
- Tu fais le swap de basses (ou tu coupes l'ancien morceau)
- Le nouveau morceau joue seul avec toute son énergie
- Le public sent un renouveau, un boost — et continue à danser !

**Le truc à retenir :**
Préparation → Mix → Bascule. C'est la structure de base de TOUTE transition. Même les DJs qui jouent à Tomorrowland suivent ce schéma — ils le font juste de façon plus créative avec le temps. Et toi aussi tu y arriveras !`,
      keyTakeaway:
        "Préparation, Mix, Bascule — trois phases, c'est tout. Chaque grande transition suit ce schéma. Tu as maintenant la structure, il ne reste plus qu'à pratiquer !",
      exercise: {
        title: "Fais une transition complète en 3 phases",
        description:
          "On assemble tout ce qu'on a appris — BPM, pitch, EQ — en une seule transition !",
        steps: [
          "Charge deux morceaux au même BPM (ou très proche) sur tes decks A et B.",
          "Lance A à volume normal. Prépare B : aligne le tempo, coupe les basses.",
          "**Phase 1** : écoute B au casque, vérifie que les beats sont calés. Donne un petit coup de jog si besoin.",
          "**Phase 2** : monte le fader de B doucement. Les deux morceaux jouent ensemble — ça sonne bien ?",
          "**Phase 3** : swappe les basses (remonte celles de B, coupe celles de A), puis baisse le fader de A.",
          "B joue seul. T'as fait une transition propre ! Recommence 3 fois.",
          "Chronomètre-toi : essaie de faire toute la transition en 20-30 secondes.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Les phases ne sont pas rigides : parfois la préparation dure 5 secondes, parfois 20. Adapte-toi au morceau !",
        "Si ça décale pendant le mix, un petit coup de jog suffit pour recaler — personne ne le remarquera.",
        "Le secret : entraîne-toi jusqu'à ce que les gestes deviennent automatiques. Après, tu pourras te concentrer sur la créativité.",
      ],
    },
    {
      slideNumber: 2,
      title: "4 styles de transitions à tester",
      subtitle: "Chaque situation appelle un style différent — voilà ta boîte à outils",
      videoUrl: "https://www.youtube.com/embed/dYRZ7821G90",
      videoDescription:
        "Découvre les différents styles de transitions que les DJs utilisent — tu vas trouver celui qui te correspond !",
      content: `**Tu maîtrises la transition de base ? Parfait.** Maintenant, on va explorer les variantes. Parce qu'un bon DJ adapte toujours sa technique au moment.

**Style 1 : Le coup sec (5-10 secondes)**
→ Quand utiliser : pour créer un moment de surprise, un changement radical d'énergie.
- Préparation ultra courte (2-3 secondes)
- Mix express (1-2 secondes)
- Bascule franche et immédiate
- Effet : le public fait « oh ! » — énergie max

**Style 2 : La transition douce (30-45 secondes)**
→ Quand utiliser : en début de soirée, pour construire une ambiance progressivement.
- Préparation longue (15-20 secondes)
- Mix étendu (15-20 secondes) — les deux morceaux cohabitent longtemps
- Bascule progressive, presque imperceptible
- Effet : le public ne se rend compte de rien — super élégant

**Style 3 : La transition harmonique**
→ Quand utiliser : quand les deux morceaux sont dans des tonalités compatibles (on verra les clés plus en détail plus tard).
- Tu laisses les médiums des deux morceaux se superposer plus longtemps
- Les mélodies se complètent au lieu de se battre
- Effet : sophistication, musicalité — le public averti adore

**Style 4 : La transition créative (avec effets)**
→ Quand utiliser : pour marquer un moment fort, montrer ta patte.
- Tu utilises un loop (une boucle) sur la fin du morceau sortant
- Tu ajoutes un effet (reverb, delay, echo…)
- Tu crées un moment unique que personne d'autre ne ferait
- Effet : « waouh, c'était quoi ça ? » — ta signature de DJ

**Comment choisir ?**
- Pic de la soirée ? → Coup sec
- Début de set / ambiance chill ? → Transition douce
- Public de connaisseurs ? → Harmonique
- Tu veux te faire plaisir ? → Créative

Le plus important : il n'y a pas de mauvais choix. L'essentiel c'est que le dancefloor continue à bouger !`,
      keyTakeaway:
        "4 styles dans ta boîte à outils : coup sec, douce, harmonique, créative. Le bon DJ sait quand utiliser chacun. Et toi, tu les connais maintenant tous les quatre !",
      exercise: {
        title: "Teste 2 styles de transitions",
        description:
          "Mêmes morceaux, deux approches différentes — tu vas sentir la différence !",
        steps: [
          "Charge deux morceaux au même BPM sur tes decks.",
          "**Style 1 — Coup sec** : prépare tout, puis fais la transition en moins de 5 secondes. Swap de basses franc, volume d'un coup. Ça envoie !",
          "Recharge les mêmes morceaux.",
          "**Style 2 — Douce** : cette fois, prends 30 secondes. Monte le volume de B très lentement, laisse les deux morceaux cohabiter longtemps, puis bascule en douceur.",
          "Réécoute les deux (enregistre-toi si possible). Laquelle sonne le mieux ? Laquelle te plaît le plus ?",
          "Essaie maintenant avec deux morceaux différents — le style idéal change selon les tracks !",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Les meilleurs DJs mélangent les styles au cours d'un set — c'est ça qui crée une vraie dynamique.",
        "Commence par maîtriser le coup sec et la douce — ce sont les plus fréquents.",
        "Ne force jamais un style de transition : si ça ne colle pas avec les morceaux, change d'approche.",
      ],
    },
    {
      slideNumber: 3,
      title: "Mise en situation : ta première mini-session",
      subtitle: "On assemble tout — 3 morceaux, 2 transitions, un vrai mini-set !",
      videoUrl: "https://www.youtube.com/embed/Xzvid-d1c9E",
      videoDescription:
        "Regarde un DJ enchaîner des transitions en direct — c'est exactement ce que tu vas faire dans l'exercice !",
      content: `**C'est le moment de tout assembler !** Tout ce que tu as appris aux niveaux 1, 2 et 3 va se combiner ici. Tu vas faire un vrai mini-set de DJ.

**Imagine la scène :**
Il est 22h, tu es aux platines. Ta playlist est prête. Let's go !

**Transition 1 : Morceau A → Morceau B**
1. A joue, le public danse (124 BPM, House)
2. Tu charges B (126 BPM) → tu cales le pitch à 124
3. Tu coupes les basses de B, tu le lances
4. Tu écoutes au casque : les beats sont calés
5. Tu montes le fader de B progressivement
6. Swap de basses : tu remontes les basses de B, tu coupes celles de A
7. Tu baisses le fader de A → B joue seul
8. Transition propre ! Le public n'a rien vu.

**Transition 2 : Morceau B → Morceau C**
Cette fois, tu essaies un style différent :
1. B joue (124 BPM)
2. Tu charges C (124 BPM aussi — plus simple !)
3. Tu veux faire un coup sec cette fois
4. Tu prépares tout au casque
5. Au bon moment : tu montes C d'un coup et tu coupes B
6. BOOM — changement d'énergie ! Le public réagit.

**Deux transitions, deux styles, un mini-set.** C'est exactement ce que font les pros, en boucle, pendant 1h, 2h, toute la nuit.

**Ce que tu as accompli en 3 niveaux :**
- Tu sais préparer tes morceaux et brancher ton setup
- Tu comprends le BPM et le pitch
- Tu maîtrises les bases de l'EQ
- Tu sais faire des transitions de plusieurs styles

**Sois fier de toi.** T'es plus un débutant complet — tu es un DJ en formation, et la suite va être encore plus passionnante !`,
      keyTakeaway:
        "3 morceaux, 2 transitions, un mini-set complet — tu viens de le faire ! Les bases sont solides, la suite c'est de la pratique et de la créativité. Tu es sur la bonne voie !",
      exercise: {
        title: "Ton premier mini-set de 3 morceaux",
        description:
          "L'exercice ultime du niveau 3 — enchaîne 3 morceaux avec 2 transitions. Tu peux le faire !",
        steps: [
          "Prépare 3 morceaux au BPM proche dans une playlist dédiée.",
          "Lance le morceau A. Laisse-le jouer 1 minute pour t'installer dans le groove.",
          "Fais ta **transition 1** (A → B) en style doux : swap de basses, 20-30 secondes.",
          "Laisse B jouer un peu. Profite !",
          "Fais ta **transition 2** (B → C) en style coup sec : rapide, efficace, punchy.",
          "C joue seul. Ton mini-set est terminé !",
          "**BONUS** : enregistre-toi avec Rekordbox (ou ton téléphone) et réécoute. Note ce qui sonne bien et ce que tu voudrais améliorer.",
        ],
        estimatedTime: "12 minutes",
      },
      tips: [
        "Ta première mini-session sera pas parfaite — et c'est le but ! Chaque essai te rapproche du mix propre.",
        "Enregistrer et réécouter, c'est le secret n°1 de la progression. Tous les grands DJs font ça.",
        "Tu as maintenant les fondations. À partir du niveau 4, on entre dans les techniques créatives — ça va être incroyable !",
      ],
    },
  ],
};

const courseModulesFromLevel2: CourseModule[] = [
  level2Module,
  level3Module,
  level4Module,
  level5Module,
  {
    level: 6,
    title: "Techniques Avancées: Loops, FX et Contrôle d'Énergie",
    description: "Tes transitions sont propres — maintenant on va les rendre créatives, sans jamais perdre le groove.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Loops utiles vs loops décoratives",
        subtitle: "Prolonger une phrase musicale sans fatiguer le dancefloor",
        videoUrl: "https://www.youtube.com/embed/Es95BK3pluQ",
        videoDescription: "On t'apprend à utiliser les loops comme un outil musical précis, pas comme un cache-misère.",
        content:
          "Un loop, c'est un outil puissant — mais attention, c'est pas un bouton magique. Tu l'utilises pour sécuriser une entrée, corriger un timing de phrase ou construire une montée. Par contre, si tu le laisses tourner trop longtemps, il vide le morceau de son émotion. La règle : loop court, intention claire, et sortie propre. Dès que le loop a rempli son rôle, tu le relâches. C'est ça, le geste pro.",
        keyTakeaway:
          "Un bon loop résout un problème précis, puis disparaît. Si tu le sens traîner, c'est qu'il est déjà trop long.",
        exercise: {
          title: "Loop 4/8 temps en situation réelle",
          description: "Ressens la différence entre un loop utile et un loop qui fatigue.",
          steps: [
            "Choisis deux morceaux au BPM proche avec des intros différentes.",
            "Sur la piste A, active un loop 4 temps en fin de phrase.",
            "Lance B, aligne au casque, fais entrer B progressivement.",
            "Relâche le loop pile au début de la phrase suivante — sens le timing.",
            "Refais avec un loop 8 temps et compare : lequel sonne mieux ?",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Prépare ta sortie de loop avant même de l'activer — anticipe toujours.",
          "Un loop ne remplace jamais un bon beatmatch, ne triche pas avec.",
          "Filme-toi : un loop trop long, ça se voit dans ta gestuelle et ça s'entend vite.",
        ],
      },
      {
        slideNumber: 2,
        title: "FX: créer de la tension sans brouiller le mix",
        subtitle: "Filter, echo, reverb avec logique de timing",
        videoUrl: "https://www.youtube.com/embed/j9Ky8zpsqvY",
        videoDescription: "Découvre comment placer tes effets pour servir la narration de ton set, pas pour frimer.",
        content:
          "Les effets, c'est comme les épices en cuisine : un soupçon au bon moment, ça sublime tout. Trop, et tu gâches le plat. Un bon FX prépare un moment, crée une tension, puis laisse la musique respirer. Les erreurs classiques ? Trop de wet, des effets empilés les uns sur les autres, et des déclenchements hors phrase. En club, retiens ça : la clarté gagne toujours contre la démonstration technique.",
        keyTakeaway:
          "Un seul effet bien placé au bon moment vaut mieux que trois effets mal calibrés. La simplicité, c'est la classe.",
        exercise: {
          title: "Routine « 1 effet max »",
          description: "Construis un réflexe propre avant d'ajouter de la complexité.",
          steps: [
            "Fais une transition complète sans aucun effet — concentre-toi sur la propreté.",
            "Refais la même transition avec juste un filtre léger.",
            "Troisième passage : ajoute un echo court en sortie de piste A.",
            "Réécoute les trois versions et choisis la plus lisible — c'est souvent la plus simple.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Si tu entends l'effet plus que la musique, baisse le wet immédiatement.",
          "Déclenche tes effets sur des repères de phrase (8, 16, 32 temps) — jamais au hasard.",
          "Garde toujours le réflexe du « dry reset » : savoir revenir à zéro, c'est une compétence pro.",
        ],
      },
      {
        slideNumber: 3,
        title: "Transition créative complète",
        subtitle: "Loop + EQ + FX + sortie propre",
        videoUrl: "https://www.youtube.com/embed/TStRW1KpBe4",
        videoDescription: "On assemble tous les outils avancés dans une transition maîtrisée de A à Z.",
        content:
          "Voilà où ça devient vraiment excitant : combiner tous tes outils dans une seule transition. Le pattern, c'est préparer → tensionner → relâcher. Loop, EQ, FX — tout s'enchaîne avec intention. Et la vraie compétence, c'est d'exécuter ça proprement même quand une piste réagit différemment de ce que t'avais prévu. Pas de panique, juste du contrôle et de l'adaptation.",
        keyTakeaway:
          "Créativité = contrôle + intention + capacité à revenir au simple instantanément. C'est ça, le vrai niveau avancé.",
        exercise: {
          title: "Scénario cabine : 2 transitions d'affilée",
          description: "Simule la pression d'un enchaînement en public — c'est là que tu grandis.",
          steps: [
            "Transition 1 : loop court + swap de basses + sortie nette.",
            "Transition 2 : filtre + echo de sortie, sans loop cette fois.",
            "Enregistre les deux transitions d'un seul tenant, sans pause.",
            "Réécoute et note où tu perds la maîtrise — puis simplifie cette étape.",
          ],
          estimatedTime: "13 minutes",
        },
        tips: [
          "Le public retient l'énergie que tu crées, pas la complexité technique derrière.",
          "Prévois toujours une version simplifiée de ta transition — c'est ton filet de sécurité.",
          "Un bon DJ sait annuler un effet au bon moment, c'est aussi important que de le lancer.",
        ],
      },
    ],
  },
  {
    level: 7,
    title: "Lire la Foule",
    description: "Apprends à sentir l'énergie de la piste et à prendre les bonnes décisions au bon moment.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "30 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Signaux faibles de la foule",
        subtitle: "Observer avant que la baisse d'énergie devienne visible",
        videoUrl: "https://www.youtube.com/embed/ycC2sHErdis",
        videoDescription: "Apprends à repérer les signes de fatigue, de pic et de relance avant qu'il ne soit trop tard.",
        content:
          "Un DJ pro ne réagit pas aux problèmes — il les voit venir. Les micro-décrochages, les zones qui se vident doucement, l'énergie qui plafonne… tout ça, ce sont des signaux faibles que tu apprends à lire avant que ça devienne visible. Ton job, c'est d'ajuster le tir en amont, pas d'éteindre des incendies.",
        keyTakeaway:
          "Lire la foule, c'est anticiper. Si tu corriges en 1 à 2 morceaux, personne ne remarque le creux — et ça, c'est du niveau pro.",
        exercise: {
          title: "Scan foule toutes les 60 secondes",
          description: "Crée-toi une boucle d'observation active pendant que tu mixes.",
          steps: [
            "Observe 3 trucs : combien de gens sur la piste, les réactions aux drops, le flux bar/piste.",
            "Évalue en un mot : l'énergie monte, stagne ou baisse ?",
            "Décide l'intention de ton prochain morceau : relancer, stabiliser ou faire respirer.",
          ],
          estimatedTime: "8 minutes",
        },
        tips: [
          "Une foule bruyante n'est pas forcément une foule engagée — observe les corps, pas le bruit.",
          "Tenter une relance même imparfaite vaut mieux que de laisser l'inertie s'installer.",
          "Aie toujours 2-3 morceaux de secours prêts dans des directions d'énergie différentes.",
        ],
      },
      {
        slideNumber: 2,
        title: "Décision rapide sous pression",
        subtitle: "Choisir le bon prochain morceau en moins de 10 secondes",
        videoUrl: "https://www.youtube.com/embed/nQKuZyD0Y2s",
        videoDescription: "On te donne un cadre décisionnel simple pour les moments où ça chauffe en cabine.",
        content:
          "Quand ça chauffe en cabine et que tu dois choisir ton prochain morceau en quelques secondes, tu as besoin d'un cadre simple : est-ce que je garde le cap, je pousse l'énergie, ou je pivote vers autre chose ? L'erreur, c'est jamais de changer de direction — c'est d'hésiter trop longtemps. Mieux vaut une décision imparfaite que pas de décision du tout.",
        keyTakeaway:
          "Garder, pousser ou pivoter — quand tu as un cadre simple en tête, le stress baisse et ta constance monte.",
        exercise: {
          title: "Jeu des 3 options",
          description: "Entraîne-toi à décider vite dans des contextes variés.",
          steps: [
            "Prépare 3 scénarios : foule froide, foule stable, foule en pic.",
            "Pour chaque scénario, décide en 10 secondes : garder, pousser ou pivoter.",
            "Explique ton choix en une phrase, puis exécute l'enchaînement sur ta table.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Une mauvaise décision rapide vaut presque toujours mieux qu'aucune décision.",
          "Identifie tes « morceaux outils » — ceux qui marchent à coup sûr dans chaque scénario.",
          "Quand tu doutes, stabilise d'abord — puis tente un move plus risqué quand tu te sens ancré.",
        ],
      },
      {
        slideNumber: 3,
        title: "Gestion d'erreur en live",
        subtitle: "Rattraper sans panique et garder la piste",
        videoUrl: "https://www.youtube.com/embed/7Wtbc-1y1zc",
        videoDescription: "Comment récupérer proprement quand une transition ne se passe pas comme prévu.",
        content:
          "Soyons honnêtes : même les meilleurs DJs au monde ratent des transitions. Ça arrive. Ce qui fait la différence entre un pro et un amateur, c'est la récupération. Simplifier immédiatement, recentrer le groove, relancer proprement. Personne ne te juge sur l'erreur — on te juge sur ta capacité à rebondir.",
        keyTakeaway:
          "L'erreur fait partie du jeu. Ce qui compte, c'est la vitesse et l'élégance de ta récupération — c'est ça qui impressionne.",
        exercise: {
          title: "Recovery drill",
          description: "Apprends à transformer une transition ratée en relance propre.",
          steps: [
            "Simule volontairement un décalage léger entre tes deux pistes.",
            "Coupe la complexité : reviens à un EQ simple et un timing clair.",
            "Relance avec un morceau sûr en moins de 20 secondes — chronomètre-toi.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "2 secondes de respiration avant d'agir peuvent sauver tout un set — prends ce temps.",
          "Ton morceau de secours doit être prêt et repéré avant même que le problème arrive.",
          "Simplifier n'est pas reculer — c'est performer intelligemment.",
        ],
      },
    ],
  },
  {
    level: 8,
    title: "Construction de Set",
    description: "Apprends à construire un set de 45-60 minutes qui tient de la première à la dernière note.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Architecture macro du set",
        subtitle: "Intro, montée, pic, respiration, sortie",
        videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
        videoDescription: "On t'apprend à construire une trajectoire d'énergie que ta foule va ressentir du début à la fin.",
        content:
          "Un bon set, c'est pas une playlist. C'est une histoire avec un début, un milieu et une fin. Tu dois savoir exactement où tu en es à chaque instant : est-ce que j'installe l'ambiance ? Je monte ? Je suis au sommet ? Je fais respirer ? Je conclus ? Quand tu penses ton set comme un arc narratif, tout change.",
        keyTakeaway: "Un set réussi, c'est une trajectoire émotionnelle que la foule ressent sans même y penser. Pense en arc narratif.",
        exercise: {
          title: "Blueprint 45 minutes",
          description: "Écris ta structure complète avant de toucher aux platines.",
          steps: [
            "Définis 5 blocs d'énergie avec une durée cible pour chacun.",
            "Attribue 2 à 3 morceaux clés par bloc — tes piliers.",
            "Pour chaque bloc, prépare une alternative au cas où la foule réagit différemment.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Écris ton plan, puis accepte de le modifier en live — la flexibilité, c'est la force.",
          "Les transitions entre tes blocs d'énergie valent plus que les blocs eux-mêmes.",
          "Prévois toujours un atterrissage propre — la fin du set, ça compte autant que le pic.",
        ],
      },
      {
        slideNumber: 2,
        title: "Micro-structure: phrases et points de bascule",
        subtitle: "Sécuriser les passages critiques entre morceaux",
        videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
        videoDescription: "On passe du plan global aux décisions de transition concrètes — là où tout se joue.",
        content:
          "Dans ton set, y'a 4 ou 5 transitions qui font ou défont toute l'expérience. Ce sont tes moments charnières — les passages où l'énergie bascule. Identifie-les à l'avance et prépare-les comme des scènes de film. Point d'entrée, action EQ/FX, point de sortie. Quand ces transitions-là sont solides, tout le reste coule.",
        keyTakeaway:
          "Un set solide, c'est pas une playlist qui défile — c'est une suite de transitions-clés que tu maîtrises sur le bout des doigts.",
        exercise: {
          title: "4 transitions charnières",
          description: "Prépare les passages qui vont déterminer la qualité de ton set.",
          steps: [
            "Choisis les 4 transitions à plus fort enjeu énergétique dans ton set.",
            "Pour chacune : note le point d'entrée, l'action EQ/FX, et le point de sortie.",
            "Répète ces 4 transitions en boucle jusqu'à ce qu'elles soient solides.",
          ],
          estimatedTime: "11 minutes",
        },
        tips: [
          "Chaque transition charnière doit exister en version simple ET en version créative — choisis selon le moment.",
          "Évite de changer trop de paramètres à la fois — la clarté avant la complexité.",
          "La constance prime toujours sur l'originalité forcée.",
        ],
      },
      {
        slideNumber: 3,
        title: "Préparer un set exportable cabine",
        subtitle: "Passer de l'entraînement maison au contexte club",
        videoUrl: "https://www.youtube.com/embed/a3m8l4q3Pq8",
        videoDescription: "Organisation pratique de tes playlists, clés USB et plans de secours pour le jour J.",
        content:
          "Le jour J arrive : tu joues en club. Et là, c'est plus le moment de bricoler. Tes fichiers doivent être prêts, tes clés USB vérifiées, tes backups en place. Versions radio, versions extended, un plan B si le matos est différent de ce que t'attendais. Le professionnalisme, il se voit avant même que tu lances ton premier morceau.",
        keyTakeaway:
          "Le professionnalisme se voit avant le premier morceau. Une préparation technique irréprochable, c'est ce qui te met en confiance.",
        exercise: {
          title: "Checklist pré-cabine",
          description: "Valide ton set comme si tu jouais demain soir — pour de vrai.",
          steps: [
            "Prépare une clé USB principale et une clé backup identique.",
            "Vérifie l'analyse BPM et les grilles de tes morceaux critiques.",
            "Crée un dossier « urgence » avec 10 morceaux sûrs qui marchent à coup sûr.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Teste ta clé USB sur un autre poste dès que possible — les mauvaises surprises arrivent vite.",
          "Nomme clairement tes playlists par niveau d'énergie — tu te remercieras en cabine.",
          "Préparer le pire, c'est ce qui te permet de performer au mieux.",
        ],
      },
    ],
  },
  {
    level: 9,
    title: "Performance Club",
    description: "Le moment de vérité — apprends à exécuter un set fiable sous la pression réelle de la cabine.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Routine mentale pré-live",
        subtitle: "Rester stable quand l'adrénaline monte",
        videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
        videoDescription: "Découvre les habitudes de préparation qui te permettent d'exécuter proprement devant du public.",
        content:
          "Le stress avant de jouer, c'est normal — et c'est même un bon signe. Ça veut dire que ça compte pour toi. Mais tu dois apprendre à canaliser cette énergie. Crée-toi un rituel d'entrée en set : quelques respirations, un check technique rapide, une visualisation de tes premières transitions. Quand tu ritualises ta préparation, tu gardes ta lucidité, ton écoute et ton timing.",
        keyTakeaway:
          "Un petit rituel de 5 minutes avant de jouer, c'est ce qui évite les décisions impulsives en cabine. Le calme, ça se prépare.",
        exercise: {
          title: "Routine 5 minutes",
          description: "Installe ton état de performance avant d'appuyer sur Play.",
          steps: [
            "Respiration contrôlée pendant 60 secondes — calme le corps, calme l'esprit.",
            "Check technique rapide : gains, casque, monitor, piste d'ouverture prête.",
            "Visualise tes 2 premières transitions dans ta tête — tu les connais, ça va bien se passer.",
          ],
          estimatedTime: "6 minutes",
        },
        tips: [
          "Ton intro doit être la transition la plus sûre de tout ton set — pas d'expérimentation au démarrage.",
          "Prépare un script mental en cas d'imprévu — savoir quoi faire quand ça déraille te libère l'esprit.",
          "Confort = performance : vérifie ta position, ton écoute, ton ergonomie avant de commencer.",
        ],
      },
      {
        slideNumber: 2,
        title: "Gestion du système son",
        subtitle: "Adapter ton mix selon la salle et le retour cabine",
        videoUrl: "https://www.youtube.com/embed/8IF_HGw7IFk",
        videoDescription: "Apprends à ajuster ton mix selon l'acoustique réelle de la salle et le monitoring cabine.",
        content:
          "Petit secret que personne ne te dit : la même transition sonne complètement différemment selon la salle. Ce qui marchait parfaitement chez toi peut sonner bizarre sur un gros système. C'est pour ça que tu dois apprendre à mixer avec le retour cabine, pas seulement avec ton casque. Écoute la salle, calibre tes basses, ajuste tes gains. S'adapter au système, c'est ça le niveau club.",
        keyTakeaway:
          "Le DJ pro adapte son mix au système réel de la salle, pas à ses habitudes studio. C'est ça qui fait la différence le jour J.",
        exercise: {
          title: "Calibration en 3 morceaux",
          description: "Ajuste ton style selon la réponse réelle du système son.",
          steps: [
            "Morceau 1 : observe comment les basses et la clarté globale sonnent dans la salle.",
            "Morceau 2 : teste une transition simple et écoute le rendu sur la façade, pas que dans ton casque.",
            "Morceau 3 : corrige tes EQ et tes gains en fonction de ce que tu entends vraiment.",
          ],
          estimatedTime: "9 minutes",
        },
        tips: [
          "Si la salle sonne « boomy », simplifie d'abord les basses — c'est presque toujours le problème.",
          "Garde de la marge de headroom — ne pousse jamais les gains dans le rouge.",
          "N'augmente jamais le volume pour corriger un problème de clarté — ça empire les choses.",
        ],
      },
      {
        slideNumber: 3,
        title: "Gestion d'incidents",
        subtitle: "Quand un morceau plante, un câble bouge, ou la foule décroche",
        videoUrl: "https://www.youtube.com/embed/kHll7t87xik",
        videoDescription: "Apprends à réagir vite aux imprévus sans casser l'expérience de la piste.",
        content:
          "En club, des imprévus, il y en aura. Une piste qui plante, un export foireux, un câble qui bouge, une décision qui tarde… Le vrai niveau club, c'est la continuité. Quoi qu'il arrive, tu gardes le set vivant. La musique ne s'arrête pas. La foule ne doit jamais sentir que tu paniques. Calme, solution, relance.",
        keyTakeaway:
          "Ce qui distingue un DJ solide d'un DJ fragile, c'est sa robustesse face aux imprévus. Le calme est ta meilleure arme.",
        exercise: {
          title: "Drill incident",
          description: "Simule 3 imprévus et entraîne-toi à garder la piste active.",
          steps: [
            "Incident 1 : piste mal analysée → correction express sans couper la musique.",
            "Incident 2 : transition ratée → morceau secours immédiat, pas de panique.",
            "Incident 3 : énergie qui chute → relance en 2 titres max, retrouve le groove.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Aie toujours un dossier « anti-panique » avec des titres qui marchent à tous les coups.",
          "Raccourcis ton raisonnement : diagnostiquer → agir → stabiliser. Pas de temps pour philosopher.",
          "Ton calme est audible dans ton mix — la foule le sent quand tu es serein.",
        ],
      },
    ],
  },
  {
    level: 10,
    title: "Maîtrise Complète",
    description: "Tu sais mixer proprement — maintenant, deviens un DJ identifiable, fiable et bookable.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "40 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Construire une identité artistique",
        subtitle: "Ton son, ton énergie, ton positionnement",
        videoUrl: "https://www.youtube.com/embed/u_ny-pIfNe8",
        videoDescription: "On t'aide à transformer tes compétences techniques en une identité reconnaissable.",
        content:
          "Tu sais mixer propre. Tu sais lire une foule. Tu sais structurer un set. Maintenant, la question c'est : qui es-tu en tant que DJ ? Ton objectif à ce stade, c'est d'être reconnaissable. Ta sélection musicale, ton style de transitions, ta gestion d'énergie, ta posture derrière les platines — tout ça, c'est ton identité artistique. C'est ce qui fait que les gens reviennent pour TOI, pas juste pour la musique.",
        keyTakeaway:
          "La maîtrise, c'est la cohérence répétée. Quand tu peux livrer ton niveau chaque semaine, tu deviens un DJ sur lequel on peut compter.",
        exercise: {
          title: "Set signature 20 minutes",
          description: "Crée un mini-format qui raconte qui tu es en tant que DJ.",
          steps: [
            "Choisis 6 à 8 morceaux qui reflètent vraiment ton univers musical.",
            "Écris l'intention de chaque transition en une ligne — pourquoi ce morceau après celui-là ?",
            "Enregistre le set et note 3 éléments qui te rendent distinctif.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Ta sélection musicale parle plus fort que n'importe quel effet — soigne-la.",
          "Inspire-toi des autres, mais ne copie jamais un set entier — c'est ta voix qui compte.",
          "La constance de qualité impressionne plus qu'une démonstration ponctuelle de génie.",
        ],
      },
      {
        slideNumber: 2,
        title: "Capstone: set club 45 minutes",
        subtitle: "Validation finale du parcours Mixy",
        videoUrl: "https://www.youtube.com/embed/-CblGWcr87k",
        videoDescription: "C'est le moment de mettre en pratique tout ce que tu as appris dans un set complet.",
        content:
          "C'est le moment de vérité. Ton set final valide tout ce que tu as appris : la structure, les transitions, la lecture de foule, la gestion d'imprévus et la maîtrise technique. Si tu arrives à jouer un set de 45 minutes propre, cohérent et engageant, tu as un niveau opérationnel solide. Tu es prêt à jouer devant des gens. Pour de vrai.",
        keyTakeaway:
          "Si tu peux exécuter ce set proprement du début à la fin, bravo — tu as un niveau solide et tu es prêt pour la vraie scène.",
        exercise: {
          title: "Projet final Mixy",
          description: "Conçois, joue et évalue un set complet — c'est ton examen final.",
          steps: [
            "Prépare un set de 45 min avec un plan A et un plan B.",
            "Joue le set en une seule prise, sans pause — comme en club.",
            "Auto-évalue honnêtement : transitions, énergie, erreurs et récupérations.",
            "Rejoue le set en corrigeant tes 3 plus grosses faiblesses.",
          ],
          estimatedTime: "20 minutes",
        },
        tips: [
          "Le but n'est pas zéro erreur — c'est zéro panique. Les erreurs, tu sais les rattraper maintenant.",
          "Ton set doit rester lisible et cohérent de bout en bout.",
          "Archive tous tes enregistrements — c'est comme ça que tu mesures ta vraie progression.",
        ],
      },
      {
        slideNumber: 3,
        title: "Après les 10 niveaux: roadmap pro",
        subtitle: "Continuer à progresser sans plateau",
        videoUrl: "https://www.youtube.com/embed/PRPwKxnBmc8",
        videoDescription: "On te donne un plan d'entraînement sur 8 semaines pour consolider ton niveau pro.",
        content:
          "Félicitations — tu as terminé les 10 niveaux. Mais soyons honnêtes : c'est pas la fin, c'est le début. À partir de maintenant, tu passes en mode amélioration continue. Des sets réguliers, l'analyse de tes enregistrements, des objectifs mensuels clairs, et surtout — jouer devant des gens dès que tu peux. Un DJ pro, c'est quelqu'un qui continue à s'entraîner avec méthode, même après la formation.",
        keyTakeaway:
          "Tu as les compétences. Maintenant, c'est la discipline et la régularité qui feront la différence. Continue à t'entraîner, continue à jouer, continue à progresser.",
        exercise: {
          title: "Plan 8 semaines",
          description: "Construis une routine durable pour continuer à progresser après la formation.",
          steps: [
            "Fixe 2 sessions techniques + 1 session set complet par semaine — c'est ton minimum.",
            "Définis un objectif mesurable : transitions propres, stabilité BPM, cohérence du set.",
            "Publie 1 extrait par semaine et collecte des retours honnêtes de gens qui s'y connaissent.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Si tu ne mesures pas ce que tu veux améliorer, tu vas stagner — sois précis.",
          "Crée-toi un rituel de review après chaque set — c'est là que tu progresses le plus.",
          "La progression long terme se joue sur la discipline, pas sur l'inspiration du moment.",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Equipment-specific content paragraphs — appended to each slide's `content`
 * based on the user's actual controller (TargetDeck).
 * Maps equipment → level → slideNumber → { fr, en }.
 * --------------------------------------------------------------------------- */
const EQUIPMENT_CONTENT: Partial<
  Record<TargetDeck, Record<number, Record<number, { fr: string; en: string }>>>
> = {
  flx4: {
    2: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nLes 3 potards EQ (High/Mid/Low) sont juste au-dessus de chaque fader de volume. Le Trim est le premier potard tout en haut de la voie. Sur un contrôleur compact comme la FLX4, l'espace est serré — prends l'habitude de poser tes doigts sur les potards sans regarder. Astuce : commence par le Low (le plus bas), puis remonte vers le Mid et le High. Avec un peu de pratique, tes mains trouveront leur place toutes seules.",
        en: "\n\n**On your DDJ-FLX4**\nThe 3 EQ knobs (High/Mid/Low) sit right above each volume fader. The Trim is the top knob on each channel. On a compact controller like the FLX4, space is tight — practice finding the knobs without looking down. Start from the Low (bottom knob), then work your way up to Mid and High. With a bit of practice your hands will land in the right spot every time.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour le swap de basses, tu vas utiliser les deux mains : une main sur le Low du deck A, l'autre sur le Low du deck B. Vu que la FLX4 est compacte, tes mains sont proches — c'est un avantage ! Entraîne-toi à tourner les deux potards Low en même temps, en sens inverse : un vers la gauche, l'autre vers la droite. Fais-le lentement d'abord, puis accélère. Le Merge FX (le gros bouton au centre) peut aussi t'aider à lisser le passage si tu hésites sur le timing.",
        en: "\n\n**On your DDJ-FLX4**\nFor the bass swap, use both hands: one on deck A's Low knob, the other on deck B's Low. Since the FLX4 is compact, your hands are close together — that's actually an advantage! Practice turning both Low knobs simultaneously in opposite directions: one left, the other right. Start slowly, then speed up. The Merge FX button (the big one in the center) can also help smooth the handover if you're unsure about timing.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour les 3 scénarios, profite de la taille compacte de ta FLX4 : tu peux atteindre les EQ, les faders et le Merge FX sans bouger les bras. Pour le scénario 3 (build-up), essaie le Merge FX : un seul geste crée un effet de montée automatique pendant que tu baisses les basses progressivement. C'est un raccourci puissant que seuls les contrôleurs Pioneer récents proposent — utilise-le !",
        en: "\n\n**On your DDJ-FLX4**\nFor all 3 scenarios, take advantage of the FLX4's compact layout: you can reach the EQ knobs, faders, and Merge FX without moving your arms. For scenario 3 (the build-up), try the Merge FX: a single gesture creates an automatic build-up effect while you gradually reduce the bass. It's a powerful shortcut that only recent Pioneer controllers offer — use it!",
      },
    },
    3: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nRepère bien la disposition de ta FLX4 pour les 3 phases : les jog wheels pour caler, les faders de volume pour le mix, et les potards EQ juste au-dessus pour le swap. Sur un contrôleur compact, tout est à portée de doigts — c'est plus facile de rester concentré. Utilise les pads de performance (les 8 petits boutons carrés sous chaque jog) pour placer des hot cues aux points d'entrée de tes morceaux. Un appui = tu retrouves le point exact. Ça te fait gagner un temps fou en préparation.",
        en: "\n\n**On your DDJ-FLX4**\nGet familiar with the FLX4 layout for all 3 phases: jog wheels for beatmatching, volume faders for the blend, and EQ knobs right above for the swap. On a compact controller, everything is within finger reach — that makes it easier to stay focused. Use the performance pads (the 8 small square buttons below each jog) to set hot cues at your entry points. One tap = you're back to the exact spot. It saves you tons of time during preparation.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour tester les 4 styles de transitions sur ta FLX4 : le coup sec est facile grâce aux faders courts — un geste rapide suffit. Pour la transition douce, surveille tes mouvements de fader : la course est courte, donc vas-y millimètre par millimètre. Pour les transitions créatives, utilise le Beat FX (bouton FX au centre) : un delay ou un echo sur la fin du morceau sortant peut créer un effet de suspension magique. N'hésite pas à combiner ça avec le Merge FX pour un résultat encore plus pro.",
        en: "\n\n**On your DDJ-FLX4**\nFor testing the 4 transition styles on your FLX4: the quick cut is easy thanks to the short faders — one swift move does it. For smooth transitions, be precise with your fader movements: the travel is short, so go millimeter by millimeter. For creative transitions, use the Beat FX (FX button in the center): a delay or echo on the outgoing track's tail creates a magical suspension effect. Feel free to combine it with Merge FX for an even more polished result.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour ton mini-set sur la FLX4, pose-toi dans un endroit calme et branche ton casque. Avantage de la FLX4 : elle est légère et tu peux t'installer n'importe où. Avant de commencer, place des hot cues (pads de performance) sur les points d'intro de tes 3 morceaux — ça te permettra de lancer chaque titre pile au bon moment. Enregistre-toi directement dans Rekordbox (bouton REC en haut) pour réécouter et progresser à chaque session.",
        en: "\n\n**On your DDJ-FLX4**\nFor your mini-set on the FLX4, find a quiet spot and plug in your headphones. The FLX4's advantage: it's lightweight and you can set up anywhere. Before you start, drop hot cues (performance pads) on the intro points of your 3 tracks — that way you can launch each one at exactly the right moment. Record yourself directly in Rekordbox (REC button at the top) so you can listen back and improve with every session.",
      },
    },
    4: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nTa FLX4 ne possède pas d'écran intégré — c'est Rekordbox sur ton laptop qui affiche la clé de chaque morceau. Va dans Préférences > Vue > Colonnes et active « Key » pour la voir apparaître à côté du BPM. Astuce : trie ta bibliothèque par clé Camelot d'un clic sur la colonne et repère instantanément les morceaux compatibles avec celui qui tourne.",
        en: "\n\n**On your DDJ-FLX4**\nYour FLX4 has no built-in screen — Rekordbox on your laptop displays each track's key. Go to Preferences > View > Columns and enable \"Key\" so it shows right next to BPM. Pro tip: click the Key column header to sort by Camelot key and instantly spot compatible tracks with whatever is playing.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nDans Rekordbox, active l'affichage « Notation Camelot » (Préférences > Analyse > Key) pour voir directement les numéros/lettres du Camelot Wheel au lieu des tonalités classiques. Quand tu navigues ta bibliothèque sur le laptop pendant que la FLX4 joue, tu peux filtrer par clé compatible en un clic — c'est le workflow le plus rapide pour ta config compacte.",
        en: "\n\n**On your DDJ-FLX4**\nIn Rekordbox, enable \"Camelot Notation\" (Preferences > Analysis > Key) to see Camelot numbers/letters instead of classical key names. While your FLX4 plays a track, browse your library on the laptop and filter by compatible key with one click — it's the fastest workflow for your compact setup.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPendant ta transition harmonique, utilise les petits jog wheels de la FLX4 pour de micro-corrections de phase. La taille compacte te permet de garder un œil sur l'écran Rekordbox (où tu vois les formes d'onde en couleur par clé) tout en manipulant le crossfader et les EQ d'une main. Pense à utiliser le mode « Related Tracks » de Rekordbox qui te suggère des morceaux en clé compatible.",
        en: "\n\n**On your DDJ-FLX4**\nDuring your harmonic transition, use the FLX4's compact jog wheels for micro phase corrections. The small form factor lets you keep an eye on Rekordbox's screen (where waveforms are color-coded by key) while working the crossfader and EQ with one hand. Try Rekordbox's \"Related Tracks\" feature — it suggests key-compatible tracks automatically.",
      },
      4: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nQuand tu veux casser les règles du Camelot, le Merge FX de ta FLX4 est ton meilleur allié. Active-le pendant la zone de tension entre deux clés incompatibles — il crée un « pont sonore » qui masque la dissonance. Tu peux aussi utiliser Shift + les pads pour déclencher un filtre ou un echo qui brouille harmoniquement le passage.",
        en: "\n\n**On your DDJ-FLX4**\nWhen you want to break Camelot rules, your FLX4's Merge FX is your best ally. Activate it during the tension zone between two incompatible keys — it creates a \"sonic bridge\" that masks dissonance. You can also use Shift + pads to trigger a filter or echo that harmonically blurs the transition.",
      },
    },
    5: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour structurer ton set sur la FLX4, prépare tes playlists dans Rekordbox par phase d'énergie : « Intro », « Montée », « Pic », « Descente ». Pendant que tu joues, navigue entre ces playlists sur ton laptop. La FLX4 en USB-C te laisse un setup très propre — un câble, et tu as accès à toute ta bibliothèque organisée par énergie.",
        en: "\n\n**On your DDJ-FLX4**\nTo structure your set on the FLX4, prepare Rekordbox playlists by energy phase: \"Intro,\" \"Build,\" \"Peak,\" \"Cooldown.\" While playing, navigate between them on your laptop. The FLX4's USB-C connection keeps your setup clean — one cable and you've got your entire library organized by energy level.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour naviguer vite pendant ton set, utilise les raccourcis Rekordbox : la barre de recherche avec filtres par BPM et clé te permet de trouver le prochain morceau en 5 secondes. Sur ta FLX4, tu peux aussi assigner un pad en mode Hot Cue sur les intros de tes morceaux pour vérifier rapidement si ça matche avec ce qui joue — écoute au casque, décision instantanée.",
        en: "\n\n**On your DDJ-FLX4**\nTo navigate quickly during your set, use Rekordbox shortcuts: the search bar with BPM and key filters lets you find the next track in 5 seconds. On your FLX4, you can also assign pads in Hot Cue mode to track intros for quick preview — listen in your headphones, instant decision.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour gérer l'énergie en temps réel sur ta FLX4, le Merge FX est parfait pour les moments de transition entre phases. Un seul geste transforme une montée en respiration ou un plateau en relance. Combine ça avec les filtres sur les potards (bouton Shift + EQ) pour des variations rapides d'énergie sans casser le groove.",
        en: "\n\n**On your DDJ-FLX4**\nTo manage energy in real time on your FLX4, Merge FX is perfect for transitions between set phases. One gesture transforms a build into a breather or a plateau into a relaunch. Combine it with filter sweeps (Shift + EQ knobs) for quick energy shifts without breaking the groove.",
      },
    },
    6: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nSur ta FLX4, les loops s'activent via les pads en mode Loop. Appuie sur le pad correspondant pour un loop 4, 8 ou 16 temps. Pour un loop plus court (1 ou 2 temps), utilise Shift + pad — c'est la couche secondaire qui donne accès aux longueurs plus fines. Le truc pro : prépare ton loop en avance, et relâche avec un timing de phrase impeccable.",
        en: "\n\n**On your DDJ-FLX4**\nOn your FLX4, loops activate via the pads in Loop mode. Press the corresponding pad for a 4, 8, or 16-beat loop. For shorter loops (1 or 2 beats), use Shift + pad — that's the secondary layer giving access to finer lengths. Pro move: set your loop in advance, and release it with impeccable phrase timing.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nTa FLX4 n'a pas de section Beat FX dédiée comme les contrôleurs plus grands, mais Rekordbox te donne accès à tous les effets via l'écran. Concentre-toi sur 2 effets max (filtre + echo) et assigne-les aux boutons FX de la FLX4. Le Merge FX intégré est ton atout unique : un seul bouton pour une transition FX complète avec filtre, echo et backspin combinés.",
        en: "\n\n**On your DDJ-FLX4**\nYour FLX4 doesn't have a dedicated Beat FX section like larger controllers, but Rekordbox gives you full FX access on screen. Focus on 2 effects max (filter + echo) and assign them to the FLX4's FX buttons. The built-in Merge FX is your unique advantage: one button for a complete FX transition combining filter, echo, and backspin.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour ta transition créative complète sur la FLX4 : active le loop (pad), sculpte l'EQ (potards centraux, bien serrés — tu les connais maintenant), puis déclenche le Merge FX pour le passage final. Le secret, c'est la séquence : loop → EQ → Merge FX → release. Pratique cette chorégraphie jusqu'à ce que tes doigts la connaissent par cœur.",
        en: "\n\n**On your DDJ-FLX4**\nFor your full creative transition on the FLX4: activate the loop (pad), sculpt the EQ (center knobs, tightly spaced — you know them by now), then trigger Merge FX for the final switch. The secret is the sequence: loop → EQ → Merge FX → release. Practice this choreography until your fingers know it by heart.",
      },
    },
    7: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nL'avantage de ta FLX4 compacte pour la lecture de foule : tu n'as pas un mur de matos entre toi et le public. Tes yeux sont libres. Développe le réflexe « scan 60 secondes » : un regard sur la piste toutes les minutes, puis retour aux platines. Les pads de la FLX4 te permettent de préparer tes morceaux de secours en Hot Cue — un seul geste pour pivoter si l'énergie chute.",
        en: "\n\n**On your DDJ-FLX4**\nYour compact FLX4's advantage for crowd reading: there's no wall of gear between you and the audience. Your eyes are free. Build the \"60-second scan\" reflex: one look at the floor every minute, then back to the decks. The FLX4's pads let you prepare rescue tracks in Hot Cue mode — one tap to pivot if energy drops.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nQuand tu dois changer de direction musicale en urgence sur ta FLX4, voilà le workflow express : (1) cherche dans Rekordbox avec le filtre BPM/clé, (2) charge sur le deck libre, (3) lance depuis un Hot Cue préparé, (4) utilise Merge FX pour un cut propre. En moins de 10 secondes, tu as pivoté. C'est la force de la config laptop + contrôleur compact.",
        en: "\n\n**On your DDJ-FLX4**\nWhen you need to change musical direction urgently on your FLX4, here's the express workflow: (1) search in Rekordbox with BPM/key filter, (2) load on the free deck, (3) launch from a prepared Hot Cue, (4) use Merge FX for a clean cut. In under 10 seconds, you've pivoted. That's the power of the laptop + compact controller setup.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour les transitions d'urgence sur ta FLX4, prépare 4 Hot Cues stratégiques sur tes morceaux de secours : un sur l'intro, un sur le drop, un sur un breakdown et un sur l'outro. En situation de stress, tu n'as qu'à charger le morceau et appuyer sur le bon pad — pas besoin de chercher le bon point de départ, il est déjà marqué.",
        en: "\n\n**On your DDJ-FLX4**\nFor emergency transitions on your FLX4, set up 4 strategic Hot Cues on your rescue tracks: one on the intro, one on the drop, one on a breakdown, and one on the outro. Under pressure, just load the track and hit the right pad — no need to find the right start point, it's already marked.",
      },
    },
    8: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour préparer ton set cabine depuis ta FLX4, exporte toujours une clé USB en parallèle de ton setup Rekordbox principal. Dans Rekordbox, utilise « Exporter vers appareil » et sélectionne tes playlists d'énergie. Même si tu joues habituellement en laptop + FLX4, cette clé USB peut te sauver si ton laptop plante — branche-la dans un CDJ de backup en club.",
        en: "\n\n**On your DDJ-FLX4**\nTo prep your club set from your FLX4, always export a USB stick alongside your main Rekordbox setup. In Rekordbox, use \"Export to Device\" and select your energy playlists. Even if you usually play laptop + FLX4, that USB stick can save you if your laptop crashes — plug it into a backup CDJ at the venue.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nDans Rekordbox, crée une structure de playlists claire pour ta FLX4 : un dossier par genre, puis des sous-playlists par niveau d'énergie (Low / Mid / High / Peak). Ajoute une playlist « Urgence » avec 10 morceaux sûrs toutes énergies. Pendant le set, cette organisation te permet de naviguer en 2-3 clics max — vital quand la foule attend.",
        en: "\n\n**On your DDJ-FLX4**\nIn Rekordbox, create a clear playlist structure for your FLX4: one folder per genre, then sub-playlists by energy level (Low / Mid / High / Peak). Add an \"Emergency\" playlist with 10 safe tracks across all energies. During the set, this structure lets you navigate in 2-3 clicks max — vital when the crowd is waiting.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nTa FLX4 est compacte et portable — c'est un avantage en backup. Prépare un kit « plan B » : ta FLX4 + câble USB-C + laptop chargé + clé USB exportée. Si le matos du club pose problème, tu peux brancher ta FLX4 sur n'importe quelle sortie et reprendre ton set en 30 secondes. C'est le filet de sécurité ultime du DJ laptop.",
        en: "\n\n**On your DDJ-FLX4**\nYour FLX4 is compact and portable — that's a backup advantage. Prepare a \"Plan B\" kit: FLX4 + USB-C cable + charged laptop + exported USB stick. If the club gear fails, you can plug your FLX4 into any output and resume your set in 30 seconds. It's the ultimate safety net for a laptop DJ.",
      },
    },
    9: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nAvant de monter en cabine avec ta FLX4 : branche le USB-C, ouvre Rekordbox, vérifie que le contrôleur est détecté (voyant allumé). Fais un check rapide des gains (potards à midi), teste tes sorties casque et Master. Charge ton morceau d'intro et lance-le à volume zéro pour vérifier que le signal passe. Ce rituel de 2 minutes te met en confiance avant même le premier beat.",
        en: "\n\n**On your DDJ-FLX4**\nBefore stepping into the booth with your FLX4: plug in USB-C, open Rekordbox, verify the controller is detected (light on). Quick-check gains (knobs at noon), test headphone and Master outputs. Load your intro track and play at zero volume to confirm signal flows. This 2-minute ritual builds confidence before the first beat drops.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nLe monitoring sur ta FLX4 se gère via la molette CUE/MASTER du casque. En cabine, commence par écouter le retour cabine (enceintes booth), puis bascule au casque pour le cue du prochain morceau. Attention : en club, le son de la salle arrive avec un léger délai — fie-toi à ton casque et au retour booth, PAS au son de la façade. C'est un piège classique pour les DJs laptop.",
        en: "\n\n**On your DDJ-FLX4**\nMonitoring on your FLX4 is managed via the CUE/MASTER headphone knob. In the booth, start by listening to booth monitors, then switch to headphones for cueing the next track. Warning: in a club, the main PA sound reaches you with a slight delay — trust your headphones and booth monitors, NOT the front-of-house. This is a classic trap for laptop DJs.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour connecter ta FLX4 au système du club : sortie Master (RCA ou jack selon ton câble) vers la table de mixage du club ou directement vers un ampli. Demande toujours au sonorisateur où brancher AVANT d'arriver en cabine. Prévois un adaptateur RCA → jack 6.35mm et un câble jack → XLR au cas où. La FLX4 sort en niveau ligne — pas besoin de préamp, mais vérifie le gain d'entrée sur leur table.",
        en: "\n\n**On your DDJ-FLX4**\nTo connect your FLX4 to the club system: Master output (RCA or jack depending on your cable) into the club mixer or directly to an amp. Always ask the sound engineer where to plug in BEFORE stepping into the booth. Bring an RCA → 1/4\" jack adapter and a jack → XLR cable just in case. The FLX4 outputs line level — no preamp needed, but check the input gain on their mixer.",
      },
    },
    10: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nLes fonctions avancées qui rendent ta FLX4 unique : le Merge FX (transition complète en un geste), les couches Shift sur les pads (8 Hot Cues + 8 fonctions secondaires par deck), et la compatibilité Rekordbox Cloud pour synchroniser ta bibliothèque entre appareils. Explore aussi le mode « Pad FX » — chaque pad déclenche un effet rythmique synchronisé au BPM.",
        en: "\n\n**On your DDJ-FLX4**\nAdvanced features that make your FLX4 unique: Merge FX (complete transition in one gesture), Shift layers on pads (8 Hot Cues + 8 secondary functions per deck), and Rekordbox Cloud compatibility for syncing your library across devices. Also explore \"Pad FX\" mode — each pad triggers a rhythmic effect synced to BPM.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nPour développer ton workflow signature sur la FLX4 : identifie 3 gestes qui te sont propres. Par exemple : Merge FX en entrée de drop, Hot Cue pad-juggling sur les breakdowns, filtre progressif sur la montée. Répète ces gestes jusqu'à ce qu'ils deviennent ta « marque de fabrique ». Quand les gens te reconnaissent à ta façon de mixer, c'est gagné.",
        en: "\n\n**On your DDJ-FLX4**\nTo develop your signature workflow on the FLX4: identify 3 gestures that are uniquely yours. For example: Merge FX into the drop, Hot Cue pad-juggling on breakdowns, progressive filter on the build. Repeat these moves until they become your \"trademark.\" When people recognize your mixing style, you've made it.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX4**\nRoutine d'entraînement long terme pour ta FLX4 : (1) 15 min de transitions propres sans FX — la base. (2) 15 min de créativité — Merge FX, loops, Hot Cues expérimentaux. (3) 15 min de simulation live — un set sans pause, pression du chrono, interdiction de revenir en arrière. Fais ça 3 fois par semaine et ta progression sera visible mois après mois.",
        en: "\n\n**On your DDJ-FLX4**\nLong-term practice routine for your FLX4: (1) 15 min of clean transitions without FX — the foundation. (2) 15 min of creativity — Merge FX, loops, experimental Hot Cues. (3) 15 min of live simulation — a non-stop set, timer pressure, no going back. Do this 3 times a week and your progress will be visible month after month.",
      },
    },
  },
  flx3: {
    2: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nTa FLX3 offre un layout plus spacieux que la FLX4 : les 3 potards EQ (High/Mid/Low) et le Trim sont bien espacés, tu as de la place pour chaque doigt. En bonus, tu as le potard **Smart CFX** dédié sur chaque voie — c'est un outil de sculpting sonore supplémentaire. Pendant que tu explores les 3 bandes d'EQ, essaie aussi de tourner le Smart CFX : tu verras qu'il peut filtrer, ajouter du grain ou de la résonance. C'est un couteau suisse sonore que les autres contrôleurs n'ont pas.",
        en: "\n\n**On your DDJ-FLX3**\nYour FLX3 offers a more spacious layout than the FLX4: the 3 EQ knobs (High/Mid/Low) and Trim are well-spaced, giving each finger room to breathe. As a bonus, you have a dedicated **Smart CFX** knob on each channel — it's an extra sound-sculpting tool. While exploring the 3 EQ bands, also try turning the Smart CFX: you'll find it can filter, add grit, or add resonance. It's a sonic Swiss Army knife that other controllers don't have.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nLe swap de basses est confortable sur la FLX3 grâce à l'espacement des voies. Tes deux mains ont de la place pour atteindre les potards Low simultanément. En complément du swap de basses classique, essaie d'utiliser le **Smart CFX** pendant la transition : tourne-le légèrement sur le morceau sortant pour ajouter un filtre qui « efface » progressivement le son, pendant que le nouveau morceau prend le relais avec ses basses. Ça donne un effet plus cinématique qu'un simple swap sec.",
        en: "\n\n**On your DDJ-FLX3**\nThe bass swap feels comfortable on the FLX3 thanks to the wider channel spacing. Both hands have room to reach the Low knobs simultaneously. On top of the classic bass swap, try using the **Smart CFX** during the transition: turn it slightly on the outgoing track to add a filter that gradually 'erases' the sound while the new track takes over with its bass. It creates a more cinematic effect than a dry swap.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour les 3 scénarios, ta FLX3 te donne des options supplémentaires. Tu as la section **Beat FX** dédiée (echo, reverb, flanger…) en plus du Smart CFX. Pour le scénario 3 (build-up), combine les deux : baisse les basses progressivement avec l'EQ, ajoute un peu de Beat FX (un delay léger) et tourne le Smart CFX vers la fin pour créer une montée de tension unique. Quand tu lâches le nouveau morceau, coupe tous les effets d'un coup — l'impact est maximal.",
        en: "\n\n**On your DDJ-FLX3**\nFor all 3 scenarios, your FLX3 gives you extra options. You have a dedicated **Beat FX** section (echo, reverb, flanger…) on top of Smart CFX. For scenario 3 (the build-up), combine both: gradually reduce the bass with EQ, add a touch of Beat FX (a light delay), and turn the Smart CFX toward the end to create a unique tension build. When you drop the new track, kill all effects at once — maximum impact.",
      },
    },
    3: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nTa FLX3 a des pads de performance bien visibles sous chaque jog wheel. Utilise-les pour poser des **hot cues** aux points clés de tes morceaux : début de couplet, drop, point d'intro idéal pour le mix. Pendant la phase de préparation, un appui sur le pad te ramène au point exact — plus besoin de chercher dans la waveform. Les jog wheels sont plus grandes que sur la FLX4, ce qui rend le calage manuel plus précis et plus agréable.",
        en: "\n\n**On your DDJ-FLX3**\nYour FLX3 has clearly visible performance pads below each jog wheel. Use them to set **hot cues** at key points in your tracks: verse start, drop, ideal intro point for mixing. During the preparation phase, one pad tap takes you back to the exact spot — no need to hunt through the waveform. The jog wheels are larger than on the FLX4, making manual beatmatching more precise and more satisfying.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour les 4 styles de transitions, ta FLX3 brille sur les transitions créatives grâce à sa section **Beat FX** dédiée. Pendant la transition, active un delay ou un echo sur le morceau sortant : ça crée un « voile » sonore qui habille la bascule. Tu peux aussi combiner le **Smart CFX** (filtre) avec le Beat FX pour un résultat encore plus riche. Pour le coup sec, les faders de la FLX3 ont une course confortable — tu peux être rapide et précis à la fois.",
        en: "\n\n**On your DDJ-FLX3**\nFor the 4 transition styles, your FLX3 shines on creative transitions thanks to its dedicated **Beat FX** section. During the transition, activate a delay or echo on the outgoing track: it creates a sonic 'veil' that dresses up the handover. You can also combine **Smart CFX** (filter) with Beat FX for an even richer result. For quick cuts, the FLX3's faders have a comfortable travel — you can be both fast and precise.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour ton premier mini-set, la FLX3 t'offre un espace de travail confortable. Prépare tes hot cues sur les 3 morceaux avant de commencer. Astuce FLX3 : utilise le **Smart CFX** comme outil de transition entre les morceaux — un léger filtre pendant le swap donne un côté professionnel à ton enchaînement. Enregistre ta session dans Rekordbox et réécoute en notant ce qui sonne bien. Bonus : essaie un petit Beat FX (echo court) sur la dernière mesure du morceau sortant.",
        en: "\n\n**On your DDJ-FLX3**\nFor your first mini-set, the FLX3 gives you a comfortable workspace. Set up hot cues on all 3 tracks before you begin. FLX3 tip: use **Smart CFX** as a transition tool between tracks — a light filter during the swap adds a professional touch to your blend. Record your session in Rekordbox and listen back, noting what sounds good. Bonus: try a short Beat FX (brief echo) on the last bar of the outgoing track.",
      },
    },
    4: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nTa FLX3 affiche les informations de clé sur son propre écran — un vrai avantage. Tu peux voir la tonalité du morceau chargé directement sur le contrôleur sans regarder l'écran du laptop. En parallèle, Rekordbox te donne une vue globale de ta bibliothèque triée par clé Camelot. Ce double affichage (contrôleur + laptop) te donne une vision complète en un coup d'œil.",
        en: "\n\n**On your DDJ-FLX3**\nYour FLX3 displays key information on its own screen — a real advantage. You can see the loaded track's key directly on the controller without looking at the laptop. Meanwhile, Rekordbox gives you a full view of your library sorted by Camelot key. This dual display (controller + laptop) gives you complete visibility at a glance.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nAvec ta FLX3 et Rekordbox en notation Camelot, tu as un workflow harmonique très fluide : l'écran du contrôleur te montre la clé du morceau qui joue, et Rekordbox te permet de filtrer les morceaux compatibles. La section Beat FX de ta FLX3 te permet aussi de placer un delay ou reverb pendant une transition pour adoucir un léger frottement entre deux clés proches.",
        en: "\n\n**On your DDJ-FLX3**\nWith your FLX3 and Rekordbox in Camelot notation, you have a smooth harmonic workflow: the controller screen shows the playing track's key, and Rekordbox lets you filter compatible tracks. Your FLX3's Beat FX section also lets you place a delay or reverb during a transition to soften slight friction between two close keys.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPendant ta transition harmonique, profite des jog wheels plus grandes de ta FLX3 — elles offrent une inertie agréable pour des corrections de phase ultra-précises. La FLX3 te donne aussi un accès direct au Smart CFX : un seul potard pour ajouter une texture pendant le blend entre deux morceaux en clés compatibles. C'est subtil, mais ça rend la transition encore plus « musicale ».",
        en: "\n\n**On your DDJ-FLX3**\nDuring your harmonic transition, take advantage of your FLX3's larger jog wheels — they offer nice inertia for ultra-precise phase corrections. The FLX3 also gives you direct Smart CFX access: one knob to add texture during the blend between two key-compatible tracks. It's subtle, but it makes the transition sound even more \"musical.\"",
      },
      4: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour casser les règles du Camelot sur ta FLX3, combine le Smart CFX et la section Beat FX. Le Smart CFX crée un voile sonore qui masque la dissonance, et le Beat FX (echo ou reverb) allonge les queues harmoniques pour flouter le passage. C'est comme peindre un dégradé entre deux couleurs qui ne matchent pas — le résultat est plus artistique qu'un cut brut.",
        en: "\n\n**On your DDJ-FLX3**\nTo break Camelot rules on your FLX3, combine Smart CFX with the Beat FX section. Smart CFX creates a sonic veil that masks dissonance, and Beat FX (echo or reverb) stretches harmonic tails to blur the passage. It's like painting a gradient between two clashing colors — the result is more artistic than a raw cut.",
      },
    },
    5: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour structurer ton set, la FLX3 te donne plus d'espace de travail que la FLX4 — profites-en. Organise tes playlists Rekordbox par phase, et utilise la section Beat FX dédiée pour marquer les transitions entre phases (un delay en sortie d'intro, un reverb avant le pic). L'écran intégré te permet de vérifier le BPM et la clé sans quitter le contrôleur des yeux.",
        en: "\n\n**On your DDJ-FLX3**\nTo structure your set, the FLX3 gives you more workspace than the FLX4 — use it. Organize Rekordbox playlists by phase, and use the dedicated Beat FX section to mark transitions between phases (a delay at the intro exit, reverb before the peak). The built-in screen lets you check BPM and key without taking your eyes off the controller.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour naviguer vite dans tes morceaux sur la FLX3 : utilise l'écran du contrôleur pour browser tes playlists directement, sans passer par le laptop. Le rotary browser te permet de scroller rapidement et de charger en un clic. Combine ça avec des playlists bien nommées par énergie — tu trouveras le bon morceau en quelques secondes même sous pression.",
        en: "\n\n**On your DDJ-FLX3**\nTo navigate tracks quickly on the FLX3: use the controller's screen to browse playlists directly, without reaching for the laptop. The rotary browser lets you scroll fast and load with one press. Combine this with well-named energy-level playlists — you'll find the right track in seconds even under pressure.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour gérer l'énergie en live, ta FLX3 a un avantage décisif : le Smart CFX. Ce potard unique te permet de transformer l'ambiance d'un seul geste — un filtre progressif qui monte l'énergie, ou un « wash » qui calme le jeu. Combine-le avec la section Beat FX pour des montées de tension (echo crescendo) ou des respirations (reverb douce en sortie de pic).",
        en: "\n\n**On your DDJ-FLX3**\nTo manage energy live, your FLX3 has a decisive advantage: Smart CFX. This single knob transforms the vibe in one gesture — a progressive filter that builds energy, or a \"wash\" that calms things down. Combine it with Beat FX for tension builds (crescendo echo) or breathers (soft reverb after a peak).",
      },
    },
    6: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nSur ta FLX3, les loops sont accessibles via les pads de performance — mais tu as aussi la possibilité de contrôler la longueur du loop directement depuis l'écran. Active un loop 4 temps d'un tap, puis divise ou double avec les boutons dédiés. La taille plus généreuse du contrôleur fait que tes gestes sont plus précis — moins de risque d'appuyer sur le mauvais pad en live.",
        en: "\n\n**On your DDJ-FLX3**\nOn your FLX3, loops are accessible via performance pads — but you can also control loop length directly from the screen. Activate a 4-beat loop with one tap, then halve or double with the dedicated buttons. The controller's larger size means more precise gestures — less risk of hitting the wrong pad during a live set.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nC'est ici que ta FLX3 brille vraiment : la section Beat FX dédiée + le Smart CFX. Le Beat FX te donne accès à l'echo, le reverb, le flanger, le delay — avec un potard wet/dry et un sélecteur de timing. Le Smart CFX ajoute une texture unique par-dessus. La combinaison des deux, c'est ta palette d'artiste : Beat FX pour la tension, Smart CFX pour la couleur.",
        en: "\n\n**On your DDJ-FLX3**\nThis is where your FLX3 truly shines: the dedicated Beat FX section + Smart CFX. Beat FX gives you echo, reverb, flanger, delay — with a wet/dry knob and timing selector. Smart CFX adds a unique texture on top. The combination is your artist's palette: Beat FX for tension, Smart CFX for color.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour ta transition créative complète sur la FLX3 : loop (pads) → swap de basses (EQ) → Beat FX pour la tension → Smart CFX pour la texture → release. Tu as l'espace pour faire tout ça sans te mélanger les pinceaux. L'ergonomie de la FLX3 te permet d'avoir chaque outil sous un doigt différent — c'est cette fluidité qui rend tes transitions créatives possibles en live.",
        en: "\n\n**On your DDJ-FLX3**\nFor your full creative transition on the FLX3: loop (pads) → bass swap (EQ) → Beat FX for tension → Smart CFX for texture → release. You have the space to do all this without getting tangled. The FLX3's ergonomics let you reach each tool with a different finger — that fluidity is what makes creative transitions possible live.",
      },
    },
    7: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nTa FLX3 est un peu plus grande que la FLX4, mais tu restes dans un setup compact qui te permet de lever les yeux facilement. Le Smart CFX est ton outil de réaction rapide par excellence : si tu sens la foule décrocher, un tour de potard et tu changes l'ambiance instantanément — sans chercher un nouveau morceau. Ça te donne 10-15 secondes de répit pour prendre ta décision.",
        en: "\n\n**On your DDJ-FLX3**\nYour FLX3 is slightly larger than the FLX4, but you're still in a compact setup that lets you look up easily. Smart CFX is your ultimate quick-reaction tool: if you sense the crowd dropping off, one knob turn and you shift the vibe instantly — without searching for a new track. It buys you 10-15 seconds to make your decision.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour changer de direction musicale rapidement sur ta FLX3 : (1) Smart CFX pour « voiler » le morceau en cours, (2) browse ta playlist d'urgence à l'écran du contrôleur, (3) charge et lance depuis un Hot Cue, (4) Beat FX (echo court) pour le pont, (5) swap. Tout est accessible sans toucher le laptop — c'est ça la force de la FLX3 en situation de stress.",
        en: "\n\n**On your DDJ-FLX3**\nTo change musical direction quickly on your FLX3: (1) Smart CFX to \"veil\" the current track, (2) browse your emergency playlist on the controller screen, (3) load and launch from a Hot Cue, (4) Beat FX (short echo) for the bridge, (5) swap. Everything is accessible without touching the laptop — that's the FLX3's strength under pressure.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour les transitions d'urgence, tes pads Hot Cue de la FLX3 sont tes meilleurs amis. Place des Hot Cues stratégiques sur tes morceaux de secours (intro, drop, breakdown, outro). En cas de panique, le geste est simple : charge → pad → play. Pas de recherche, pas d'hésitation. Et si tu as besoin de temps, le Smart CFX te donne un « voile sonore » pour masquer le passage.",
        en: "\n\n**On your DDJ-FLX3**\nFor emergency transitions, your FLX3's Hot Cue pads are your best friends. Place strategic Hot Cues on rescue tracks (intro, drop, breakdown, outro). In a panic, the gesture is simple: load → pad → play. No searching, no hesitation. And if you need time, Smart CFX gives you a \"sonic veil\" to mask the transition.",
      },
    },
    8: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour préparer ton set cabine depuis ta FLX3, prépare une clé USB exportée depuis Rekordbox en plus de ton setup laptop. Ta FLX3 peut lire cette clé directement — c'est un vrai filet de sécurité. Exporte tes playlists organisées par énergie et vérifie que les analyses BPM/clé sont propres avant d'exporter. Teste la clé sur le contrôleur avant le jour J.",
        en: "\n\n**On your DDJ-FLX3**\nTo prep your club set from your FLX3, prepare a Rekordbox-exported USB stick alongside your laptop setup. Your FLX3 can read it directly — a real safety net. Export your energy-organized playlists and verify BPM/key analyses are clean before exporting. Test the stick on the controller before the big day.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nDans Rekordbox, organise tes playlists pour la FLX3 avec une logique claire : dossier par genre → sous-playlists par énergie → playlist « SOS » avec des morceaux passe-partout. Sur le contrôleur, tu peux naviguer ces dossiers directement à l'écran avec le rotary browser — c'est rapide et tu ne perds jamais le fil de ton set pendant que tu cherches.",
        en: "\n\n**On your DDJ-FLX3**\nIn Rekordbox, organize playlists for your FLX3 with clear logic: folder per genre → sub-playlists by energy → \"SOS\" playlist with versatile tracks. On the controller, you can browse these folders directly on screen with the rotary browser — it's fast and you never lose track of your set while searching.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nTon plan de backup avec la FLX3 : (1) clé USB principale exportée proprement, (2) clé USB de secours identique, (3) laptop avec Rekordbox prêt si les clés USB posent problème. Stocke aussi une version « light » de tes playlists essentielles sur ton téléphone (via Rekordbox mobile) — en dernier recours, tu peux diffuser depuis ton phone. La redondance, c'est la sérénité.",
        en: "\n\n**On your DDJ-FLX3**\nYour backup plan with the FLX3: (1) clean main USB stick export, (2) identical backup USB stick, (3) laptop with Rekordbox ready if USB sticks fail. Also store a \"light\" version of your essential playlists on your phone (via Rekordbox mobile) — as a last resort, you can stream from your phone. Redundancy equals peace of mind.",
      },
    },
    9: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nAvant de monter en cabine avec ta FLX3 : branche-la, vérifie la détection dans Rekordbox, teste les sorties casque et Master. Check les gains (tous à midi), charge ton morceau d'intro et fais un test de signal à volume zéro. Avec ta FLX3, profite de l'écran intégré pour vérifier que tes morceaux sont bien analysés — grilles, clés, BPM — tout doit être vert avant de jouer.",
        en: "\n\n**On your DDJ-FLX3**\nBefore stepping into the booth with your FLX3: plug in, verify detection in Rekordbox, test headphone and Master outputs. Check gains (all at noon), load your intro track and do a zero-volume signal test. With your FLX3, use the built-in screen to verify your tracks are properly analyzed — grids, keys, BPM — everything must be green before playing.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nLe monitoring sur ta FLX3 est confortable grâce à l'espacement des contrôles. Utilise la molette CUE/MASTER pour doser ce que tu entends : en début de set, favorise le retour booth (enceintes cabine) pour caler le volume global, puis bascule sur le casque pour cuer. La FLX3 gère bien la séparation des signaux — profite de cette clarté pour des transitions ultra-propres même dans une salle bruyante.",
        en: "\n\n**On your DDJ-FLX3**\nMonitoring on your FLX3 is comfortable thanks to well-spaced controls. Use the CUE/MASTER knob to balance what you hear: at the start of the set, favor booth monitors to set overall volume, then switch to headphones for cueing. The FLX3 handles signal separation well — use that clarity for ultra-clean transitions even in a noisy room.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour connecter ta FLX3 au système PA : sortie Master (RCA ou balanced selon le modèle) vers la console du club. Communique avec le sonorisateur avant de brancher. Prévois des adaptateurs RCA → XLR et jack → XLR. Ta FLX3 sort un signal propre en niveau ligne — pas besoin de pousser les gains sur leur table. Si le son est trop fort ou distordu, baisse TA sortie Master plutôt que de demander au son de baisser.",
        en: "\n\n**On your DDJ-FLX3**\nTo connect your FLX3 to the PA system: Master output (RCA or balanced depending on model) into the club console. Communicate with the sound engineer before plugging in. Bring RCA → XLR and jack → XLR adapters. Your FLX3 outputs a clean line-level signal — no need to push gains on their mixer. If it's too loud or distorted, lower YOUR Master output rather than asking them to turn down.",
      },
    },
    10: {
      1: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nLes fonctions avancées uniques à ta FLX3 : le Smart CFX (un potard = une palette de textures sonores impossible à reproduire sur d'autres contrôleurs), la section Beat FX avec sélecteur de timing, et les jog wheels grande taille pour un contrôle de vinyl feel. Explore chaque preset du Smart CFX — certains sont des perles cachées qui peuvent devenir ta signature sonore.",
        en: "\n\n**On your DDJ-FLX3**\nAdvanced features unique to your FLX3: Smart CFX (one knob = a palette of sonic textures impossible to replicate on other controllers), the Beat FX section with timing selector, and large-size jog wheels for vinyl-feel control. Explore every Smart CFX preset — some are hidden gems that can become your sonic signature.",
      },
      2: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nPour développer ton workflow signature sur la FLX3, identifie ta « trilogie créative » — 3 gestes qui te définissent. Exemple : Smart CFX progressif en montée, Beat FX echo en sortie de phrase, bass swap rapide avec les EQ. Répète cette trilogie sur 20 transitions différentes jusqu'à ce que ce soit automatique. Quand ton style est reconnaissable à l'oreille, tu as trouvé ton identité.",
        en: "\n\n**On your DDJ-FLX3**\nTo develop your signature workflow on the FLX3, identify your \"creative trilogy\" — 3 gestures that define you. Example: progressive Smart CFX on the build, Beat FX echo on phrase exits, quick bass swap with EQ. Repeat this trilogy across 20 different transitions until it's automatic. When your style is recognizable by ear, you've found your identity.",
      },
      3: {
        fr: "\n\n**Sur ta DDJ-FLX3**\nRoutine d'entraînement long terme pour ta FLX3 : (1) 15 min « propre » — transitions sans FX, focus timing et EQ. (2) 15 min « créatif » — Smart CFX, Beat FX, loops expérimentaux, pousse tes limites. (3) 15 min « live » — set chronométré sans pause ni retour arrière. Ajoute une session mensuelle « exploration » où tu testes un nouveau preset Smart CFX en situation de mix réel.",
        en: "\n\n**On your DDJ-FLX3**\nLong-term practice routine for your FLX3: (1) 15 min \"clean\" — transitions without FX, focus on timing and EQ. (2) 15 min \"creative\" — Smart CFX, Beat FX, experimental loops, push your limits. (3) 15 min \"live\" — timed set with no pauses or going back. Add a monthly \"exploration\" session where you test a new Smart CFX preset in a real mix situation.",
      },
    },
  },
  xdj_rx: {
    2: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nLes potards EQ de ton XDJ-RX sont espacés exactement comme sur une table de mixage de club (DJM). Le Trim est en haut, puis High, Mid, Low — dans cet ordre. Tu n'as pas besoin d'ordi : tout se fait directement sur l'appareil avec ta clé USB. Les VU-mètres à l'écran te montrent en temps réel le niveau de chaque bande quand tu tournes un potard. Entraîne-toi à lire ces VU-mètres du coin de l'œil — en club, c'est ta référence visuelle pour éviter la saturation.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX's EQ knobs are spaced exactly like a club mixer (DJM). Trim is at the top, then High, Mid, Low — in that order. You don't need a laptop: everything runs directly on the unit with your USB stick. The on-screen VU meters show you each band's level in real time as you turn a knob. Practice reading those VU meters out of the corner of your eye — in a club, they're your visual reference for avoiding distortion.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nLe swap de basses sur le XDJ-RX se fait exactement comme en club : les potards Low sont bien séparés entre les deux voies, comme sur un DJM. Tu peux voir l'impact de ton swap directement sur les **VU-mètres à l'écran** — quand tu coupes le Low d'une voie, la barre verte descend instantanément. Utilise ce repère visuel pour confirmer que ton swap est propre. En standalone (sans ordi), tu développes les réflexes qui te serviront directement en cabine DJ.",
        en: "\n\n**On your XDJ-RX**\nThe bass swap on the XDJ-RX works exactly like in a club: the Low knobs are well-separated between the two channels, just like on a DJM. You can see the impact of your swap directly on the **on-screen VU meters** — when you cut a channel's Low, the green bar drops instantly. Use this visual cue to confirm your swap is clean. In standalone mode (no laptop), you're building the exact reflexes you'll use in a real DJ booth.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour les 3 scénarios, ton XDJ-RX te met dans des conditions club. L'écran intégré affiche les waveforms des deux morceaux — tu vois visuellement les drops et les breaks arriver, ce qui t'aide à timer ton swap parfaitement. Pour le scénario 3 (build-up), observe la waveform : les sections où elle s'affine indiquent un break. Commence à baisser les basses à ce moment-là pour amplifier la tension naturelle du morceau. Tu n'as pas besoin d'ordi pour ça — tout est sur ton écran.",
        en: "\n\n**On your XDJ-RX**\nFor all 3 scenarios, your XDJ-RX puts you in club conditions. The built-in screen shows both tracks' waveforms — you can visually see drops and breaks coming, helping you time your swap perfectly. For scenario 3 (the build-up), watch the waveform: sections where it thins out indicate a break. Start reducing the bass at that point to amplify the track's natural tension. You don't need a laptop for any of this — it's all on your screen.",
      },
    },
    3: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nTon XDJ-RX affiche les **hot cues** directement à l'écran, avec des couleurs différentes pour chaque point. Place tes hot cues aux points d'entrée de tes morceaux depuis Rekordbox avant d'exporter ta clé USB — ils apparaîtront automatiquement sur l'appareil. Tu peux aussi les créer directement sur le XDJ-RX. Pendant la phase de préparation, l'écran te montre les deux waveforms superposées, tu vois si les beats sont alignés visuellement. C'est comme avoir un copilote — sans ordi.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX displays **hot cues** directly on screen, with different colors for each point. Set your hot cues at track entry points in Rekordbox before exporting your USB stick — they'll appear automatically on the unit. You can also create them directly on the XDJ-RX. During the preparation phase, the screen shows both waveforms overlaid, so you can visually check if the beats are aligned. It's like having a co-pilot — no laptop needed.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour tester les 4 styles de transitions, ton XDJ-RX a un avantage unique : tu vois les **deux waveforms** à l'écran sans ordi. Pour le coup sec, repère visuellement le début d'une phrase (le moment où la waveform s'épaissit après un break), et fais ta bascule pile à ce moment. Pour les transitions créatives, utilise la section FX intégrée — les effets sont les mêmes que sur les DJM de club. Tu t'entraînes sur du matériel pro, les gestes que tu apprends ici sont transférables directement en cabine.",
        en: "\n\n**On your XDJ-RX**\nFor testing the 4 transition styles, your XDJ-RX has a unique advantage: you can see **both waveforms** on screen without a laptop. For quick cuts, visually spot where a phrase starts (where the waveform thickens after a break), and make your switch right at that moment. For creative transitions, use the built-in FX section — the effects are the same as on club DJM mixers. You're training on pro gear, and every move you learn here transfers directly to a real booth.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour ton mini-set, ton XDJ-RX te met en conditions réelles de club. Prépare ta clé USB avec tes 3 morceaux dans une playlist Rekordbox, exporte et branche — pas d'ordi nécessaire. Navigue dans tes morceaux directement à l'écran. L'avantage : sans laptop entre toi et la musique, tu développes une connexion directe avec le son. C'est exactement ce qui t'attend en cabine pro. Enregistre ta session via la sortie REC de l'appareil pour réécouter et t'améliorer.",
        en: "\n\n**On your XDJ-RX**\nFor your mini-set, the XDJ-RX puts you in real club conditions. Prep your USB stick with your 3 tracks in a Rekordbox playlist, export and plug in — no laptop needed. Browse your tracks directly on screen. The advantage: with no laptop between you and the music, you develop a direct connection with the sound. This is exactly what awaits you in a pro booth. Record your session via the unit's REC output to listen back and improve.",
      },
    },
    4: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nTon XDJ-RX affiche la clé musicale directement sur ses écrans intégrés — pas besoin de laptop. Quand tu charges un morceau depuis ta clé USB, la clé Camelot apparaît à côté du BPM sur l'écran du deck. Tu peux même trier ta bibliothèque par clé directement sur l'appareil : utilise le bouton Sort et sélectionne « Key ». C'est le workflow le plus rapide et le plus pro.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX displays the musical key directly on its built-in screens — no laptop needed. When you load a track from your USB stick, the Camelot key appears next to the BPM on the deck screen. You can even sort your library by key directly on the unit: use the Sort button and select \"Key.\" It's the fastest, most professional workflow.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nSur ton XDJ-RX, le Camelot Wheel prend tout son sens : tu vois la clé du morceau qui joue sur l'écran gauche, et tu peux trier la bibliothèque par clé sur l'écran central pour trouver les morceaux compatibles. Pas de laptop entre toi et la musique — juste toi, tes clés USB bien préparées, et les écrans. C'est exactement le workflow des DJs de club.",
        en: "\n\n**On your XDJ-RX**\nOn your XDJ-RX, the Camelot Wheel makes perfect sense: you see the playing track's key on the left screen, and you can sort the library by key on the central screen to find compatible tracks. No laptop between you and the music — just you, your well-prepared USB sticks, and the screens. This is exactly the club DJ workflow.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPendant ta transition harmonique sur le XDJ-RX, tes grandes jog wheels te donnent un contrôle de phase digne des CDJ de club. L'inertie est agréable, les corrections sont douces. Les écrans intégrés te montrent les formes d'onde des deux morceaux en parallèle — tu VOIS le blend en temps réel. Utilise la fonction « Related Tracks » à l'écran pour découvrir des morceaux compatibles que tu n'avais pas envisagés.",
        en: "\n\n**On your XDJ-RX**\nDuring your harmonic transition on the XDJ-RX, the large jog wheels give you CDJ-level phase control. The inertia feels great, corrections are smooth. The built-in screens show both tracks' waveforms in parallel — you SEE the blend in real time. Use the on-screen \"Related Tracks\" feature to discover compatible tracks you hadn't considered.",
      },
      4: {
        fr: "\n\n**Sur ton XDJ-RX**\nQuand tu veux casser les règles du Camelot sur ton XDJ-RX, utilise la section FX intégrée (reverb, echo, delay) pour créer le pont entre deux clés incompatibles. L'avantage du XDJ-RX : les potards FX sont accessibles directement, pas dans un menu. Un coup de reverb généreux pendant la zone de dissonance, puis tu coupes net — la foule ne sent qu'une « vague » avant que le nouveau morceau prenne le relais.",
        en: "\n\n**On your XDJ-RX**\nWhen you want to break Camelot rules on your XDJ-RX, use the built-in FX section (reverb, echo, delay) to bridge two incompatible keys. The XDJ-RX advantage: FX knobs are directly accessible, not buried in menus. A generous reverb hit during the dissonance zone, then cut clean — the crowd only feels a \"wave\" before the new track takes over.",
      },
    },
    5: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour structurer ton set sur le XDJ-RX, tout passe par ta clé USB. Dans Rekordbox, crée des dossiers par phase d'énergie (Intro / Montée / Pic / Descente) et exporte-les sur ta clé. Sur l'appareil, tu navigues ces dossiers directement à l'écran — c'est fluide, rapide, et tu n'as besoin d'aucun laptop. C'est le workflow que tu retrouveras dans TOUS les clubs.",
        en: "\n\n**On your XDJ-RX**\nTo structure your set on the XDJ-RX, everything goes through your USB stick. In Rekordbox, create folders by energy phase (Intro / Build / Peak / Cooldown) and export them to USB. On the unit, you browse these folders directly on screen — it's fluid, fast, and laptop-free. This is the workflow you'll find in EVERY club.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour naviguer rapidement sur ton XDJ-RX en live : utilise le rotary selector pour scroller tes playlists à l'écran, et le bouton « Back » pour remonter dans l'arborescence. Prépare tes dossiers avec des noms courts et clairs (« 01_LOW », « 02_MID », « 03_HIGH »). Tu peux aussi utiliser la recherche par filtre directement sur l'écran — BPM range, clé compatible, tout est à portée de main.",
        en: "\n\n**On your XDJ-RX**\nTo navigate quickly on your XDJ-RX during a live set: use the rotary selector to scroll playlists on screen, and the \"Back\" button to move up the folder tree. Prepare folders with short, clear names (\"01_LOW,\" \"02_MID,\" \"03_HIGH\"). You can also use on-screen filter search — BPM range, compatible key — everything is at your fingertips.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour gérer l'énergie en live sur ton XDJ-RX, les outils sont intégrés : section FX pour les montées de tension (echo crescendo, filter sweep), et le mixer avec EQ 3 bandes bien espacé pour des transitions douces. L'avantage du XDJ-RX : pas de latence logicielle, tout est natif. Tes gestes d'énergie — monter les basses, couper les aigus, lancer un FX — sont instantanés et tactiles.",
        en: "\n\n**On your XDJ-RX**\nTo manage energy live on your XDJ-RX, the tools are built in: FX section for tension builds (crescendo echo, filter sweep), and the mixer with well-spaced 3-band EQ for smooth transitions. The XDJ-RX advantage: no software latency, everything is native. Your energy moves — boost bass, cut highs, launch FX — are instant and tactile.",
      },
    },
    6: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nSur ton XDJ-RX, les loops se contrôlent de deux façons : les boutons loop dédiés (In/Out + taille) ET les performance pads à l'écran. Active un loop 4 temps avec le bouton dédié, puis utilise les boutons de taille pour halver ou doubler. Tu peux aussi déclencher des loops prédéfinis depuis les pads — le même workflow que sur les CDJ-3000 en club. Tes grandes jog wheels rendent la sortie de loop ultra-précise.",
        en: "\n\n**On your XDJ-RX**\nOn your XDJ-RX, loops are controlled two ways: dedicated loop buttons (In/Out + size) AND on-screen performance pads. Activate a 4-beat loop with the dedicated button, then use size buttons to halve or double. You can also trigger preset loops from the pads — the same workflow as CDJ-3000s in clubs. Your large jog wheels make loop exits ultra-precise.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nLa section FX de ton XDJ-RX est celle que tu retrouveras en club sur les DJM. Echo, reverb, flanger, delay — tout est là avec un potard wet/dry, un sélecteur de timing (1/4, 1/2, 1, 2 temps) et un bouton ON/OFF dédié. Tu peux aussi utiliser les performance pads à l'écran pour déclencher des FX rythmiques. L'avantage : zéro latence, contrôle direct, sensation pro.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX's FX section is the same one you'll find in clubs on DJM mixers. Echo, reverb, flanger, delay — all there with a wet/dry knob, timing selector (1/4, 1/2, 1, 2 beats), and dedicated ON/OFF button. You can also use on-screen performance pads for rhythmic FX triggers. The advantage: zero latency, direct control, pro feel.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour ta transition créative complète sur le XDJ-RX : loop dédié (bouton) → EQ 3 bandes (bien espacé, geste confortable) → FX section pour la tension → release. Le XDJ-RX te donne le même espace et la même ergonomie qu'un setup CDJ + DJM de club. Chaque outil a son espace dédié — tes mains ne se croisent jamais. C'est cette ergonomie qui rend les transitions créatives fluides et sans stress.",
        en: "\n\n**On your XDJ-RX**\nFor your full creative transition on the XDJ-RX: dedicated loop (button) → 3-band EQ (well-spaced, comfortable gesture) → FX section for tension → release. The XDJ-RX gives you the same space and ergonomics as a club CDJ + DJM setup. Each tool has its dedicated area — your hands never cross. It's this ergonomics that makes creative transitions fluid and stress-free.",
      },
    },
    7: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nL'avantage massif de ton XDJ-RX pour la lecture de foule : PAS de laptop entre toi et le public. Rien ne bloque ta vue. Tu lèves les yeux et tu vois la piste directement. Les écrans intégrés te donnent toutes les infos nécessaires d'un coup d'œil rapide vers le bas — BPM, clé, temps restant. Le reste du temps, tes yeux sont sur la foule. C'est LE workflow de lecture de piste des pros.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX's massive advantage for crowd reading: NO laptop between you and the audience. Nothing blocks your view. Look up and you see the floor directly. The built-in screens give you all the info you need with a quick downward glance — BPM, key, remaining time. The rest of the time, your eyes are on the crowd. This IS the pro crowd-reading workflow.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour changer de direction musicale rapidement sur ton XDJ-RX : (1) tourne le rotary selector pour trouver un morceau dans ton dossier d'énergie alternative, (2) charge-le sur le deck libre, (3) lance depuis un Hot Cue marqué en amont, (4) utilise la section FX (echo court) pour le pont, (5) switch. L'avantage : tout se fait sur l'appareil, sans bouger de ta position. Tes mains restent sur les platines.",
        en: "\n\n**On your XDJ-RX**\nTo change musical direction quickly on your XDJ-RX: (1) turn the rotary selector to find a track in your alternative energy folder, (2) load on the free deck, (3) launch from a pre-set Hot Cue, (4) use the FX section (short echo) for the bridge, (5) switch. The advantage: everything happens on the unit, without shifting position. Your hands stay on the decks.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour les transitions d'urgence sur ton XDJ-RX, tes Hot Cues sont sauvegardés directement sur la clé USB — ils se rechargent à chaque fois que tu insères la clé. Place 4 Hot Cues stratégiques sur chaque morceau de secours. En situation de stress, charge le morceau → l'écran affiche tes cues → un pad → c'est parti. Pas de laptop à chercher, pas de souris à cliquer — tout est physique et immédiat.",
        en: "\n\n**On your XDJ-RX**\nFor emergency transitions on your XDJ-RX, your Hot Cues are saved directly on the USB stick — they reload every time you insert it. Place 4 strategic Hot Cues on each rescue track. Under pressure, load the track → screen shows your cues → one pad → go. No laptop to fumble with, no mouse to click — everything is physical and immediate.",
      },
    },
    8: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nLa préparation USB est CRUCIALE pour ton XDJ-RX — c'est ta seule source de morceaux (pas de laptop). Dans Rekordbox : (1) analyse TOUT à fond (BPM, clé, grilles, hot cues), (2) organise en dossiers par énergie, (3) exporte via « Exporter vers appareil ». Utilise une clé USB rapide (USB 3.0+), formatée en FAT32 ou exFAT. Teste-la sur le XDJ-RX AVANT le gig — un export raté = un set sans morceaux.",
        en: "\n\n**On your XDJ-RX**\nUSB preparation is CRUCIAL for your XDJ-RX — it's your only track source (no laptop). In Rekordbox: (1) fully analyze EVERYTHING (BPM, key, grids, hot cues), (2) organize into energy folders, (3) export via \"Export to Device.\" Use a fast USB stick (USB 3.0+), formatted FAT32 or exFAT. Test it on the XDJ-RX BEFORE the gig — a failed export = a set with no tracks.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nTon workflow Rekordbox pour le XDJ-RX doit être impeccable. Structure tes playlists comme ceci : « 01_Warm_Up » → « 02_Build » → « 03_Peak » → « 04_Cooldown » → « 05_SOS ». Dans chaque playlist, trie par BPM croissant. Ajoute des « My Tags » dans Rekordbox (Energy: Low/Mid/High) — ces tags sont lisibles directement sur l'écran du XDJ-RX après export.",
        en: "\n\n**On your XDJ-RX**\nYour Rekordbox workflow for the XDJ-RX must be impeccable. Structure playlists like this: \"01_Warm_Up\" → \"02_Build\" → \"03_Peak\" → \"04_Cooldown\" → \"05_SOS.\" Within each playlist, sort by ascending BPM. Add \"My Tags\" in Rekordbox (Energy: Low/Mid/High) — these tags are readable directly on the XDJ-RX screen after export.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nPlan de backup pour ton XDJ-RX : (1) clé USB principale (toujours testée la veille), (2) clé USB identique de secours (dans une poche différente), (3) une troisième clé avec un set minimal de 20 morceaux « all-purpose ». Si l'appareil ne lit pas une clé, essaie l'autre port USB. Le XDJ-RX a deux ports — utilise-les comme redondance, pas comme confort. La fiabilité avant tout.",
        en: "\n\n**On your XDJ-RX**\nBackup plan for your XDJ-RX: (1) main USB stick (always tested the day before), (2) identical backup stick (in a different pocket), (3) a third stick with a minimal 20-track \"all-purpose\" set. If the unit won't read one stick, try the other USB port. The XDJ-RX has two ports — use them for redundancy, not convenience. Reliability above all.",
      },
    },
    9: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nAvant de jouer sur ton XDJ-RX : insère ta clé USB, attends le chargement complet de la bibliothèque à l'écran. Vérifie que tes playlists sont là, que les morceaux se chargent et que les Hot Cues apparaissent. Teste les gains (à midi), les sorties casque et Booth/Master. Charge ton premier morceau et joue 2 secondes à volume zéro — signal OK ? Tu es prêt. Ce rituel de 3 minutes, c'est ton filet de sécurité.",
        en: "\n\n**On your XDJ-RX**\nBefore playing on your XDJ-RX: insert your USB stick, wait for the library to fully load on screen. Verify playlists are there, tracks load properly, and Hot Cues appear. Test gains (at noon), headphone and Booth/Master outputs. Load your first track and play 2 seconds at zero volume — signal OK? You're ready. This 3-minute ritual is your safety net.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nLe monitoring sur ton XDJ-RX fonctionne exactement comme en club : sortie Booth séparée de la sortie Master, CUE/MASTER au casque pour doser. En cabine, écoute le retour Booth (pas la façade — elle a du délai). Le XDJ-RX te donne aussi un VU-mètre par canal — garde tes niveaux dans le vert/orange, jamais dans le rouge. Si tu t'entraînes chez toi avec des enceintes de monitoring, place-les derrière toi comme en cabine.",
        en: "\n\n**On your XDJ-RX**\nMonitoring on your XDJ-RX works exactly like in a club: Booth output separate from Master, CUE/MASTER headphone blend for balance. In the booth, listen to the Booth monitors (not the PA — it has delay). The XDJ-RX also gives you per-channel VU meters — keep levels in green/orange, never red. If you practice at home with monitor speakers, place them behind you like in a real booth.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nTon XDJ-RX se connecte au PA comme un setup CDJ/DJM de club : sorties Master en XLR (balanced) ou RCA. En situation pro, utilise les XLR — meilleur signal, moins de bruit. Parle au sonorisateur avant de brancher. L'avantage massif : si tu joues sur ton propre XDJ-RX, tu connais TON matériel. Pas de mauvaise surprise de gain, pas de latence inconnue. Et si tu joues sur le setup du club (CDJ + DJM), l'ergonomie est la même — tu es déjà chez toi.",
        en: "\n\n**On your XDJ-RX**\nYour XDJ-RX connects to the PA like a club CDJ/DJM setup: Master outputs in XLR (balanced) or RCA. In a pro situation, use XLR — better signal, less noise. Talk to the sound engineer before plugging in. The massive advantage: if you play on your own XDJ-RX, you know YOUR gear. No gain surprises, no unknown latency. And if you play on the club setup (CDJ + DJM), the ergonomics are the same — you're already at home.",
      },
    },
    10: {
      1: {
        fr: "\n\n**Sur ton XDJ-RX**\nLes fonctions avancées uniques à ton XDJ-RX : les écrans intégrés qui affichent formes d'onde, BPM, clé, hot cues et playlists sans laptop. Le workflow USB pur qui te force à préparer impeccablement. La section FX identique aux DJM de club. Les grandes jog wheels avec sensation CDJ. Et les deux ports USB pour la redondance. Tout cela te prépare directement au workflow club pro — aucune transition d'apprentissage quand tu montes en cabine sur du Pioneer.",
        en: "\n\n**On your XDJ-RX**\nAdvanced features unique to your XDJ-RX: built-in screens displaying waveforms, BPM, key, hot cues and playlists without a laptop. The pure USB workflow that forces impeccable preparation. The FX section identical to club DJM mixers. Large jog wheels with CDJ feel. And two USB ports for redundancy. All of this directly prepares you for the pro club workflow — zero learning curve when you step into a booth with Pioneer gear.",
      },
      2: {
        fr: "\n\n**Sur ton XDJ-RX**\nPour développer ton workflow signature sur le XDJ-RX, pense comme un DJ de club : ta préparation USB EST ton workflow. La façon dont tu nommes tes dossiers, places tes Hot Cues, structures tes playlists, et utilises la section FX — c'est tout ça ta « signature ». Identifie 3 habitudes qui te rendent efficace et unique : peut-être ta structure de dossiers, ta façon d'utiliser les Hot Cues, ou ta séquence FX favorite.",
        en: "\n\n**On your XDJ-RX**\nTo develop your signature workflow on the XDJ-RX, think like a club DJ: your USB preparation IS your workflow. The way you name folders, place Hot Cues, structure playlists, and use the FX section — all of that is your \"signature.\" Identify 3 habits that make you efficient and unique: maybe your folder structure, your Hot Cue approach, or your favorite FX sequence.",
      },
      3: {
        fr: "\n\n**Sur ton XDJ-RX**\nRoutine d'entraînement long terme pour ton XDJ-RX : (1) 15 min « transitions pures » — pas de FX, juste EQ + jog wheels, le core du DJing club. (2) 15 min « FX et créativité » — explore chaque effet, teste des timings inhabituels. (3) 15 min « live USB-only » — joue un set complet uniquement depuis ta clé, sans filet laptop. Bonus mensuel : refais ta clé USB depuis zéro — ça t'oblige à recurer ta bibliothèque et rester frais.",
        en: "\n\n**On your XDJ-RX**\nLong-term practice routine for your XDJ-RX: (1) 15 min \"pure transitions\" — no FX, just EQ + jog wheels, the core of club DJing. (2) 15 min \"FX and creativity\" — explore every effect, test unusual timings. (3) 15 min \"live USB-only\" — play a full set from your stick alone, no laptop safety net. Monthly bonus: rebuild your USB stick from scratch — it forces you to re-curate your library and stay fresh.",
      },
    },
  },
};

/* ---------------------------------------------------------------------------
 * Equipment-specific tips — injected into shared modules (levels 2-10)
 * based on the user's actual controller (TargetDeck).
 * Each entry holds 1-2 tips per language, appended to the last slide's tips.
 * --------------------------------------------------------------------------- */
const EQUIPMENT_TIPS: Partial<Record<TargetDeck, Record<number, { fr: string[]; en: string[] }>>> = {
  flx4: {
    2: {
      fr: [
        "Sur ta FLX4, les potards EQ sont très proches les uns des autres — entraîne-toi à les manipuler sans regarder pour développer le geste réflexe.",
      ],
      en: [
        "On your FLX4, the EQ knobs are close together — practice turning them without looking to build muscle memory.",
      ],
    },
    3: {
      fr: [
        "Tes jog wheels sont compactes sur la FLX4 — travaille le toucher léger pour corriger le tempo sans à-coups.",
      ],
      en: [
        "Your FLX4's jog wheels are compact — practice a light touch for smooth tempo corrections without jerks.",
      ],
    },
    4: {
      fr: [
        "Sur ta FLX4, la clé Camelot s'affiche dans Rekordbox sur ton laptop — arrange tes colonnes pour voir BPM et clé d'un coup d'œil.",
      ],
      en: [
        "On your FLX4, the Camelot key shows in Rekordbox on your laptop — arrange your columns to see BPM and key at a glance.",
      ],
    },
    5: {
      fr: [
        "Avec ta FLX4 et Rekordbox, crée des playlists par niveau d'énergie — en live, tu navigueras beaucoup plus vite.",
      ],
      en: [
        "With your FLX4 and Rekordbox, create playlists sorted by energy level — you'll navigate much faster during a live set.",
      ],
    },
    6: {
      fr: [
        "Sur ta FLX4, utilise Shift + pad pour accéder aux loops en 2e couche — et découvre le Merge FX pour des transitions d'un seul geste.",
      ],
      en: [
        "On your FLX4, use Shift + pad to access loops on the 2nd layer — and try Merge FX for one-touch transitions.",
      ],
    },
    7: {
      fr: [
        "Avec ta FLX4 compacte, tu peux lever les yeux de la table plus facilement — profite de cette proximité pour scanner la foule en permanence.",
      ],
      en: [
        "With your compact FLX4, it's easy to look up from the decks — use that proximity to constantly scan the crowd.",
      ],
    },
    8: {
      fr: [
        "Connecte ta FLX4 en USB-C et prépare tes sets directement dans Rekordbox — exporte aussi une clé USB en backup, au cas où.",
      ],
      en: [
        "Connect your FLX4 via USB-C and prep your sets in Rekordbox — also export a USB stick as backup, just in case.",
      ],
    },
    9: {
      fr: [
        "Ta FLX4 est assez compacte pour l'emporter en backup — branche-la en USB-C et tu as ton environnement familier même sur un setup inconnu.",
      ],
      en: [
        "Your FLX4 is compact enough to bring as a backup — plug it in via USB-C and you have your familiar setup anywhere.",
      ],
    },
    10: {
      fr: [
        "Le Merge FX de ta FLX4 peut devenir ta signature — maîtrise-le à fond et intègre-le dans tes transitions pour un style reconnaissable.",
      ],
      en: [
        "Your FLX4's Merge FX can become your signature — master it fully and weave it into your transitions for a recognizable style.",
      ],
    },
  },
  flx3: {
    2: {
      fr: [
        "Sur ta FLX3, essaie le Smart CFX pendant que tu sculptes l'EQ — ça ajoute une texture unique à tes transitions.",
      ],
      en: [
        "On your FLX3, try the Smart CFX while sculpting EQ — it adds a unique texture to your transitions.",
      ],
    },
    3: {
      fr: [
        "La FLX3 a des jog wheels plus grandes que la FLX4 — profite de cette inertie pour des corrections de tempo plus fluides.",
      ],
      en: [
        "The FLX3 has larger jog wheels than the FLX4 — use that inertia for smoother tempo corrections.",
      ],
    },
    4: {
      fr: [
        "Ta FLX3 affiche les infos de clé directement sur le contrôleur — repère vite la tonalité avant de charger un morceau.",
      ],
      en: [
        "Your FLX3 displays key info directly on the controller — spot the key quickly before loading a track.",
      ],
    },
    5: {
      fr: [
        "Ta FLX3 offre plus d'espace de travail que la FLX4 — profite de la section Beat FX pour ponctuer les phases de ton set.",
      ],
      en: [
        "Your FLX3 offers more workspace than the FLX4 — use the Beat FX section to punctuate each phase of your set.",
      ],
    },
    6: {
      fr: [
        "Ta FLX3 a une section Beat FX dédiée + le Smart CFX — combine les deux pour des montées de tension uniques sans surcharger le mix.",
      ],
      en: [
        "Your FLX3 has a dedicated Beat FX section + Smart CFX — combine both for unique tension builds without cluttering the mix.",
      ],
    },
    7: {
      fr: [
        "Le Smart CFX de ta FLX3 te permet de réagir en un geste — un filtre instantané pour adapter l'énergie quand la foule te le demande.",
      ],
      en: [
        "Your FLX3's Smart CFX lets you react in one move — an instant filter to shift energy when the crowd demands it.",
      ],
    },
    8: {
      fr: [
        "Prépare tes playlists Rekordbox avec soin puis exporte sur clé USB — ta FLX3 lit aussi les clés exportées, un vrai filet de sécurité.",
      ],
      en: [
        "Prep your Rekordbox playlists carefully, then export to USB — your FLX3 also reads exported sticks, a real safety net.",
      ],
    },
    9: {
      fr: [
        "Avant de monter en cabine avec ta FLX3, fais un soundcheck rapide : gains, monitoring, retour cabine — la confiance commence par la technique.",
      ],
      en: [
        "Before stepping up with your FLX3, do a quick soundcheck: gains, monitoring, booth return — confidence starts with technique.",
      ],
    },
    10: {
      fr: [
        "Le Smart CFX de ta FLX3 est un outil créatif unique — explore chaque paramètre pour développer des textures que personne d'autre n'utilise.",
      ],
      en: [
        "Your FLX3's Smart CFX is a unique creative tool — explore every parameter to develop textures no one else uses.",
      ],
    },
  },
  xdj_rx: {
    2: {
      fr: [
        "Sur ton XDJ-RX, les potards EQ sont espacés comme en club — profite de cette ergonomie pour t'entraîner au geste pro.",
      ],
      en: [
        "On your XDJ-RX, the EQ layout matches club gear — use this to train pro-level muscle memory.",
      ],
    },
    3: {
      fr: [
        "Tes grandes jog wheels du XDJ-RX sont comme celles des CDJ en club — profites-en pour sentir le vinyle et corriger en douceur.",
      ],
      en: [
        "Your XDJ-RX's large jog wheels feel like club CDJs — use that vinyl feel for buttery-smooth corrections.",
      ],
    },
    4: {
      fr: [
        "Sur ton XDJ-RX, l'écran intégré affiche la clé de chaque morceau — trie par clé Camelot directement sur l'appareil, sans laptop.",
      ],
      en: [
        "On your XDJ-RX, the built-in screen shows each track's key — sort by Camelot key right on the unit, no laptop needed.",
      ],
    },
    5: {
      fr: [
        "Sur ton XDJ-RX, organise tes morceaux par dossiers d'énergie sur ta clé USB — tu pourras naviguer directement à l'écran sans laptop.",
      ],
      en: [
        "On your XDJ-RX, organize tracks into energy-level folders on your USB stick — browse directly on screen, no laptop needed.",
      ],
    },
    6: {
      fr: [
        "Sur ton XDJ-RX, les pads de performance sont accessibles à l'écran tactile — déclenche loops et FX sans quitter le mix des yeux.",
      ],
      en: [
        "On your XDJ-RX, performance pads are accessible via the touchscreen — trigger loops and FX without taking your eyes off the mix.",
      ],
    },
    7: {
      fr: [
        "Ton XDJ-RX te libère du laptop — sans écran d'ordi entre toi et la foule, tu lis la piste bien plus naturellement.",
      ],
      en: [
        "Your XDJ-RX frees you from the laptop — with no computer screen between you and the crowd, reading the floor feels natural.",
      ],
    },
    8: {
      fr: [
        "Sur ton XDJ-RX, teste ta clé USB exportée depuis Rekordbox directement sur l'appareil — vérifie l'ordre, les grilles et les cues à l'écran.",
      ],
      en: [
        "On your XDJ-RX, test your Rekordbox-exported USB stick directly on the unit — check track order, grids, and cues on screen.",
      ],
    },
    9: {
      fr: [
        "Ton XDJ-RX a le même layout que les CDJ de club — tu es déjà sur le bon matériel pour te sentir chez toi en cabine.",
      ],
      en: [
        "Your XDJ-RX has the same layout as club CDJs — you're already training on the right gear to feel at home in the booth.",
      ],
    },
    10: {
      fr: [
        "Ton XDJ-RX te prépare directement au workflow CDJ/DJM des clubs — toute l'expérience que tu accumules est transférable telle quelle en cabine pro.",
      ],
      en: [
        "Your XDJ-RX prepares you directly for the CDJ/DJM club workflow — every skill you build transfers directly to a pro booth.",
      ],
    },
  },
};

/* ---------------------------------------------------------------------------
 * GOAL_CONTENT — motivational context prepended to the FIRST slide of each
 * level, adapted to the user's declared goal (fun / party / club / pro).
 * --------------------------------------------------------------------------- */
const GOAL_CONTENT: Record<UserGoal, Record<number, { fr: string; en: string }>> = {
  fun: {
    1: {
      fr: "**Tu mixes parce que tu aimes la musique — et c'est la meilleure raison qui existe.** Pas de pression, pas d'enjeu : juste toi et tes morceaux préférés. Les bases que tu vas apprendre ici vont transformer ta façon d'écouter la musique pour toujours. Lance un de tes morceaux favoris et suis le guide — tu vas voir, ça change tout.",
      en: "**You're mixing because you love music — and that's the best reason there is.** No pressure, no stakes: just you and your favorite tracks. The basics you'll learn here will transform the way you listen to music forever. Put on one of your favorite tracks and follow along — you'll see, it changes everything.",
    },
    2: {
      fr: "**L'EQ, c'est ce qui transforme tes sessions perso en moments de pure satisfaction.** Même chez toi au casque, quand une transition passe sans accroc grâce à l'EQ, tu le sens — ce petit frisson de fierté. Essaie de mixer deux de tes morceaux feel-good en jouant uniquement avec les basses : tu vas entendre la magie opérer.",
      en: "**EQ is what turns your personal sessions into moments of pure satisfaction.** Even at home on headphones, when a transition flows smoothly thanks to EQ, you feel it — that little thrill of pride. Try mixing two of your feel-good tracks by playing with just the bass: you'll hear the magic happen.",
    },
    3: {
      fr: "**Une transition réussie, c'est ce moment où tu te dis « wow, j'ai fait ça » — même seul dans ton salon.** Ce feeling est addictif, et c'est exactement ce qui va te donner envie de continuer. Prends tes 3 morceaux guilty-pleasure préférés et essaie de les enchaîner sans coupure — le sourire sur ton visage sera ta meilleure récompense.",
      en: "**A smooth transition is that moment where you think 'wow, I did that' — even alone in your living room.** That feeling is addictive, and it's exactly what will keep you coming back. Take your 3 favorite guilty-pleasure tracks and try chaining them without a gap — the smile on your face will be your best reward.",
    },
    4: {
      fr: "**Le mix harmonique, même pour le fun, c'est ce qui transforme un mix correct en un truc qui te donne des frissons.** Quand deux morceaux chantent ensemble, c'est une sensation unique — et ça ne demande pas d'être musicien. Essaie de mixer tes 3 morceaux préférés en suivant le Camelot Wheel — tu vas sentir la différence immédiatement. C'est addictif !",
      en: "**Harmonic mixing, even just for fun, is what turns a decent mix into something that gives you chills.** When two tracks sing together, it's a unique feeling — and you don't need to be a musician. Try mixing your 3 favorite tracks using the Camelot Wheel — you'll feel the difference immediately. It's addictive!",
    },
    5: {
      fr: "**Même en freestyle chez toi, comprendre la structure d'un set crée des voyages musicaux qui te donnent la chair de poule.** Tu vas passer de « j'enchaîne des morceaux » à « je raconte une histoire avec ma musique ». Construis un mini-set de 20 minutes avec tes morceaux favoris en suivant la courbe intro → montée → pic — tu vas sentir la différence.",
      en: "**Even freestyling at home, understanding set structure creates musical journeys that give you goosebumps.** You'll go from 'playing songs one after another' to 'telling a story with my music.' Build a 20-minute mini-set with your favorite tracks following the intro → build → peak curve — you'll feel the difference.",
    },
    6: {
      fr: "**Les FX, c'est ton terrain de jeu sans limites !** Tu mixes pour le fun, alors c'est le moment de tester des trucs fous sans que personne ne juge. Un reverb sur un vocal, un delay qui part en boucle, un filtre qui monte… amuse-toi ! Prends un morceau que tu adores et fais-le passer par 3 effets différents — zéro pression, 100 % plaisir.",
      en: "**FX are your unlimited playground!** You're mixing for fun, so it's time to try wild stuff with zero judgment. A reverb on a vocal, a delay that loops out, a rising filter… go for it! Take a track you love and run it through 3 different effects — zero pressure, 100% fun.",
    },
    7: {
      fr: "**Lire l'énergie musicale te rend meilleur même en session solo — tu sauras instinctivement quel morceau passer ensuite.** C'est comme développer un sixième sens pour la musique : tu n'y réfléchis plus, tu le sens. La prochaine fois que tu mixes, essaie de choisir le morceau suivant en fermant les yeux et en écoutant ce que la musique te demande.",
      en: "**Reading musical energy makes you better even in solo sessions — you'll instinctively know which track to play next.** It's like developing a sixth sense for music: you stop thinking about it and just feel it. Next time you mix, try picking the next track by closing your eyes and listening to what the music asks for.",
    },
    8: {
      fr: "**Quand tu prépares un peu tes playlists, tes sessions passent de « sympa » à « incroyable » — plus de plaisir, moins de stress.** C'est comme préparer les ingrédients avant de cuisiner : tout coule mieux. Crée une playlist de 15 morceaux que tu adores, triés par énergie croissante — ta prochaine session sera ta meilleure.",
      en: "**When you prep your playlists a bit, your sessions go from 'nice' to 'incredible' — more fun, less stress.** It's like prepping ingredients before cooking: everything flows better. Create a playlist of 15 tracks you love, sorted by rising energy — your next session will be your best one yet.",
    },
    9: {
      fr: "**Maîtriser le live rend chaque session plus immersive — tu te sentiras comme un vrai DJ, même dans ton salon.** Les petits réflexes live (ajuster un EQ en temps réel, lancer un effet pile au bon moment) transforment une session « play/pause » en performance. Enregistre ta prochaine session et réécoute-la : tu seras surpris de ton level.",
      en: "**Mastering live skills makes every session more immersive — you'll feel like a real DJ, even in your living room.** The small live reflexes (adjusting EQ in real-time, dropping an effect at just the right moment) turn a 'play/pause' session into a performance. Record your next session and listen back: you'll be surprised at your level.",
    },
    10: {
      fr: "**C'est le moment où mixer devient naturel — tu n'y réfléchis plus, tu kiffes, tout simplement.** Tu as développé une connexion unique avec la musique que 99 % des gens n'auront jamais. Tu es devenu un DJ, même si c'est juste pour toi — et franchement, c'est peut-être la plus belle façon de l'être.",
      en: "**This is the moment where mixing becomes natural — you stop thinking and just enjoy.** You've developed a connection to music that 99% of people will never have. You've become a DJ, even if it's just for yourself — and honestly, that might be the most beautiful way to be one.",
    },
  },
  party: {
    1: {
      fr: "**Tes potes vont halluciner à ta prochaine soirée.** Apprendre les bases du mix, c'est passer de « celui qui branche son téléphone » à « celui qui met l'ambiance ». Imagine la tête de tes amis quand tu enchaînes deux morceaux sans coupure pour la première fois — ce moment vaut de l'or. Commence par préparer une mini-playlist de 5 morceaux que tout le monde adore chez toi.",
      en: "**Your friends are going to lose their minds at your next party.** Learning DJ basics takes you from 'the one who plugs in their phone' to 'the one who sets the vibe.' Imagine your friends' faces when you chain two tracks seamlessly for the first time — that moment is priceless. Start by prepping a mini-playlist of 5 tracks everyone loves at your place.",
    },
    2: {
      fr: "**En soirée, une transition brouillonne se remarque immédiatement.** L'EQ, c'est la différence entre « il passe des morceaux » et « wow, il sait mixer ! ». Tes invités ne connaissent rien au DJing, mais ils entendent tout. Entraîne-toi à switcher les basses sur des morceaux que tes potes adorent — c'est ces transitions-là qu'ils vont remarquer en premier.",
      en: "**At a party, a messy transition stands out immediately.** EQ is the difference between 'playing songs' and 'wow, they can actually mix!' Your guests know nothing about DJing, but they hear everything. Practice bass-swapping on tracks your friends love — those are the transitions they'll notice first.",
    },
    3: {
      fr: "**Rien ne tue plus l'ambiance qu'un blanc entre deux morceaux.** Des transitions fluides gardent ta piste vivante du début à la fin — c'est ce qui fait que les gens restent au lieu d'aller au bar. Entraîne-toi à enchaîner les genres que tes potes adorent : un peu de pop, un classique, puis le hit du moment. La variété + la fluidité = soirée de folie.",
      en: "**Nothing kills the vibe faster than dead air between tracks.** Smooth transitions keep your floor alive from start to finish — that's what makes people stay instead of heading to the bar. Practice transitioning between genres your friends love: some pop, a classic, then the current hit. Variety + flow = epic party.",
    },
    4: {
      fr: "**En soirée, le mix harmonique c'est ce qui fait que les gens disent « mais c'est trop bien, comment tu fais ? » au lieu de « sympa la playlist ».** Tes invités ne sauront pas pourquoi, mais l'ambiance monte naturellement quand les clés sont compatibles. Prépare 4-5 transitions harmoniques sur des morceaux que tes potes adorent — ça va envoyer du lourd.",
      en: "**At a party, harmonic mixing is what makes people say 'this is so good, how do you do that?' instead of 'nice playlist.'** Your guests won't know why, but the vibe builds naturally when keys match. Prep 4-5 harmonic transitions on tracks your friends love — it's going to hit hard.",
    },
    5: {
      fr: "**Une bonne soirée a un arc narratif : accueil chill, montée en puissance, pic de folie, retour au calme.** C'est ce qui fait que les gens restent 4 heures au lieu de 2. Prépare ta setlist en pensant au déroulé de la soirée : apéro → dancefloor → after. Teste-la chez toi avant le jour J et tu verras — zéro stress, maximum d'impact.",
      en: "**A great party has a narrative arc: chill welcome, energy build, peak madness, cool-down.** That's what makes people stay for 4 hours instead of 2. Plan your setlist around the party flow: drinks → dancefloor → after. Test it at home before the big day and you'll see — zero stress, maximum impact.",
    },
    6: {
      fr: "**Un bon build-up avec un filtre bien placé peut faire exploser ta piste — c'est ton moment « DJ star » de la soirée.** Les FX en soirée, c'est l'effet wow que personne n'attend. Pas besoin de 50 effets : un seul filtre montant avant un drop suffit à mettre tout le monde en transe. Teste un build-up sur le morceau préféré de ta bande — tu vas voir leurs réactions.",
      en: "**A great build-up with a well-placed filter can make your floor explode — it's your 'DJ star' moment of the night.** Party FX are the wow factor nobody expects. You don't need 50 effects: one rising filter before a drop is enough to put everyone in a trance. Test a build-up on your crew's favorite track — watch their reactions.",
    },
    7: {
      fr: "**Lire le crowd en soirée, c'est LA compétence qui sépare un bon DJ de table d'un vrai animateur de soirée.** Savoir quand passer du chill au dancefloor, sentir quand les gens veulent un classique — ça, ça ne s'improvise pas. À ta prochaine soirée, observe les réactions à chaque changement de morceau : qui danse plus, qui revient sur la piste — ces indices sont ton GPS.",
      en: "**Reading the crowd at a party is THE skill that separates a decent DJ from a real party host.** Knowing when to shift from chill to dancefloor, sensing when people want a classic — that can't be improvised. At your next party, watch reactions to each track change: who dances more, who comes back to the floor — those cues are your GPS.",
    },
    8: {
      fr: "**Les meilleurs DJs de soirée arrivent préparés : playlists triées par ambiance, morceaux testés, plans B prêts.** Moins de stress le jour J, plus de plaisir pour tout le monde. Crée 3 playlists par vibe (chill / danse / bangers) et remplis-les avec des morceaux que tes potes adorent — le soir venu, t'auras juste à piocher.",
      en: "**The best party DJs come prepared: playlists sorted by mood, tracks tested, backup plans ready.** Less stress on the day, more fun for everyone. Create 3 playlists by vibe (chill / dance / bangers) and fill them with tracks your friends love — when the night comes, you'll just pick and play.",
    },
    9: {
      fr: "**Quelqu'un renverse un verre, la sono sature, on te demande un morceau improbable — bienvenue dans le live en soirée.** C'est le vrai test, et c'est ce qui te rend indispensable. Prépare-toi en ayant toujours 2-3 « morceaux de secours » universels que tout le monde connaît — ils te sauveront dans n'importe quelle situation.",
      en: "**Someone spills a drink, speakers clip, someone requests an impossible track — welcome to party live mode.** This is the real test, and it's what makes you indispensable. Prepare by always having 2-3 universal 'rescue tracks' everyone knows — they'll save you in any situation.",
    },
    10: {
      fr: "**Tu es devenu LE DJ de ta bande — celui à qui on pense en premier pour chaque soirée, anniversaire et barbecue.** Tes amis ne peuvent plus imaginer une fête sans toi aux platines. C'est ça la maîtrise pour toi : être celui qui transforme n'importe quel moment en souvenir inoubliable.",
      en: "**You've become THE DJ of your crew — the one everyone thinks of first for every party, birthday, and BBQ.** Your friends can't imagine a gathering without you behind the decks. That's what mastery means for you: being the one who turns any moment into an unforgettable memory.",
    },
  },
  club: {
    1: {
      fr: "**Le dancefloor ne pardonne pas les erreurs — mais toi, tu te prépares.** En club, un public exigeant attend un niveau impeccable dès la première seconde. Les fondamentaux solides sont ta fondation pour tout ce qui suit. Entraîne-toi à caler deux morceaux au BPM sans regarder l'écran — en cabine, tu n'auras pas le temps d'hésiter.",
      en: "**The dancefloor doesn't forgive mistakes — but you're getting ready.** In a club, a demanding crowd expects a flawless level from second one. Solid fundamentals are your foundation for everything that follows. Practice beatmatching two tracks without looking at the screen — in the booth, there's no time to hesitate.",
    },
    2: {
      fr: "**Sur un sound system de club, la moindre saturation de basses s'entend 10x plus fort.** L'EQ n'est pas un luxe en club — c'est une nécessité absolue. Un bass swap raté sur des enceintes Funktion-One, et toute la salle le sent dans le ventre. Travaille tes transitions EQ sur 10 morceaux différents jusqu'à ce que le geste soit automatique.",
      en: "**On a club sound system, the slightest bass clash is 10x louder.** EQ isn't a luxury in clubs — it's an absolute necessity. A botched bass swap on Funktion-One speakers, and the whole room feels it in their gut. Drill your EQ transitions on 10 different tracks until the move is automatic.",
    },
    3: {
      fr: "**Le public danse sans interruption — une mauvaise transition et tu perds la piste en 10 secondes.** En club, le flow est sacré. Les résidents qui tiennent des dancefloors pendant 4 heures maîtrisent l'art de la transition invisible. Chronomètre tes transitions : l'objectif est d'enchaîner en 16 temps sans que personne ne s'en aperçoive.",
      en: "**The crowd dances non-stop — one bad transition and you lose the floor in 10 seconds.** In a club, flow is sacred. Residents who hold dancefloors for 4 hours master the art of the invisible transition. Time your transitions: the goal is to blend within 16 beats without anyone noticing.",
    },
    4: {
      fr: "**En club, le mix harmonique n'est plus optionnel — c'est un standard pro.** Les résidents qui remplissent les salles le font naturellement, et le public sent la différence même sans le savoir. Entraîne-toi à enchaîner 6 morceaux en restant sur la roue Camelot — c'est ton passeport pour la cabine.",
      en: "**In clubs, harmonic mixing is no longer optional — it's a pro standard.** Residents who fill rooms do it naturally, and the crowd feels the difference even without knowing why. Practice chaining 6 tracks while staying on the Camelot Wheel — it's your passport to the booth.",
    },
    5: {
      fr: "**Un set de club a un arc : warm-up pour les premiers arrivés, montée progressive, peak-time explosif, closing mémorable.** Les promoteurs jugent ta capacité à tenir cet arc sur 2 heures minimum. Construis un set complet de 6 morceaux avec une vraie progression d'énergie — puis rallonge à 10, puis 15. C'est comme ça que naissent les résidents.",
      en: "**A club set has an arc: warm-up for early arrivals, progressive build, explosive peak-time, memorable closing.** Promoters judge your ability to hold that arc for 2+ hours. Build a full set of 6 tracks with a real energy progression — then extend to 10, then 15. That's how residents are born.",
    },
    6: {
      fr: "**Sur un gros son, un effet mal dosé agresse les oreilles de 500 personnes — mais un FX bien placé peut faire exploser la salle.** En club, c'est puissance ET retenue. Un seul build-up parfait vaut 50 filtres aléatoires. Enregistre un mix de 20 minutes en n'utilisant que 3 effets maximum — la contrainte force l'excellence.",
      en: "**On a big system, a poorly dosed effect assaults 500 people's ears — but a well-placed FX can blow the room up.** In clubs, it's power AND restraint. One perfect build-up is worth 50 random filters. Record a 20-minute mix using only 3 effects max — constraint forces excellence.",
    },
    7: {
      fr: "**En club, tu dois lire l'énergie de la salle en temps réel : elle monte ? Elle retombe ? Faut-il relancer ou laisser respirer ?** C'est la compétence numéro 1 d'un DJ club, celle que les promoteurs cherchent avant tout. La prochaine fois que tu es en club, observe le DJ résident : regarde ses yeux, pas ses mains. Il scanne la salle en permanence.",
      en: "**In a club, you need to read the room's energy in real-time: is it rising? Dropping? Push or let it breathe?** This is the #1 skill of a club DJ, the one promoters look for above all else. Next time you're in a club, watch the resident DJ: look at their eyes, not their hands. They scan the room constantly.",
    },
    8: {
      fr: "**Analyser le créneau horaire, la salle, le public attendu, préparer ses crates — c'est ce qui sépare les amateurs des résidents.** Un DJ de club prépare 3x plus de morceaux qu'il n'en jouera, triés par énergie et par moment de la soirée. Fais l'exercice : prépare un set pour un créneau 1h-3h du matin, avec plan A (la salle est chaude) et plan B (faut relancer).",
      en: "**Analyzing the time slot, the venue, the expected crowd, preparing your crates — that's what separates amateurs from residents.** A club DJ prepares 3x more tracks than they'll play, sorted by energy and time of night. Do the exercise: prep a set for the 1am-3am slot, with plan A (the room is hot) and plan B (need to rebuild energy).",
    },
    9: {
      fr: "**Gérer le stress de la cabine, s'adapter en temps réel, enchaîner 2h sans fausse note — c'est ici que tu passes de « DJ qui joue en club » à « DJ de club ».** La pression de la cabine est réelle : lumières, son, crowd qui te regarde. Simule la pression chez toi : mets un timer de 60 minutes et mixe sans jamais mettre pause. Le flow sous contrainte, ça se travaille.",
      en: "**Managing booth pressure, adapting in real-time, delivering a flawless 2-hour set — this is where you go from 'DJ who plays at a club' to 'club DJ.'** Booth pressure is real: lights, sound, crowd watching you. Simulate it at home: set a 60-minute timer and mix without ever hitting pause. Flow under pressure is a trained skill.",
    },
    10: {
      fr: "**Tu es prêt à postuler pour une résidence, à envoyer tes mixes aux promoters, à tenir une soirée complète.** Le dancefloor n'a plus de secret pour toi. Enregistre un mix de 60 minutes, écoute-le avec un regard critique, puis envoie-le — c'est ton audition. Le prochain step, c'est la cabine.",
      en: "**You're ready to apply for a residency, send your mixes to promoters, hold down a full night.** The dancefloor has no more secrets for you. Record a 60-minute mix, listen back critically, then send it out — it's your audition. The next step is the booth.",
    },
  },
  pro: {
    1: {
      fr: "**Chaque compétence que tu apprends ici est un investissement dans ta carrière.** Les grands DJs qui remplissent des festivals ont tous commencé exactement là où tu es. La différence ? La rigueur. Maîtrise chaque base comme si ton premier booking en dépendait — parce que c'est le cas. Note les 3 points faibles de chaque session d'entraînement et travaille-les en priorité.",
      en: "**Every skill you learn here is an investment in your career.** The great DJs who fill festivals all started exactly where you are. The difference? Rigor. Master every fundamental as if your first booking depends on it — because it does. Note the 3 weak points of each practice session and work on them first.",
    },
    2: {
      fr: "**Sur un système pro, le public et l'ingé son entendent tout — un mauvais swap de basses peut ruiner ta réputation en une soirée.** L'EQ n'est pas une option quand tu vises une carrière : c'est la base du professionnalisme. Enregistre-toi et réécoute chaque transition au casque de monitoring — c'est comme ça que les pros s'améliorent, à chaque session.",
      en: "**On a pro system, the crowd and the sound engineer hear everything — a bad bass swap can ruin your reputation in one night.** EQ isn't optional when you're building a career: it's the foundation of professionalism. Record yourself and listen back to every transition on monitoring headphones — that's how pros improve, session after session.",
    },
    3: {
      fr: "**En pro, chaque transition est jugée — par les promoters, les autres DJs, le public.** Des transitions impeccables sont ta carte de visite, celle qui fait que les gens retiennent ton nom. Enregistre un set de 30 minutes et écoute-le comme si c'était un autre DJ : chaque accroc est un point à corriger avant ton prochain booking.",
      en: "**As a pro, every transition is judged — by promoters, other DJs, the crowd.** Flawless transitions are your business card, the thing that makes people remember your name. Record a 30-minute set and listen back as if it were someone else: every hiccup is a point to fix before your next booking.",
    },
    4: {
      fr: "**Chaque DJ qui remplit des festivals maîtrise le mix harmonique — c'est l'arme secrète qui sépare un bon DJ d'un DJ qu'on rebooke.** C'est subtil mais puissant : le public ne sait pas pourquoi ton set sonne « magique », mais les promoters, eux, le savent. Construis un mini-set de 20 minutes en progression harmonique et enregistre-le — c'est ton premier pas vers un booking.",
      en: "**Every DJ who fills festivals has mastered harmonic mixing — it's the secret weapon that separates a good DJ from one who gets rebooked.** It's subtle but powerful: the crowd can't explain why your set sounds 'magical,' but promoters know exactly why. Build a 20-minute mini-set in harmonic progression and record it — it's your first step toward a booking.",
    },
    5: {
      fr: "**Un set pro raconte une histoire — chaque morceau a sa place, chaque transition a un but.** C'est ce qui te fait rebooker encore et encore : les promoters veulent un DJ qui tient un arc narratif, pas quelqu'un qui balance des hits au hasard. Construis 3 setlists de 45 minutes pour 3 ambiances différentes (warm-up, peak, closing) — c'est ton portfolio.",
      en: "**A pro set tells a story — every track has its place, every transition has a purpose.** That's what gets you rebooked again and again: promoters want a DJ who holds a narrative arc, not someone who throws hits randomly. Build 3 setlists of 45 minutes for 3 different vibes (warm-up, peak, closing) — that's your portfolio.",
    },
    6: {
      fr: "**Les pros utilisent les effets avec parcimonie et précision — un seul build-up parfaitement exécuté vaut 50 filtres aléatoires.** En contexte pro, chaque FX doit servir le set, pas ton ego. La différence entre un amateur et un pro ? Le pro sait quand NE PAS utiliser un effet. Écoute 3 sets de DJs que tu admires et compte le nombre d'effets — tu seras surpris du peu.",
      en: "**Pros use effects with precision and restraint — one perfectly executed build-up is worth 50 random filters.** In a pro context, every FX must serve the set, not your ego. The difference between an amateur and a pro? The pro knows when NOT to use an effect. Listen to 3 sets from DJs you admire and count the effects — you'll be surprised how few there are.",
    },
    7: {
      fr: "**Les meilleurs DJs lisent une salle en 30 secondes : énergie, démographie, heure — tout informe leurs choix.** C'est LA compétence qui fait les carrières, celle qu'aucun logiciel ne remplacera jamais. Développe ton instinct : à chaque soirée où tu vas, note mentalement l'énergie toutes les 10 minutes. Ce réflexe deviendra ton avantage compétitif.",
      en: "**The best DJs read a room in 30 seconds: energy, demographics, time — everything informs their choices.** This is THE skill that builds careers, the one no software will ever replace. Build your instinct: at every event you attend, mentally note the energy every 10 minutes. That reflex will become your competitive edge.",
    },
    8: {
      fr: "**Analyser le line-up, le DJ avant et après toi, le type de salle, préparer des plans A/B/C — c'est le travail invisible qui fait les grands DJs.** La préparation pro, c'est 80 % du résultat. Avant ton prochain set (même simulé), rédige un brief : créneau, public attendu, 3 morceaux d'ouverture, 3 morceaux de pic. Les amateurs improvisent ; les pros se préparent.",
      en: "**Analyzing the lineup, the DJ before and after you, the venue type, preparing plan A/B/C — it's the invisible work that makes great DJs.** Pro preparation is 80% of the result. Before your next set (even a simulated one), write a brief: time slot, expected crowd, 3 opening tracks, 3 peak tracks. Amateurs improvise; pros prepare.",
    },
    9: {
      fr: "**Gérer la technique, le stress, les imprévus ET garder le sourire — jouer 3h devant 2000 personnes sans flancher, c'est ici que le professionnel se révèle.** La performance live pro, c'est du mental autant que de la technique. Entraîne-toi en conditions réelles : mix de 90 minutes, debout, sans pause, en enregistrant. Puis réécoute avec un regard critique — c'est ton meilleur coach.",
      en: "**Managing technique, stress, surprises AND keeping your cool — playing 3 hours in front of 2000 people without flinching, this is where the professional emerges.** Pro live performance is as much mental as it is technical. Train in real conditions: 90-minute mix, standing, no breaks, recording. Then listen back critically — that's your best coach.",
    },
    10: {
      fr: "**Booker des dates, négocier tes cachets, construire ta marque, fidéliser un public — tu as toutes les compétences, il ne reste qu'à les vivre.** Tu es prêt pour la scène pro. Enregistre ton meilleur set de 60 minutes, crée ta page artiste, et envoie-le à 10 promoters cette semaine. Chaque « non » te rapproche du premier « oui » — et ce premier « oui » change tout.",
      en: "**Booking gigs, negotiating fees, building your brand, growing a fanbase — you have all the skills, now it's time to live them.** You're ready for the pro stage. Record your best 60-minute set, create your artist page, and send it to 10 promoters this week. Every 'no' gets you closer to the first 'yes' — and that first 'yes' changes everything.",
    },
  },
};

function injectEquipmentPersonalization(
  modules: CourseModule[],
  targetDeck: TargetDeck | null | undefined,
  language: Language,
): CourseModule[] {
  if (!targetDeck) return modules;
  const deckTips = EQUIPMENT_TIPS[targetDeck];
  const deckContent = EQUIPMENT_CONTENT[targetDeck];

  if (!deckTips && !deckContent) return modules;

  return modules.map((module) => {
    const tipEntry = deckTips?.[module.level];
    const contentEntries = deckContent?.[module.level];
    if (!tipEntry && !contentEntries) return module;

    const lastIdx = module.slides.length - 1;
    if (lastIdx < 0) return module;

    const slides = module.slides.map((slide, idx) => {
      let patched = slide;

      const contentBlock = contentEntries?.[slide.slideNumber];
      if (contentBlock) {
        const extra = language === "en" ? contentBlock.en : contentBlock.fr;
        patched = { ...patched, content: patched.content + extra };
      }

      if (idx === lastIdx && tipEntry) {
        const tips = language === "en" ? tipEntry.en : tipEntry.fr;
        if (tips.length) {
          patched = { ...patched, tips: [...patched.tips, ...tips] };
        }
      }

      return patched;
    });
    return { ...module, slides };
  });
}

function injectGoalPersonalization(
  modules: CourseModule[],
  goal: UserGoal | null | undefined,
  language: Language,
): CourseModule[] {
  if (!goal) return modules;
  const goalEntries = GOAL_CONTENT[goal];
  if (!goalEntries) return modules;

  return modules.map((module) => {
    const entry = goalEntries[module.level];
    if (!entry) return module;
    const paragraph = language === "en" ? entry.en : entry.fr;
    const firstSlide = module.slides[0];
    if (!firstSlide) return module;
    const patched = { ...firstSlide, content: paragraph + "\n\n" + firstSlide.content };
    return { ...module, slides: [patched, ...module.slides.slice(1)] };
  });
}

export function getAllModules(
  track: CourseTrackId,
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
  targetDeck?: TargetDeck | null,
  goal?: UserGoal | null,
): CourseModule[] {
  const tailFromLevel4 = courseModulesFromLevel2.slice(2);
  const withStageProgression = (modules: CourseModule[]): CourseModule[] => {
    if (skillTier === "beginner") return modules;
    const isAdvanced = skillTier === "advanced";
    const stageTitlePrefix =
      language === "fr"
        ? isAdvanced
          ? "Parcours Pro"
          : "Parcours Intermédiaire"
        : isAdvanced
          ? "Pro Path"
          : "Intermediate Path";
    const recapTitle =
      language === "fr"
        ? isAdvanced
          ? "Récap Intermédiaire"
          : "Récap Débutant"
        : isAdvanced
          ? "Intermediate Recap"
          : "Beginner Recap";
    const recapText =
      language === "fr"
        ? isAdvanced
          ? "Récap utile: si tu viens du parcours intermédiaire, garde les réflexes de transitions propres, gestion d'énergie et stabilité en situation. Ici on monte vers un niveau club-ready avec plus de précision d'exécution."
          : "Récap utile: si tu viens du parcours débutant, garde les fondamentaux BPM, EQ, transitions et structure de set. Ici, on passe sur une exécution plus rapide, plus propre et plus stratégique."
        : isAdvanced
          ? "Helpful recap: if you come from the intermediate path, keep clean transitions, energy management, and stable execution habits. This path pushes toward club-ready precision."
          : "Helpful recap: if you come from the beginner path, keep BPM, EQ, transition and set-structure fundamentals. This path moves to faster, cleaner and more strategic execution.";

    return modules.map((module) => {
      if (module.level < 4) return module;
      const firstSlide = module.slides[0];
      const patchedFirstSlide = firstSlide
        ? {
            ...firstSlide,
            subtitle: `${recapTitle} — ${firstSlide.subtitle}`,
            content: `${recapText}\n\n${firstSlide.content}`,
          }
        : firstSlide;
      return {
        ...module,
        title: `${stageTitlePrefix} — ${module.title}`,
        description:
          language === "fr"
            ? `${module.description} Focus ${isAdvanced ? "pro": "intermédiaire"}: exécution sous contrainte et progression vers l'étape suivante.`
            : `${module.description} ${isAdvanced ? "Pro" : "Intermediate"} focus: execution under constraints and progression to the next stage.`,
        slides: module.slides.map((slide, idx) => (idx === 0 && patchedFirstSlide ? patchedFirstSlide : slide)),
      };
    });
  };

  const personalize = (modules: CourseModule[]) =>
    injectGoalPersonalization(
      injectEquipmentPersonalization(modules, targetDeck, language),
      goal,
      language,
    );

  if (skillTier === "beginner") {
    const level1Raw = track === "flx4" ? level1ModuleFlx4 : level1ModuleFlx3Xdj;
    const localizedL2Plus = localizeModules(courseModulesFromLevel2, language);
    let level1Final: CourseModule;
    if (track !== "flx4" && language === "en") {
      const ov = EN_LEVEL_1_FLX3_XDJ;
      level1Final = {
        ...level1Raw,
        title: ov.title,
        description: ov.description,
        slides: level1Raw.slides.map((slide) => {
          const os = ov.slides[slide.slideNumber];
          if (!os) return slide;
          return { ...slide, title: os.title, subtitle: os.subtitle, videoDescription: os.videoDescription, content: os.content, keyTakeaway: os.keyTakeaway, exercise: os.exercise, tips: os.tips };
        }),
      };
    } else {
      level1Final = localizeModules([level1Raw], language)[0];
    }
    return personalize([level1Final, ...localizedL2Plus]);
  }
  const accelTier = skillTier === "advanced" ? "advanced" : "intermediate";
  const accelerated = buildAcceleratedLevels123(track, accelTier, language);
  const tail4to10 = skillTier === "advanced"
    ? buildProLevels4to10(language)
    : buildIntermediateLevels4to10(language);
  return personalize(withStageProgression([...accelerated, ...tail4to10]));
}

/** Défaut = parcours majoritaire FLX4 (communauté Instagram), utilisateur débutant. */
export const allModules = getAllModules("flx4", "beginner", "fr");

export function getModuleByLevel(
  level: number,
  track: CourseTrackId = "flx4",
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
  targetDeck?: TargetDeck | null,
  goal?: UserGoal | null,
): CourseModule | null {
  return getAllModules(track, skillTier, language, targetDeck, goal).find((m) => m.level === level) ?? null;
}

export function getSlideFromModule(
  level: number,
  slideNumber: number,
  track: CourseTrackId = "flx4",
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
  targetDeck?: TargetDeck | null,
  goal?: UserGoal | null,
): Slide | null {
  const module = getModuleByLevel(level, track, skillTier, language, targetDeck, goal);
  if (!module) return null;
  return module.slides.find((s) => s.slideNumber === slideNumber) ?? null;
}

export type RecommendedLearningVideo = {
  title: string;
  url: string;
  reason: string;
};

type LanguageVideoCatalog = Record<Language, Record<number, RecommendedLearningVideo>>;

function extractYouTubeId(url: string): string | null {
  const embedMatch = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/);
  if (embedMatch?.[1]) return embedMatch[1];
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (watchMatch?.[1]) return watchMatch[1];
  return null;
}

const VIDEO_LANGUAGE_BY_ID: Record<string, Language> = {
  H31hjTx3bXY: "en",
  "25JAaIdJwnM": "en",
  IVMFK0iNqQE: "en",
  EIUd_xdBYGs: "en",
  fa3sLTn0Wek: "en",
  kZKBeztMbZY: "en",
  "3Gn8p0taPUg": "en",
  EQeEyyipaDE: "en",
  SR1xPdJs1k4: "en",
  PRPwKxnBmc8: "en",
  jHaANgaTClU: "en",
  Fd9jEpFG6II: "en",
  "pV-NJndPFtw": "en",
  Lk0a6U6m2Zg: "en",
  vdbcvsUKY2s: "en",
  dYRZ7821G90: "en",
  "Xzvid-d1c9E": "en",
  AxkIQi81JP0: "en",
  gxq36qom2LI: "en",
  YgL1tn6zOEw: "en",
  "1sC-sZhSxU8": "en",
  "hjkTkb-_7mQ": "en",
  "7JAoRPqQZYw": "en",
  "-DOYZcBwS08": "en",
  Es95BK3pluQ: "en",
  j9Ky8zpsqvY: "en",
  TStRW1KpBe4: "en",
  ycC2sHErdis: "en",
  nQKuZyD0Y2s: "en",
  "7Wtbc-1y1zc": "en",
  a3m8l4q3Pq8: "en",
  "8IF_HGw7IFk": "en",
  "u_ny-pIfNe8": "en",
  "-CblGWcr87k": "en",
  kHll7t87xik: "en",
  Ubm9R3VKEqg: "fr",
  FlDeqQMj9II: "fr",
};

export function getVideoLanguageForUrl(url: string): Language | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return VIDEO_LANGUAGE_BY_ID[id] ?? null;
}

export function resolveSlideVideoUrlForLanguage(url: string, language: Language): string | null {
  const detected = getVideoLanguageForUrl(url);
  if (!detected) return null;
  return detected === language ? url : null;
}

const LEVEL_VIDEO_PICKS_COMMON: Record<number, RecommendedLearningVideo[]> = {
  2: [
    {
      title: "EQ Mixing Basics (house transitions)",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "Travail concret des EQ et du passage d'un morceau à l'autre.",
    },
    {
      title: "Beatmatching and phrasing workflow",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "Relie timing, pitch et structure de phrase musicale.",
    },
  ],
  3: [
    {
      title: "Transition structure in real sets",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "Montre préparation, mix et sortie propre en situation.",
    },
    {
      title: "Manual tempo correction drills",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "Aide à corriger un léger décalage sans casser le groove.",
    },
  ],
  4: [
    {
      title: "Harmonic mixing fundamentals",
      url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
      reason: "Introduction simple des clés musicales et compatibilités.",
    },
  ],
  5: [
    {
      title: "How to plan energy in a DJ set",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "Aide à construire une vraie progression de set.",
    },
  ],
  6: [
    {
      title: "Creative DJ transitions with FX",
      url: "https://www.youtube.com/watch?v=EIUd_xdBYGs",
      reason: "Montre comment placer les FX sans détruire le groove.",
    },
  ],
  7: [
    {
      title: "Read the dancefloor in real time",
      url: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
      reason: "Exemples concrets de décisions selon la réaction du public.",
    },
  ],
  8: [
    {
      title: "How to structure a 60-minute DJ set",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "Approche claire pour organiser montée, pic, respiration et sortie.",
    },
  ],
  9: [
    {
      title: "DJ booth pressure: mistakes and recovery",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "Travaille les réflexes de recovery en contexte live.",
    },
  ],
  10: [
    {
      title: "Build your signature as a DJ",
      url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
      reason: "Passer de technique pure à identité artistique cohérente.",
    },
  ],
};

const LEVEL_VIDEO_PICKS_COMMON_FR: Record<number, RecommendedLearningVideo[]> = {
  1: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Complément FR utile pour poser une posture sérieuse dès le départ.",
    },
  ],
  2: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Ajoute une perspective FR sur discipline et régularité de pratique.",
    },
  ],
  3: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Renforce l'approche FR sur la constance avant d'accélérer techniquement.",
    },
  ],
  4: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Apporte un angle FR sur la cohérence artistique et la direction.",
    },
  ],
  5: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Soutient la progression FR autour du positionnement et de la vision.",
    },
  ],
  6: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Point de vue francophone sur posture et communication DJ.",
    },
  ],
  7: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Utile pour la lecture de public et la relation audience.",
    },
  ],
  8: [
    {
      title: "4 Étapes Pour Devenir DJ Producteur (en Partant de ZÉRO)",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Vision francophone de la structuration de progression.",
    },
  ],
  9: [
    {
      title: "Ce que vous devez savoir avant de vous lancer sur les réseaux",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Approche francophone de la posture pro en situation réelle.",
    },
  ],
  10: [
    {
      title: "4 Étapes Pour Devenir DJ Producteur (en Partant de ZÉRO)",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Synthèse francophone de la progression vers un niveau professionnel.",
    },
  ],
};

const PRIMARY_LEVEL_VIDEO_BY_LANGUAGE: LanguageVideoCatalog = {
  fr: {
    1: {
      title: "Niveau 1 — Bases DJ: démarrer proprement",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Introduction FR orientée progression débutant.",
    },
    2: {
      title: "Niveau 2 — EQ et transitions claires",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Cadre FR progression technique pour structurer les bases.",
    },
    3: {
      title: "Niveau 3 — Transition et rythme",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Support FR pour consolider la logique de transition.",
    },
    4: {
      title: "Niveau 4 — Mix harmonique (vision FR)",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Accompagnement FR avant application harmonique détaillée.",
    },
    5: {
      title: "Niveau 5 — Structurer ton set",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Rappel FR sur progression énergie et cohérence de parcours.",
    },
    6: {
      title: "Niveau 6 — Techniques avancées et posture",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Contenu FR utile pour posture et décision sous pression.",
    },
    7: {
      title: "Niveau 7 — Lire la foule en pratique",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Perspective FR sur relation public et adaptation.",
    },
    8: {
      title: "Niveau 8 — Construire un set solide",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Support FR pour cadrer une trajectoire de progression.",
    },
    9: {
      title: "Niveau 9 — Performer en contexte réel",
      url: "https://www.youtube.com/watch?v=FlDeqQMj9II",
      reason: "Approche FR orientée présence et exécution.",
    },
    10: {
      title: "Niveau 10 — Maîtrise et continuité pro",
      url: "https://www.youtube.com/watch?v=Ubm9R3VKEqg",
      reason: "Synthèse FR motivation/discipline pour maintenir le niveau.",
    },
  },
  en: {
    1: {
      title: "Level 1 — DDJ-FLX4 beginner setup",
      url: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
      reason: "English beginner walkthrough validated from YouTube metadata.",
    },
    2: {
      title: "Level 2 — Beatmatch and EQ fundamentals",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "English tutorial aligned with timing and phrase basics.",
    },
    3: {
      title: "Level 3 — Transition workflow drills",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "English practical transition context for progression.",
    },
    4: {
      title: "Level 4 — Rekordbox and musical control",
      url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
      reason: "English Rekordbox foundations mapped to harmonic progression.",
    },
    5: {
      title: "Level 5 — Set planning fundamentals",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "English structure support for set progression.",
    },
    6: {
      title: "Level 6 — Creative transitions with control",
      url: "https://www.youtube.com/watch?v=EIUd_xdBYGs",
      reason: "English short-form demo useful for controlled advanced drills.",
    },
    7: {
      title: "Level 7 — Crowd reading and decisions",
      url: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
      reason: "English foundational guidance for adaptive choices.",
    },
    8: {
      title: "Level 8 — Build a complete set arc",
      url: "https://www.youtube.com/watch?v=25JAaIdJwnM",
      reason: "English set-structure support.",
    },
    9: {
      title: "Level 9 — Live performance reliability",
      url: "https://www.youtube.com/watch?v=IVMFK0iNqQE",
      reason: "English transition reliability and execution context.",
    },
    10: {
      title: "Level 10 — Signature and mastery roadmap",
      url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
      reason: "English progression link toward long-term mastery.",
    },
  },
};

const LEVEL_VIDEO_PICKS_BY_TRACK: Partial<Record<CourseTrackId, Record<number, RecommendedLearningVideo[]>>> = {
  flx4: {
    1: [
      {
        title: "DDJ-FLX4 full beginner walkthrough",
        url: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
        reason: "Repère les zones de la FLX4 et les premiers gestes.",
      },
      {
        title: "Rekordbox performance mode essentials",
        url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
        reason: "Le plus important sur FLX4: maîtriser Rekordbox.",
      },
    ],
    2: [
      {
        title: "Rekordbox cueing and phrase prep",
        url: "https://www.youtube.com/watch?v=EIUd_xdBYGs",
        reason: "Préparer les points de repère avant d'utiliser l'EQ.",
      },
    ],
  },
  flx3_xdj: {
    1: [
      {
        title: "Controller/XDJ startup workflow",
        url: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
        reason: "Base utile pour contrôleur et logique club.",
      },
      {
        title: "Rekordbox export preparation",
        url: "https://www.youtube.com/watch?v=H31hjTx3bXY",
        reason: "Préparer des playlists et cues pour une pratique régulière.",
      },
    ],
  },
};

export function getRecommendedVideosForLevel(
  level: number,
  track: CourseTrackId,
  language: Language = "fr",
): RecommendedLearningVideo[] {
  const dedupeByUrl = (videos: RecommendedLearningVideo[]) =>
    videos.filter((item, idx, arr) => arr.findIndex((x) => x.url === item.url) === idx);

  if (language === "fr") {
    const primary = PRIMARY_LEVEL_VIDEO_BY_LANGUAGE.fr[level];
    const extra = LEVEL_VIDEO_PICKS_COMMON_FR[level] ?? [];
    return dedupeByUrl([primary, ...extra].filter(Boolean)).slice(0, 3);
  }
  const trackSpecific = LEVEL_VIDEO_PICKS_BY_TRACK[track]?.[level] ?? [];
  const common = LEVEL_VIDEO_PICKS_COMMON[level] ?? [];
  const merged = [...trackSpecific, ...common];
  const deduped = dedupeByUrl(merged);
  if (language !== "en") return deduped.slice(0, 3);
  return deduped.slice(0, 3).map((v) => ({
    ...v,
    reason:
      v.reason === "Travail concret des EQ et du passage d'un morceau à l'autre."
        ? "Concrete EQ transition work for real mixing scenarios."
        : v.reason === "Relie timing, pitch et structure de phrase musicale."
          ? "Connects timing, pitch control and phrasing structure."
          : v.reason === "Montre préparation, mix et sortie propre en situation."
            ? "Shows preparation, blending and clean exit in context."
            : v.reason === "Aide à corriger un léger décalage sans casser le groove."
              ? "Helps fix slight tempo drift without killing groove."
              : v.reason === "Introduction simple des clés musicales et compatibilités."
                ? "Simple intro to harmonic keys and compatibility choices."
                : v.reason === "Aide à construire une vraie progression de set."
                  ? "Helps design a clear and effective energy progression."
                  : v.reason === "Préparer les points de repère avant d'utiliser l'EQ."
                    ? "Prepare phrase and cue references before EQ work."
                    : v.reason === "Repère les zones de la FLX4 et les premiers gestes."
                      ? "Identify FLX4 zones and first practical moves."
                      : v.reason === "Le plus important sur FLX4: maîtriser Rekordbox."
                        ? "Core FLX4 skill: controlling Rekordbox workflow."
                        : v.reason === "Base utile pour contrôleur et logique club."
                          ? "Useful base for controller workflow and club logic."
                          : v.reason === "Préparer des playlists et cues pour une pratique régulière."
                            ? "Prepare playlists and cues for consistent practice."
                            : v.reason === "Montre comment placer les FX sans détruire le groove."
                              ? "Shows how to place FX without destroying groove."
                              : v.reason === "Exemples concrets de décisions selon la réaction du public."
                                ? "Concrete decision examples based on crowd reactions."
                                : v.reason === "Approche claire pour organiser montée, pic, respiration et sortie."
                                  ? "Clear framework for rise, peak, breathing, and landing."
                                  : v.reason === "Travaille les réflexes de recovery en contexte live."
                                    ? "Build recovery reflexes for live booth pressure."
                                    : v.reason === "Passer de technique pure à identité artistique cohérente."
                                      ? "Move from pure technique to coherent artistic identity."
                                      : v.reason,
  }));
}

export function getPrimaryVideoForLevel(
  level: number,
  language: Language,
): RecommendedLearningVideo | null {
  const v = PRIMARY_LEVEL_VIDEO_BY_LANGUAGE[language]?.[level];
  return v ?? null;
}

export function getPreviousLevelRecap(
  level: number,
  track: CourseTrackId,
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
): { level: number; title: string; points: string[] } | null {
  if (level <= 1) return null;
  const previous = getModuleByLevel(level - 1, track, skillTier, language);
  if (!previous) return null;
  const points = previous.slides.slice(0, 3).map((s) => s.keyTakeaway);
  return {
    level: previous.level,
    title: previous.title,
    points,
  };
}
