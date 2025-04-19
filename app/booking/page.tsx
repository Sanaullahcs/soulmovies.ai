import BookingSystem from "@/components/booking/booking-system"

export const metadata = {
  title: "Book Your Session | SoulMovies.ai",
  description: "Take a few moments to help us understand your needs before booking your personalized session.",
}

export default function BookingPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-white to-violet-50">
      <div className="container max-w-4xl mx-auto px-4">
        <BookingSystem />
      </div>
    </div>
  )
}
