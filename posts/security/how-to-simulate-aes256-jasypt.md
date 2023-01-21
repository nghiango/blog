---
title: 'How to simulate AES256 of Jasypt'
date: 'Jun 23, 2022'
excerpt: 'Crash course to learn the React JavaScript library. We will look at components, hooks and more'
tag: 'Nodejs'
cover_image: '/images/posts/img5.jpg'
---

Jasypt is a lib of Java that has some function of decrypt and encrypt a sensitive information. It is fine if we are only using Java project to encrypt and decrypt sensitive information. However, how about if the sensitive information is encrypted in Java and decrypt in NodeJs project which only has crypto as a cryptographic provider but not specific for AES256, especially the default AES256 of Jasypt.

To simulate it, we need to define some values that Jasypt uses to encrypt and decrypt.

- Argument: 'aes-256-cbc'
- Interations pbkdf2 = 1000
- key lenth pbkdf2 = 32
- digest pbkdf2 = sha512

```js
/** Function serve Jasypt text: http://www.jasypt.org/encrypting-texts.html
 * With default config:
 * - Algorithm: PBEWithHmacSHA512AndAES_256
 * - Salt: RandomSaltGenerator
 * - Iv: RandomIvGenerator
**/
const crypto = require('crypto');
const { encryptionPassword } = require('../../config/env');
const ARGUMENT = 'aes-256-cbc';
const ITERATIONS_PBKDF2 = 1000;
const KEY_LENGTH_PBKDF2 = 32;
const DIGEST_PBKDF2 = 'sha512';
const BASE64 = 'base64';
const UTF8 = 'utf8';
const ENCRYPTION_PASSWORD_PROJECT = 'psd2-consent-mgmt';
let decryptedEncryptionPassword = '';

const encrypt = (sensitiveString) => {
  const salt = crypto.randomBytes(16);

  let realEncryptionKey = ENCRYPTION_PASSWORD_PROJECT;
  
  if (decryptedEncryptionPassword) {
    realEncryptionKey = decryptedEncryptionPassword;
  }

  const key = crypto.pbkdf2Sync(realEncryptionKey, salt, ITERATIONS_PBKDF2, KEY_LENGTH_PBKDF2, DIGEST_PBKDF2);

  const iv = new Buffer(crypto.randomBytes(16), UTF8);

  const cipher = crypto.createCipheriv(ARGUMENT, key, iv);

  let encrypted = cipher.update(sensitiveString);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  encrypted = Buffer.concat([iv, encrypted]);
  encrypted = Buffer.concat([salt, encrypted]);

  return encrypted.toString(BASE64);
};


const decrypt = (encryptedString) => {
  const bufferEncryptedStr = Buffer.from(encryptedString, BASE64);
  const salt = new Buffer(16);
  // Follow the implementation of Jasypt, the first 16 bytes are salt
  bufferEncryptedStr.copy(salt, 0, 0, 16);

  const iv = new Buffer(16);
  // Follow the implementation of Jasypt, the next 16 bytes are IV
  bufferEncryptedStr.copy(iv, 0, 16, 32);

  const bufferLength = bufferEncryptedStr.length;
  const sensitiveEncrypted = new Buffer(bufferLength - 32);
  // Follow the implementation of Jasypt, the rest bytes are sensitiveEncrypted
  bufferEncryptedStr.copy(sensitiveEncrypted, 0, 32, bufferLength);
  
  let realEncryptionKey = ENCRYPTION_PASSWORD_PROJECT;
  
  if (decryptedEncryptionPassword) {
    realEncryptionKey = decryptedEncryptionPassword;
  }
  const key = crypto.pbkdf2Sync(realEncryptionKey, salt, ITERATIONS_PBKDF2, KEY_LENGTH_PBKDF2, DIGEST_PBKDF2);

  const decipher = crypto.createDecipheriv(ARGUMENT, key, iv);
  let decrypted;
  decrypted = decipher.update(sensitiveEncrypted);
  decrypted += decipher.final(UTF8);
  return decrypted;
};

decryptedEncryptionPassword = decrypt(encryptionPassword);

module.exports = {
  encrypt,
  decrypt
};
```