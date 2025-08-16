import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the schema for the request body
const bookingFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  package: z.string(),
  date: z.string(), // Date will be a string when passed from the client
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the request body against the schema
    const parsed = bookingFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
    }

    const { name, email, phone, date, message } = parsed.data;
    const selectedPackage = parsed.data.package; // 'package' is a reserved word

    // Construct the email
    const { data, error } = await resend.emails.send({
      from: 'Private Popcorn <privatepopcorn.com>', // IMPORTANT: This must be a verified domain in Resend
      to: ['tsnagaprasadts@gmail.com'],
      subject: `New Booking Inquiry from ${name}`,
      html: `
        <h1>New Booking Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Package:</strong> ${selectedPackage}</p>
        <p><strong>Preferred Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message provided.'}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Error sending email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
