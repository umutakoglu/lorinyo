import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
    private readonly encryptionKey: string;

    constructor(private configService: ConfigService) {
        this.encryptionKey = this.configService.get('ENCRYPTION_KEY');

        if (!this.encryptionKey || this.encryptionKey.length < 32) {
            throw new Error('ENCRYPTION_KEY must be at least 32 characters');
        }
    }

    /**
     * Encrypt sensitive data (API keys, secrets)
     */
    encrypt(plainText: string): string {
        if (!plainText) {
            return '';
        }

        return CryptoJS.AES.encrypt(plainText, this.encryptionKey).toString();
    }

    /**
     * Decrypt sensitive data
     */
    decrypt(cipherText: string): string {
        if (!cipherText) {
            return '';
        }

        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, this.encryptionKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            throw new Error('Failed to decrypt data');
        }
    }

    /**
     * Hash data (one-way, for verification only)
     */
    hash(data: string): string {
        return CryptoJS.SHA256(data).toString();
    }

    /**
     * Verify hash
     */
    verifyHash(data: string, hash: string): boolean {
        return this.hash(data) === hash;
    }
}
