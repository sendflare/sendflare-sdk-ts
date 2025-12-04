import { createSendflare } from '../src';

/**
 * Example: Manage contacts (create, list, delete)
 */
async function manageContacts() {
  const client = createSendflare('your-api-token-here');
  const appId = 'your-app-id';

  try {
    // 1. Save a new contact
    console.log('\n1. Creating a new contact...');
    const saveResponse = await client.saveContact({
      appId,
      emailAddress: 'john.doe@example.com',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp',
      },
    });
    console.log('Contact saved:', saveResponse);

    // 2. Get contact list
    console.log('\n2. Fetching contact list...');
    const listResponse = await client.getContactList({
      appId,
      page: 1,
      pageSize: 10,
    });
    console.log(`Found ${listResponse.totalCount} contacts`);
    console.log('Contacts:', listResponse.data);

    // 3. Update existing contact
    console.log('\n3. Updating contact...');
    const updateResponse = await client.saveContact({
      appId,
      emailAddress: 'john.doe@example.com',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        company: 'New Company Inc',
        phoneNumber: '+1234567890',
      },
    });
    console.log('Contact updated:', updateResponse);

    // 4. Delete contact
    console.log('\n4. Deleting contact...');
    const deleteResponse = await client.deleteContact({
      appId,
      emailAddress: 'john.doe@example.com',
    });
    console.log('Contact deleted:', deleteResponse);

  } catch (error) {
    console.error('Error managing contacts:', error);
  }
}

manageContacts();

