// The [Evervault Node.js SDK](https://docs.evervault.com/sdk/nodejs) is pre-initialized in all Cages as the globally-scoped `evervault` object.
// This allows you to encrypt the result, and store it in your database.
/*global evervault*/

// event is the data you encrypted and passed into `evervault.run` from your server. 
// The cage automatically decrypts the data and maintains its structure
// so you can treat event exactly as you did when you passed it into `evervault.run`.

exports.handler = async (event) => {
  console.debug('This is the data that has arrived into the cage.', event);

  // Check if the event sent into the cage has a key called `name` and `name` has a value that is longer than 0
  if (event.name && event.name.length > 0) {
    // Return the decrypted name value, and then re-encrypt using the globally available evervault package.
    // Note all cages have the evervault SDK automatically injected into their global scope.
    return {
      message: `Hello, ${event.name}!`,
      details: 'The cage is decrypting your name and returning it in plaintext',
      encrypted: await evervault.encrypt(event.name),
    };
  } else {
    return {
      message: 'Hello, world!',
      details:
        'Please send an encrypted `name` parameter to show cage decryption in action',
    };
  }
};
