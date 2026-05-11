import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function LegalNoticePage() {
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  useDocumentTitle(isFr ? "Mentions l\u00e9gales & CGU" : "Legal notice & Terms");

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">{isFr ? "\u2190 Retour" : "\u2190 Back"}</Link>
          </Button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {isFr ? "Mentions l\u00e9gales, CGU et confidentialit\u00e9" : "Legal notice, Terms and privacy"}
        </h1>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "1. \u00c9diteur du service" : "1. Service publisher"}
          </h2>
          <p>
            {isFr ? (
              <>
                Le site et l&apos;application &laquo;&nbsp;Mixy&nbsp;&raquo; (formation DJ en ligne) sont \u00e9dit\u00e9s par{" "}
                <strong>Mixyia</strong>, Entrepreneur individuel (micro-entrepreneur), SIRET&nbsp;:{" "}
                <strong>994 760 007 00025</strong> (ci-apr\u00e8s &laquo;&nbsp;l&apos;\u00c9diteur&nbsp;&raquo;).
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
                <strong>H\u00e9bergement\u00a0:</strong> Frontend&nbsp;: Vercel Inc. (San Francisco, USA).
                Backend&nbsp;: Railway Corp. (San Francisco, USA).
                Base de donn\u00e9es&nbsp;: Neon Inc. (serveur Frankfurt, Allemagne &mdash; conforme RGPD).
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
            {isFr ? "2. Objet et acc\u00e8s au service" : "2. Purpose and access to the service"}
          </h2>
          <p>
            {isFr
              ? "Mixy propose des contenus p\u00e9dagogiques (cours, quiz, outils d\u2019apprentissage). L\u2019acc\u00e8s au niveau\u00a01 est propos\u00e9 gratuitement\u00a0; l\u2019acc\u00e8s aux niveaux suivants peut n\u00e9cessiter un abonnement payant souscrit via notre prestataire de paiement (Stripe)."
              : "Mixy provides educational content (courses, quizzes, learning tools). Access to level\u00a01 is free; access to subsequent levels may require a paid subscription processed by our payment provider (Stripe)."}
          </p>
          <p>
            {isFr
              ? "Tu t\u2019engages \u00e0 fournir des informations exactes lors de l\u2019inscription et \u00e0 ne pas partager tes identifiants avec des tiers."
              : "You agree to provide accurate information during registration and not to share your credentials with third parties."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "3. Abonnement, paiement et r\u00e9siliation" : "3. Subscription, billing and cancellation"}
          </h2>
          <p>
            {isFr
              ? "Les prix et conditions figurent sur la page d\u2019abonnement au moment du paiement. Le paiement est trait\u00e9 de mani\u00e8re s\u00e9curis\u00e9e par Stripe. Tu peux g\u00e9rer ta carte et tes factures via le portail client Stripe depuis ton tableau de bord lorsque cette option est activ\u00e9e."
              : "Prices and terms are displayed on the subscription page at checkout. Payments are securely processed by Stripe. You can manage your card and invoices through the Stripe customer portal from your dashboard when enabled."}
          </p>
          <p>
            {isFr ? (
              <>
                <strong>R\u00e9siliation (sans frais)\u00a0:</strong> tu peux d\u00e9sactiver le renouvellement automatique \u00e0 tout
                moment\u00a0; tu conserves l&apos;acc\u00e8s au contenu inclus dans ta p\u00e9riode de facturation en cours jusqu&apos;\u00e0 son
                terme. Aucun nouveau pr\u00e9l\u00e8vement n&apos;est effectu\u00e9 apr\u00e8s cette date pour la p\u00e9riode suivante. Le
                remboursement de tout ou partie d&apos;une p\u00e9riode d\u00e9j\u00e0 entam\u00e9e reste \u00e0 la politique indiqu\u00e9e au moment de
                l&apos;achat (sauf obligation l\u00e9gale contraire).
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
              ? "3 bis. Droit de r\u00e9tractation et ex\u00e9cution imm\u00e9diate du contrat"
              : "3b. Withdrawal right and immediate contract execution"}
          </h2>
          <p>
            {isFr ? (
              <>
                Mixy fournit un contenu num\u00e9rique non livr\u00e9 sur support mat\u00e9riel (cours, quiz et outils p\u00e9dagogiques
                en ligne). Conform\u00e9ment \u00e0 <strong>l&apos;article L221-28, 13\u00b0 du Code de la consommation</strong>, le
                droit de r\u00e9tractation de 14\u00a0jours ne s&apos;applique pas d\u00e8s lors que l&apos;ex\u00e9cution du contrat a commenc\u00e9
                apr\u00e8s ton accord expr\u00e8s et ta renonciation expresse \u00e0 ce droit.
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
              ? "Au moment de la souscription, tu coches une case d\u00e9di\u00e9e par laquelle tu reconnais que l\u2019acc\u00e8s au contenu d\u00e9marre imm\u00e9diatement apr\u00e8s le paiement et tu renonces express\u00e9ment \u00e0 ton droit de r\u00e9tractation. Sans cet accord expr\u00e8s, l\u2019abonnement ne peut pas \u00eatre activ\u00e9."
              : "During subscription, you tick a dedicated checkbox acknowledging that access starts immediately after payment and that you expressly waive the withdrawal right. Without this explicit agreement, subscription cannot be activated."}
          </p>
          <p>
            {isFr ? (
              <>
                Tu peux \u00e0 tout moment <strong>d\u00e9sactiver le renouvellement automatique</strong> depuis ton tableau de
                bord (rubrique &laquo;&nbsp;Abonnement&nbsp;&raquo;)\u00a0: aucun nouveau pr\u00e9l\u00e8vement ne sera effectu\u00e9 et tu conserves l&apos;acc\u00e8s
                jusqu&apos;au terme de la p\u00e9riode d\u00e9j\u00e0 pay\u00e9e.
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
            {isFr ? "4. Propri\u00e9t\u00e9 intellectuelle" : "4. Intellectual property"}
          </h2>
          <p>
            {isFr
              ? "Les contenus Mixy (textes, visuels, structure, marque) sont prot\u00e9g\u00e9s. Toute reproduction ou diffusion non autoris\u00e9e est interdite. Les contenus tiers (ex. tutoriels, marques mat\u00e9riel) restent la propri\u00e9t\u00e9 de leurs titulaires."
              : "Mixy content (text, visuals, structure, brand) is protected. Any unauthorized reproduction or distribution is prohibited. Third-party content (e.g., tutorials, hardware brands) remains the property of its respective owners."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "5. Donn\u00e9es personnelles" : "5. Personal data"}
          </h2>
          <p>
            {isFr
              ? "Des donn\u00e9es peuvent \u00eatre collect\u00e9es pour le fonctionnement du compte, la facturation et l\u2019am\u00e9lioration du service. Les sous-traitants impliqu\u00e9s sont\u00a0: Stripe (paiement), Vercel (h\u00e9bergement frontend), Railway (h\u00e9bergement backend) et Neon (base de donn\u00e9es, serveur Frankfurt, Allemagne)."
              : "Data may be collected for account operations, billing and service improvement. Sub-processors involved are: Stripe (payments), Vercel (frontend hosting), Railway (backend hosting) and Neon (database, Frankfurt server, Germany)."}
          </p>
          <p>
            {isFr
              ? "Conform\u00e9ment au RGPD, tu disposes d\u2019un droit d\u2019acc\u00e8s, de rectification, d\u2019effacement et de limitation. Adresse ta demande \u00e0\u00a0: "
              : "In accordance with the GDPR, you may request access, correction, deletion or restriction. Send your request to: "}
            <strong>contact@mixyia.com</strong>
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "6. Limitation de responsabilit\u00e9" : "6. Limitation of liability"}
          </h2>
          <p>
            {isFr
              ? "L\u2019\u00c9diteur s\u2019efforce d\u2019assurer la disponibilit\u00e9 du service mais ne garantit pas une absence totale d\u2019interruption. Les contenus sont fournis \u00e0 titre \u00e9ducatif\u00a0; la pratique du DJing et l\u2019usage du mat\u00e9riel audio rel\u00e8vent de ta responsabilit\u00e9 (niveau sonore, \u00e9quipement, respect des droits d\u2019auteur sur les morceaux utilis\u00e9s)."
              : "The Publisher strives to ensure service availability but cannot guarantee uninterrupted access. Content is provided for educational purposes; DJ practice and audio equipment usage remain your responsibility (sound levels, equipment safety, copyright compliance for tracks used)."}
          </p>
        </section>

        <section className="space-y-4 text-sm text-gray-800 leading-relaxed mb-12">
          <h2 className="text-lg font-semibold text-gray-900">
            {isFr ? "7. Droit applicable et litiges" : "7. Governing law and disputes"}
          </h2>
          <p>
            {isFr
              ? "Les pr\u00e9sentes conditions sont soumises au droit fran\u00e7ais. En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire. \u00c0 d\u00e9faut, les tribunaux comp\u00e9tents seront ceux du ressort du si\u00e8ge de l\u2019\u00c9diteur, sauf disposition imp\u00e9rative contraire pour les consommateurs."
              : "These terms are governed by French law. In case of dispute, parties will first seek an amicable resolution before legal action. Failing that, jurisdiction lies with the courts of the Publisher\u2019s registered location, unless mandatory consumer protections provide otherwise."}
          </p>
        </section>

        <p className="text-xs text-gray-500">
          {isFr
            ? "Derni\u00e8re mise \u00e0 jour\u00a0: 11 mai 2026."
            : "Last updated: May 11, 2026."}
        </p>
      </div>
    </main>
  );
}
