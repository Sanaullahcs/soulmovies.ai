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
                <Image src="/logo-new.png" alt="SoulMovies.ai Logo" width={48} height={48} className="object-contain" />
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
            <a
              href="https://wa.me/923418349814"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors mt-2"
            >
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
                className="mr-1"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Chat on WhatsApp
            </a>
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
