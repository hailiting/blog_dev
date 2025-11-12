/**
 * 加密工具测试
 */

import {
  generateSalt,
  generateIV,
  deriveKey,
  aesEncrypt,
  aesDecrypt,
  base58Encode,
  base58Decode,
  sha256,
  generateAddress,
} from '../crypto';

describe('Crypto Utils', () => {
  describe('Salt and IV generation', () => {
    test('generateSalt should return hex string of correct length', () => {
      const salt = generateSalt(32);
      expect(salt).toHaveLength(64); // 32 bytes = 64 hex characters
      expect(/^[0-9a-f]+$/i.test(salt)).toBe(true);
    });

    test('generateIV should return hex string of correct length', () => {
      const iv = generateIV(16);
      expect(iv).toHaveLength(32); // 16 bytes = 32 hex characters
      expect(/^[0-9a-f]+$/i.test(iv)).toBe(true);
    });

    test('generateSalt should produce unique values', () => {
      const salt1 = generateSalt();
      const salt2 = generateSalt();
      expect(salt1).not.toBe(salt2);
    });
  });

  describe('Key derivation', () => {
    test('deriveKey should produce consistent results', () => {
      const password = 'test_password';
      const salt = '1234567890abcdef1234567890abcdef';
      
      const key1 = deriveKey(password, salt);
      const key2 = deriveKey(password, salt);
      
      expect(key1).toBe(key2);
    });

    test('deriveKey should produce different keys for different passwords', () => {
      const salt = '1234567890abcdef1234567890abcdef';
      
      const key1 = deriveKey('password1', salt);
      const key2 = deriveKey('password2', salt);
      
      expect(key1).not.toBe(key2);
    });

    test('deriveKey should produce different keys for different salts', () => {
      const password = 'test_password';
      
      const key1 = deriveKey(password, 'salt1');
      const key2 = deriveKey(password, 'salt2');
      
      expect(key1).not.toBe(key2);
    });
  });

  describe('AES encryption/decryption', () => {
    test('aesDecrypt should recover original plaintext', () => {
      const plaintext = 'Hello, MPC Wallet!';
      const password = 'MySecurePassword';
      const salt = generateSalt();
      const iv = generateIV();
      const key = deriveKey(password, salt);

      const ciphertext = aesEncrypt(plaintext, key, iv);
      const decrypted = aesDecrypt(ciphertext, key, iv);

      expect(decrypted).toBe(plaintext);
    });

    test('aesDecrypt with wrong key should fail', () => {
      const plaintext = 'Secret data';
      const salt = generateSalt();
      const iv = generateIV();
      const key1 = deriveKey('password1', salt);
      const key2 = deriveKey('password2', salt);

      const ciphertext = aesEncrypt(plaintext, key1, iv);
      
      expect(() => {
        aesDecrypt(ciphertext, key2, iv);
      }).toThrow();
    });

    test('encrypted data should be different each time', () => {
      const plaintext = 'Test data';
      const password = 'password';
      const salt = generateSalt();
      
      const iv1 = generateIV();
      const key = deriveKey(password, salt);
      const encrypted1 = aesEncrypt(plaintext, key, iv1);
      
      const iv2 = generateIV();
      const encrypted2 = aesEncrypt(plaintext, key, iv2);
      
      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe('Base58 encoding/decoding', () => {
    test('base58Decode should recover original data', () => {
      const data = Buffer.from('Hello, Base58!', 'utf8');
      const encoded = base58Encode(data);
      const decoded = base58Decode(encoded);
      
      expect(decoded.toString('utf8')).toBe(data.toString('utf8'));
    });

    test('base58Encode should handle hex strings', () => {
      const hexData = '48656c6c6f'; // "Hello" in hex
      const encoded = base58Encode(hexData);
      const decoded = base58Decode(encoded);
      
      expect(decoded.toString('hex')).toBe(hexData);
    });

    test('base58 encoding should not contain ambiguous characters', () => {
      const data = Buffer.from('test data');
      const encoded = base58Encode(data);
      
      // Base58 should not contain 0, O, I, l
      expect(encoded).not.toMatch(/[0OIl]/);
    });
  });

  describe('SHA-256 hashing', () => {
    test('sha256 should produce consistent results', () => {
      const data = 'Test data for hashing';
      
      const hash1 = sha256(data);
      const hash2 = sha256(data);
      
      expect(hash1.toString('hex')).toBe(hash2.toString('hex'));
    });

    test('sha256 should produce different hashes for different inputs', () => {
      const hash1 = sha256('data1');
      const hash2 = sha256('data2');
      
      expect(hash1.toString('hex')).not.toBe(hash2.toString('hex'));
    });

    test('sha256 output should be 32 bytes', () => {
      const hash = sha256('test');
      expect(hash.length).toBe(32);
    });
  });

  describe('Address generation', () => {
    test('generateAddress should produce valid Bitcoin-style address', () => {
      const publicKey = Buffer.alloc(32, 0x01); // Dummy public key
      const address = generateAddress(publicKey);
      
      expect(address).toMatch(/^1[a-zA-Z0-9]+$/); // Bitcoin mainnet address starts with '1'
      expect(address.length).toBeGreaterThan(25);
      expect(address.length).toBeLessThan(35);
    });

    test('generateAddress should produce consistent results', () => {
      const publicKey = Buffer.alloc(32, 0x01);
      
      const address1 = generateAddress(publicKey);
      const address2 = generateAddress(publicKey);
      
      expect(address1).toBe(address2);
    });

    test('generateAddress should produce different addresses for different keys', () => {
      const publicKey1 = Buffer.alloc(32, 0x01);
      const publicKey2 = Buffer.alloc(32, 0x02);
      
      const address1 = generateAddress(publicKey1);
      const address2 = generateAddress(publicKey2);
      
      expect(address1).not.toBe(address2);
    });
  });
});

