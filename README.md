# Hello Cage
[Evervault](https://evervault.com) makes it easy to encrypt data at source, process it in a Cage — a secure, serverless function — and never store it unencrypted.

This is a simple Evervault Cage example, to help get you up and running on the Evervault platform quickly.

## Getting started with Evervault

Evervault consists of two parts, encrypting your data at source, using either our Node SDK, or Browser and React SDKs and then sending that encrypted data to a cage to be processed securely.

This Cage takes a payload that should contain a `name` key. Running the cage is very simple.

## The steps
1. Encrypt your data at source, using either the Node SDK or Browser and React SDKs.
2. Process the encrypted data in a cage

### Encrypting at source
```javascript
// This example uses the Evervault Node SDK.
const Evervault = require('@evervault/sdk');

// Initialize the client with your team’s API key
const evervault = new Evervault('<YOUR-API-KEY>');

// Encrypt your data
const encrypted = await evervault.encrypt({ name: 'Elon Musk' });
```

### Process your encrypted data in a cage
You should encrypt this payload using either our Node SDK or Browser SDK, then run it in the Hello Cage:

```javascript
// Process the encrypted data in a Cage
const result = await evervault.run('hello-cage', encrypted);
```

## Understanding the Cage
This Cage is very simple. Here is the full code:
```javascript
exports.handler = async (event) => {
  console.debug('This is the data that has arrived into the Cage.', event);

  if (event.name && event.name.length > 0) {
    return {
      message: `Hello, ${event.name}!`,
      details: 'The cage is decrypting your name and returning it in plaintext',
      encrypted: await evervault.encrypt(event.name),
    };
  } else {
    return {
      message: 'Hello, world!',
      details:
        'Please send an encrypted `name` parameter to show Cage decryption in action',
    };
  }
};
```

Or check it out in [index.js](./index.js).

--- 
If you want to know more about Evervault, check out our [documentation](https://docs.evervault.com).

_Note: you'll need you documentation login to access these docs for now. If you don't have one, please [join our waiting list](https://evervault.com)_
