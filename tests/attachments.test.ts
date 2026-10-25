import { createSendflare, SendAttachment, SendEmailReq, BatchSendEmailReq } from '../src';

describe('attachment requests', () => {
  const originalFetch = global.fetch;
  afterEach(() => { global.fetch = originalFetch; });

  test.each([false, true])('serializes attachments (batch=%s)', async (batch) => {
    const attachments: SendAttachment[] = [
      { filename: '文件.bin', content: Buffer.from([0, 255, 1, 128]).toString('base64') },
      { filename: 'logo.png', content: 'aGVsbG8=', contentType: 'image/png', contentId: 'logo', disposition: 'inline' },
      { filename: 'empty.txt', content: '', disposition: 'attachment' },
    ];
    const send = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    global.fetch = send;
    for (const files of [undefined, attachments]) {
      const common = { from: 'from@example.com', subject: 'test', body: '<img src="cid:logo">', cc: [], bcc: [], replyTo: [], attachments: files };
      const client = createSendflare('test-token');
      const response = batch
        ? await client.batchSendEmail({ ...common, to: ['to@example.com'] } as BatchSendEmailReq)
        : await client.sendEmail({ ...common, to: 'to@example.com' } as SendEmailReq);
      expect(response.success).toBe(true);
      const [url, options] = send.mock.calls[send.mock.calls.length - 1];
      expect(url).toBe(`https://api.sendflare.com/v1/${batch ? 'batchSend' : 'send'}`);
      const payload = JSON.parse(options.body);
      if (files) {
        expect(payload.attachments).toEqual(attachments);
        expect(payload.attachments[0]).toEqual({ filename: '文件.bin', content: 'AP8BgA==' });
      } else {
        expect(payload).not.toHaveProperty('attachments');
      }
    }
  });
});
