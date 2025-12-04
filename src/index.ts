import {
  SendEmailReq,
  SendEmailResp,
  ListContactReq,
  ListContactResp,
  SaveContactReq,
  SaveContactResp,
  DeleteContactReq,
  DeleteContactResp,
} from './types';

const BASE_URL = 'https://api.sendflare.io';
const REQUEST_TIMEOUT = 10000; // 10 seconds in milliseconds

/**
 * Sendflare SDK interface
 */
export interface SendflareImpl {
  /**
   * Send an email
   */
  sendEmail(req: SendEmailReq): Promise<SendEmailResp>;
  
  /**
   * Get contact list
   */
  getContactList(req: ListContactReq): Promise<ListContactResp>;
  
  /**
   * Create or update contact
   */
  saveContact(req: SaveContactReq): Promise<SaveContactResp>;
  
  /**
   * Delete a contact
   */
  deleteContact(req: DeleteContactReq): Promise<DeleteContactResp>;
}

/**
 * Sendflare SDK client
 */
export class Sendflare implements SendflareImpl {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Send an email
   */
  async sendEmail(req: SendEmailReq): Promise<SendEmailResp> {
    const path = '/v1/send';
    
    const response = await this.makeRequest<SendEmailResp>('POST', path, req);
    return response;
  }

  /**
   * Get contact list
   */
  async getContactList(req: ListContactReq): Promise<ListContactResp> {
    const path = '/v1/contact';
    
    const params = new URLSearchParams({
      appId: req.appId,
      page: req.page.toString(),
      pageSize: req.pageSize.toString(),
    });

    const response = await this.makeRequest<ListContactResp>('GET', `${path}?${params.toString()}`);
    return response;
  }

  /**
   * Create or update contact
   */
  async saveContact(req: SaveContactReq): Promise<SaveContactResp> {
    const path = '/v1/contact';
    
    const response = await this.makeRequest<SaveContactResp>('POST', path, req);
    return response;
  }

  /**
   * Delete a contact
   */
  async deleteContact(req: DeleteContactReq): Promise<DeleteContactResp> {
    const path = '/v1/contact';
    
    const params = new URLSearchParams({
      appId: req.appId,
      emailAddress: req.emailAddress,
    });

    const response = await this.makeRequest<DeleteContactResp>('DELETE', `${path}?${params.toString()}`);
    return response;
  }

  /**
   * Make HTTP request
   */
  private async makeRequest<T>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const headers = this.makeHeaders();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const options: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Make request headers
   */
  private makeHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}

/**
 * Create a new Sendflare client instance
 */
export function createSendflare(token: string): SendflareImpl {
  return new Sendflare(token);
}

// Export types
export * from './types';

// Default export
export default Sendflare;

