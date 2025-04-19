import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter, Facebook, Mail, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-900/10 to-rose-500/10 pt-12 pb-6 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-12 w-12 mr-2">
                <Image src="/logo.png" alt="SoulMovies.ai Logo" width={48} height={48} className="object-contain" />
              </div>
              <h3 className="text-xl font-medium text-blue-600">SoulMovies.ai</h3>
            </div>
            <p className="text-sm text-slate-600 max-w-xs">
              A sanctuary for the soul, offering personalized emotional support and heart-centered healing.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-500 hover:text-violet-600 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-violet-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-violet-600 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-violet-600 transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-800">Explore</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Client Stories", path: "/stories" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-800">Services</h4>
            <ul className="space-y-2">
              {[
                "Emotional Support",
                "Heart & Mind Harmony",
                "Mindfulness & Meditation",
                "Personal Growth Guidance",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-800">Contact</h4>
            <p className="text-sm text-slate-600">
              123 Serenity Lane
              <br />
              Mindful Valley, CA 94123
            </p>
            <p className="text-sm text-slate-600">
              hello@soulmovies.ai
              <br />
              +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SoulMovies.ai. All rights reserved.
          </p>
          <div className="flex items-center mt-3 md:mt-0">
            <p className="text-xs text-slate-500 flex items-center">
              Made with <Heart size={12} className="mx-1 text-rose-500" /> for your soul
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
