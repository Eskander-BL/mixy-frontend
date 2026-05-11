import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function LegalNoticePage() {
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  useDocumentTitle(isFr ? "Mentions légales & CGU" : "Legal notice & Terms");

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">{isFr ? "← Retour" : "← Back"}</Link>
          </Button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {isFr ? "Mentions légales, CGU et confidentialité" : "Legal notice, Terms and privacy"}
        </h1>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "1. Éditeur du service" : "1. Service publisher"}
          </h2>
          <p>
            {isFr ? (
              <>
                Le site et l&apos;application &laquo;&nbsp;Mixy&nbsp;&raquo; (formation DJ en ligne) sont édités par{" "}
                <strong>Mixyia</strong>, Entrepreneur individuel (micro-entrepreneur), SIRET&nbsp;:{" "}
                <strong>994 760 007 00025</strong> (ci-après &laquo;&nbsp;l&apos;Éditeur&nbsp;&raquo;).
              </>
            ) : (
              <>
                The Mixy website and app (online DJ training) are published by{" "}
                <strong>Mixyia</strong>, sole proprietorship (micro-entrepreneur, France), SIRET:{" "}
                <strong>994 760 007 00025</strong> (hereinafter the &ldquo;Publisher&rdquo;).
              </>
            )}
          </p>
          <p>
            {isFr ? "Contact\u00a0: " : "Contact: "}
            <strong>contact@mixyia.com</strong>
          </p>
          <p>
            {isFr ? (
              <>
                <strong>Hébergement&nbsp;:</strong> Frontend&nbsp;: Vercel Inc. (San Francisco, USA).
                Backend&nbsp;: Railway Corp. (San Francisco, USA).
                Base de données&nbsp;: Neon Inc. (serveur Frankfurt, Allemagne &mdash; conforme RGPD).
              </>
            ) : (
              <>
                <strong>Hosting:</strong> Frontend: Vercel Inc. (San Francisco, USA).
                Backend: Railway Corp. (San Francisco, USA).
                Database: Neon Inc. (Frankfurt server, Germany &mdash; GDPR compliant).
              </>
            )}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "2. Objet et accès au service" : "2. Purpose and access to the service"}
          </h2>
          <p>
            {isFr
              ? "Mixy propose des contenus pédagogiques (cours, quiz, outils d\u2019apprentissage). L\u2019accès au niveau\u00a01 est proposé gratuitement\u00a0; l\u2019accès aux niveaux suivants peut nécessiter un abonnement payant souscrit via notre prestataire de paiement (Stripe)."
              : "Mixy provides educational content (courses, quizzes, learning tools). Access to level\u00a01 is free; access to subsequent levels may require a paid subscription processed by our payment provider (Stripe)."}
          </p>
          <p>
            {isFr
              ? "Tu t\u2019engages à fournir des informations exactes lors de l\u2019inscription et à ne pas partager tes identifiants avec des tiers."
              : "You agree to provide accurate information during registration and not to share your credentials with third parties."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "3. Abonnement, paiement et résiliation" : "3. Subscription, billing and cancellation"}
          </h2>
          <p>
            {isFr
              ? "Les prix et conditions figurent sur la page d\u2019abonnement au moment du paiement. Le paiement est traité de manière sécurisée par Stripe. Tu peux gérer ta carte et tes factures via le portail client Stripe depuis ton tableau de bord lorsque cette option est activée."
              : "Prices and terms are displayed on the subscription page at checkout. Payments are securely processed by Stripe. You can manage your card and invoices through the Stripe customer portal from your dashboard when enabled."}
          </p>
          <p>
            {isFr ? (
              <>
                <strong>Résiliation (sans frais)&nbsp;:</strong> tu peux désactiver le renouvellement automatique à tout
                moment&nbsp;; tu conserves l&apos;accès au contenu inclus dans ta période de facturation en cours jusqu&apos;à son
                terme. Aucun nouveau prélèvement n&apos;est effectué après cette date pour la période suivante. Le
                remboursement de tout ou partie d&apos;une période déjà entamée reste à la politique indiquée au moment de
                l&apos;achat (sauf obligation légale contraire).
              </>
            ) : (
              <>
                <strong>Cancellation (no fee):</strong> you may disable auto-renewal at any time; you keep access to
                content included in your current billing period until it ends. No new charge is made for the following
                period after that date. Refunds for an already started period remain subject to the policy shown at
                purchase time (unless mandatory law states otherwise).
              </>
            )}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr
              ? "3 bis. Droit de rétractation et exécution immédiate du contrat"
              : "3b. Withdrawal right and immediate contract execution"}
          </h2>
          <p>
            {isFr ? (
              <>
                Mixy fournit un contenu numérique non livré sur support matériel (cours, quiz et outils pédagogiques
                en ligne). Conformément à <strong>l&apos;article L221-28, 13° du Code de la consommation</strong>, le
                droit de rétractation de 14&nbsp;jours ne s&apos;applique pas dès lors que l&apos;exécution du contrat a commencé
                après ton accord exprès et ta renonciation expresse à ce droit.
              </>
            ) : (
              <>
                Mixy provides digital content not delivered on a tangible medium (online courses, quizzes and learning
                tools). Under applicable consumer law, the 14-day withdrawal right may not apply once contract
                performance has started after your explicit consent and explicit waiver.
              </>
            )}
          </p>
          <p>
            {isFr
              ? "Au moment de la souscription, tu coches une case dédiée par laquelle tu reconnais que l\u2019accès au contenu démarre immédiatement après le paiement et tu renonces expressément à ton droit de rétractation. Sans cet accord exprès, l\u2019abonnement ne peut pas être activé."
              : "During subscription, you tick a dedicated checkbox acknowledging that access starts immediately after payment and that you expressly waive the withdrawal right. Without this explicit agreement, subscription cannot be activated."}
          </p>
          <p>
            {isFr ? (
              <>
                Tu peux à tout moment <strong>désactiver le renouvellement automatique</strong> depuis ton tableau de
                bord (rubrique &laquo;&nbsp;Abonnement&nbsp;&raquo;)&nbsp;: aucun nouveau prélèvement ne sera effectué et tu conserves l&apos;accès
                jusqu&apos;au terme de la période déjà payée.
              </>
            ) : (
              <>
                You may <strong>disable auto-renewal</strong> at any time from your dashboard (&ldquo;Subscription&rdquo; section):
                no further charge is made and access remains until the end of the already-paid period.
              </>
            )}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "4. Propriété intellectuelle" : "4. Intellectual property"}
          </h2>
          <p>
            {isFr
              ? "Les contenus Mixy (textes, visuels, structure, marque) sont protégés. Toute reproduction ou diffusion non autorisée est interdite. Les contenus tiers (ex. tutoriels, marques matériel) restent la propriété de leurs titulaires."
              : "Mixy content (text, visuals, structure, brand) is protected. Any unauthorized reproduction or distribution is prohibited. Third-party content (e.g., tutorials, hardware brands) remains the property of its respective owners."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "5. Données personnelles" : "5. Personal data"}
          </h2>
          <p>
            {isFr
              ? "Des données peuvent être collectées pour le fonctionnement du compte, la facturation et l\u2019amélioration du service. Les sous-traitants impliqués sont\u00a0: Stripe (paiement), Vercel (hébergement frontend), Railway (hébergement backend) et Neon (base de données, serveur Frankfurt, Allemagne)."
              : "Data may be collected for account operations, billing and service improvement. Sub-processors involved are: Stripe (payments), Vercel (frontend hosting), Railway (backend hosting) and Neon (database, Frankfurt server, Germany)."}
          </p>
          <p>
            {isFr
              ? "Conformément au RGPD, tu disposes d\u2019un droit d\u2019accès, de rectification, d\u2019effacement et de limitation. Adresse ta demande à\u00a0: "
              : "In accordance with the GDPR, you may request access, correction, deletion or restriction. Send your request to: "}
            <strong>contact@mixyia.com</strong>
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "6. Limitation de responsabilité" : "6. Limitation of liability"}
          </h2>
          <p>
            {isFr
              ? "L\u2019Éditeur s\u2019efforce d\u2019assurer la disponibilité du service mais ne garantit pas une absence totale d\u2019interruption. Les contenus sont fournis à titre éducatif\u00a0; la pratique du DJing et l\u2019usage du matériel audio relèvent de ta responsabilité (niveau sonore, équipement, respect des droits d\u2019auteur sur les morceaux utilisés)."
              : "The Publisher strives to ensure service availability but cannot guarantee uninterrupted access. Content is provided for educational purposes; DJ practice and audio equipment usage remain your responsibility (sound levels, equipment safety, copyright compliance for tracks used)."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-12">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "7. Droit applicable et litiges" : "7. Governing law and disputes"}
          </h2>
          <p>
            {isFr
              ? "Les présentes conditions sont soumises au droit français. En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège de l\u2019Éditeur, sauf disposition impérative contraire pour les consommateurs."
              : "These terms are governed by French law. In case of dispute, parties will first seek an amicable resolution before legal action. Failing that, jurisdiction lies with the courts of the Publisher\u2019s registered location, unless mandatory consumer protections provide otherwise."}
          </p>
        </section>

        <p className="text-xs text-gray-500">
          {isFr
            ? "Dernière mise à jour\u00a0: 11 mai 2026."
            : "Last updated: May 11, 2026."}
        </p>
      </div>
    </main>
  );
}
