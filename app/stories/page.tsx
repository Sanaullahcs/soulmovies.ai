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
              <div id="emma-thompson" className="bg-violet-50 rounded-3xl p-8 md:p-12 shadow-md">
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
                </div>

                <div className="flex mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
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
      <section className="py-20 bg-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">More Journeys of Transformation</h2>
              <p className="text-slate-600">
                Hear from individuals who have experienced profound change through our guidance and support
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {testimonials.slice(1, 5).map((testimonial, index) => (
              <ParallaxSection key={index} direction="up" speed={0.15} delay={index * 0.1}>
                <div
                  id={testimonial.name.toLowerCase().replace(/\s+/g, "-")}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col h-full"
                >
                  <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-violet-100">
                      <Image
                        src={testimonial.imageSrc || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800">{testimonial.name}</h3>
                      <p className="text-sm text-violet-600">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 italic">
                    {testimonial.quote.length > 180
                      ? `"${testimonial.quote.substring(0, 180)}..."`
                      : `"${testimonial.quote}"`}
                  </p>

                  <div className="space-y-4 flex-grow mb-2">
                    <p className="text-slate-600 line-clamp-3">{testimonial.story}</p>
                  </div>

                  <Button
                    variant="link"
                    className="text-violet-600 p-0 h-auto font-medium hover:text-violet-800 transition-colors mt-6 self-start"
                  >
                    Read Full Story
                  </Button>
                </div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-violet-50">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <ParallaxSection direction="up" speed={0.1}>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Hear Their Stories</h2>
              <p className="text-slate-600">
                Watch video testimonials from clients who have experienced transformation
              </p>
            </ParallaxSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Video 1 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.1}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-violet-100/30 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                    alt="Emma Thompson's Journey"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-violet-600 ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Emma's Journey to Inner Peace</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    "After struggling with anxiety for over a decade, I've found a sense of peace I didn't know was
                    possible."
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-violet-600 font-medium">5:24</span>
                    <button className="text-violet-600 hover:text-violet-800 transition-colors text-sm font-medium flex items-center">
                      Watch Video
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            {/* Video 2 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.2}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-violet-100/30 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                    alt="Michael Chen's Journey"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-violet-600 ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Michael's Mindfulness Journey</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    "The mindfulness techniques helped me manage stress and find joy in everyday moments, even as a busy
                    executive."
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-violet-600 font-medium">7:12</span>
                    <button className="text-violet-600 hover:text-violet-800 transition-colors text-sm font-medium flex items-center">
                      Watch Video
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            {/* Video 3 */}
            <ParallaxSection direction="up" speed={0.15} delay={0.3}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-violet-100/30 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                    alt="Sophia Rodriguez's Journey"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-violet-600 ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Sophia's Path to Authenticity</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    "The personalized approach made all the difference. After years of feeling disconnected, I finally
                    feel like myself again."
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-violet-600 font-medium">6:45</span>
                    <button className="text-violet-600 hover:text-violet-800 transition-colors text-sm font-medium flex items-center">
                      Watch Video
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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
