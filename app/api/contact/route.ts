import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { name, email, subject, businessName, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const displaySubject = subject || businessName || 'No business name'

    await resend.emails.send({
      from: 'Mahi Hakim <contact@mahihakim.dev>',
      to: 'mahiabdul20@gmail.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${displaySubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                  <!-- HEADER WITH LOGO -->
                  <tr>
                    <td style="background-color: #0A0A0A; padding: 32px 40px; border-radius: 12px 12px 0 0; text-align: center;">
                      <img
                        src="https://mahihakim.dev/icon.png"
                        alt="Mahi Hakim"
                        width="60"
                        style="display: block; margin: 0 auto 16px;"
                      />
                      <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                        New Contact Submission
                      </p>
                      <p style="margin: 6px 0 0; font-size: 13px; color: #888888;">
                        ${submittedAt}
                      </p>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="background-color: #ffffff; padding: 36px 40px;">

                      <!-- CONTACT DETAILS TABLE -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                        <tr>
                          <td style="padding: 14px 16px; background-color: #fafafa; border-radius: 8px 8px 0 0; border-bottom: 1px solid #f0f0f0;">
                            <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-weight: 600;">Name</p>
                            <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-weight: 600;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 14px 16px; background-color: #fafafa; border-bottom: 1px solid #f0f0f0;">
                            <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-weight: 600;">Email</p>
                            <p style="margin: 0; font-size: 16px;">
                              <a href="mailto:${email}" style="color: #F5A623; text-decoration: none; font-weight: 500;">${email}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 14px 16px; background-color: #fafafa; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-weight: 600;">Subject</p>
                            <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-weight: 500;">${displaySubject}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- MESSAGE -->
                      <p style="margin: 0 0 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-weight: 600;">Message</p>
                      <div style="padding: 20px; background-color: #fafafa; border-radius: 8px; border-left: 3px solid #F5A623;">
                        <p style="margin: 0; font-size: 15px; color: #333333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                      </div>

                      <!-- REPLY BUTTON -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; padding: 14px 36px; background-color: #0A0A0A; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; letter-spacing: 0.3px;">
                              Reply to ${name.split(' ')[0]}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background-color: #fafafa; padding: 24px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #eee; text-align: center;">
                      <p style="margin: 0; font-size: 12px; color: #999999;">
                        This message was sent from the contact form on
                        <a href="https://mahihakim.com" style="color: #F5A623; text-decoration: none; font-weight: 500;">mahihakim.com</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
 