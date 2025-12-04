# Sendflare SDK Examples

This directory contains example code demonstrating how to use the Sendflare TypeScript SDK.

## Available Examples

### 1. `send-email.ts`
Basic example showing how to send a simple email.

```bash
npx ts-node examples/send-email.ts
```

### 2. `manage-contacts.ts`
Demonstrates full CRUD operations for managing contacts:
- Create/update contacts
- List contacts with pagination
- Delete contacts

```bash
npx ts-node examples/manage-contacts.ts
```

### 3. `bulk-operations.ts`
Shows how to perform bulk operations efficiently:
- Batch saving multiple contacts
- Using Promise.allSettled for parallel operations
- Error handling for bulk operations

```bash
npx ts-node examples/bulk-operations.ts
```

### 4. `error-handling.ts`
Advanced error handling patterns:
- Try-catch with detailed error information
- Retry logic with exponential backoff
- Graceful degradation with fallback

```bash
npx ts-node examples/error-handling.ts
```

## Setup

Before running the examples, make sure to:

1. Install dependencies:
```bash
npm install
```

2. Install ts-node for running TypeScript files directly:
```bash
npm install -g ts-node
```

3. Replace `'your-api-token-here'` with your actual Sendflare API token in the example files.

4. Replace `'your-app-id'` with your actual app ID where applicable.

## TypeScript Configuration

The examples use the same TypeScript configuration as the main project. You can compile them to JavaScript using:

```bash
npx tsc examples/*.ts --outDir examples/dist
```

Then run the compiled JavaScript:

```bash
node examples/dist/send-email.js
```

## Notes

- All examples use async/await for better readability
- Error handling is demonstrated in each example
- The examples are meant for educational purposes and should be adapted for production use
- Remember to handle API tokens securely (use environment variables in production)

## Environment Variables

For production use, it's recommended to use environment variables for sensitive data:

```typescript
import { createSendflare } from 'sendflare-sdk-ts';

const client = createSendflare(process.env.SENDKIT_API_TOKEN!);
```

Create a `.env` file:
```
SENDKIT_API_TOKEN=your-actual-token
SENDKIT_APP_ID=your-app-id
```

And load it using a package like `dotenv`:
```bash
npm install dotenv
```

```typescript
import 'dotenv/config';
import { createSendflare } from 'sendflare-sdk-ts';

const client = createSendflare(process.env.SENDKIT_API_TOKEN!);
```

