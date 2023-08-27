const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log("connected");
//   await Thought.deleteMany({});
//   await User.deleteMany({});

//   const users = [];
//   for (let i = 0; i < 20; i++) {
//     const user = new User({ username: getRandomName(), email: `user${i}@example.com` });
//     users.push(user);
//   }
//   const insertedUsersResponse = await User.collection.insertMany(users);
//   const insertedUsersIds = Object.values(insertedUsersResponse.insertedIds);
//   const insertedUsers = await User.find({ _id: { $in: insertedUsersIds } });
//   // console.log(insertedUsers);

//   // Add random friends to each user
//   for (const user of insertedUsers) {
//     const numberOfFriends = Math.floor(Math.random() * 5) + 1;
//     const friendCandidates = insertedUsers.filter(
//       (u) => u._id !== user._id
//     );
//     const randomFriends = getRandomSubset(friendCandidates, numberOfFriends);
//     user.friends = randomFriends.map((friend) => friend._id);
//     await User.collection.updateOne(
//       { _id: user._id },
//       { $set: { friends: user.friends } }
//     );
//   }

//   const thoughts = [];
//   for (const user of users) {
//     const numThoughts = Math.floor(Math.random() * 5) + 1;
//     const userThoughts = getRandomThoughts(numThoughts);

//     const insertedThoughts = await Thought.collection.insertMany(
//       userThoughts.map((thought) => ({
//         ...thought,
//         username: user.username,
//         userId: user._id,
//       }))
//     );

//   const thoughtIds = insertedThoughts.insertedIds;
//   user.thoughts = thoughtIds;
//   console.log(user)
//   await user.save();

//     thoughts.push(...insertedThoughts);
//   }

//   // loop through the saved thoughts, for each thought we need to generate a thought response and insert the thought responses
//   console.table(users);
//   console.table(thoughts);
//   console.info("Seeding complete! 🌱");
//   process.exit(0);
// });

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

  // console.log(users)
  console.log(insertedUsers)

  const thoughts = [];
  for (const user of insertedUsers) {
    const numThoughts = Math.floor(Math.random() * 5) + 1;
    const userThoughts = getRandomThoughts(numThoughts);

    console.log(userThoughts)
    const insertedThoughts = await Thought.insertMany(
      userThoughts.map((thought) => ({
        ...thought,
        username: user.username,
        userId: user._id,
      }))
    );
    user.thoughts = insertedThoughts.map((thought) => thought._id);
    console.log(user)
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