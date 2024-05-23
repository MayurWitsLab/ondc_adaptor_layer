import crypto from 'crypto';

class BecknAuth {
    static createAuthHeader(apiKey: string, secret: string) {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = crypto.createHmac('sha256', secret)
            .update(apiKey + timestamp)
            .digest('hex');

        return {
            'Authorization': `Bearer ${signature}`,
            'X-Timestamp': timestamp.toString()
        };
    }

    static validateAuthHeader(header: any, apiKey: string, secret: string) {
        const timestamp = header['X-Timestamp'];
        const signature = header['Authorization'].split(' ')[1];
        const expectedSignature = crypto.createHmac('sha256', secret)
            .update(apiKey + timestamp)
            .digest('hex');

        return signature === expectedSignature;
    }
}

export default BecknAuth;