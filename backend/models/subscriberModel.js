const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// SUBSCRIBERS MODEL
const subscribersSchema = mongoose.Schema(
  {
    shorter_id: {
      type: String,
      required: true,
      default: () => nanoid(7),
      index: { unique: true },
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      unique: false,
    },
    phone: {
      type: String,
    },
    telegram: {
      type: String,
      required: [true, 'Please add a telegram username'],
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    subscriptionDates: {
      type: Array,
      default: [],
      required: [true, 'Missing subscription dates - Set to array'],
    },
    lastSubscriptionDate: {
      type: String,
      required: [true, 'Missing last subscription date - Set to date'],
    },
    joined: {
      type: String,
      required: [true, 'Please add a date'],
      default: todaysDate,
      immutable: true,
    },
    subscriptionTag: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subscriber', subscribersSchema);
