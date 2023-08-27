const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reaction` that gets the amount of response per thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Define a virtual getter for the formatted createdAt timestamp
thoughtSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
