// Importing modules
// bcrypt => module that include hashing functions
const bcrypt = require('bcryptjs');

// Generate a hash based on a password
const hashPaswd = async (paswd) => {
    const saltR = 5;
    // Random value assigned to password
    const hashedPaswd = await bcrypt.hash(paswd, saltR);
    return hashedPaswd;
}

// Verify based on a input password and the hash storage in database
const verifyPaswd = async (paswd, hashedPaswd) => {
    // Returns a boolean to verified or no
    const verify = await bcrypt.compare(paswd, hashedPaswd);
    return verify;
}

// Exporting functions
module.exports = {hashPaswd, verifyPaswd};