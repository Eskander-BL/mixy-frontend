import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  onSuccess?: () => void;
  variant?: "prominent" | "compact";
};

/**
 * Après un paiement (ou abonnement actif en guest) : enregistre email + mdp sur le **même** userId (backend).
 */
export function CompleteAccountCard({ onSuccess, variant = "prominent" }: Props) {
  const isFr = (typeof window !== "undefined" ? localStorage.getItem("language") : "fr") !== "en";
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const registerMut = trpc.auth.completeGuestRegistration.useMutation({
    onSuccess: async (data) => {
      localStorage.removeItem("guestId");
      if (data.userId) {
        localStorage.setItem("userId", String(data.userId));
      }
      await utils.invalidate();
      toast.success(
        isFr
          ? "Compte créé — tu peux te reconnecter sur un autre appareil avec ton email."
          : "Account created — you can now sign in on another device with your email.",
      );
      onSuccess?.();
    },
    onError: (e) => {
      toast.error(e.message || (isFr ? "Inscription impossible" : "Registration failed"));
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const uid = localStorage.getItem("userId");
    const gid = localStorage.getItem("guestId");
    if (!uid || !gid) {
      toast.error(
        isFr
          ? "Session invité manquante. Reviens depuis l’appareil où tu t’es inscrit."
          : "Missing guest session. Return from the device where you first signed up.",
      );
      return;
    }
    if (password.length < 8) {
      toast.error(isFr ? "Mot de passe : au moins 8 caractères." : "Password must be at least 8 characters.");
      return;
    }
    if (password !== password2) {
      toast.error(isFr ? "Les mots de passe ne correspondent pas." : "Passwords do not match.");
      return;
    }
    registerMut.mutate({
      userId: parseInt(uid, 10),
      guestId: gid,
      email: email.trim(),
      password,
    });
  };

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="space-y-3 max-w-sm">
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-pw">{isFr ? "Mot de passe" : "Password"}</Label>
          <Input
            id="reg-pw"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-pw2">{isFr ? "Confirmer le mot de passe" : "Confirm password"}</Label>
          <Input
            id="reg-pw2"
            type="password"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <Button type="submit" className="w-full" disabled={registerMut.isPending}>
          {registerMut.isPending ? (isFr ? "Enregistrement…" : "Saving...") : isFr ? "Créer mon compte" : "Create my account"}
        </Button>
      </form>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50/50 max-w-lg">
      <CardHeader>
        <CardTitle>{isFr ? "En 2 minutes, sécurise ton accès" : "Secure your access in 2 minutes"}</CardTitle>
        <CardDescription>
          {isFr
            ? "Crée ton compte avec ton email : tu pourras te reconnecter sur un autre téléphone ou ordinateur avec le même abonnement. Tu as fermé l’onglet ? Pas de panique : tant que ton abonnement est actif, ce message revient ici sur le même appareil / même navigateur dès que tu ouvres le tableau de bord."
            : "Create your account with your email so you can sign in on another phone or computer with the same subscription. Closed the tab? No worries: as long as your subscription is active, this message appears again on the same device/browser when you open the dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email</Label>
            <Input
              id="c-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-pw">{isFr ? "Mot de passe (min. 8 caractères)" : "Password (min. 8 characters)"}</Label>
            <Input
              id="c-pw"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-pw2">{isFr ? "Confirmer le mot de passe" : "Confirm password"}</Label>
            <Input
              id="c-pw2"
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={registerMut.isPending}>
            {registerMut.isPending ? (isFr ? "Enregistrement…" : "Saving...") : isFr ? "Créer mon compte" : "Create my account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
