/**
 * i18n System - English/French translations
 * Default language: English
 */

export type Language = "en" | "fr";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      courses: "Courses",
      profile: "Profile",
    },
    
    // Home page
    home: {
      title: "DJ Academy",
      subtitle: "Learn to Mix Like a Pro",
      description: "Master DJing from basics to advanced techniques",
      cta: "Start Learning Now",
    },

    // Onboarding
    onboarding: {
      step1: {
        title: "Welcome to DJ Academy",
        subtitle: "Let's get started",
        label: "What's your name?",
        placeholder: "Enter your name",
        button: "Continue",
      },
      step2: {
        title: "What's your level?",
        subtitle: "Help us personalize your learning path",
        beginner: "Beginner - Just starting out",
        intermediate: "Intermediate - Some experience",
        advanced: "Advanced - Experienced DJ",
        button: "Next",
      },
      step3: {
        title: "What's your goal?",
        subtitle: "What do you want to achieve?",
        fun: "Just for fun",
        party: "Party DJ",
        club: "Club DJ",
        pro: "Professional DJ",
        button: "Next",
      },
      step4: {
        title: "What equipment do you have?",
        subtitle: "This helps us tailor the content",
        none: "No equipment yet",
        beginner: "Beginner setup",
        advanced: "Advanced setup",
        platines: "Professional turntables",
        button: "Next",
      },
      step5: {
        title: "What's your main challenge?",
        subtitle: "What would you like to improve?",
        transitions: "Smooth transitions",
        bpm: "BPM and syncing",
        structuration: "Set structure",
        unknown: "Not sure yet",
        button: "Start Learning",
      },
      summary: {
        title: "Your Learning Path",
        subtitle: "Here's what we prepared for you",
        start: "Start Level 1",
      },
    },

    // Dashboard
    dashboard: {
      title: "Your Progress",
      subtitle: "Continue your learning journey",
      level: "Level",
      locked: "Locked",
      completed: "Completed",
      inProgress: "In Progress",
      start: "Start",
      resume: "Resume",
      review: "Review",
    },

    // Course page
    course: {
      title: "Course",
      slide: "Slide",
      of: "of",
      next: "Next",
      previous: "Previous",
      startQuiz: "Start Quiz",
      exercise: "Exercise",
      summary: "Summary",
    },

    // Quiz page
    quiz: {
      title: "Quiz",
      question: "Question",
      of: "of",
      submit: "Submit Quiz",
      result: "Your Score",
      excellent: "Excellent! You're progressing really well",
      good: "Great work!",
      progress: "Good progress!",
      continue: "Keep going, you're on the right track",
      nextLevel: "Unlock Next Level",
      reviewCourse: "Review Course",
    },

    // Paywall
    paywall: {
      title: "Unlock Premium Content",
      subtitle: "Continue your learning journey",
      analyzing: "Analyzing your progress...",
      scoreHidden: "Your score is hidden until you subscribe",
      unlockNext: "Subscribe to unlock the full Mixy experience",
      price: "4.99€/month",
      features: [
        "Unlock all levels with a real progression roadmap",
        "Get personalized recap from previous level before each new chapter",
        "Learn with smarter video picks based on your current level",
        "Practice with DJ coach Mixy tips adapted to your setup",
        "Track quiz scores and your progression over time",
      ],
      subscribe: "Subscribe Now",
      paymentMethod: "Secure payment with Stripe",
      cancelAnytime:
        "Cancel anytime: we stop renewals only — you keep full access until the end of your paid month. No extra cancellation fee.",
      legalBeforeSubscribe: "By paying, you accept the ",
      legalLinkLabel: "terms and legal notice",
      alreadySubscribed: "You're already subscribed!",
      nextLevel: "Go to Next Level",
    },

    subscription: {
      title: "Your subscription",
      activeUntil: "Access until {{date}}",
      managePayment: "Card & invoices",
      managePaymentHint: "Open Stripe’s secure billing portal to update your card or download receipts.",
      cancelRenewal: "Turn off auto-renewal",
      cancelRenewalHint:
        "Your next charge is cancelled. You keep full access until the end of the period you already paid for.",
      cancelScheduled: "Auto-renewal is already off — access until {{date}}.",
      cancelConfirmTitle: "Turn off auto-renewal?",
      cancelConfirmDescription:
        "No cancellation fee. You keep premium access until the end of your current billing period. After that, no more charges and paid content locks.",
      confirmCancel: "Confirm",
      cancelDialogBack: "Back",
      cancelSuccess: "Done — no charge after {{date}}. You still have access until then.",
      portalError: "Could not open Stripe portal. Enable Customer portal in your Stripe Dashboard.",
      cancelError: "Could not update subscription. Retry or use the billing portal.",
    },

    // Buttons
    buttons: {
      login: "Login",
      logout: "Logout",
      signup: "Sign Up",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      back: "Back",
      close: "Close",
    },

    // Messages
    messages: {
      loading: "Loading...",
      error: "Something went wrong",
      success: "Success!",
      welcome: "Welcome!",
      goodbye: "See you soon!",
    },

    // Language
    language: {
      english: "English",
      french: "Français",
      selectLanguage: "Select Language",
    },
  },

  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      dashboard: "Tableau de bord",
      courses: "Cours",
      profile: "Profil",
    },

    // Home page
    home: {
      title: "DJ Academy",
      subtitle: "Apprenez à Mixer Comme un Pro",
      description: "Maîtrisez le DJing des bases aux techniques avancées",
      cta: "Commencer à Apprendre",
    },

    // Onboarding
    onboarding: {
      step1: {
        title: "Bienvenue à DJ Academy",
        subtitle: "Commençons",
        label: "Quel est votre nom?",
        placeholder: "Entrez votre nom",
        button: "Continuer",
      },
      step2: {
        title: "Quel est votre niveau?",
        subtitle: "Aidez-nous à personnaliser votre parcours d'apprentissage",
        beginner: "Débutant - Juste commencer",
        intermediate: "Intermédiaire - Quelque expérience",
        advanced: "Avancé - DJ expérimenté",
        button: "Suivant",
      },
      step3: {
        title: "Quel est votre objectif?",
        subtitle: "Qu'est-ce que vous voulez réaliser?",
        fun: "Juste pour le plaisir",
        party: "DJ de fête",
        club: "DJ de club",
        pro: "DJ professionnel",
        button: "Suivant",
      },
      step4: {
        title: "Quel équipement avez-vous?",
        subtitle: "Cela nous aide à adapter le contenu",
        none: "Pas d'équipement encore",
        beginner: "Configuration débutant",
        advanced: "Configuration avancée",
        platines: "Platines professionnelles",
        button: "Suivant",
      },
      step5: {
        title: "Quel est votre principal défi?",
        subtitle: "Qu'aimeriez-vous améliorer?",
        transitions: "Transitions fluides",
        bpm: "BPM et synchronisation",
        structuration: "Structure du set",
        unknown: "Pas sûr encore",
        button: "Commencer à Apprendre",
      },
      summary: {
        title: "Votre Parcours d'Apprentissage",
        subtitle: "Voici ce que nous avons préparé pour vous",
        start: "Commencer le Niveau 1",
      },
    },

    // Dashboard
    dashboard: {
      title: "Votre Progression",
      subtitle: "Continuez votre parcours d'apprentissage",
      level: "Niveau",
      locked: "Verrouillé",
      completed: "Complété",
      inProgress: "En cours",
      start: "Commencer",
      resume: "Reprendre",
      review: "Revoir",
    },

    // Course page
    course: {
      title: "Cours",
      slide: "Diapositive",
      of: "sur",
      next: "Suivant",
      previous: "Précédent",
      startQuiz: "Commencer le Quiz",
      exercise: "Exercice",
      summary: "Résumé",
    },

    // Quiz page
    quiz: {
      title: "Quiz",
      question: "Question",
      of: "sur",
      submit: "Soumettre le Quiz",
      result: "Votre Score",
      excellent: "Excellent! Vous progressez vraiment bien",
      good: "Bon travail!",
      progress: "Bonne progression!",
      continue: "Continue, tu es sur la bonne voie",
      nextLevel: "Débloquer le Niveau Suivant",
      reviewCourse: "Revoir le Cours",
    },

    // Paywall
    paywall: {
      title: "Débloquer le Contenu Premium",
      subtitle: "Continuez votre parcours d'apprentissage",
      analyzing: "Analyse de votre progression...",
      scoreHidden: "Votre score est caché jusqu'à votre abonnement",
      unlockNext: "Abonne-toi pour débloquer toute l'expérience Mixy",
      price: "4,99€/mois",
      features: [
        "Débloque tous les niveaux avec une vraie progression guidée",
        "Récap personnalisé du niveau précédent avant chaque nouveau chapitre",
        "Vidéos plus intelligentes choisies selon ton niveau actuel",
        "Conseils du prof Mixy adaptés à ton setup DJ",
        "Suivi des scores de quiz et de ta progression dans le temps",
      ],
      subscribe: "S'abonner Maintenant",
      paymentMethod: "Paiement sécurisé avec Stripe",
      cancelAnytime:
        "Annulation à tout moment : on arrête seulement les renouvellements — tu gardes l’accès jusqu’à la fin du mois déjà payé, sans frais d’annulation.",
      legalBeforeSubscribe: "En payant, tu acceptes les ",
      legalLinkLabel: "CGU et mentions légales",
      alreadySubscribed: "Vous êtes déjà abonné!",
      nextLevel: "Aller au Niveau Suivant",
    },

    subscription: {
      title: "Abonnement Mixy",
      activeUntil: "Accès jusqu’au {{date}}",
      managePayment: "Carte et factures",
      managePaymentHint:
        "Ouvre le portail sécurisé Stripe pour modifier ta carte ou télécharger une facture.",
      cancelRenewal: "Annuler le renouvellement",
      cancelRenewalHint:
        "Le prochain prélèvement est désactivé. Tu conserves l’accès jusqu’à la fin de la période déjà payée.",
      cancelScheduled: "Renouvellement déjà désactivé — accès jusqu’au {{date}}.",
      cancelConfirmTitle: "Désactiver le renouvellement ?",
      cancelConfirmDescription:
        "Aucun frais d’annulation. Tu gardes l’accès premium jusqu’à la fin de ta période actuelle ; après cette date, plus de prélèvement et le contenu payant se verrouille.",
      confirmCancel: "Confirmer",
      cancelDialogBack: "Retour",
      cancelSuccess: "C’est fait : plus de prélèvement après le {{date}}. Accès jusqu’à cette date.",
      portalError:
        "Impossible d’ouvrir le portail Stripe. Active le portail client dans le Dashboard Stripe.",
      cancelError: "Impossible de mettre à jour l’abonnement. Réessaie ou passe par le portail.",
    },

    // Buttons
    buttons: {
      login: "Connexion",
      logout: "Déconnexion",
      signup: "S'inscrire",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      back: "Retour",
      close: "Fermer",
    },

    // Messages
    messages: {
      loading: "Chargement...",
      error: "Quelque chose s'est mal passé",
      success: "Succès!",
      welcome: "Bienvenue!",
      goodbye: "À bientôt!",
    },

    // Language
    language: {
      english: "English",
      french: "Français",
      selectLanguage: "Sélectionner la Langue",
    },
  },
};

/**
 * Get translation for a key
 */
export function t(key: string, language: Language = "en"): string {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  // Fallback to English if translation not found
  if (!value && language !== "en") {
    return t(key, "en");
  }

  return value || key;
}

/**
 * Get all translations for a language
 */
export function getTranslations(language: Language) {
  return translations[language];
}

/**
 * Language context hook
 */
import { useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { language, changeLanguage, t: (key: string) => t(key, language) };
}
