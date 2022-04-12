const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

const adminSchema = mongoose.Schema(
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
      required: [true, 'Please add an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    telegram: {
      type: String,
    },
    status: {
      type: String,
      required: [true, 'Please pass admin status: Active/Suspended'],
      default: 'Active',
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    added: {
      type: String,
      required: [true, 'Please add a date'],
      default: todaysDate,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
    },
    admin_level: {
      type: String,
      default: 'Recorder',
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admin', adminSchema);
