import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
import { useLanguageContext } from "@/contexts/LanguageContext";
/**
 * Connexion email + mdp (compte créé après inscription post-paiement).
 */
export default function LoginPage() {
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  useDocumentTitle(isFr ? "Connexion" : "Sign in");
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMut = trpc.auth.loginWithEmail.useMutation({
    onSuccess: async (data) => {
      if (data.userId) {
        localStorage.setItem("userId", String(data.userId));
      }
      localStorage.removeItem("guestId");
      await utils.invalidate();
      toast.success(isFr ? "Connexion réussie" : "Signed in successfully");
      navigate("/dashboard");
    },
    onError: (e) => {
      toast.error(e.message || (isFr ? "Connexion impossible" : "Unable to sign in"));
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMut.mutate({ email: email.trim(), password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50/40 to-white">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>{isFr ? "Connexion" : "Sign in"}</CardTitle>
          <CardDescription>
            {isFr
              ? "Utilise l’e-mail et le mot de passe de ton compte Mixy."
              : "Use your Mixy account email and password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="login-pw">{isFr ? "Mot de passe" : "Password"}</Label>
              <Input
                id="login-pw"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginMut.isPending}>
              {loginMut.isPending ? (isFr ? "Connexion…" : "Signing in...") : isFr ? "Se connecter" : "Sign in"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isFr ? "Pas encore de compte ?" : "No account yet?"}{" "}
              <Link href="/onboarding" className="text-primary underline underline-offset-2">
                {isFr ? "Démarrer" : "Get started"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
