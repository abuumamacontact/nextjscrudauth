"use client";

import { useEffect, useState } from "react";
import { useHexclaveApp, useUser } from "@hexclave/next";

export default function SignInPage() {
  const hexclaveApp = useHexclaveApp();
  const user = useUser({ includeRestricted: true });
  const project = hexclaveApp.useProject();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.isRestricted) {
        void hexclaveApp.redirectToOnboarding();
      } else {
        void hexclaveApp.redirectToAfterSignIn();
      }
    }
  }, [user, hexclaveApp]);

  if (user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are already signed in.</h1>
          <p className="mt-2 text-muted-foreground">
            Redirecting you...
          </p>
        </div>
      </main>
    );
  }

  const handlePasswordSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await hexclaveApp.signInWithCredential({
      email,
      password,
    });

    setLoading(false);

    if (result.status === "error") {
      setError(result.error.humanReadableMessage);
      return;
    }

    await hexclaveApp.redirectToAfterSignIn();
  };

  const handleOAuth = async (providerId: string) => {
    setError("");
    setLoading(true);

    try {
      await hexclaveApp.signInWithOAuth(providerId);
    } catch (error) {
      setLoading(false);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Sign in to your account
          </h1>

          {project.config.signUpEnabled && (
            <p className="mt-2 text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="font-medium underline"
                onClick={() => hexclaveApp.redirectToSignUp()}
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">

          {project.config.oauthProviders.length > 0 && (
            <div className="space-y-3">
              {project.config.oauthProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  disabled={loading}
                  onClick={() => handleOAuth(provider.id)}
                  className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
                >
                  Sign in with {provider.id}
                </button>
              ))}
            </div>
          )}

          {project.config.oauthProviders.length > 0 &&
            project.config.credentialEnabled && (
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  OR
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}

          {project.config.credentialEnabled && (
            <form
              onSubmit={handlePasswordSignIn}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() =>
                    hexclaveApp.redirectToForgotPassword()
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {project.config.passkeyEnabled && (
            <button
              type="button"
              disabled={loading}
              onClick={() => hexclaveApp.signInWithPasskey()}
              className="mt-4 w-full rounded-md border px-4 py-2 font-medium hover:bg-muted disabled:opacity-50"
            >
              Sign in with passkey
            </button>
          )}

          {!project.config.credentialEnabled &&
            !project.config.passkeyEnabled &&
            project.config.oauthProviders.length === 0 && (
              <p className="text-center text-sm text-red-500">
                No authentication method is enabled.
              </p>
            )}
        </div>
      </div>
    </main>
  );
}