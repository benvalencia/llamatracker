 const { Client, Language } = require('fnapicom');

 const client = new Client({
  language: Language.English,
  apiKey: '2eb358b4-ef78-41ce-aecb-961725393619',
});

 client.aesKeys()
  .then(console.log);