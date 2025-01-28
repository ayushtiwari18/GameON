"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Camera } from "lucide-react"

export default function AcademyRegistrationPage() {
  const [formData, setFormData] = useState({
    academyName: "",
    contactPersonName: "",
    phone: "",
    sportsOffered: "",
    city: "",
    state: "",
    address: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-8">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-[#1E1B4B]">Register as an academy</h1>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6 text-center mb-8">
            <h2 className="text-3xl font-bold text-[#F4A340]">Welcome!</h2>
            <p className="text-blue-600">Start your journey to becoming a champion</p>
            <p className="text-sm text-muted-foreground">"Expand your reach and connect with aspiring athletes"</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="academyName">Enter your academy name*</Label>
                <Input
                  id="academyName"
                  required
                  value={formData.academyName}
                  onChange={(e) => setFormData({ ...formData, academyName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPersonName">Content person's name*</Label>
                <Input
                  id="contactPersonName"
                  required
                  value={formData.contactPersonName}
                  onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number*</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sportsOffered">Sports offered*</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, sportsOffered: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    {/* Add more sports as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Academy's address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email id*</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative size-32">
                <div className="absolute inset-0 flex items-center justify-center bg-secondary rounded-full">
                  <Camera className="size-8 text-muted-foreground" />
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                <p className="mt-2 text-center text-sm text-muted-foreground">Add photo</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button type="button" variant="outline">
                Review
              </Button>
              <Button type="button" variant="outline">
                Save
              </Button>
              <Button type="submit" className="bg-[#F4A340] text-white hover:bg-[#F4A340]/90">
                Confirm
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Already a member?{" "}
              <Link href="/login" className="text-[#1E1B4B] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

