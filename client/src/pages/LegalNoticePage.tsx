import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * CGU / mentions — texte type à personnaliser (raison sociale, SIREN, contact juridique) avant pub forte.
 */
export default function LegalNoticePage() {
  useDocumentTitle("Mentions légales & CGU");

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">← Retour</Link>
          </Button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Mentions légales, CGU et confidentialité
        </h1>
        <p className="text-sm text-amber-900/90 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-8">
          <strong>À compléter avant campagne pub :</strong> insère ici ta dénomination sociale, adresse du siège,
          SIREN/SIRET, TVA intracommunautaire si applicable, et un e-mail de contact juridique
          (privacy@… / legal@…).
        </p>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">1. Éditeur du service</h2>
          <p>
            Le site et l’application « Mixy » (formation DJ en ligne) sont édités par{" "}
            <strong>[raison sociale]</strong>, [forme juridique], dont le siège est situé [adresse],
            immatriculée au registre du commerce sous le numéro [SIREN] (ci-après « l’Éditeur »).
          </p>
          <p>
            Contact : <strong>[e-mail et/ou formulaire]</strong>.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">2. Objet et accès au service</h2>
          <p>
            Mixy propose des contenus pédagogiques (cours, quiz, outils d’apprentissage). L’accès au niveau 1 est
            proposé gratuitement ; l’accès aux niveaux suivants peut nécessiter un abonnement payant souscrit via
            notre prestataire de paiement (Stripe).
          </p>
          <p>
            Tu t’engages à fournir des informations exactes lors de l’inscription et à ne pas partager tes
            identifiants avec des tiers.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">3. Abonnement, paiement et résiliation</h2>
          <p>
            Les prix et conditions figurent sur la page d’abonnement au moment du paiement. Le paiement est traité de
            manière sécurisée par Stripe. Tu peux gérer ta carte et tes factures via le portail client Stripe depuis
            ton tableau de bord lorsque cette option est activée.
          </p>
          <p>
            <strong>Résiliation (sans frais) :</strong> tu peux désactiver le renouvellement automatique à tout
            moment ; tu conserves l’accès au contenu inclus dans ta période de facturation en cours jusqu’à son
            terme. Aucun nouveau prélèvement n’est effectué après cette date pour la période suivante. Le remboursement
            de tout ou partie d’une période déjà entamée reste à la politique indiquée au moment de l’achat (sauf
            obligation légale contraire).
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            3 bis. Droit de rétractation et exécution immédiate du contrat
          </h2>
          <p>
            Mixy fournit un contenu numérique non livré sur support matériel (cours, quiz et outils
            pédagogiques en ligne). Conformément à <strong>l’article L221-28, 13° du Code de la
            consommation</strong>, le droit de rétractation de 14 jours ne s’applique pas dès lors que
            l’exécution du contrat a commencé après ton accord exprès et ta renonciation expresse à
            ce droit.
          </p>
          <p>
            Au moment de la souscription, tu coches une case dédiée par laquelle tu reconnais que
            l’accès au contenu démarre immédiatement après le paiement et tu renonces expressément
            à ton droit de rétractation. Sans cet accord exprès, l’abonnement ne peut pas être
            activé.
          </p>
          <p>
            Tu peux à tout moment <strong>désactiver le renouvellement automatique</strong> depuis
            ton tableau de bord (rubrique « Abonnement ») : aucun nouveau prélèvement ne sera
            effectué et tu conserves l’accès jusqu’au terme de la période déjà payée.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">4. Propriété intellectuelle</h2>
          <p>
            Les contenus Mixy (textes, visuels, structure, marque) sont protégés. Toute reproduction ou diffusion non
            autorisée est interdite. Les contenus tiers (ex. tutoriels, marques matériel) restent la propriété de
            leurs titulaires.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">5. Données personnelles (résumé)</h2>
          <p>
            Des données peuvent être collectées pour le fonctionnement du compte, la facturation et l’amélioration du
            service (hébergeur, outils d’analytics si activés). Les traitements sont décrits plus en détail dans une
            politique de confidentialité dédiée {"[à publier / lien]"} et, le cas échéant, dans les mentions de
            sous-traitants (Stripe, hébergeur).
          </p>
          <p>
            Conformément au RGPD, tu disposes d’un droit d’accès, de rectification, d’effacement et de limitation ;
            adresse ta demande à <strong>[e-mail DPO ou contact]</strong>.
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">6. Limitation de responsabilité</h2>
          <p>
            L’Éditeur s’efforce d’assurer la disponibilité du service mais ne garantit pas une absence totale
            d’interruption. Les contenus sont fournis à titre éducatif ; la pratique du DJing et l’usage du matériel
            audio relèvent de ta responsabilité (niveau sonore, équipement, respect des droits d’auteur sur les
            morceaux utilisés).
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-12">
          <h2 className="text-lg font-semibold text-gray-900">7. Droit applicable et litiges</h2>
          <p>
            Les présentes conditions sont soumises au droit [français / autre]. En cas de litige, les parties
            rechercheront une solution amiable avant toute action. Compétence des tribunaux de [ville] sauf disposition
            impérative contraire pour les consommateurs.
          </p>
        </section>

        <p className="text-xs text-gray-500">
          Dernière mise à jour : 6 mai 2026 — document cadre ; faire valider par un conseil avant mise en pub
          payante importante.
        </p>
      </div>
    </main>
  );
}
