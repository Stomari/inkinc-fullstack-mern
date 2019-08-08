// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');

const bcryptSalt = 10;

mongoose
  .connect('mongodb://heroku_zr2pwl5n:9rhdnvu0hdqv22lu5v6tjd3jtj@ds141185.mlab.com:41185/heroku_zr2pwl5n', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// const users = [
//   {
//     email: 'alice',
//     password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     email: 'bob',
//     password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
//   },
// ];


// User.deleteMany()
//   .then(() => User.create(users))
//   .then((usersCreated) => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     mongoose.disconnect();
//     throw err;
//   });

const categories = [
  {
    tag: 'Traditional',
  },
  {
    tag: 'Realism',
  },
  {
    tag: 'Tribal',
  },
  {
    tag: 'Japanese',
  },
  {
    tag: 'Watercolor',
  },
  {
    tag: 'Lettering',
  },
  {
    tag: 'New School',
  },
  {
    tag: 'Blackwork',
  },
  {
    tag: 'Dotwork',
  },
  {
    tag: 'Geometric',
  },
  {
    tag: 'Fine Line',
  },
];

Category.deleteMany()
  .then(() => Category.create(categories))
  .then((categoriesCreated) => {
    console.log(`${categoriesCreated.length} categories created with the following id:`);
    console.log(categoriesCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
