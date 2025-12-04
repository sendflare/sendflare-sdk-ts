import { createSendflare } from '../src';

/**
 * Example: Send a simple email
 */
async function sendSimpleEmail() {
  const client = createSendflare('your-api-token-here');

  try {
    const response = await client.sendEmail({
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'Hello from Sendflare',
      body: 'This is a test email sent using sendflare-sdk-ts',
    });

    console.log('Email sent successfully!');
    console.log('Response:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendSimpleEmail();

