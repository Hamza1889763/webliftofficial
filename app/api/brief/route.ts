import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the FormData sent from your frontend component
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const service = formData.get('service') as string
    const message = formData.get('message') as string

    // Basic validation to ensure required fields aren't empty
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      // NOTE: Until you verify your own domain (e.g., hello@weblifts.com) in Resend, 
      // you MUST use onboarding@resend.dev as the 'from' address.
      from: 'Weblifts Brief <onboarding@resend.dev>', 
      
      // Changed to your verified Resend account email!
      to: ['webliftofficial@gmail.com'], 
      
      // Sets the "Reply-To" so you can just hit reply in your email client to email the lead!
      replyTo: email, 
      
      subject: `New Project Brief: ${service} - ${name}`,
      
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #083A39; border-bottom: 2px solid #F7C63D; padding-bottom: 10px;">New Project Brief Received</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone || '<span style="color: #999;">Not provided</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${company || '<span style="color: #999;">Not provided</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Service Requested:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><span style="background: #F7C63D; color: #083A39; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${service}</span></td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; color: #083A39;">Project Details:</h3>
          <div style="background: #f9fafb; border-left: 4px solid #F7C63D; padding: 15px; border-radius: 4px; line-height: 1.6;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Failed to send brief' }, 
      { status: 500 }
    )
  }
}