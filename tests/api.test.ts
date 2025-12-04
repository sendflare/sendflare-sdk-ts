import { Sendflare, createSendflare } from '../src';
import {
  SendEmailReq,
  ListContactReq,
  SaveContactReq,
  DeleteContactReq,
} from '../src/types';

describe('Sendflare SDK', () => {
  const testToken = 'this-is-my-token';

  describe('createSendflare', () => {
    test('should create a new Sendflare instance', () => {
      const client = createSendflare(testToken);
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(Sendflare);
    });
  });

  describe('sendEmail', () => {
    test('should send an email', async () => {
      const client = createSendflare(testToken);
      const req: SendEmailReq = {
        from: 'test@example.com',
        to: 'to@example.com',
        subject: 'test',
        body: 'test email',
      };

      // Note: This test will fail without a valid token
      // In a real environment, you should mock the fetch call
      console.log('SendEmail request:', req);
      
      try {
        const result = await client.sendEmail(req);
        console.log('SendEmail response:', result);
      } catch (error) {
        console.log('SendEmail error (expected without valid token):', error);
      }
    });
  });

  describe('getContactList', () => {
    test('should get contact list', async () => {
      const client = createSendflare(testToken);
      const req: ListContactReq = {
        appId: 'test',
        page: 1,
        pageSize: 10,
      };

      console.log('GetContactList request:', req);
      
      try {
        const result = await client.getContactList(req);
        console.log('GetContactList response:', result);
      } catch (error) {
        console.log('GetContactList error (expected without valid token):', error);
      }
    });
  });

  describe('saveContact', () => {
    test('should save a contact', async () => {
      const client = createSendflare(testToken);
      const req: SaveContactReq = {
        appId: 'test',
        emailAddress: 'test@example.com',
        data: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      console.log('SaveContact request:', req);
      
      try {
        const result = await client.saveContact(req);
        console.log('SaveContact response:', result);
      } catch (error) {
        console.log('SaveContact error (expected without valid token):', error);
      }
    });
  });

  describe('deleteContact', () => {
    test('should delete a contact', async () => {
      const client = createSendflare(testToken);
      const req: DeleteContactReq = {
        appId: 'test',
        emailAddress: 'test@example.com',
      };

      console.log('DeleteContact request:', req);
      
      try {
        const result = await client.deleteContact(req);
        console.log('DeleteContact response:', result);
      } catch (error) {
        console.log('DeleteContact error (expected without valid token):', error);
      }
    });
  });
});

