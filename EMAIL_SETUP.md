# Email Contact Form Setup Guide

## Overview
This contact form uses Resend to send emails directly to your inbox (mahiabdul20@gmail.com) when someone submits the contact form.

## Setup Instructions

### 1. Get Resend API Key
1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the API key

### 2. Environment Variables
Create a `.env.local` file in your project root and add:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Replace `your_resend_api_key_here` with your actual Resend API key.

### 3. Domain Setup (Optional but Recommended)
For production, you should verify your domain with Resend:

1. In your Resend dashboard, go to Domains
2. Add your domain (e.g., mahihakim.dev)
3. Follow the DNS verification steps
4. Update the `from` email in `/app/api/contact/route.ts` to use your verified domain

### 4. Test the Setup
1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email (mahiabdul20@gmail.com) for the message

## Features Included

✅ **Real Email Delivery**: Messages sent directly to your email  
✅ **Loading States**: Button shows "Sending..." with spinner  
✅ **Success/Error Notifications**: Toast notifications for feedback  
✅ **Form Validation**: Client and server-side validation  
✅ **Responsive Design**: Works on all devices  
✅ **Professional Email Template**: Beautiful HTML email format  

## Troubleshooting

### Common Issues:
1. **"Failed to send email"**: Check your Resend API key
2. **"Network error"**: Check your internet connection
3. **Emails not received**: Check spam folder or Resend dashboard

### Resend Limits:
- Free tier: 3,000 emails/month
- Paid plans start at $20/month for 50,000 emails

## Security Notes
- API key is stored in environment variables (not in code)
- Form includes validation to prevent spam
- Rate limiting can be added if needed

## Customization
You can customize:
- Email template in `/app/api/contact/route.ts`
- Toast notification styles in `/components/ui/toast.tsx`
- Form validation rules
- Success/error messages 