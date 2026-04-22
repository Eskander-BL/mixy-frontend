import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function PaywallPageStripe() {
  const [, params] = useRoute("/paywall/:level");
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
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

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
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

        <Button
          onClick={handlePayment}
          disabled={loading || !userId}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3 py-3 text-base font-semibold disabled:opacity-70"
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
      </Card>
    </div>
  );
}
