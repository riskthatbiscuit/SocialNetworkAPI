const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push({ username: getRandomName(), email: `user${i}@example.com` });
  }
  await User.collection.insertMany(users);

  const thoughts = [];
  for (const user of users) {
    const userThoughts = getRandomThoughts(5);
    for (const thought of userThoughts) {
      thought.userId = user._id;
    }
    thoughts.push(...userThoughts);
  }
  await Thought.collection.insertMany(thoughts);


  // loop through the saved thoughts, for each thought we need to generate a thought response and insert the thought responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
