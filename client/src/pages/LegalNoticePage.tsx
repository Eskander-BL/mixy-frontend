import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanguageContext } from "@/contexts/LanguageContext";

/**
 * CGU / mentions — texte type à personnaliser (raison sociale, SIREN, contact juridique) avant pub forte.
 */
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

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {isFr ? "Mentions légales, CGU et confidentialité" : "Legal notice, Terms and privacy"}
        </h1>
        <p className="text-sm text-amber-900/90 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-8">
          {isFr ? (
            <>
              <strong>À compléter avant campagne pub :</strong> insère ici ta dénomination sociale, adresse du
              siège, SIREN/SIRET, TVA intracommunautaire si applicable, et un e-mail de contact juridique
              (privacy@… / legal@…).
            </>
          ) : (
            <>
              <strong>Complete before running ads:</strong> insert your legal entity name, registered office
              address, registration identifiers, VAT number if applicable, and legal contact email
              (privacy@… / legal@…).
            </>
          )}
        </p>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "1. Éditeur du service" : "1. Service publisher"}
          </h2>
          <p>
            {isFr ? (
              <>
                Le site et l’application « Mixy » (formation DJ en ligne) sont édités par{" "}
                <strong>[raison sociale]</strong>, [forme juridique], dont le siège est situé [adresse],
                immatriculée au registre du commerce sous le numéro [SIREN] (ci-après « l’Éditeur »).
              </>
            ) : (
              <>
                The Mixy website and app (online DJ training) are published by <strong>[legal entity]</strong>,
                [legal form], with registered office at [address], registered under number [registration ID]
                (hereinafter the “Publisher”).
              </>
            )}
          </p>
          <p>
            {isFr ? "Contact : " : "Contact: "}
            <strong>{isFr ? "[e-mail et/ou formulaire]" : "[email and/or contact form]"}</strong>.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "2. Objet et accès au service" : "2. Purpose and access to the service"}
          </h2>
          <p>
            {isFr
              ? "Mixy propose des contenus pédagogiques (cours, quiz, outils d’apprentissage). L’accès au niveau 1 est proposé gratuitement ; l’accès aux niveaux suivants peut nécessiter un abonnement payant souscrit via notre prestataire de paiement (Stripe)."
              : "Mixy provides educational content (courses, quizzes, learning tools). Access to level 1 is free; access to subsequent levels may require a paid subscription processed by our payment provider (Stripe)."}
          </p>
          <p>
            {isFr
              ? "Tu t’engages à fournir des informations exactes lors de l’inscription et à ne pas partager tes identifiants avec des tiers."
              : "You agree to provide accurate information during registration and not to share your credentials with third parties."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "3. Abonnement, paiement et résiliation" : "3. Subscription, billing and cancellation"}
          </h2>
          <p>
            {isFr
              ? "Les prix et conditions figurent sur la page d’abonnement au moment du paiement. Le paiement est traité de manière sécurisée par Stripe. Tu peux gérer ta carte et tes factures via le portail client Stripe depuis ton tableau de bord lorsque cette option est activée."
              : "Prices and terms are displayed on the subscription page at checkout. Payments are securely processed by Stripe. You can manage your card and invoices through the Stripe customer portal from your dashboard when enabled."}
          </p>
          <p>
            {isFr ? (
              <>
                <strong>Résiliation (sans frais) :</strong> tu peux désactiver le renouvellement automatique à tout
                moment ; tu conserves l’accès au contenu inclus dans ta période de facturation en cours jusqu’à son
                terme. Aucun nouveau prélèvement n’est effectué après cette date pour la période suivante. Le
                remboursement de tout ou partie d’une période déjà entamée reste à la politique indiquée au moment de
                l’achat (sauf obligation légale contraire).
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
                en ligne). Conformément à <strong>l’article L221-28, 13° du Code de la consommation</strong>, le
                droit de rétractation de 14 jours ne s’applique pas dès lors que l’exécution du contrat a commencé
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
              ? "Au moment de la souscription, tu coches une case dédiée par laquelle tu reconnais que l’accès au contenu démarre immédiatement après le paiement et tu renonces expressément à ton droit de rétractation. Sans cet accord exprès, l’abonnement ne peut pas être activé."
              : "During subscription, you tick a dedicated checkbox acknowledging that access starts immediately after payment and that you expressly waive the withdrawal right. Without this explicit agreement, subscription cannot be activated."}
          </p>
          <p>
            {isFr ? (
              <>
                Tu peux à tout moment <strong>désactiver le renouvellement automatique</strong> depuis ton tableau de
                bord (rubrique « Abonnement ») : aucun nouveau prélèvement ne sera effectué et tu conserves l’accès
                jusqu’au terme de la période déjà payée.
              </>
            ) : (
              <>
                You may <strong>disable auto-renewal</strong> at any time from your dashboard (“Subscription” section):
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
            {isFr ? "5. Données personnelles (résumé)" : "5. Personal data (summary)"}
          </h2>
          <p>
            {isFr
              ? "Des données peuvent être collectées pour le fonctionnement du compte, la facturation et l’amélioration du service (hébergeur, outils d’analytics si activés). Les traitements sont décrits plus en détail dans une politique de confidentialité dédiée [à publier / lien] et, le cas échéant, dans les mentions de sous-traitants (Stripe, hébergeur)."
              : "Data may be collected for account operations, billing and service improvement (hosting provider, analytics tools if enabled). Processing details are described in a dedicated privacy policy [to publish / link] and, where relevant, processor disclosures (Stripe, hosting provider)."}
          </p>
          <p>
            {isFr ? "Conformément au RGPD, tu disposes d’un droit d’accès, de rectification, d’effacement et de limitation ; adresse ta demande à " : "In accordance with applicable privacy law, you may request access, correction, deletion or restriction; send your request to "}
            <strong>{isFr ? "[e-mail DPO ou contact]" : "[DPO/contact email]"}</strong>.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "6. Limitation de responsabilité" : "6. Limitation of liability"}
          </h2>
          <p>
            {isFr
              ? "L’Éditeur s’efforce d’assurer la disponibilité du service mais ne garantit pas une absence totale d’interruption. Les contenus sont fournis à titre éducatif ; la pratique du DJing et l’usage du matériel audio relèvent de ta responsabilité (niveau sonore, équipement, respect des droits d’auteur sur les morceaux utilisés)."
              : "The Publisher strives to ensure service availability but cannot guarantee uninterrupted access. Content is provided for educational purposes; DJ practice and audio equipment usage remain your responsibility (sound levels, equipment safety, copyright compliance for tracks used)."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-12">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "7. Droit applicable et litiges" : "7. Governing law and disputes"}
          </h2>
          <p>
            {isFr
              ? "Les présentes conditions sont soumises au droit [français / autre]. En cas de litige, les parties rechercheront une solution amiable avant toute action. Compétence des tribunaux de [ville] sauf disposition impérative contraire pour les consommateurs."
              : "These terms are governed by [French / other] law. In case of dispute, parties will first seek an amicable resolution before legal action. Courts of [city] have jurisdiction unless mandatory consumer protections provide otherwise."}
          </p>
        </section>

        <p className="text-xs text-gray-500">
          {isFr
            ? "Dernière mise à jour : 6 mai 2026 — document cadre ; faire valider par un conseil avant mise en pub payante importante."
            : "Last updated: May 6, 2026 — template document; have it validated by legal counsel before major paid campaigns."}
        </p>
      </div>
    </main>
  );
}
