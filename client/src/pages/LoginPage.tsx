import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
/**
 * Connexion email + mdp (compte créé après inscription post-paiement).
 */
export default function LoginPage() {
  useDocumentTitle("Connexion");
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
      toast.success("Connexion réussie");
      navigate("/dashboard");
    },
    onError: (e) => {
      toast.error(e.message || "Connexion impossible");
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
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Utilise l’e-mail et le mot de passe de ton compte Mixy.</CardDescription>
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
              <Label htmlFor="login-pw">Mot de passe</Label>
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
              {loginMut.isPending ? "Connexion…" : "Se connecter"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/onboarding" className="text-primary underline underline-offset-2">
                Démarrer
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
