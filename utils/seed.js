const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = new User({
      username: getRandomName(),
      email: `user${i}@example.com`,
    });
    users.push(user);
  }
  const insertedUsers = await User.insertMany(users);

  // Add random friends to each user
  for (const user of insertedUsers) {
    const numberOfFriends = Math.floor(Math.random() * 5) + 1;
    const friendCandidates = insertedUsers.filter(
      (u) => u._id.toString() !== user._id.toString()
    );
    const randomFriends = getRandomSubset(friendCandidates, numberOfFriends);
    user.friends = randomFriends.map((friend) => friend._id);
    await user.save();
  }

  // Add random thoughts to each user
  const thoughts = [];
  for (const user of insertedUsers) {
    const numThoughts = Math.floor(Math.random() * 5) + 1;
    const userThoughts = getRandomThoughts(numThoughts);

    const insertedThoughts = await Thought.insertMany(
      userThoughts.map((thought) => ({
        ...thought,
        username: user.username,
        userId: user._id,
      }))
    );
    
    user.thoughts = insertedThoughts.map((thought) => thought._id);
    await user.save();
  }

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});


function getRandomSubset(array, size) {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}