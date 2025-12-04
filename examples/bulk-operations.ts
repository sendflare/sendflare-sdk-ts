import { createSendflare, SaveContactReq } from '../src';

/**
 * Example: Bulk operations with multiple contacts
 */
async function bulkOperations() {
  const client = createSendflare('your-api-token-here');
  const appId = 'your-app-id';

  // Sample contact data
  const contacts = [
    {
      emailAddress: 'user1@example.com',
      firstName: 'Alice',
      lastName: 'Smith',
    },
    {
      emailAddress: 'user2@example.com',
      firstName: 'Bob',
      lastName: 'Johnson',
    },
    {
      emailAddress: 'user3@example.com',
      firstName: 'Charlie',
      lastName: 'Williams',
    },
  ];

  try {
    // Bulk save contacts
    console.log('Saving multiple contacts...');
    const savePromises = contacts.map((contact) => {
      const req: SaveContactReq = {
        appId,
        emailAddress: contact.emailAddress,
        data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
        },
      };
      return client.saveContact(req);
    });

    const results = await Promise.allSettled(savePromises);
    
    const succeeded = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    console.log(`\nBulk operation completed:`);
    console.log(`✓ Succeeded: ${succeeded}`);
    console.log(`✗ Failed: ${failed}`);

    // Display results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`✓ Contact ${index + 1}: ${contacts[index].emailAddress} - Success`);
      } else {
        console.log(`✗ Contact ${index + 1}: ${contacts[index].emailAddress} - Failed:`, result.reason);
      }
    });

  } catch (error) {
    console.error('Bulk operation error:', error);
  }
}

bulkOperations();

