import { createSendflare } from '../src';

/**
 * Example: Advanced error handling
 */
async function errorHandlingExample() {
  const client = createSendflare('your-api-token-here');

  // Example 1: Try-catch with detailed error information
  try {
    const response = await client.sendEmail({
      from: 'sender@example.com',
      to: 'invalid-email', // Invalid email format
      subject: 'Test',
      body: 'Test email',
    });
    console.log('Success:', response);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  }

  // Example 2: Retry logic
  async function sendEmailWithRetry(maxRetries = 3) {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}...`);
        const response = await client.sendEmail({
          from: 'sender@example.com',
          to: 'recipient@example.com',
          subject: 'Test with Retry',
          body: 'This email is sent with retry logic',
        });
        console.log('✓ Email sent successfully!');
        return response;
      } catch (error) {
        lastError = error as Error;
        console.error(`✗ Attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new Error(`Failed after ${maxRetries} attempts: ${lastError?.message}`);
  }

  // Example 3: Graceful degradation
  async function sendEmailWithFallback() {
    try {
      return await client.sendEmail({
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Primary Email',
        body: 'Primary email content',
      });
    } catch (error) {
      console.warn('Primary send failed, trying fallback...');
      
      // Fallback logic
      return await client.sendEmail({
        from: 'fallback@example.com',
        to: 'recipient@example.com',
        subject: 'Fallback Email',
        body: 'Fallback email content',
      });
    }
  }

  // Run examples
  await sendEmailWithRetry();
  await sendEmailWithFallback();
}

errorHandlingExample();

