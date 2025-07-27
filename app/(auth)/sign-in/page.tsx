"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);

      // Remove ?email=... from the URL without reloading the page
      router.replace(window.location.pathname);
    }
  }, [searchParams, router]);

  return <AuthForm type="sign-in" defaultEmail={email} />;
};

export default SignIn;
