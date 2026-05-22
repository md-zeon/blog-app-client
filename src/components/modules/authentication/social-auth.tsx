"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SocialAuth = () => {
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
      <Button
        variant="outline"
        type="button"
        onClick={() => handleGoogleLogin()}
      >
        Login with Google
      </Button>
    </>
  );
};

export default SocialAuth;
