
const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'wikiuser',
  database:'wiki',
  password: '********',
})


client.connect()
client.query('SELECT * from wiki', (err, res) => {
  console.log(err ? err.stack : res.rows[0]) // Hello World!
  client.end()
})
