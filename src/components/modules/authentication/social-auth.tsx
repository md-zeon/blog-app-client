"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

const SocialAuth = ({ type }: { type: "login" | "signup" }) => {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  //   const session = authClient.useSession();
  //   console.log("Current session:", session);

  return (
    <>
      <div className="my-4 flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => handleGoogleLogin()}
      >
        {type === "login" ? "Login with Google" : "Sign up with Google"}
      </Button>
    </>
  );
};

export default SocialAuth;
