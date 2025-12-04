/**
 * Pagination request entity
 */
export interface PaginateReq {
  page: number;
  pageSize: number;
}

/**
 * Pagination response entity
 */
export interface PaginateResp {
  page: number;
  pageSize: number;
  totalCount: number;
}

/**
 * Common response entity
 */
export interface CommonResponse<T = any> {
  requestId: string;
  code: number;
  success: boolean;
  message: string;
  ts: number;
  data?: T;
}

/**
 * Send Email request entity
 */
export interface SendEmailReq {
  from: string;
  to: string;
  subject: string;
  body: string;
}

/**
 * Send Email response entity
 */
export type SendEmailResp = CommonResponse;

/**
 * Get Contact list request entity
 */
export interface ListContactReq extends PaginateReq {
  appId: string;
}

/**
 * Contact info entity
 */
export interface ContactItem {
  status: string;
  emailAddress: string;
  language: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  company: string;
  vipLevel: number;
  amount: string;
}

/**
 * Get Contact list response entity
 */
export interface ListContactResp extends PaginateResp {
  data: ContactItem[];
}

/**
 * Save contact request entity
 */
export interface SaveContactReq {
  appId: string;
  emailAddress: string;
  data?: Record<string, string>;
}

/**
 * Save contact response entity
 */
export type SaveContactResp = CommonResponse;

/**
 * Delete a contact request entity
 */
export interface DeleteContactReq {
  emailAddress: string;
  appId: string;
}

/**
 * Delete contact response entity
 */
export type DeleteContactResp = CommonResponse;

