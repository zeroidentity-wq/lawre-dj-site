import 'dotenv/config'
import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

const { Client } = pg
const url = process.env.DATABASE_URI
if (!url) {
  console.error('Missing DATABASE_URI')
  process.exit(1)
}
const client = new Client({ connectionString: url })
await client.connect()
console.log('Dropping public schema...')
await client.query('DROP SCHEMA public CASCADE')
await client.query('CREATE SCHEMA public')
await client.query('GRANT ALL ON SCHEMA public TO public')
console.log('Done.')
await client.end()
