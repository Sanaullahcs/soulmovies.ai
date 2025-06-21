import { Button } from "@/components/ui/button"

export default function StoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Our Stories</h1>
      <div className="space-y-4">
        <Button className="bg-white text-gray-900 rounded-xl px-8 py-4 h-auto hover:bg-gray-100">Read Stories</Button>
        <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 border-0">
          Share Your Story
        </Button>
      </div>
    </div>
  )
}
