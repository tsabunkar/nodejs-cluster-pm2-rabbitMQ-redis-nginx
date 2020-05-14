// !to make ajax call using lib- fetch
const fetch = require('node-fetch');

class JphUsersApi {
  constructor() {}
  // !return promise object
  fetchUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users');
  }
}

module.exports = new JphUsersApi();
