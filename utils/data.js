const names = [
  "John Doe",
  "Jane Smith",
  "Alex Johnson",
  "Emily Brown",
  "Michael Williams",
  "Olivia Jones",
  "Daniel Martinez",
  "Sophia Taylor",
  "Matthew Davis",
  "Ava Anderson",
];

const thoughtDescriptions = [
  "Reflecting on the importance of community involvement in tech events",
  "Exploring the potential of AI-driven creative processes",
  "Thoughts on the challenges of remote work and how to overcome them",
  "Sharing experiences from my recent backpacking adventure",
  "Why learning a new programming language is both exciting and daunting",
  "The impact of social media on modern relationships",
  "Exploring the role of ethics in artificial intelligence",
  "Musings on the art of storytelling and its cultural significance",
  "How travel broadens the mind and fuels creativity",
  "The psychology behind decision-making and its implications",
  "Discussing the rise of renewable energy and its challenges",
  "Exploring the fusion of technology and nature in urban design",
  "The future of education: adapting to a digital learning landscape",
  "Musings on the beauty of mathematics and its hidden elegance",
  "The allure of space exploration and humanity's cosmic ambitions",
  "Navigating the complexities of identity in a globalized world",
  "Thoughts on the power of empathy and its role in social change",
  "Discussing the evolving definition of success in the modern era",
  "Exploring the philosophy of mindfulness and its benefits",
  "How art and creativity serve as reflections of society's soul",
];

const possibleReactions = ["Like", "Sad", "Frown", "Heart"];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    const numReactions = Math.floor(Math.random() * 5) + 1;
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
      username: getRandomName(),
      reactions: [...getThoughtReactions(numReactions)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getThoughtReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
