const { migrateUsers } = require('./users/migrate');
const { postProcessResponse, wrapIdentifier } = require('./knexHelpers');

// console.log('POSTGRES_HOST', process.env.POSTGRES_HOST);

const props = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
  postProcessResponse,
  wrapIdentifier,
};

const pg = require('knex')(props);

migrateUsers().then(users =>
  Promise.all(users.map(user =>
    pg('osbb_park_tower.users')
      .insert(user)
      .catch(console.error)
  ))
).then(() => {
  console.log('All done!');
  process.exit(0);
});
