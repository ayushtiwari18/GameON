"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="container flex min-h-screen items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(284)-2PkJQTqLc1lgM9ztpsE9vS4hA9hb3m.png"
              alt="Login illustration"
              width={500}
              height={500}
              className="w-full"
            />
          </div>

          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gray-200" />
              <span className="text-xl font-bold text-[#1E1B4B]">GAME ON</span>
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#1E1B4B]">Welcome!</h1>
              <p className="text-xl text-[#1E1B4B]">Sign in to your Account</p>
            </div>

            <div className="flex justify-start gap-4">
              <Button variant="outline" className="w-10 h-10 p-0">
                <Image src="https://v0.dev/icons/google.svg" alt="Google" width={24} height={24} />
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                <Image src="https://v0.dev/icons/facebook.svg" alt="Facebook" width={24} height={24} />
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0">
                <Image src="https://v0.dev/icons/twitter.svg" alt="X" width={24} height={24} />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#FFFBF5] px-2 text-muted-foreground">or sign in with email</span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input id="fullName" placeholder="Full Name" className="pl-10" />
                  <div className="absolute left-3 top-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input id="email" type="email" placeholder="Email ID" className="pl-10" />
                  <div className="absolute left-3 top-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input id="password" type="password" placeholder="Password" className="pl-10" />
                  <div className="absolute left-3 top-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M2 16s3-5.5 8-5.5 8 5.5 8 5.5" />
                      <path d="M2 12s3-5.5 8-5.5 8 5.5 8 5.5" />
                      <path d="M2 8s3-5.5 8-5.5 8 5.5 8 5.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90" type="submit">
                Sign in
              </Button>
            </form>

            <div className="space-y-2 text-center">
              <Link href="/forgot-password" className="text-[#1E1B4B] hover:underline">
                Forget Password?
              </Link>
              <div>
                Don't have an account?{" "}
                <Link href="/register" className="text-[#1E1B4B] font-semibold hover:underline">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

