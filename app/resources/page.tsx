import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import ResourceCard from "@/components/resource-card"

export default function ResourcesPage() {
  const resources = [
    {
      title: "5 Gentle Steps Toward Daily Mindfulness",
      excerpt: "Simple practices you can incorporate into your routine to cultivate presence and reduce stress.",
      imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop",
      slug: "daily-mindfulness",
      category: "Mindfulness",
    },
    {
      title: "Finding Emotional Balance Amid Life's Storms",
      excerpt: "Strategies for maintaining your center when facing challenges and uncertainty.",
      imageSrc: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=500&auto=format&fit=crop",
      slug: "emotional-balance",
      category: "Emotional Wellness",
    },
    {
      title: "Building Emotional Intelligence for Healthier Relationships",
      excerpt: "How understanding and managing emotions can transform your connections with others.",
      imageSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=500&auto=format&fit=crop",
      slug: "emotional-intelligence",
      category: "Relationships",
    },
    {
      title: "The Science of Heart-Brain Coherence",
      excerpt: "Explore the fascinating research behind the powerful connection between your heart and brain.",
      imageSrc: "https://images.unsplash.com/photo-1559757175-7cb036bd4d31?q=80&w=500&auto=format&fit=crop",
      slug: "heart-brain-coherence",
      category: "Science",
    },
    {
      title: "Healing Through Self-Compassion",
      excerpt: "Learn how treating yourself with kindness can transform your relationship with yourself and others.",
      imageSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop",
      slug: "self-compassion",
      category: "Self-Care",
    },
    {
      title: "Creating Boundaries for Emotional Well-being",
      excerpt: "Practical guidance for establishing healthy boundaries in all areas of your life.",
      imageSrc: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=500&auto=format&fit=crop",
      slug: "healthy-boundaries",
      category: "Emotional Wellness",
    },
    {
      title: "The Power of Present Moment Awareness",
      excerpt: "Discover how being fully present can reduce anxiety and increase joy in everyday experiences.",
      imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=500&auto=format&fit=crop",
      slug: "present-moment-awareness",
      category: "Mindfulness",
    },
    {
      title: "Navigating Grief with Mindfulness",
      excerpt: "Compassionate approaches to processing loss while honoring your emotions.",
      imageSrc: "https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=500&auto=format&fit=crop",
      slug: "mindful-grief",
      category: "Emotional Wellness",
    },
    {
      title: "Reconnecting with Your Authentic Self",
      excerpt: "Practices for rediscovering your true nature beneath societal expectations and conditioning.",
      imageSrc: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=500&auto=format&fit=crop",
      slug: "authentic-self",
      category: "Personal Growth",
    },
  ]

  const categories = [
    "All",
    "Mindfulness",
    "Emotional Wellness",
    "Relationships",
    "Self-Care",
    "Personal Growth",
    "Science",
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1920&auto=format&fit=crop"
            alt="Resources Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-700/30" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">Your Calm Corner</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Explore our collection of resources designed to support your emotional well-being and personal growth
              journey
            </p>

            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full px-5 py-4 pr-12 rounded-full bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-violet-500" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container px-6">
          <div className="flex flex-wrap gap-3 justify-center px-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 ? "bg-violet-600 text-white" : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Featured Resources</h2>
              <p className="text-slate-600">Explore our most popular articles, guides, and practices</p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {resources.slice(0, 3).map((resource, index) => (
              <ParallaxSection key={index} direction="up" speed={0.15} delay={index * 0.1}>
                <ResourceCard
                  title={resource.title}
                  excerpt={resource.excerpt}
                  imageSrc={resource.imageSrc}
                  slug={resource.slug}
                />
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">All Resources</h2>
              <p className="text-slate-600">Browse our complete collection of articles, guides, and practices</p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {resources.map((resource, index) => (
              <ParallaxSection key={index} direction="up" speed={0.15} delay={(index % 3) * 0.1}>
                <ResourceCard
                  title={resource.title}
                  excerpt={resource.excerpt}
                  imageSrc={resource.imageSrc}
                  slug={resource.slug}
                />
              </ParallaxSection>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 h-auto py-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              Load More
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-violet-600/10 to-rose-500/10 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-4">Stay Inspired</h2>
                  <p className="text-slate-600 mb-6">
                    Subscribe to our newsletter for weekly insights, practices, and resources to support your emotional
                    well-being journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="px-4 py-3 rounded-full bg-white border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:outline-none"
                    />
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full whitespace-nowrap h-auto py-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
                </div>
                <div className="hidden md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=300&auto=format&fit=crop"
                    alt="Newsletter"
                    width={300}
                    height={300}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
