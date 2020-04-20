const { createReadStream } = require('fs')
const csv = require('csvtojson')
const uuid = require('uuid/v5');

const parseName = name => {
  const [lastName, firstName, patName] = name.split(' ');
  return {firstName, lastName, patName};
};

const parseNameViber = name => {
  const [firstName, lastName] = name.split(' ');
  return {firstName, lastName};
};

const parsePhone = phone => {
  const num = phone.replace(/[^0-9]/g, '');
  return num[0] === '0' ?
    `+38${num}` : '+' + num;
}

const migrateGoogleDocs = (callback) =>
  new Promise((resolve, reject) => {
    console.log('Importing Google Form...');
    csv()
      .fromStream(createReadStream(__dirname + '/google-form.csv'))
      .subscribe(({
        email, name, phone,
        number, space, state, requirements,
      }) => callback({
          email,
          ...parseName(name),
          phone: parsePhone(phone),
          info: { number, space, state, requirements, }
      }),
      reject,
      resolve
    );
  });

const migrateViberGroup = (callback) =>
  new Promise((resolve, reject) => {
    csv()
      .fromStream(createReadStream(__dirname + '/viber-group.csv'))
      .subscribe(({
        name, phone,
      }) => callback({
          ...parseNameViber(name),
          phone,
      }),
      reject,
      resolve
    );
  });

const combine = users => user => {
  users[user.phone] = users[user.phone]
    ? users[user.phone]
    : user;
}

exports.migrateUsers = async () => {
  const users = {};
  await migrateGoogleDocs(combine(users));
  await migrateViberGroup(combine(users));
  return Object.values(users).map(user => ({
    id: uuid(user.phone, process.env.UUID_NAMESPACE),
    ...user,
  }));
}
