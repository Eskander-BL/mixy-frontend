/**
 * DJ Academy - Contenu Pédagogique Progressif par Slides
 * Structure: Chaque niveau = progression en slides (3-5 slides)
 */

import { level4Module, level5Module } from "./courses-progressive-extended";
import { buildAcceleratedLevels123 } from "./courses-accelerated-first-levels";
import type { CourseTrackId } from "./learning-profile";
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
    description: "Build strong FLX/Rekordbox foundations before advanced transitions.",
    slides: {
      1: {
        title: "Rekordbox and controller fundamentals",
        subtitle: "Preparation mode vs performance mode",
        videoDescription:
          "Understand your workflow before touching complex transitions.",
        content:
          "At level 1 your goal is reliable setup and navigation: import, analyze, cue points, and clean loading workflow. This is where consistency starts.",
        keyTakeaway:
          "Strong preparation reduces mistakes and improves confidence in every next level.",
        exercise: {
          title: "Prepare 5 tracks correctly",
          description: "Create one clean training playlist.",
          steps: [
            "Import 5 tracks with similar BPM range.",
            "Analyze BPM/grid and verify downbeats.",
            "Set 4 useful hot cues per track.",
            "Load tracks on both decks and test cue behavior.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Do not skip grid checks.",
          "Name your cues with intent.",
          "Keep one backup playlist.",
        ],
      },
      2: {
        title: "Hardware and signal flow",
        subtitle: "Headphones, monitor, gain staging basics",
        videoDescription: "Set clean monitoring before practicing transitions.",
        content:
          "Good DJing starts with hearing clearly. Configure cue/master balance and keep gain structure stable before trying creative moves.",
        keyTakeaway:
          "If monitoring is unclear, transition quality collapses.",
        exercise: {
          title: "Monitoring setup drill",
          description: "Build repeatable listening conditions.",
          steps: [
            "Set cue/master blend in headphones.",
            "Match track gain roughly before transition.",
            "Switch between cue and master every 8 bars.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Avoid red master levels.",
          "Use ears first, visuals second.",
          "Consistent gain gives cleaner EQ work later.",
        ],
      },
      3: {
        title: "Tempo and phrasing intro",
        subtitle: "Align timing before EQ tricks",
        videoDescription: "Learn timing control and phrase awareness.",
        content:
          "Tempo alignment and phrase awareness are the basis of invisible transitions. Effects cannot fix poor timing.",
        keyTakeaway:
          "Timing before creativity.",
        exercise: {
          title: "8-bar timing drill",
          description: "Practice controlled entry timing.",
          steps: [
            "Start track B on phrase start.",
            "Correct slight drift with pitch/jog.",
            "Repeat on 5 different track pairs.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Small corrections are better than panic moves.",
          "Phrase timing matters as much as BPM.",
          "Record short drills for review.",
        ],
      },
      4: {
        title: "First clean blend",
        subtitle: "Simple transition with control",
        videoDescription: "Execute your first stable blend from A to B.",
        content:
          "Use a minimal process: align, pre-listen, blend, release. Keep it simple and repeatable.",
        keyTakeaway:
          "Clean and simple beats complex and unstable.",
        exercise: {
          title: "2-track clean blend",
          description: "One full transition without unnecessary FX.",
          steps: [
            "Align BPM and phrase start.",
            "Blend with controlled volume and EQ.",
            "Exit outgoing track cleanly.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Avoid over-touching controls.", "Stay phrase-aware.", "Prioritize smoothness."],
      },
      5: {
        title: "Level 1 validation",
        subtitle: "From setup confidence to repeatability",
        videoDescription: "Consolidate your first DJ workflow.",
        content:
          "This slide confirms your level-1 skill: setup, timing, and simple blend execution under no stress.",
        keyTakeaway:
          "Repeatability is your first professional habit.",
        exercise: {
          title: "Three clean transitions in a row",
          description: "Stability challenge without reset.",
          steps: [
            "Prepare 4 tracks.",
            "Mix 3 transitions back-to-back.",
            "Review where timing or levels drifted.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Do not chase speed yet.",
          "Consistency first.",
          "Write one improvement point after each run.",
        ],
      },
    },
  },
  2: {
    title: "EQ Fundamentals",
    description: "Control frequency space for smoother, cleaner transitions.",
    slides: {
      1: {
        title: "Frequency roles in a transition",
        subtitle: "Bass, mids, highs and energy balance",
        videoDescription: "Understand what each EQ band contributes musically.",
        content:
          "Bass drives body, mids carry identity, highs shape clarity. In transitions, your job is to avoid masking and keep energy readable.",
        keyTakeaway:
          "EQ is space management, not random knob movement.",
        exercise: {
          title: "Band isolation listening",
          description: "Train your ear per frequency area.",
          steps: [
            "Listen to one track and focus on bass only.",
            "Repeat for mids and highs.",
            "Note which band dominates each section.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Mids often clash first.", "Low-end should be handed over, not stacked." , "Subtle EQ wins."],
      },
      2: {
        title: "Bass handover logic",
        subtitle: "Avoid mud while keeping impact",
        videoDescription: "Practice controlled low-end transfer.",
        content:
          "Do not run full subs from both tracks for long. Build entry with mids/highs, then hand low-end at phrase boundary.",
        keyTakeaway:
          "A clean bass handover keeps the dancefloor locked.",
        exercise: {
          title: "Low-end swap drill",
          description: "Practice bass transfer timing.",
          steps: [
            "Blend incoming track with low bass.",
            "At phrase start, reduce outgoing low and raise incoming low.",
            "Keep master clarity consistent.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Phrase timing matters.", "Avoid abrupt low-end jumps.", "Check result in recording."],
      },
      3: {
        title: "EQ transition execution",
        subtitle: "One full transition with controlled spectrum",
        videoDescription: "Apply EQ strategy in a complete blend.",
        content:
          "This slide turns theory into execution. Keep changes intentional and audible, not exaggerated.",
        keyTakeaway:
          "Controlled EQ movement creates professional smoothness.",
        exercise: {
          title: "Full EQ transition",
          description: "Run one transition with clear EQ plan.",
          steps: [
            "Plan entry, overlap, and release moments.",
            "Execute with minimal unnecessary movement.",
            "Review and simplify any messy section.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: ["Clarity before loudness.", "Less is often better.", "Consistency beats drama."],
      },
    },
  },
  3: {
    title: "Core Transitions",
    description: "Master preparation, blend timing, and clean release.",
    slides: {
      1: {
        title: "Three-phase transition model",
        subtitle: "Prepare, blend, release",
        videoDescription: "Build a repeatable transition structure.",
        content:
          "Reliable transitions follow structure: prep timing, controlled overlap, and clean release point.",
        keyTakeaway:
          "Structure reduces hesitation and errors.",
        exercise: {
          title: "3-phase mapping",
          description: "Mark each phase in real tracks.",
          steps: [
            "Pick two tracks and label phrase windows.",
            "Define prep, blend, release bars.",
            "Execute and compare with your map.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Map before mix.", "Stay phrase-aware.", "Do not rush release."],
      },
      2: {
        title: "Timing under control",
        subtitle: "Keep groove stable during overlap",
        videoDescription: "Maintain phase coherence while blending.",
        content:
          "During overlap, tiny timing corrections preserve groove and confidence.",
        keyTakeaway:
          "Small timing control decisions prevent major transition failures.",
        exercise: {
          title: "Overlap timing drill",
          description: "Hold groove for 16 bars.",
          steps: [
            "Blend two tracks for 16 bars.",
            "Correct drift with minimal jog/pitch action.",
            "Release on phrase start.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Use headphones actively.", "Correct early.", "Avoid panic gestures."],
      },
      3: {
        title: "Invisible transition target",
        subtitle: "Smoothness as core quality metric",
        videoDescription: "Make track changes feel natural to listeners.",
        content:
          "A strong transition sounds inevitable, not forced. The crowd should feel continuity.",
        keyTakeaway:
          "Invisible transitions are the benchmark of control.",
        exercise: {
          title: "Two invisible transitions",
          description: "Aim for seamless flow.",
          steps: [
            "Perform two transitions with same process.",
            "Record and listen without watching waveforms.",
            "Adjust where transition felt obvious.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: ["Continuity over tricks.", "Trust ears, not only screen.", "Refine, do not rush."],
      },
    },
  },
  4: {
    title: "Harmonic Mixing",
    description: "Use key compatibility to improve musical flow.",
    slides: {
      1: {
        title: "Musical key basics",
        subtitle: "Why some blends sound natural",
        videoDescription: "Understand key compatibility in practical DJ terms.",
        content:
          "Harmonic compatibility reduces harsh clashes and improves emotional continuity.",
        keyTakeaway:
          "Key-aware transitions often sound cleaner and more musical.",
        exercise: {
          title: "Key pairing drill",
          description: "Find compatible pairs in your library.",
          steps: [
            "Select 6 tracks and note keys.",
            "Build 3 compatible transition pairs.",
            "Test each pair and rate smoothness.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Use key as guide, not prison.", "Start with safe moves.", "Listen critically."],
      },
      2: {
        title: "Camelot workflow",
        subtitle: "Fast key decision making",
        videoDescription: "Use Camelot logic under real set pressure.",
        content:
          "Camelot gives quick compatibility decisions when you need speed.",
        keyTakeaway:
          "Fast key logic improves transition confidence.",
        exercise: {
          title: "Quick key decision drill",
          description: "Choose next track in under 10 seconds.",
          steps: [
            "Pick current key.",
            "Select one compatible option fast.",
            "Run transition and evaluate result.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Train speed with constraints.", "Keep fallback options.", "Do not overthink."],
      },
      3: {
        title: "Controlled rule-breaking",
        subtitle: "Creative contrast without chaos",
        videoDescription: "Break harmonic rules intentionally.",
        content:
          "Advanced creativity means controlled contrast, not random mismatch.",
        keyTakeaway:
          "Break rules only when you can predict the result.",
        exercise: {
          title: "A/B contrast test",
          description: "Compare compatible vs intentional contrast mix.",
          steps: [
            "Run one harmonic-safe transition.",
            "Run one intentional contrast transition.",
            "Compare musical impact and crowd feel.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Contrast should be intentional.", "Recovery plan always ready.", "Context matters."],
      },
      4: {
        title: "Harmonic transition execution",
        subtitle: "Apply key logic in full transition",
        videoDescription: "Consolidate harmonic strategy in live blend.",
        content:
          "Combine key choice, phrasing, and EQ for a polished result.",
        keyTakeaway:
          "Harmonic mixing is strongest when integrated with timing and EQ.",
        exercise: {
          title: "3 harmonic transitions",
          description: "Execute consistent key-aware blends.",
          steps: [
            "Prepare 3 compatible transitions.",
            "Run all 3 in one take.",
            "Review smoothness and correction points.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: ["Plan key path in advance.", "Use ears first.", "Keep transitions readable."],
      },
    },
  },
  5: {
    title: "Set Structure",
    description: "Design engaging energy progression across a full set.",
    slides: {
      1: {
        title: "Energy architecture",
        subtitle: "Intro, build, peak, release",
        videoDescription: "Create a coherent emotional trajectory.",
        content:
          "A strong set controls pace and expectation instead of random intensity spikes.",
        keyTakeaway:
          "Energy structure is central to crowd retention.",
        exercise: {
          title: "Energy map",
          description: "Design one short structured set.",
          steps: [
            "Define 4 energy phases.",
            "Assign tracks to each phase.",
            "Prepare transition intents between phases.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Think journey, not playlist.", "Control pacing.", "Keep room to adapt."],
      },
      2: {
        title: "Adapt in real time",
        subtitle: "When to push, hold, or reset",
        videoDescription: "Translate crowd response into set decisions.",
        content:
          "Your structure is a guide, not a prison. Adapt based on real audience response.",
        keyTakeaway:
          "Flexibility with structure is a pro skill.",
        exercise: {
          title: "Decision checkpoints",
          description: "Re-evaluate every few transitions.",
          steps: [
            "Set a checkpoint every 2 transitions.",
            "Rate crowd state.",
            "Choose push/hold/reset strategy.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: ["Stay observant.", "Decide quickly.", "Protect momentum."],
      },
      3: {
        title: "Structure validation",
        subtitle: "Run and review a complete mini-set",
        videoDescription: "Validate your structure with one full run.",
        content:
          "Execute your structure end-to-end, then review weak transitions and energy drops.",
        keyTakeaway:
          "Review transforms a good set into a repeatable set.",
        exercise: {
          title: "25-minute structured run",
          description: "One full run plus review notes.",
          steps: [
            "Play full mini-set in one take.",
            "Mark 2 strong moments and 2 weak moments.",
            "Rebuild weak transitions and replay.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: ["Record every full run.", "Score your own set objectively.", "Iterate weekly."],
      },
    },
  },
  6: {
    title: "Advanced Techniques: Loops, FX and Energy Control",
    description: "Move from clean transitions to creative transitions without losing groove.",
    slides: {
      1: {
        title: "Useful loops vs decorative loops",
        subtitle: "Extend a phrase without tiring the dancefloor",
        videoDescription: "Use loops as a musical tool, not as a cover-up.",
        content:
          "A loop should solve a phrase issue, secure an entry, or build tension. If it runs too long, emotion drops. Pro objective: short loop, clear intention, clean release.",
        keyTakeaway: "A loop solves one precise phrase problem, then disappears on time.",
        exercise: {
          title: "4/8-beat loop drill",
          description: "Compare short-loop impact vs overextended loops.",
          steps: [
            "Pick two tracks with close BPM and different intros.",
            "On track A, enable a 4-beat loop at end of phrase.",
            "Start track B, align in headphones, blend in progressively.",
            "Release the loop on the next phrase start.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Prepare your loop exit before enabling the loop.",
          "Do not hide weak beatmatching with loops.",
          "Record yourself: over-looping is easy to hear.",
        ],
      },
      2: {
        title: "FX: build tension without blurring the mix",
        subtitle: "Filter, echo, reverb with phrase timing",
        videoDescription: "Use effects to support story, not to overload transitions.",
        content:
          "Great FX use means controlled wet level, phrase-aware timing, and musical intent. Club clarity always wins over show-off complexity.",
        keyTakeaway: "One well-timed effect beats three stacked effects.",
        exercise: {
          title: "One-effect routine",
          description: "Build consistency before complexity.",
          steps: [
            "Run one transition with no effects.",
            "Repeat with only light filter movement.",
            "Third pass: add short echo on outgoing track.",
            "Review and keep the cleanest version.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "If effect is louder than musical intent, reduce wet.",
          "Trigger effects on phrase boundaries.",
          "Always keep a dry reset option.",
        ],
      },
      3: {
        title: "Full creative transition",
        subtitle: "Loop + EQ + FX + clean exit",
        videoDescription: "Assemble advanced tools into one controlled transition.",
        content:
          "Advanced skill is sequencing actions under pressure: prepare, create tension, release, recover. You should execute this reliably, even in imperfect booth conditions.",
        keyTakeaway: "Creativity equals control plus fast recovery.",
        exercise: {
          title: "Two-transition booth scenario",
          description: "Simulate pressure with back-to-back transitions.",
          steps: [
            "Transition 1: short loop + bass swap + clean release.",
            "Transition 2: filter + echo out, no loop.",
            "Record both in one take and review weak spots.",
          ],
          estimatedTime: "13 minutes",
        },
        tips: [
          "Audience remembers energy continuity, not technical complexity.",
          "Keep a simplified version of each creative move.",
          "Canceling an effect at the right time is pro behavior.",
        ],
      },
    },
  },
  7: {
    title: "Reading the Crowd",
    description: "Make fast decisions from real dancefloor signals.",
    slides: {
      1: {
        title: "Weak crowd signals",
        subtitle: "Observe before energy actually drops",
        videoDescription: "Detect fatigue, peak, and relaunch signals early.",
        content:
          "Pro DJs react early: micro-drop in engagement, floor compression, bar traffic, and delayed drop response. You should adjust before decline becomes obvious.",
        keyTakeaway: "Diagnose early and correct in 1-2 tracks max.",
        exercise: {
          title: "60-second crowd scan",
          description: "Build active observation during your set.",
          steps: [
            "Track floor density, drop reaction, and movement flow.",
            "Label state: rising, stable, or dropping.",
            "Pick intent for next track: push, hold, or pivot.",
          ],
          estimatedTime: "8 minutes",
        },
        tips: [
          "Noisy crowd is not always engaged crowd.",
          "A quick correction is cheaper than prolonged inertia.",
          "Prepare emergency tracks for multiple energy directions.",
        ],
      },
      2: {
        title: "Fast decisions under pressure",
        subtitle: "Choose the next move in under 10 seconds",
        videoDescription: "A practical decision framework for tense moments.",
        content:
          "Under pressure, you need a clear framework: keep, push, or pivot. The worst pattern is long hesitation.",
        keyTakeaway: "Simple decisions reduce stress and improve consistency.",
        exercise: {
          title: "Three-option drill",
          description: "Train fast choices across crowd states.",
          steps: [
            "Simulate cold, stable, and peak crowd states.",
            "For each state, decide in 10 seconds: keep/push/pivot.",
            "Execute one transition matching your choice.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "A fast, good-enough decision beats no decision.",
          "Keep utility tracks tagged by crowd scenario.",
          "When unsure, stabilize first.",
        ],
      },
      3: {
        title: "Live error recovery",
        subtitle: "Recover quickly and keep the floor alive",
        videoDescription: "Recovery techniques when transitions fail.",
        content:
          "All DJs miss transitions. Professionals recover instantly by simplifying, restoring groove, and relaunching confidently.",
        keyTakeaway: "You are judged by recovery quality, not error absence.",
        exercise: {
          title: "Recovery drill",
          description: "Turn a failed transition into a clean relaunch.",
          steps: [
            "Intentionally create a light drift.",
            "Return to simple EQ and clear timing.",
            "Relaunch with a safe track in under 20 seconds.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "A 2-second breath can save a set.",
          "Your emergency track must be pre-tagged.",
          "Simplifying is professional, not weak.",
        ],
      },
    },
  },
  8: {
    title: "Set Construction",
    description: "Design a 45-60 minute set that holds from start to finish.",
    slides: {
      1: {
        title: "Macro set architecture",
        subtitle: "Intro, rise, peak, breathing, exit",
        videoDescription: "Build a clear emotional path for the audience.",
        content:
          "A strong set is a trajectory, not a random playlist. You should know where you are in the story at every moment.",
        keyTakeaway: "A successful set follows a readable emotional curve.",
        exercise: {
          title: "45-minute blueprint",
          description: "Write a full structure before mixing.",
          steps: [
            "Define 5 energy blocks with target duration.",
            "Assign key tracks to each block.",
            "Prepare one alternative per block.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Write the plan, then adapt in real time.",
          "Transitions between blocks matter most.",
          "Always prepare a clean landing.",
        ],
      },
      2: {
        title: "Micro-structure and pivot points",
        subtitle: "Secure critical transitions between blocks",
        videoDescription: "Translate macro planning into transition decisions.",
        content:
          "Your set quality depends on a handful of high-impact transitions. Prepare them like scripted scenes.",
        keyTakeaway: "A set is a sequence of mastered transition pivots.",
        exercise: {
          title: "Four critical transitions",
          description: "Prepare your highest-impact moments.",
          steps: [
            "Select 4 high-risk transitions.",
            "Write entry cue, EQ/FX action, and exit cue.",
            "Rehearse these 4 transitions repeatedly.",
          ],
          estimatedTime: "11 minutes",
        },
        tips: [
          "Each critical transition needs a simple fallback version.",
          "Avoid changing too many parameters at once.",
          "Consistency beats forced originality.",
        ],
      },
      3: {
        title: "Booth-export set preparation",
        subtitle: "Move from bedroom practice to club context",
        videoDescription: "Practical prep for playlists, USBs, and backups.",
        content:
          "Club performance requires technical reliability: export flow, backups, and emergency playlist design.",
        keyTakeaway: "Professionalism starts before pressing Play.",
        exercise: {
          title: "Pre-booth checklist",
          description: "Validate your set as if you play tomorrow.",
          steps: [
            "Prepare primary and backup USB.",
            "Verify BPM/grid on critical tracks.",
            "Build a 10-track emergency crate.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Test USB on another setup when possible.",
          "Name playlists by energy intent.",
          "Prepared worst case equals best performance.",
        ],
      },
    },
  },
  9: {
    title: "Club Performance",
    description: "Execute reliably under real booth pressure.",
    slides: {
      1: {
        title: "Pre-live mental routine",
        subtitle: "Stay stable when adrenaline spikes",
        videoDescription: "Preparation habits for clean public execution.",
        content:
          "Stress is normal. The goal is ritualized focus: breathing, technical checks, and first-transition visualization.",
        keyTakeaway: "A short routine prevents impulsive mistakes.",
        exercise: {
          title: "5-minute routine",
          description: "Set your performance state before playing.",
          steps: [
            "60 seconds controlled breathing.",
            "Check gain, cue, booth monitor, opening track.",
            "Visualize first two transitions.",
          ],
          estimatedTime: "6 minutes",
        },
        tips: [
          "Your intro should be your safest transition.",
          "Keep a mental script for incidents.",
          "Comfort setup improves decisions.",
        ],
      },
      2: {
        title: "Sound system adaptation",
        subtitle: "Adjust to room acoustics and booth return",
        videoDescription: "Adapt behavior to real system response.",
        content:
          "The same transition sounds different in every room. You must calibrate against actual PA response, not studio memory.",
        keyTakeaway: "Pro DJs adapt to the room, not just to habit.",
        exercise: {
          title: "3-track calibration",
          description: "Calibrate your style to real system response.",
          steps: [
            "Track 1: read bass and clarity.",
            "Track 2: test one clean transition.",
            "Track 3: correct EQ/gain according to room feedback.",
          ],
          estimatedTime: "9 minutes",
        },
        tips: [
          "If room is boomy, simplify low-end first.",
          "Keep headroom margin.",
          "Never fix clarity by only raising volume.",
        ],
      },
      3: {
        title: "Incident handling",
        subtitle: "When track fails, cable shifts, or crowd drops",
        videoDescription: "Recover fast without breaking audience experience.",
        content:
          "Club-level performance means continuity despite incidents. Diagnose fast, stabilize, and relaunch confidently.",
        keyTakeaway: "Operational robustness separates fragile from pro DJs.",
        exercise: {
          title: "Incident simulation",
          description: "Simulate three failures and keep momentum.",
          steps: [
            "Bad analyzed track -> quick correction.",
            "Failed transition -> immediate safe-track recovery.",
            "Energy drop -> relaunch in under two tracks.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Keep an anti-panic crate always ready.",
          "Shorten thinking loop: diagnose -> act -> stabilize.",
          "Calm behavior is audible in your mix.",
        ],
      },
    },
  },
  10: {
    title: "Complete Mastery",
    description: "Move from good DJ to identifiable, reliable, bookable DJ.",
    slides: {
      1: {
        title: "Build your artistic identity",
        subtitle: "Your sound, your energy, your positioning",
        videoDescription: "Turn technical skills into recognisable identity.",
        content:
          "At this stage, your objective is not only clean mixing. You should become recognizable through curation, transitions, energy control, and stage attitude.",
        keyTakeaway: "Mastery is repeated coherence over time.",
        exercise: {
          title: "20-minute signature set",
          description: "Create a mini-format that sounds like you.",
          steps: [
            "Pick 6-8 tracks reflecting your identity.",
            "Write one transition intent line per transition.",
            "Record and identify 3 unique strengths.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Selection identity matters more than effect quantity.",
          "Do not clone another DJ full set.",
          "Reliable quality beats occasional brilliance.",
        ],
      },
      2: {
        title: "Capstone: 45-minute club set",
        subtitle: "Final validation of your Mixy path",
        videoDescription: "Apply all skills in one complete set.",
        content:
          "The capstone validates your full stack: structure, transitions, crowd logic, recovery, and technical reliability in one run.",
        keyTakeaway: "If this set is stable, your operational level is real.",
        exercise: {
          title: "Final Mixy project",
          description: "Design, perform, review, and improve one full set.",
          steps: [
            "Prepare one 45-minute set with A/B plans.",
            "Perform in one take without pause.",
            "Review transitions, energy, incidents, and recovery.",
            "Replay with top 3 weaknesses corrected.",
          ],
          estimatedTime: "20 minutes",
        },
        tips: [
          "Goal is not zero mistakes, goal is zero panic.",
          "Set readability matters from start to finish.",
          "Archive recordings to track true progression.",
        ],
      },
      3: {
        title: "After level 10: pro roadmap",
        subtitle: "Keep improving without plateau",
        videoDescription: "8-week training plan to consolidate pro level.",
        content:
          "Level 10 is a transition point. Continue with weekly technical drills, full-set sessions, review rituals, and objective KPIs.",
        keyTakeaway: "Professional DJs keep training with structure.",
        exercise: {
          title: "8-week plan",
          description: "Build a sustainable improvement routine.",
          steps: [
            "Schedule 2 technical sessions + 1 full set each week.",
            "Track KPIs: transitions, tempo stability, energy quality.",
            "Publish one clip weekly and collect focused feedback.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "If you do not measure, you stagnate.",
          "Run a review ritual after each set.",
          "Long-term progress is discipline.",
        ],
      },
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
  title: "Les Bases du DJing — parcours DDJ-FLX4",
  description:
    "Ta FLX4 a moins de boutons visibles qu’une FLX3 : beaucoup se fait avec Shift et calques. Rekordbox + branchements + BPM avec des exemples calibrés FLX4.",
  userLevels: ["beginner"],
  totalSlides: 5,
  estimatedDuration: "40 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Rekordbox + DDJ-FLX4 : la bonne base",
      subtitle: "Modes du logiciel, analyse des morceaux — et l’idée des « boutons cachés » (Shift)",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Parcours Performance (et repères visuels) dans Rekordbox — idéal avant de brancher la table. Active les sous-titres YouTube si besoin.",
      illustrations: [
        {
          url: "https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-flx4/black/ddj-flx4-angle-ttl-1200.jpg",
          alt: "Contrôleur DJ DDJ-FLX4 — vue en plongée",
          caption:
            "FLX4 : jogs, faders, mixer au centre, pads en dessous. Garde en tête que **Shift** + pad ou bouton ouvre souvent la « 2e couche » (voir le manuel Layer).",
        },
      ],
      content: `**Ce niveau 1 est le parcours FLX4** — c’est la table que la majorité des abonnés Mixy utilisent : surface **plus simple en apparence**, mais **tout autant puissante** une fois qu’on connaît les **calques (Shift)** et les raccordements Rekordbox.

Même logique générale que sur d’autres contrôleurs Pioneer : **2 decks**, **mixer au centre**, **pads** sous les jogs. La différence avec une FLX3 ou un XDJ-RX, c’est surtout **où** se trouvent les réglages (souvent derrière **Shift** ou dans un sous-menu sur FLX4).

**Deux grands modes dans Rekordbox**
- **Export** : tu prépares la musique (playlists, grilles de BPM, mémoire de points cue), tu peux exporter vers une clé USB pour des lecteurs CDJ/XDJ en boîte.
- **Performance** : c'est le **mode DJ** avec la table branchée — deux pistes visibles, waveforms, platines A/B.

**Avant de mixer**
- Importe tes morceaux dans la **Collection**, crée une **playlist d'entraînement** avec des titres au BPM proche (ex. 124–128).
- Lance **l'analyse** (BPM / grille) pour que Rekordbox affiche le tempo et les repères sur la waveform.
- Vérifie que la **grid** (lignes sur les temps forts) suit bien le kick ; corrige si une piste a été mal analysée.

**Côté matériel (vue d'ensemble)**
- **Decks gauche / droite** : chargent chacun une piste, **jog** pour nudge ou scratch léger selon tes réglages.
- **Section mixer** : volumes par canal (**channel faders**), **crossfader**, **EQ 3 bandes**, **Merge FX** (ou effets selon firmware) — au début, utilise **un** effet ou filtre à la fois pour entendre clairement.
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
      title: "Brancher la FLX4 : USB, Master, casque",
      subtitle: "Enceintes actives, gain propre, écoute DJ — ports USB parfois doubles",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
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

**Hardware DDJ-FLX4**
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
 * NIVEAU 1 — parcours DDJ-FLX3 & XDJ-RX (plus de contrôles visibles, logique type CDJ / club)
 */
export const level1ModuleFlx3Xdj: CourseModule = {
  level: 1,
  title: "Les Bases du DJing — DDJ-FLX3 & XDJ-RX",
  description:
    "Niveau 1 distinct du parcours FLX4 : la FLX3 déploie plus de boutons (Smart CFX, sections pad) ; l’XDJ-RX se pilote comme un tout-en-un USB (Export Rekordbox). Ensuite, la méthode pédagogique est partagée, avec une progression de difficulté et des exercices adaptés au setup.",
  userLevels: ["beginner"],
  totalSlides: 5,
  estimatedDuration: "40 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Rekordbox + FLX3 / XDJ-RX : la bonne base « club »",
      subtitle: "Plus de boutons sous les doigts, ou tout-en-un sans PC au plateau",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Modes Export & Performance dans Rekordbox — indispensable avant de brancher une FLX3, et pour préparer les clés USB d’un XDJ-RX.",
      illustrations: [
        {
          url: "https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-flx3/black/ddj-flx3-angle-ttl-1200.jpg",
          alt: "Contrôleur DJ DDJ-FLX3 — voie mixer et sections effets",
          caption:
            "Sur FLX3, beaucoup de fonctions ont un bouton dédié (ex. Smart CFX). Sur XDJ-RX, l’équivalent se règle souvent à l’écran + molettes, comme sur des CDJ.",
        },
      ],
      content: `**Ce parcours niveau 1 est calibré FLX3 et XDJ-RX** — pas pour la FLX4. L’idée : tu apprends avec **la même disposition « pro »** que sur beaucoup de setups club (plus de contrôles **visibles** qu’une FLX4, moins besoin de tout passer par des couches Shift).

**DDJ-FLX3 (contrôleur + ordinateur)**
- Beaucoup de **boutons et pads** sont accessibles directement : **Smart CFX**, **Beat FX**, **Hot Cues** — on ira **doucement** sur les effets au début pour entendre chaque mouvement.
- **Performance** avec Rekordbox : table branchée en USB, deux decks à l’écran comme d’habitude.

**XDJ-RX (tout-en-un)**
- Tu peux mixer **sans ouvrir le PC sur le plateau** : playlists préparées en **Export** sur une clé USB, chargées sur les lecteurs.
- L’écran par deck remplace une bonne partie de l’UI « laptop » : BPM, vagues, points cue — pense **CDJ + mixer intégré**.

**Deux grands modes dans Rekordbox (les deux matériels)**
- **Export** : organisation des morceaux, **grid**, **Hot Cues**, playlists pour clé USB (surtout vitale pour l’XDJ-RX).
- **Performance** : mode DJ avec **FLX3** branchée — ou préparation mentale des morceaux si tu bosses pour du stand-alone XDJ.

**Avant de mixer**
- Importe tes morceaux, crée une playlist d'entraînement BPM proches (ex. 124–128).
- Lance l'**analyse** BPM / grille ; vérifie que le kick suit les lignes de grille.

**Ressources utiles**
- DDJ-FLX3 : https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx3/black/overview/
- Gamme XDJ-RX : https://www.pioneerdj.com/fr-fr/product/all-in-one-system/
- PDF Support : télécharge le manuel et repère « Connections » + « Part names ».

**Théorie + pratique**
- Même discipline que sur FLX4 : importer → analyser → charger deck A/B → écouter la grille au casque. Seule la **surface** change.`,
      keyTakeaway:
        "FLX3 = beaucoup de contrôles visibles avec le laptop. XDJ-RX = prépare en Export, joue depuis la machine. Rekordbox reste le hub.",
      exercise: {
        title: "Préparer 5 morceaux + 1 scénario Export",
        description: "Base commune aux deux machines",
        steps: [
          "Crée une playlist « Mixy FLX3/XDJ » avec 5 morceaux du même style.",
          "Analyse-les (BPM / grille) et corrige une grille si besoin.",
          "Pose 4 Hot Cues par morceau (intro, pont, drop, outro).",
          "Si tu vises un **XDJ-RX** : exporte la playlist sur une clé USB (Export mode) et vérifie qu’elle s’affiche dans Rekordbox « Device » / lecteur test.",
          "Si tu vises une **FLX3** : charge un titre sur A et B en Performance et vérifie le beat au casque.",
        ],
        estimatedTime: "18 minutes",
      },
      tips: [
        "Sur FLX3, note les noms des pads (Serato / Rekordbox) dans le mode d’emploi : ils changent selon la couche.",
        "Sur XDJ-RX, garde une clé de backup : les USB sont ton « disque dur scène ».",
        "Ne monte pas le master tant que les trims ne sont pas calibrés.",
      ],
    },
    {
      slideNumber: 2,
      title: "Brancher la FLX3 ou l’XDJ-RX",
      subtitle: "FLX3 : USB + casque + master — XDJ : clés USB + enceintes + casque",
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
      videoDescription:
        "Vidéo exemple contrôleur FLX (visuel ports) — pour XDJ-RX, ajoute l’étape « playlists sur clé USB » avant d’allumer.",
      content: `**DDJ-FLX3 (avec ordinateur)**
Ordinateur → **USB** → contrôleur → **MASTER OUT** → enceintes actives (entrée ligne). **Casque** sur **PHONES**. Même logique qu’une FLX4, mais vérifie sur **ton** manuel la présence d’entrées **MIC** ou **AUX** si tu ajoutes un micro.

**XDJ-RX (sans PC requis en mix)**
- Branche les **enceintes** sur la sortie **Master** (RCA/XLR selon modèle).
- **Casque** sur la prise DJ / booth.
- Insère une ou deux **clés USB** avec tes playlists **Export** ; sélectionne les morceaux depuis les **écrans**.

**Points communs**
- Faders et master à **zéro** avant d’allumer la sono.
- Régle les **trims** : signal dans le vert/orange, pas de rouge continu.
- Pour l’appart : petites enceintes actives ; fais attention aux basses vers les voisins.

**Support**
- Manuels & firmware : https://www.pioneerdj.com/fr-fr/support/`,
      keyTakeaway:
        "FLX3 = chaîne laptop‑contrôleur‑sono. XDJ-RX = clé USB + enceintes + casque, PC seulement pour préparer chez toi.",
      exercise: {
        title: "Check-list selon ta machine",
        description: "Une fois avant chaque session",
        steps: [
          "Note sur papier : « FLX3 + PC » ou « XDJ seul ».",
          "FLX3 : câble USB données OK ? XDJ : clé reconnue sur le lecteur ?",
          "Enceintes sur entrée ligne, pas phono ; master monté progressivement.",
          "Casque : pré-écoute d’un deck sans saturer le master.",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "XDJ : formate tes clés FAT32 si le manuel le recommande.",
        "FLX3 : mets à jour Rekordbox et le firmware de la table le même week-end pour éviter les bugs.",
        "Garde une multiprise propre + un câble de secours.",
      ],
    },
    level1ModuleFlx4.slides[2],
    {
      ...level1ModuleFlx4.slides[3],
      videoDescription:
        "Tempo & pitch : applique la même logique sur le fader de la FLX3 ou la molette tempo d’un XDJ-RX.",
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

**Hardware DDJ-FLX3**
- Le **pitch** est en façade par deck ; **Tempo Range** élargit ou réduit la plage utile (lis la valeur affichée avant de tirer le fader). **Smart CFX** colore le son — un réglage à la fois au début.

**Hardware XDJ-RX**
- Le tempo se pilote sur **l’écran** / la **molette** du deck : le BPM affiché doit coller à ce que tu entends après analyse. **Key Lock / Master Tempo** dans le menu si tu veux limiter la déformation de la voix.

**Rekordbox (les deux)**
- Active **Key Lock / Master Tempo** si tu veux optimiser le tempo sans trop bouger la hauteur — à tester au casque avant d’envoyer en salle.`,
      keyTakeaway:
        "Même logique de pitch partout : FLX3 = faders visibles ; XDJ-RX = contrôle à l’écran + Rekordbox pour la prépa.",
    },
    level1ModuleFlx4.slides[4],
  ],
};

/**
 * NIVEAU 2: LES EQUALISEURS (Débutant+)
 */
export const level2Module: CourseModule = {
  level: 2,
  title: "Les Equaliseurs (EQ): Le Secret des Transitions Fluides",
  description: "Comment faire sonner deux chansons ensemble sans que ce soit horrible",
  userLevels: ["beginner"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 Bandes de Frequences",
      subtitle: "Comprends ce que tu entends vraiment",
      videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
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
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
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
      videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
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
  userLevels: ["beginner"],
  totalSlides: 3,
  estimatedDuration: "15 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 3 Phases d'une Transition",
      subtitle: "Comprends la structure d'une bonne transition",
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
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

const courseModulesFromLevel2: CourseModule[] = [
  level2Module,
  level3Module,
  level4Module,
  level5Module,
  {
    level: 6,
    title: "Techniques Avancées: Loops, FX et Contrôle d'Énergie",
    description: "Passer des transitions propres à des transitions créatives sans perdre le groove.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Loops utiles vs loops décoratives",
        subtitle: "Prolonger une phrase musicale sans fatiguer le dancefloor",
        videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
        videoDescription: "Utiliser les loops comme outil musical, pas comme cache-misère.",
        content:
          "Un loop sert à sécuriser une entrée, corriger un timing de phrase ou construire une montée. S'il dure trop longtemps, il retire l'émotion. Objectif pro: loop court, intention claire, sortie propre.",
        keyTakeaway:
          "Le loop doit résoudre un problème précis de phrase, puis disparaître avant la lassitude.",
        exercise: {
          title: "Loop 4/8 temps en situation réelle",
          description: "Comparer la sensation d'un loop court vs un loop trop long.",
          steps: [
            "Choisis deux morceaux au BPM proche avec des intros différentes.",
            "Sur la piste A, active un loop 4 temps en fin de phrase.",
            "Lance B, aligne au casque, puis fais entrer B progressivement.",
            "Relâche le loop au début de la phrase suivante.",
            "Refais l'exercice avec loop 8 temps, compare l'impact.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Prépare ta sortie de loop avant même d'activer le loop.",
          "Ne masque pas un mauvais beatmatch avec un loop.",
          "Filme-toi: un loop trop long se voit dans ta gestuelle et s'entend vite.",
        ],
      },
      {
        slideNumber: 2,
        title: "FX: créer de la tension sans brouiller le mix",
        subtitle: "Filter, echo, reverb avec logique de timing",
        videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
        videoDescription: "Comment utiliser les effets pour servir la narration du set.",
        content:
          "Un bon FX prépare un moment puis laisse la musique respirer. Les erreurs classiques: trop de wet, effets empilés, et déclenchement hors phrase. En club, la clarté gagne toujours contre la démonstration.",
        keyTakeaway:
          "Un seul effet bien timé vaut mieux que trois effets mal calibrés.",
        exercise: {
          title: "Routine '1 effet max'",
          description: "Construire un réflexe propre avant d'ajouter de la complexité.",
          steps: [
            "Fais une transition complète sans effet.",
            "Refais la même transition avec un filtre léger uniquement.",
            "Troisième passage: ajoute un echo court en sortie de piste A.",
            "Écoute les trois versions et choisis la plus lisible.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "Si tu entends l'effet plus fort que la musicalité, baisse le wet.",
          "Déclenche l'effet sur des repères de phrase (8/16/32).",
          "Garde un 'dry reset' mental: revenir à zéro est une compétence pro.",
        ],
      },
      {
        slideNumber: 3,
        title: "Transition créative complète",
        subtitle: "Loop + EQ + FX + sortie propre",
        videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
        videoDescription: "Assembler les outils avancés dans une transition maîtrisée.",
        content:
          "La vraie compétence avancée, c'est l'enchaînement: préparer, tensionner, relâcher. Tu dois pouvoir exécuter ce pattern sans paniquer, même quand une piste réagit différemment en cabine.",
        keyTakeaway:
          "Créativité = contrôle + intention + capacité à revenir au simple instantanément.",
        exercise: {
          title: "Scenario cabine: 2 transitions d'affilée",
          description: "Simuler la pression d'un enchaînement en public.",
          steps: [
            "Transition 1: loop court + swap de basses + sortie nette.",
            "Transition 2: filtre + echo de sortie sans loop.",
            "Enregistre les deux transitions d'un seul tenant.",
            "Note où tu perds la maîtrise, puis simplifie cette étape.",
          ],
          estimatedTime: "13 minutes",
        },
        tips: [
          "Le public retient l'énergie, pas la complexité technique.",
          "Prévois toujours une version simplifiée de ta transition.",
          "Un bon DJ sait annuler un effet au bon moment.",
        ],
      },
    ],
  },
  {
    level: 7,
    title: "Lire la Foule",
    description: "Prendre des décisions rapides selon l'état réel de la piste.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "30 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Signaux faibles de la foule",
        subtitle: "Observer avant que la baisse d'énergie devienne visible",
        videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
        videoDescription: "Identifier les indicateurs de fatigue, de pic et de relance.",
        content:
          "Un DJ pro anticipe: micro-décrochages, zones qui se vident, énergie qui plafonne. Tu ne réagis pas à la catastrophe, tu ajustes avant.",
        keyTakeaway:
          "Lire la foule, c'est diagnostiquer tôt puis corriger en 1 à 2 morceaux max.",
        exercise: {
          title: "Scan foule toutes les 60 secondes",
          description: "Créer une boucle d'observation active pendant ton set.",
          steps: [
            "Observe 3 indicateurs: densité de piste, réactions drops, mouvement bar/piste.",
            "Évalue l'énergie: monte, stable, baisse.",
            "Choisis l'intention du prochain morceau (relancer, stabiliser, respirer).",
          ],
          estimatedTime: "8 minutes",
        },
        tips: [
          "Ne confonds pas foule bruyante et foule engagée.",
          "Une relance ratée vaut moins cher qu'une inertie prolongée.",
          "Prépare des pistes de secours dans 2 directions d'énergie.",
        ],
      },
      {
        slideNumber: 2,
        title: "Décision rapide sous pression",
        subtitle: "Choisir le bon prochain morceau en moins de 10 secondes",
        videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
        videoDescription: "Cadre décisionnel simple pour les moments tendus.",
        content:
          "Quand la cabine chauffe, tu as besoin d'un cadre: garder, pousser, ou pivoter. L'erreur n'est pas de changer, l'erreur est d'hésiter trop longtemps.",
        keyTakeaway:
          "Un framework de décision simple réduit le stress et améliore la constance.",
        exercise: {
          title: "Jeu des 3 options",
          description: "Prendre une décision rapide sur des contextes différents.",
          steps: [
            "Prépare 3 contextes: foule froide, foule stable, foule en pic.",
            "Pour chaque contexte, choisis en 10 secondes: garder/pousser/pivoter.",
            "Explique en une phrase ton choix puis exécute un enchaînement.",
          ],
          estimatedTime: "10 minutes",
        },
        tips: [
          "La mauvaise décision rapide vaut souvent mieux qu'aucune décision.",
          "Aie des 'morceaux outils' pour chaque scénario.",
          "Si tu doutes, stabilise avant de tenter un move risqué.",
        ],
      },
      {
        slideNumber: 3,
        title: "Gestion d'erreur en live",
        subtitle: "Rattraper sans panique et garder la piste",
        videoUrl: "https://www.youtube.com/embed/EIUd_xdBYGs",
        videoDescription: "Techniques de recovery lorsque la transition n'est pas parfaite.",
        content:
          "Même les pros ratent des transitions. La différence, c'est la récupération immédiate: simplifier, recentrer le groove, puis relancer.",
        keyTakeaway:
          "Tu n'es pas jugé sur l'erreur, mais sur la vitesse et la qualité de récupération.",
        exercise: {
          title: "Recovery drill",
          description: "Transformer une transition ratée en relance propre.",
          steps: [
            "Simule volontairement un décalage léger.",
            "Coupe la complexité: reviens à EQ simple et timing clair.",
            "Relance avec un morceau sûr en moins de 20 secondes.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Respiration courte avant action: 2 secondes gagnent un set.",
          "Ton morceau de secours doit être prêt et repéré.",
          "Simplifier n'est pas reculer: c'est performer.",
        ],
      },
    ],
  },
  {
    level: 8,
    title: "Construction de Set",
    description: "Designer un set de 45-60 minutes qui tient du début à la fin.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Architecture macro du set",
        subtitle: "Intro, montée, pic, respiration, sortie",
        videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
        videoDescription: "Construire une trajectoire d'énergie lisible pour la foule.",
        content:
          "Un bon set raconte une progression. Tu dois savoir où tu es à chaque instant: installation, montée, climax, respiration, fermeture.",
        keyTakeaway: "Un set réussi suit une trajectoire émotionnelle lisible.",
        exercise: {
          title: "Blueprint 45 minutes",
          description: "Écrire une structure complète avant de mixer.",
          steps: [
            "Définis 5 blocs d'énergie avec durée cible.",
            "Attribue 2-3 morceaux clés par bloc.",
            "Prépare une alternative par bloc si la foule change.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Écris ton plan, puis accepte de le modifier en live.",
          "Les transitions entre blocs valent plus que les blocs eux-mêmes.",
          "Prévois un atterrissage propre en fin de set.",
        ],
      },
      {
        slideNumber: 2,
        title: "Micro-structure: phrases et points de bascule",
        subtitle: "Sécuriser les passages critiques entre morceaux",
        videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
        videoDescription: "Passer d'un plan global aux décisions de transition concrètes.",
        content:
          "Chaque bloc dépend de transitions charnières. Identifie les 4 transitions les plus critiques de ton set et prépare-les comme des scènes.",
        keyTakeaway:
          "Un set solide n'est pas une playlist: c'est une suite de transitions-clés maîtrisées.",
        exercise: {
          title: "4 transitions charnières",
          description: "Préparer les passages qui déterminent la qualité du set.",
          steps: [
            "Choisis 4 transitions à fort enjeu énergétique.",
            "Pour chaque transition: note point d'entrée, action EQ/FX, point de sortie.",
            "Répète ces 4 transitions en boucle.",
          ],
          estimatedTime: "11 minutes",
        },
        tips: [
          "Une transition charnière doit exister en version simple et version créative.",
          "Évite de changer trop de paramètres à la fois.",
          "La constance prime sur l'originalité forcée.",
        ],
      },
      {
        slideNumber: 3,
        title: "Préparer un set exportable cabine",
        subtitle: "Passer de l'entraînement maison au contexte club",
        videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
        videoDescription: "Organisation pratique de playlists, clés USB et plans de secours.",
        content:
          "En club, tu dois être prêt techniquement: exports, backups, versions radio/extended, et plan B en cas de matériel différent.",
        keyTakeaway:
          "Le professionnalisme se voit avant le premier morceau: préparation technique irréprochable.",
        exercise: {
          title: "Checklist pré-cabine",
          description: "Valider ton set comme si tu jouais demain soir.",
          steps: [
            "Prépare une clé principale et une clé backup.",
            "Vérifie l'analyse BPM/grille des morceaux critiques.",
            "Crée un dossier 'urgence' de 10 morceaux sûrs.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Teste ta clé sur un autre poste quand possible.",
          "Nomme clairement tes playlists par énergie.",
          "Préparer le pire te permet de performer au mieux.",
        ],
      },
    ],
  },
  {
    level: 9,
    title: "Performance Club",
    description: "Exécuter un set fiable sous pression réelle de cabine.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "35 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Routine mentale pré-live",
        subtitle: "Rester stable quand l'adrénaline monte",
        videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
        videoDescription: "Habitudes de préparation pour exécuter proprement en public.",
        content:
          "Le stress n'est pas un bug: c'est un signal. Tu dois ritualiser ton entrée en set pour conserver lucidité, écoute et timing.",
        keyTakeaway:
          "Une routine mentale courte évite les décisions impulsives en cabine.",
        exercise: {
          title: "Routine 5 minutes",
          description: "Installer ton état de performance avant d'appuyer sur Play.",
          steps: [
            "Respiration contrôlée 60 secondes.",
            "Check technique: gains, casque, monitor, piste d'ouverture.",
            "Visualise tes 2 premières transitions.",
          ],
          estimatedTime: "6 minutes",
        },
        tips: [
          "Ton intro doit être la transition la plus sûre de ton set.",
          "Prépare un script mental en cas d'imprévu.",
          "Confort = performance: position, écoute, ergonomie.",
        ],
      },
      {
        slideNumber: 2,
        title: "Gestion du système son",
        subtitle: "Adapter ton mix selon la salle et le retour cabine",
        videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
        videoDescription: "Ajuster son comportement selon acoustique et monitoring.",
        content:
          "La même transition sonne différemment selon la salle. Tu dois calibrer tes décisions avec le retour cabine, pas seulement avec le casque.",
        keyTakeaway:
          "Le DJ pro adapte son mix au système réel, pas à sa seule habitude studio.",
        exercise: {
          title: "Calibration en 3 morceaux",
          description: "Ajuster ton style selon la réponse du système.",
          steps: [
            "Morceau 1: observer basses et clarté globale.",
            "Morceau 2: tester une transition simple et écouter la façade.",
            "Morceau 3: corriger EQ/gain en fonction du rendu réel.",
          ],
          estimatedTime: "9 minutes",
        },
        tips: [
          "Si la salle est boomy, simplifie d'abord les basses.",
          "Garde de la marge de headroom.",
          "N'augmente jamais le volume pour corriger un problème de clarté.",
        ],
      },
      {
        slideNumber: 3,
        title: "Gestion d'incidents",
        subtitle: "Quand un morceau plante, un cable bouge, ou la foule décroche",
        videoUrl: "https://www.youtube.com/embed/EIUd_xdBYGs",
        videoDescription: "Réagir vite sans casser l'expérience de la piste.",
        content:
          "Le niveau club, c'est la continuité. Tu dois garder le set vivant même si une piste rate, un export bug, ou une décision tarde.",
        keyTakeaway:
          "La robustesse opérationnelle distingue un DJ performant d'un DJ fragile.",
        exercise: {
          title: "Drill incident",
          description: "Simuler 3 imprévus et garder la piste active.",
          steps: [
            "Incident 1: piste mal analysée -> correction express.",
            "Incident 2: transition ratée -> morceau secours immédiat.",
            "Incident 3: énergie qui chute -> relance en 2 titres max.",
          ],
          estimatedTime: "12 minutes",
        },
        tips: [
          "Aie toujours un dossier de titres anti-panique.",
          "Raccourcis le raisonnement: diagnostiquer -> agir -> stabiliser.",
          "Le calme est audible dans ton mix.",
        ],
      },
    ],
  },
  {
    level: 10,
    title: "Maîtrise Complète",
    description: "Passer de bon DJ à DJ identifiable, fiable et bookable.",
    userLevels: ["beginner", "intermediate", "advanced"],
    totalSlides: 3,
    estimatedDuration: "40 minutes",
    slides: [
      {
        slideNumber: 1,
        title: "Construire une identité artistique",
        subtitle: "Ton son, ton énergie, ton positionnement",
        videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
        videoDescription: "Transformer les compétences techniques en identité reconnaissable.",
        content:
          "À ce stade, ton objectif n'est plus seulement de mixer propre. Tu dois être reconnaissable: sélection, transitions, gestion d'énergie et posture.",
        keyTakeaway:
          "La maîtrise, c'est la cohérence répétée: tu peux livrer ton niveau chaque semaine.",
        exercise: {
          title: "Set signature 20 minutes",
          description: "Créer un mini-format qui raconte qui tu es.",
          steps: [
            "Choisis 6 à 8 morceaux reflétant ton univers.",
            "Écris l'intention de chaque transition en une ligne.",
            "Enregistre le set et note 3 éléments distinctifs.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Ta sélection musicale parle avant tes effets.",
          "Évite de copier un set entier d'un autre DJ.",
          "Constance de qualité > démonstration ponctuelle.",
        ],
      },
      {
        slideNumber: 2,
        title: "Capstone: set club 45 minutes",
        subtitle: "Validation finale du parcours Mixy",
        videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
        videoDescription: "Mettre en pratique toutes les compétences dans un set complet.",
        content:
          "Ton capstone valide la progression complète: structure, transitions, lecture de foule simulée, gestion d'imprévus et maîtrise technique.",
        keyTakeaway:
          "Si tu peux exécuter ce set proprement, tu as un niveau opérationnel solide.",
        exercise: {
          title: "Projet final Mixy",
          description: "Concevoir, jouer et évaluer un set complet.",
          steps: [
            "Prépare un set 45 min avec plan A + plan B.",
            "Exécute le set en une prise, sans pause.",
            "Auto-évalue: transitions, énergie, erreurs et recovery.",
            "Rejoue le set en corrigeant les 3 faiblesses majeures.",
          ],
          estimatedTime: "20 minutes",
        },
        tips: [
          "Le but n'est pas zéro erreur, mais zéro panique.",
          "Ton set doit rester lisible de bout en bout.",
          "Archive tes enregistrements pour mesurer ta progression réelle.",
        ],
      },
      {
        slideNumber: 3,
        title: "Après les 10 niveaux: roadmap pro",
        subtitle: "Continuer à progresser sans plateau",
        videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
        videoDescription: "Plan d'entraînement sur 8 semaines pour consolider le niveau pro.",
        content:
          "Finir le niveau 10 n'est pas la fin. Tu passes en cycle d'amélioration continue: sets réguliers, analyse d'enregistrements, objectifs mensuels, exposition en public.",
        keyTakeaway:
          "Un DJ pro continue à s'entraîner avec méthode bien après la formation.",
        exercise: {
          title: "Plan 8 semaines",
          description: "Construire une routine durable de progression.",
          steps: [
            "Fixe 2 sessions techniques + 1 session set complet par semaine.",
            "Définis un KPI: transitions propres, stabilité BPM, quality score.",
            "Publie 1 extrait/semaine et collecte des retours ciblés.",
          ],
          estimatedTime: "15 minutes",
        },
        tips: [
          "Mesure ce que tu veux améliorer, sinon tu stagnes.",
          "Crée un rituel de review après chaque set.",
          "La progression long terme se joue sur la discipline.",
        ],
      },
    ],
  },
];

export function getAllModules(
  track: CourseTrackId,
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
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

  if (skillTier === "beginner") {
    const level1 = track === "flx4" ? level1ModuleFlx4 : level1ModuleFlx3Xdj;
    return localizeModules([level1, ...courseModulesFromLevel2], language);
  }
  const accelTier = skillTier === "advanced" ? "advanced" : "intermediate";
  const accelerated = buildAcceleratedLevels123(track, accelTier);
  return withStageProgression(localizeModules([...accelerated, ...tailFromLevel4], language));
}

/** Défaut = parcours majoritaire FLX4 (communauté Instagram), utilisateur débutant. */
export const allModules = getAllModules("flx4", "beginner", "fr");

export function getModuleByLevel(
  level: number,
  track: CourseTrackId = "flx4",
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
): CourseModule | null {
  return getAllModules(track, skillTier, language).find((m) => m.level === level) ?? null;
}

export function getSlideFromModule(
  level: number,
  slideNumber: number,
  track: CourseTrackId = "flx4",
  skillTier: UserLevel = "beginner",
  language: Language = "fr",
): Slide | null {
  const module = getModuleByLevel(level, track, skillTier, language);
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
  // Validated from oEmbed metadata (English titles/channels)
  H31hjTx3bXY: "en",
  "25JAaIdJwnM": "en",
  IVMFK0iNqQE: "en",
  EIUd_xdBYGs: "en",
  fa3sLTn0Wek: "en",
  // Validated from oEmbed metadata (French titles/channels)
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
