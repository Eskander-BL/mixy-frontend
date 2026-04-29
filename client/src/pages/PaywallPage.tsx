import { useLayoutEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { brand } from "@/assets/brand-assets";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { scrollAppMainToTop } from "@/lib/utils";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function PaywallPage() {
  const [, params] = useRoute("/paywall/:level");
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useLanguageContext();
  const createCheckoutSessionMutation = trpc.stripe.createCheckoutSession.useMutation();

  const level = params?.level ? parseInt(params.level) : 1;
  useDocumentTitle(`S'abonner — niveau ${level}`);

  useLayoutEffect(() => {
    scrollAppMainToTop();
  }, [level]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      const session = await createCheckoutSessionMutation.mutateAsync({
        userId: parseInt(userId),
        level: level,
        successUrl: window.location.origin + `/dashboard?payment=success&level=${level}`,
        cancelUrl: window.location.origin + `/paywall/${level}?payment=cancelled`,
      });

      if (session.checkoutUrl) {
        window.location.href = session.checkoutUrl;
      } else {
        console.error("Stripe checkout URL not returned.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      setLoading(false);
    }
  };

  if (showSuccess) {
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
          <div className="animate-spin">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-primary rounded-full mx-auto"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">{t("messages.loading")}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 to-orange-50/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex max-w-[240px] justify-center">
            <img
              src={brand.mixyUnlock}
              alt=""
              className="h-44 w-auto max-w-full object-contain object-center drop-shadow-sm"
              aria-hidden
            />
          </div>
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
              {t("paywall.cancelAnytime")}
            </p>
          </div>
        </div>

        <p className="text-xs text-center text-gray-600 mb-3">
          {t("paywall.legalBeforeSubscribe")}
          <Link href="/legal" className="text-primary font-medium underline underline-offset-2">
            {t("paywall.legalLinkLabel")}
          </Link>
          .
        </p>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-2 py-3 text-base font-semibold disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
