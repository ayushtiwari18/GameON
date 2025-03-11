import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-gray-100">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-200" />
            <span className="text-xl font-bold text-[#1E1B4B]">GAME ON</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center text-sm">
              <Image src="/placeholder.svg" alt="Home" width={16} height={16} className="mr-2" />
              HOME
            </Link>
            <Link href="/about" className="flex items-center text-sm">
              <span className="mr-2">i</span>
              About Us
            </Link>
            <Link href="/content" className="flex items-center text-sm">
              <Image src="/placeholder.svg" alt="Content" width={16} height={16} className="mr-2" />
              Content
            </Link>
            <Link href="/gallery" className="flex items-center text-sm">
              <Image src="/placeholder.svg" alt="Gallery" width={16} height={16} className="mr-2" />
              Gallery
            </Link>
            <Link href="/faqs" className="flex items-center text-sm">
              <span className="mr-2">?</span>
              FAQs
            </Link>
          </nav>

          <Link href="/register">
            <Button className="bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E1B4B]">
                Play. Train. Excel.
                <br />
                All in One Place!
              </h1>
              <p className="text-[#8B5D3B]">
                Join us now to master your sport, connect with top coaches, and reach your goals.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button className="w-full md:w-48 bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Latest Update</Button>
              <Button className="w-full md:w-48 bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Top Players</Button>
              <Button className="w-full md:w-48 bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Tournaments</Button>
              <Button className="w-full md:w-48 bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">Academy</Button>
            </div>
          </div>

          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(289)-piOPFCAxABmzsbtqPAOJeyEUb1GEdG.png"
              alt="Game On Illustration"
              width={600}
              height={400}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <Image src="/placeholder.svg" alt="Cricket players" width={500} height={300} className="rounded-lg" />
              <div className="absolute bottom-4 right-4 bg-pink-500 text-white px-4 py-1 rounded">Akruti Gupta</div>
            </div>
            <div className="space-y-4">
              <p className="text-sm">
                At GAME ON our mission is to bridge the gap between aspiring players and top academies, creating
                opportunities for growth and success. Discover inspiring stories of top players who have connected with
                training programs through us. Stay updated on the latest tournaments and events, ensuring you never miss
                a chance to shine on the field. Together, we're shaping the future of sports!
              </p>
              <Link href="/more" className="text-[#1E1B4B] hover:underline inline-flex items-center">
                Get More Insight →
              </Link>

              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold text-[#1E1B4B]">Why Choose GAME ON?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 border border-[#1E1B4B] flex items-center justify-center">✓</span>
                    Connect aspiring players with top academies seamlessly.
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 border border-[#1E1B4B] flex items-center justify-center">✓</span>
                    Stay informed with real-time tournament updates.
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 border border-[#1E1B4B] flex items-center justify-center">✓</span>
                    Discover inspiring success stories of top players.
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 border border-[#1E1B4B] flex items-center justify-center">✓</span>
                    Access personalized training opportunities.
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 border border-[#1E1B4B] flex items-center justify-center">✓</span>
                    Join a trusted network of players and coaches.
                  </li>
                </ul>

                <Link href="/register">
                  <Button className="bg-[#1E1B4B] text-white hover:bg-[#1E1B4B]/90">JOIN US NOW</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

