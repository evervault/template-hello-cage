// The Evervault Node.js SDK (https://docs.evervault.com/sdk/nodejs) is pre-initialized in 
// all Cages as the globally-scoped `evervault` object.This allows you to encrypt the result, 
// and store it in your database.

function createWelcomeMessage(name) {
  const formattedName = name.split(' ').map(partialName => {
    if (partialName.length > 1) {
      return partialName[0] + '*'.repeat(partialName.length - 2) + partialName.slice(-1);
    }
    return partialName
  }).join(' ');

  return `Hello, ${formattedName}!`
}

// `data` is the data you encrypted and passed into `evervault.run` from your server. The cage 
// automatically decrypts the data and maintains its structure so you can treat event exactly as 
// you did when you passed it into `evervault.run`.
exports.handler = async (data) => {
  // Check if the data sent into the cage has a key called `name` with a value that is longer than 0
  if (data.name && data.name.length > 0) {
    console.debug(`A name of length ${data.name.length} has arrived into the cage.`);

    // Process the decrypted name value, and re-encrypt the original name using the globally available evervault package.
    // Note all cages have the evervault SDK automatically injected into their global scope.
    return {
      message: createWelcomeMessage(data.name),
      name: await evervault.encrypt(data.name),
    };
  } else {
    console.debug('An empty name has arrived into the cage.');

    return {
      message: 'Hello from a cage! Send an encrypted `name` parameter to show cage decryption in action',
    };
  }
};
