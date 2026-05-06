import { useState } from "react";
import { CreditCard, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function formatLocaleDate(iso: string, language: string) {
  return new Date(iso).toLocaleDateString(language === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
  });
}

function fillDate(template: string, iso: string, language: string) {
  return template.replace("{{date}}", formatLocaleDate(iso, language));
}

type Props = {
  userId: number;
  onChanged: () => void;
  cardClassName?: string;
};

export function SubscriptionManageCard({ userId, onChanged, cardClassName }: Props) {
  const { language, t } = useLanguageContext();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, isLoading, refetch } = trpc.stripe.getSubscriptionStatus.useQuery(
    { userId },
    { enabled: userId > 0 },
  );

  const portalMutation = trpc.stripe.createBillingPortalSession.useMutation({
    onSuccess: (res) => {
      window.location.href = res.url;
    },
    onError: (err) => {
      toast.error(err.message || t("subscription.portalError"));
    },
  });

  const cancelMutation = trpc.stripe.cancelSubscription.useMutation({
    onSuccess: (res) => {
      toast.success(fillDate(t("subscription.cancelSuccess"), res.accessUntil, language));
      setConfirmOpen(false);
      void refetch();
      onChanged();
    },
    onError: (err) => {
      toast.error(err.message || t("subscription.cancelError"));
    },
  });

  if (!data?.isActive) {
    return null;
  }

  const expiresAt = data.expiresAt;

  const openPortal = () => {
    const returnUrl = `${window.location.origin}/dashboard`;
    portalMutation.mutate({ userId, returnUrl });
  };

  return (
    <>
      <Card
        className={`p-4 md:p-5 border border-emerald-200/80 bg-gradient-to-r from-emerald-50/60 to-white rounded-xl shadow-sm ${
          cardClassName ?? ""
        }`}
      >
        <p className="text-sm font-semibold text-emerald-900 mb-1">{t("subscription.title")}</p>
        <p className="text-sm text-gray-700 mb-3">
          {expiresAt
            ? data.cancelAtPeriodEnd
              ? fillDate(t("subscription.cancelScheduled"), expiresAt, language)
              : fillDate(t("subscription.activeUntil"), expiresAt, language)
            : null}
        </p>
        <p className="text-xs text-gray-600 mb-3">
          {data.cancelAtPeriodEnd ? null : t("subscription.cancelRenewalHint")}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            disabled={portalMutation.isPending || isLoading}
            onClick={openPortal}
          >
            {portalMutation.isPending ? (
              <Loader2 className="size-4 animate-spin mr-1.5" />
            ) : (
              <CreditCard className="size-4 mr-1.5" />
            )}
            {t("subscription.managePayment")}
          </Button>
          {!data.cancelAtPeriodEnd ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 text-gray-700 border-gray-200 hover:bg-gray-50"
              disabled={cancelMutation.isPending || isLoading}
              onClick={() => setConfirmOpen(true)}
            >
              <XCircle className="size-4 mr-1.5" />
              {t("subscription.cancelRenewal")}
            </Button>
          ) : null}
        </div>
        <p className="text-xs text-gray-500 mt-2">{t("subscription.managePaymentHint")}</p>
      </Card>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("subscription.cancelConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("subscription.cancelConfirmDescription")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline">
                {t("subscription.cancelDialogBack")}
              </Button>
            </AlertDialogCancel>
            <Button
              type="button"
              className="bg-rose-600 text-white hover:bg-rose-600/90"
              disabled={cancelMutation.isPending}
              onClick={() => cancelMutation.mutate({ userId })}
            >
              {cancelMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                t("subscription.confirmCancel")
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
