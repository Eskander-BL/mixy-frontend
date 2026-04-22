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
      unlockNext: "Subscribe to unlock the next level",
      price: "4.99€/month",
      features: [
        "Unlock all levels",
        "View quiz scores",
        "Access premium content",
        "Personalized learning path",
      ],
      subscribe: "Subscribe Now",
      paymentMethod: "Secure payment with Stripe",
      alreadySubscribed: "You're already subscribed!",
      nextLevel: "Go to Next Level",
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
      unlockNext: "Abonnez-vous pour débloquer le niveau suivant",
      price: "4,99€/mois",
      features: [
        "Débloquez tous les niveaux",
        "Consultez les scores du quiz",
        "Accédez au contenu premium",
        "Parcours d'apprentissage personnalisé",
      ],
      subscribe: "S'abonner Maintenant",
      paymentMethod: "Paiement sécurisé avec Stripe",
      alreadySubscribed: "Vous êtes déjà abonné!",
      nextLevel: "Aller au Niveau Suivant",
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
