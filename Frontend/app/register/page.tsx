import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-[#1E1B4B] mb-6">Join Game On</h1>
        <p className="text-center mb-8">Choose how you want to register:</p>
        <div className="space-y-4">
          <Link href="/register/player" className="block w-full">
            <Button className="w-full bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Register as a Player</Button>
          </Link>
          <Link href="/register/academy" className="block w-full">
            <Button className="w-full bg-[#F4A340] text-white hover:bg-[#F4A340]/90">Register as an Academy</Button>
          </Link>
        </div>
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1E1B4B] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

