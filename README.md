# sendflare-sdk-ts

The SDK for sendflare service written in TypeScript.

## Requirements

> Node.js Version >= 14.0.0

## Installation

```bash
npm install sendflare-sdk-ts
```

or

```bash
yarn add sendflare-sdk-ts
```

or

```bash
pnpm add sendflare-sdk-ts
```

## Code Examples

### Basic Usage

```typescript
import { createSendflare } from 'sendflare-sdk-ts';

const client = createSendflare('this-is-my-token');

const req = {
  from: 'test@example.com',
  to: 'to@example.com',
  subject: 'test',
  body: 'test email',
};

client.sendEmail(req)
  .then(response => {
    console.log('Email sent successfully:', response);
  })
  .catch(error => {
    console.error('Failed to send email:', error);
  });
```

### Using async/await

```typescript
import { Sendflare } from 'sendflare-sdk-ts';

async function main() {
  const client = new Sendflare('this-is-my-token');
  
  try {
    // Send an email
    const emailResponse = await client.sendEmail({
      from: 'test@example.com',
      to: 'to@example.com',
      subject: 'test',
      body: 'test email',
    });
    console.log('Email sent:', emailResponse);
    
    // Get contact list
    const contacts = await client.getContactList({
      appId: 'your-app-id',
      page: 1,
      pageSize: 10,
    });
    console.log('Contacts:', contacts);
    
    // Save a contact
    const saveResponse = await client.saveContact({
      appId: 'your-app-id',
      emailAddress: 'contact@example.com',
      data: {
        firstName: 'John',
        lastName: 'Doe',
      },
    });
    console.log('Contact saved:', saveResponse);
    
    // Delete a contact
    const deleteResponse = await client.deleteContact({
      appId: 'your-app-id',
      emailAddress: 'contact@example.com',
    });
    console.log('Contact deleted:', deleteResponse);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## API Reference

### `createSendflare(token: string): SendflareImpl`

Create a new Sendflare client instance.

**Parameters:**
- `token` - Your Sendflare API token

**Returns:** A Sendflare client instance

### `Sendflare.sendEmail(req: SendEmailReq): Promise<SendEmailResp>`

Send an email.

**Parameters:**
- `req.from` - Sender email address
- `req.to` - Recipient email address
- `req.subject` - Email subject
- `req.body` - Email body content

### `Sendflare.getContactList(req: ListContactReq): Promise<ListContactResp>`

Get contact list with pagination.

**Parameters:**
- `req.appId` - Application ID
- `req.page` - Page number
- `req.pageSize` - Number of items per page

### `Sendflare.saveContact(req: SaveContactReq): Promise<SaveContactResp>`

Create or update a contact.

**Parameters:**
- `req.appId` - Application ID
- `req.emailAddress` - Contact email address
- `req.data` - Optional contact data fields

### `Sendflare.deleteContact(req: DeleteContactReq): Promise<DeleteContactResp>`

Delete a contact.

**Parameters:**
- `req.appId` - Application ID
- `req.emailAddress` - Contact email address to delete

## TypeScript Support

This SDK is written in TypeScript and includes complete type definitions out of the box. No need to install separate `@types` packages.

```typescript
import { Sendflare, SendEmailReq, SendEmailResp } from 'sendflare-sdk-ts';

const client = new Sendflare('your-token');
const req: SendEmailReq = {
  from: 'test@example.com',
  to: 'to@example.com',
  subject: 'test',
  body: 'test email',
};

const response: SendEmailResp = await client.sendEmail(req);
```

## Documentation

[https://docs.sendflare.io](https://docs.sendflare.io)

## LICENSE

[MIT](./LICENSE)

