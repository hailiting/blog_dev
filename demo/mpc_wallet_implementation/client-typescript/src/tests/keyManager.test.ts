/**
 * 密钥管理测试
 */

import BN from 'bn.js';
import { MPCKeyManager } from '../keyManager';

describe('MPCKeyManager', () => {
  describe('generatePrivateKeyFragment', () => {
    test('should generate valid private key fragment', () => {
      const fragment = MPCKeyManager.generatePrivateKeyFragment();
      
      expect(fragment.skUser).toBeInstanceOf(BN);
      expect(fragment.pkUser).toBeInstanceOf(Uint8Array);
      expect(fragment.pkUser.length).toBe(32);
    });

    test('should generate unique private keys', () => {
      const fragment1 = MPCKeyManager.generatePrivateKeyFragment();
      const fragment2 = MPCKeyManager.generatePrivateKeyFragment();
      
      expect(fragment1.skUser.toString()).not.toBe(fragment2.skUser.toString());
    });
  });

  describe('Plaintext storage', () => {
    test('savePlaintext and restoreFromPlaintext should work correctly', () => {
      const skUser = new BN('12345678901234567890', 10);
      
      const encoded = MPCKeyManager.savePlaintext(skUser);
      const restored = MPCKeyManager.restoreFromPlaintext(encoded);
      
      expect(restored.toString()).toBe(skUser.toString());
    });

    test('should encode to valid Base58', () => {
      const skUser = new BN('99999', 10);
      const encoded = MPCKeyManager.savePlaintext(skUser);
      
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
      expect(/^[1-9A-HJ-NP-Za-km-z]+$/.test(encoded)).toBe(true);
    });
  });

  describe('Encrypted storage', () => {
    test('saveEncrypted and restoreFromEncrypted should work correctly', () => {
      const skUser = new BN('987654321098765432109876543210', 10);
      const password = 'MySecurePassword123!';
      
      const encrypted = MPCKeyManager.saveEncrypted(skUser, password);
      const restored = MPCKeyManager.restoreFromEncrypted(
        encrypted.encryptedData,
        password
      );
      
      expect(restored.toString()).toBe(skUser.toString());
    });

    test('should fail with wrong password', () => {
      const skUser = new BN('12345', 10);
      const correctPassword = 'correct_password';
      const wrongPassword = 'wrong_password';
      
      const encrypted = MPCKeyManager.saveEncrypted(skUser, correctPassword);
      
      expect(() => {
        MPCKeyManager.restoreFromEncrypted(encrypted.encryptedData, wrongPassword);
      }).toThrow();
    });

    test('should generate unique encrypted data with same input', () => {
      const skUser = new BN('12345', 10);
      const password = 'password';
      
      const encrypted1 = MPCKeyManager.saveEncrypted(skUser, password);
      const encrypted2 = MPCKeyManager.saveEncrypted(skUser, password);
      
      // 因为使用了随机 salt 和 IV，加密结果应该不同
      expect(encrypted1.encryptedData).not.toBe(encrypted2.encryptedData);
      expect(encrypted1.salt).not.toBe(encrypted2.salt);
      expect(encrypted1.iv).not.toBe(encrypted2.iv);
      
      // 但都能正确解密
      const restored1 = MPCKeyManager.restoreFromEncrypted(
        encrypted1.encryptedData,
        password
      );
      const restored2 = MPCKeyManager.restoreFromEncrypted(
        encrypted2.encryptedData,
        password
      );
      
      expect(restored1.toString()).toBe(skUser.toString());
      expect(restored2.toString()).toBe(skUser.toString());
    });
  });

  describe('save and restore with options', () => {
    test('should work with plaintext option', () => {
      const skUser = new BN('11111', 10);
      
      const encoded = MPCKeyManager.save(skUser, { type: 'plaintext' });
      const restored = MPCKeyManager.restore(encoded, { type: 'plaintext' });
      
      expect(restored.toString()).toBe(skUser.toString());
    });

    test('should work with encrypted option', () => {
      const skUser = new BN('22222', 10);
      const password = 'test_password';
      
      const encoded = MPCKeyManager.save(skUser, {
        type: 'encrypted',
        password,
      });
      const restored = MPCKeyManager.restore(encoded, {
        type: 'encrypted',
        password,
      });
      
      expect(restored.toString()).toBe(skUser.toString());
    });

    test('should throw error if password missing for encrypted type', () => {
      const skUser = new BN('33333', 10);
      
      expect(() => {
        MPCKeyManager.save(skUser, { type: 'encrypted' });
      }).toThrow('加密存储需要提供密码');
      
      expect(() => {
        MPCKeyManager.restore('dummy', { type: 'encrypted' });
      }).toThrow('解密需要提供密码');
    });
  });

  describe('verifyPassword', () => {
    test('should return true for correct password', () => {
      const skUser = new BN('44444', 10);
      const password = 'correct';
      
      const encrypted = MPCKeyManager.saveEncrypted(skUser, password);
      const isValid = MPCKeyManager.verifyPassword(
        encrypted.encryptedData,
        password
      );
      
      expect(isValid).toBe(true);
    });

    test('should return false for incorrect password', () => {
      const skUser = new BN('55555', 10);
      const correctPassword = 'correct';
      const wrongPassword = 'wrong';
      
      const encrypted = MPCKeyManager.saveEncrypted(skUser, correctPassword);
      const isValid = MPCKeyManager.verifyPassword(
        encrypted.encryptedData,
        wrongPassword
      );
      
      expect(isValid).toBe(false);
    });
  });
});

