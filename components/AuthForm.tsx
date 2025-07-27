"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { signIn, SignUp } from "@/lib/actions/auth.action";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";

type FormType = "sign-up" | "sign-in";

// Validation schema
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name is too short") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignUp = type === "sign-up";
  const formSchema = authFormSchema(type);

  type AuthFormFields = z.infer<typeof formSchema>;

  const form = useForm<AuthFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormFields) {
    try {
      if (isSignUp) {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await SignUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result || !result.success) {
          toast.error(result?.message || "Something went wrong.");
          return;
        }

        toast.success("Account created successfully!");
        router.push("/sign-in");

      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to get user token. Please try again.");
          return;
        }

        await signIn({ email, idToken });
        toast.success("Successfully signed in!");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already in use.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak.");
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credentials.");
          break;
        default:
          toast.error(`Something went wrong. ${error.message}`);
      }
    }
  }

  return (
    <div className="card-border lg:min-w-[500px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-purple-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full mt-4 form"
          >
            {isSignUp && (
              <FormField<AuthFormFields>
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Full Name"
              />
            )}
            <FormField<AuthFormFields>
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <FormField<AuthFormFields>
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your Password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isSignUp ? "Create an Account" : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
