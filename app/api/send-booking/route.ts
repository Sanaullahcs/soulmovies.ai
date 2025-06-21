import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Format email content
    const emailContent = formatBookingEmail(bookingData)

    // Here you would integrate with your email service
    // For now, we'll log the data and return success
    console.log("New SoulMovie Booking:", {
      bookingId: bookingData.bookingId,
      name: bookingData.personalInfo.name,
      email: bookingData.personalInfo.email,
      timestamp: bookingData.timestamp,
    })

    // In production, you would send this via your email service:
    // await sendEmail({
    //   to: 'bookings@soulmovies.ai',
    //   subject: `New SoulMovie Booking - ${bookingData.personalInfo.name}`,
    //   html: emailContent
    // })

    return NextResponse.json({
      success: true,
      message: "Booking received successfully",
      bookingId: bookingData.bookingId,
    })
  } catch (error) {
    console.error("Booking submission error:", error)
    return NextResponse.json({ success: false, message: "Failed to process booking" }, { status: 500 })
  }
}

function formatBookingEmail(data: any) {
  const { personalInfo, selectedDateTime, selectedTimezone, answers, questions } = data

  let html = `
    <h2>🎬 New SoulMovie Booking Request</h2>
    <p><strong>Booking ID:</strong> ${data.bookingId}</p>
    <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    
    <h3>👤 Personal Information</h3>
    <ul>
      <li><strong>Name:</strong> ${personalInfo.name}</li>
      <li><strong>Email:</strong> ${personalInfo.email}</li>
      <li><strong>Phone:</strong> ${personalInfo.phone}</li>
      <li><strong>Preferred Date/Time:</strong> ${selectedDateTime}</li>
      <li><strong>Timezone:</strong> ${selectedTimezone}</li>
    </ul>
    
    ${personalInfo.concerns ? `<p><strong>Additional Concerns:</strong> ${personalInfo.concerns}</p>` : ""}
    
    <h3>🔮 Soul Journey Responses</h3>
  `

  questions.forEach((question: any) => {
    const answer = answers[question.id]
    if (answer) {
      html += `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <p><strong>Q: ${question.question}</strong></p>
          <p>A: ${answer}</p>
        </div>
      `
    }
  })

  html += `
    <hr>
    <p><em>This booking was submitted through the SoulMovies.ai website and is ready for AI agent processing.</em></p>
  `

  return html
}
