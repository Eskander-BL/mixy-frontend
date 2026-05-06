import { useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function PaywallPageStripe() {
  const [, params] = useRoute("/paywall/:level");
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [consentImmediate, setConsentImmediate] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const { t } = useLanguageContext();

  const level = params?.level ? parseInt(params.level) : 1;
  const userId = parseInt(localStorage.getItem("userId") || "0");

  // Get subscription status
  const { data: subscriptionStatus, isLoading: isLoadingSubscription } =
    trpc.stripe.getSubscriptionStatus.useQuery({ userId });

  // Create checkout session mutation
  const createCheckoutMutation = trpc.stripe.createCheckoutSession.useMutation();

  const handlePayment = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    if (!consentImmediate) {
      setConsentError(t("paywall.consentImmediateRequired") as string);
      return;
    }
    setConsentError(null);

    setLoading(true);

    try {
      // Get current window location for redirect URLs
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/dashboard?payment=success&level=${level}`;
      const cancelUrl = `${baseUrl}/paywall/${level}?payment=cancelled`;

      // Create Stripe Checkout session
      const result = await createCheckoutMutation.mutateAsync({
        userId,
        level,
        successUrl,
        cancelUrl,
      });

      if (result.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = result.checkoutUrl;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setLoading(false);
    }
  };

  // Show loading state while fetching subscription status
  if (isLoadingSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/80 to-orange-50/50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 border-0 shadow-lg text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t("messages.loading")}</p>
        </Card>
      </div>
    );
  }

  // If already subscribed, show success message
  if (subscriptionStatus?.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 to-amber-50/40 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 border-0 shadow-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {t("paywall.alreadySubscribed")}
          </h1>
          <p className="text-gray-600 mb-6">
            {t("paywall.nextLevel")}
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {t("buttons.back")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 to-orange-50/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("paywall.title")}
          </h1>
          <p className="text-gray-600">
            {t("paywall.subtitle")}
          </p>
        </div>

        <div className="bg-primary/5 p-4 rounded-lg mb-6 border border-primary/10">
          <p className="text-sm text-gray-700 mb-3">
            <strong>✨ {t("paywall.unlockNext")}</strong>
          </p>
          <ul className="space-y-2">
            {(t("paywall.features") as unknown as string[]).map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Pricing</p>
            <p className="text-4xl font-bold text-gray-900">
              {t("paywall.price")}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Cancel anytime
            </p>
          </div>
        </div>

        <label className="flex items-start gap-2 mb-3 text-xs text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consentImmediate}
            onChange={(e) => {
              setConsentImmediate(e.target.checked);
              if (e.target.checked) setConsentError(null);
            }}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
            aria-describedby={consentError ? "consent-immediate-error" : undefined}
            aria-invalid={consentError ? "true" : undefined}
          />
          <span>{t("paywall.consentImmediateLabel")}</span>
        </label>
        {consentError && (
          <p
            id="consent-immediate-error"
            role="alert"
            className="text-xs text-rose-600 mb-3"
          >
            {consentError}
          </p>
        )}

        <Button
          onClick={handlePayment}
          disabled={loading || !userId}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3 py-3 text-base font-semibold disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("paywall.analyzing")}
            </span>
          ) : (
            t("paywall.subscribe")
          )}
        </Button>

        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="w-full"
          disabled={loading}
        >
          {t("buttons.back")}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          {t("paywall.paymentMethod")}
        </p>
        <p className="text-[11px] text-gray-500 text-center mt-1">
          {t("paywall.legalBeforeSubscribe")}
          <Link href="/legal" className="text-primary underline underline-offset-2">
            {t("paywall.legalLinkLabel")}
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}
