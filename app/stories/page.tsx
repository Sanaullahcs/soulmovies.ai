import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParallaxSection from "@/components/parallax-section"
import ParallaxBackground from "@/components/parallax-background"

export const metadata = {
  title: "Client Stories | SoulMovies.ai",
  description: "Real journeys of transformation, growth, and reconnection with SoulMovies.ai.",
}

export default function StoriesPage() {
  const testimonials = [
    {
      name: "Emma Thompson",
      location: "New York, NY",
      quote:
        "Working with SoulMovies.ai has been truly transformative. I came seeking help for anxiety that had plagued me for years, and within just a few months, I've developed tools that have changed my relationship with my emotions. I've found a sense of peace I didn't know was possible.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      story:
        "After struggling with anxiety for over a decade and trying numerous therapies, I was skeptical that anything could truly help. From our first session, I felt heard and understood in a way I hadn't before. The personalized approach addressed not just my symptoms but the root causes of my anxiety. The mindfulness techniques I learned have become an essential part of my daily routine, and I now have the tools to navigate challenging situations with confidence.",
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      quote:
        "The mindfulness techniques I've learned through SoulMovies.ai have helped me manage stress and find joy in everyday moments. As a tech executive, I was constantly overwhelmed, but now I've found balance.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      story:
        "The demands of my career in tech had taken a toll on my mental health and relationships. I was constantly in 'fight or flight' mode, unable to be present even during important family moments. Through the Heart & Mind Harmony program, I learned to recognize my stress patterns and interrupt them before they escalated. The guided meditations and breathing exercises have become essential tools in my daily routine. Most importantly, I've regained the ability to be fully present with my family and find joy in simple moments. My team has even noticed the positive change in my leadership style.",
    },
    {
      name: "Sophia Rodriguez",
      location: "Austin, TX",
      quote:
        "I was skeptical at first, but the personalized approach made all the difference. After years of feeling disconnected from myself, I finally feel like I'm living authentically. I feel like myself again.",
      rating: 4,
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      story:
        "Following a difficult divorce, I felt completely lost and disconnected from myself. I had spent so many years defining myself through my relationship that I no longer knew who I was or what I wanted. The Personal Growth Guidance program helped me rediscover my values, passions, and strengths. Through consistent work and compassionate guidance, I've rebuilt my sense of self and created a life that feels authentic and fulfilling. I'm now pursuing creative projects I had abandoned years ago and have developed healthier relationships based on mutual respect and understanding.",
    },
    {
      name: "David Wilson",
      location: "Chicago, IL",
      quote:
        "The emotional intelligence coaching has transformed not just my personal life but my professional relationships as well. I've become a more effective leader and a more present partner.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      story:
        "As someone who prided myself on logic and rationality, I had always dismissed the importance of emotional intelligence. When conflicts kept arising in both my work and home life, I reluctantly sought help. The emotional intelligence coaching helped me recognize how my dismissal of emotions was actually creating disconnection. Learning to identify and express my feelings appropriately has led to deeper connections with my partner and more effective communication with my team. I've become a more empathetic leader and a more understanding partner, all while staying true to my analytical nature.",
    },
    {
      name: "Aisha Johnson",
      location: "Atlanta, GA",
      quote:
        "After experiencing burnout, I needed to reconnect with my purpose. The mindfulness practices and emotional support helped me rediscover my passion and create healthier boundaries.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&auto=format&fit=crop",
      story:
        "As a healthcare worker during the pandemic, I experienced severe burnout that left me questioning my career choice and purpose. The emotional support and mindfulness practices I learned through SoulMovies.ai helped me process the trauma and grief I had been carrying. Through guided reflection, I reconnected with my core values and the reasons I entered healthcare in the first place. I've now established healthier boundaries and self-care practices that allow me to continue my work with renewed passion and without sacrificing my wellbeing. I've found a sustainable way to serve others while honoring my own needs.",
    },
    {
      name: "James Taylor",
      location: "Denver, CO",
      quote:
        "The grief support program helped me navigate the loss of my father with grace and compassion. I learned to honor his memory while continuing to live fully.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      story:
        "When I lost my father unexpectedly, I was overwhelmed by grief and didn't know how to move forward. The personalized emotional support program provided a safe space for me to process my complex feelings without judgment. I learned that grief isn't linear and that it's possible to both honor my father's memory and continue living a full life. The mindfulness practices helped me stay present during waves of grief rather than trying to escape the pain. Through this journey, I've developed a deeper appreciation for life and a capacity to sit with difficult emotions. I'm now able to share stories about my father with joy rather than just sorrow.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop"
            alt="Client Stories Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/75 via-purple-800/60 to-purple-700/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">Stories That Heal</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Real journeys of transformation, growth, and reconnection
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <ParallaxSection direction="up" speed={0.1}>
              <div id="emma-thompson" className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100">
                <div className="flex items-center mb-8">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-violet-200">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                      alt="Emma Thompson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-slate-800">Emma Thompson</h3>
                    <p className="text-violet-600">New York, NY</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-medium text-slate-800 mb-6">
                  Finding Peace After a Decade of Anxiety
                </h2>

                <div className="prose prose-violet max-w-none">
                  <p className="text-slate-600 mb-4">
                    "After struggling with anxiety for over a decade and trying numerous therapies, I was skeptical that
                    anything could truly help. From our first session, I felt heard and understood in a way I hadn't
                    before."
                  </p>

                  <p className="text-slate-600 mb-4">
                    "The personalized approach addressed not just my symptoms but the root causes of my anxiety. The
                    mindfulness techniques I learned have become an essential part of my daily routine, and I now have
                    the tools to navigate challenging situations with confidence."
                  </p>

                  <p className="text-slate-600 mb-4">
                    "What sets SoulMovies.ai apart is their holistic approach. They didn't just focus on my anxiety but
                    helped me reconnect with my values, passions, and authentic self. This reconnection has been the
                    foundation of my healing journey."
                  </p>

                  <p className="text-slate-600 mb-4">
                    "Working with SoulMovies.ai has been truly transformative. I've found a sense of peace I didn't know
                    was possible, and I'm now able to be fully present in my life in a way I couldn't before."
                  </p>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-20 bg-slate-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">More Journeys of Transformation</h2>
              <p className="text-slate-600">
                Hear from individuals who have experienced profound change through our guidance and support
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {testimonials.slice(1, 7).map((testimonial, index) => (
              <ParallaxSection key={index} direction="up" speed={0.15} delay={index * 0.1}>
                <div
                  id={testimonial.name.toLowerCase().replace(/\s+/g, "-")}
                  className="bg-white rounded-2xl p-6 pb-8 shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-1 ring-violet-100">
                      <Image
                        src={testimonial.imageSrc || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-slate-800">{testimonial.name}</h3>
                      <p className="text-xs text-violet-600">{testimonial.location}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-violet-50 rounded-xl p-4 mb-4">
                    <p className="text-slate-600 text-sm italic">
                      {testimonial.quote.length > 180
                        ? `"${testimonial.quote.substring(0, 180)}..."`
                        : `"${testimonial.quote}"`}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center text-xs text-slate-500">
                      <span className="inline-block px-2 py-1 bg-violet-100 text-violet-700 rounded-full mr-2">
                        {index % 3 === 0 ? "Anxiety" : index % 3 === 1 ? "Mindfulness" : "Personal Growth"}
                      </span>
                      <span>Verified Client</span>
                    </div>
                  </div>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Hear Their Stories</h2>
              <p className="text-slate-600 mb-8">
                Watch video testimonials from clients who have experienced transformation
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Video 1 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                    title="Emma Thompson's Journey"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-1 ring-violet-100">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                        alt="Emma Thompson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-slate-800">Emma Thompson</h3>
                      <p className="text-xs text-violet-600">New York, NY</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">Finding Inner Peace</h4>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    "After struggling with anxiety for over a decade, I've found a sense of peace I didn't know was
                    possible."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-violet-600 font-medium">5:24</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            {/* Video 2 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/jNQXAC9IVRw?rel=0"
                    title="Michael Chen's Journey"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-1 ring-violet-100">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                        alt="Michael Chen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-slate-800">Michael Chen</h3>
                      <p className="text-xs text-violet-600">San Francisco, CA</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">Mindfulness Journey</h4>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    "The mindfulness techniques helped me manage stress and find joy in everyday moments."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-violet-600 font-medium">7:12</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            {/* Video 3 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/9bZkp7q19f0?rel=0"
                    title="Sophia Rodriguez's Journey"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-1 ring-violet-100">
                      <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                        alt="Sophia Rodriguez"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-slate-800">Sophia Rodriguez</h3>
                      <p className="text-xs text-violet-600">Austin, TX</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">Path to Authenticity</h4>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    "The personalized approach made all the difference. I finally feel like myself again."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-violet-600 font-medium">6:45</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-violet-300 text-violet-700 hover:bg-violet-50 rounded-xl px-6 py-2 h-auto"
            >
              View All Video Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <ParallaxBackground
        imageSrc="https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop"
        overlayColor="bg-gradient-to-r from-violet-600/90 to-rose-500/90 backdrop-blur-sm"
        className="py-20"
      >
        <div className="container px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">Share Your Story</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Has SoulMovies.ai made a difference in your life? We'd love to hear about your experience and journey.
          </p>
          <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-white/20 transform hover:-translate-y-1">
            Submit Your Story
          </Button>
        </div>
      </ParallaxBackground>
    </>
  )
}
