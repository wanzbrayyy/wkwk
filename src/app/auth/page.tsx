"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Code2, Github, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc" // Menggunakan react-icons untuk ikon Google
import { useState } from "react"
import { Separator } from "@/components/ui/separator" // Asumsi ada separator

export default function AuthPage() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const [isLoadingGithub, setIsLoadingGithub] = useState(false)

  const handleSignIn = async (provider: string) => {
    if (provider === "google") {
      setIsLoadingGoogle(true)
    } else if (provider === "github") {
      setIsLoadingGithub(true)
    }
    await signIn(provider, { callbackUrl: "/dashboard" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border border-[#333] bg-[#1e1e1e] p-8 shadow-2xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-brand">
            <Code2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e0e0e0]">
            Welcome to AutoCode.ai
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in or create an account to start generating code.
          </p>
        </div>

        <div className="mt-8 flex flex-col space-y-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2 text-md py-6 text-[#e0e0e0] border-[#444] hover:bg-[#2d2d2d]"
            onClick={() => handleSignIn("google")}
            disabled={isLoadingGoogle || isLoadingGithub}
          >
            {isLoadingGoogle ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <FcGoogle className="h-5 w-5" />
            )}
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-2 text-md py-6 text-[#e0e0e0] border-[#444] hover:bg-[#2d2d2d]"
            onClick={() => handleSignIn("github")}
            disabled={isLoadingGoogle || isLoadingGithub}
          >
            {isLoadingGithub ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Github className="h-5 w-5" />
            )}
            Sign in with GitHub
          </Button>
        </div>

        <Separator className="my-8 bg-[#333]" />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-[#708F96]"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-[#708F96]"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}