const asyncHandler = require('express-async-handler');
//Importing Subscriber Model
const Subscriber = require('../models/subscriberModel');
//Importing extra major functions
const {
  getSubscriberStatus,
  getNoOfDaysBeforeExpiration,
  getDateOfDay,
} = require('./majorfunctions/subscriberFunctions');

// SUBSCRIBER CONTROLLERS**

//@desc Add Subscriber
//@route POST /api/subscriber/add
//@access Private
const addSubscriber = asyncHandler(async (req, res) => {
  const { name, email, telegram, subscriptionDate } = req.body;
  // Check for missing fields: name, email, telegram
  if (!name || !email || !telegram || !subscriptionDate) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing subscriber with same email
  const subscriberExists = await Subscriber.findOne({ email });
  if (subscriberExists) {
    res.status(400);
    throw new Error('A subscriber with this email already exists');
  }
  //Create subscriber
  const data = {
    ...req.body,
    subscriptionDates: [subscriptionDate],
    lastSubscriptionDate: subscriptionDate,
    joined: subscriptionDate,
  };

  const subscriber = await Subscriber.create(data);
  if (subscriber) {
    res.status(204).json({ message: 'Subscriber added successfully' });
  } else {
    res.status(400);
    throw new Error('Admin could not be created');
  }
});

//@desc Get all Subscribers
//@route GET /api/subscriber/get-all
//@access Private
const getAllSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({})
    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });
      res.status(200).json(subscribers);
    });
});

//@desc Get A Subscribers Info By Id (id is passed as a parameter)
//@route GET /api/subscriber/get-subscriber-data/?id=:id
//@access Private
const getSubscriberInfoById = asyncHandler(async (req, res) => {
  const subscriberId = req.query.id;

  // Check for missing id tag
  if (!subscriberId) {
    res.status(400);
    throw new Error('Missing id tag');
  }
  const subscriber = await Subscriber.findById(subscriberId)
    .lean()
    .exec(function (err, subscriber) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscriber');
      }
      const formattedSubscriber = subscriber;
      formattedSubscriber.status = getSubscriberStatus(
        subscriber.lastSubscriptionDate
      );
      formattedSubscriber.totalNoOfSubscriptions =
        subscriber.subscriptionDates.length;
      formattedSubscriber.noOfDaysBeforeExpire = getNoOfDaysBeforeExpiration(
        subscriber.lastSubscriptionDate
      );
      //If subscriber is found
      res.status(201).json(formattedSubscriber);
    });
});

//@desc Update A Subscriber By Id (id and updateJustStatus are passed as a parameter)
//@route PUT /api/subscriber/update-subscriber-data/?id=:id&updateJustStatus=:updateJustStatus
//@access Private
const updateSubscriberDataById = asyncHandler(async (req, res) => {
  const subscriberId = req.query.id;
  const updateJustStatus = req.query.updateJustStatus;
  const {
    name,
    email,
    telegram,
    lastSubscriptionDate,
    newSubscriptionDatesArray,
  } = req.body;

  // Check for missing id query
  if (!subscriberId) {
    res.status(400);
    throw new Error('Missing id query');
  }
  //Check for missing updateJustStatus query
  if (!updateJustStatus) {
    res.status(400);
    throw new Error('Missing updateJustStatus query');
  }

  const subscriber = await Subscriber.findById(subscriberId);

  let lastSubscriptionDates = [];
  let lastSubscriptionOn;

  // If updateJustStatus !== 'true', Do the following:
  if (updateJustStatus !== 'true') {
    // Check for missing required fields: name, email, password, telegram
    if (!name || !email || !telegram || !lastSubscriptionDate) {
      res.status(400);
      throw new Error('Please enter all required fields');
    }
    // Check for existing subscriber with new email
    const subscriberExists = await Subscriber.findOne({ email });
    if (subscriberExists) {
      //Check if subscriber is the same as the subscriber to be updated
      if (subscriberExists._id.toString() !== subscriberId.toString()) {
        res.status(400);
        throw new Error('A subscriber with this email already exists');
      }
    }
    //Check if lastSubscriptionDate has been changed
    if (subscriber.lastSubscriptionDate !== lastSubscriptionDate) {
      const array = subscriber.subscriptionDates;
      array[array.length - 1] = lastSubscriptionDate;
      lastSubscriptionDates = array;
      lastSubscriptionOn = lastSubscriptionDate;
    } else {
      //If lastSubscriptionDate has not been changed
      lastSubscriptionDates = subscriber.subscriptionDates;
      lastSubscriptionOn = subscriber.lastSubscriptionDate;
    }
  } else {
    if (!lastSubscriptionDate || !newSubscriptionDatesArray) {
      res.status(400);
      throw new Error('Missing required body fields');
    }
    lastSubscriptionDates = newSubscriptionDatesArray;
    lastSubscriptionOn = getDateOfDay(
      lastSubscriptionDate,
      getNoOfDaysBeforeExpiration(subscriber.lastSubscriptionDate)
    );
  }
  //Update Subscriber
  const updatedSubscriber = await Subscriber.findByIdAndUpdate(
    subscriberId,
    {
      ...req.body,
      subscriptionDates: lastSubscriptionDates,
      lastSubscriptionDate: lastSubscriptionOn,
    },
    { new: true }
  );
  if (updatedSubscriber) {
    res.status(201).json(updatedSubscriber);
  } else {
    res.status(400);
    throw new Error('Subscriber could not be updated');
  }
});

//@desc Get all Active Subscribers
//@route GET /api/subscriber/get-all-active-subscribers
//@access Private
const getAllActiveSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({})
    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });

      //Filter out all subscribers with status 'Active'
      const activeSubscribers = subscribers.filter(
        (subscriber) => subscriber.status === 'Active'
      );
      res.status(200).json(activeSubscribers);
    });
});

//@desc Get all Almost Expired Subscribers
//@route GET /api/subscriber/get-all-almostexpired-subscribers
//@access Private
const getAllAlmostExpiredSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({})
    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });

      //Filter out all subscribers with status 'Almost Expired'
      const almostExpiredSubscribers = subscribers.filter(
        (subscriber) => subscriber.status === 'Almost Expired'
      );
      res.status(200).json(almostExpiredSubscribers);
    });
});

//@desc Get all Expired Subscribers
//@route GET /api/subscriber/get-all-expired-subscribers
//@access Private
const getAllExpiredSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({})

    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });

      //Filter out all subscribers with status 'Expired'
      const expiredSubscribers = subscribers.filter(
        (subscriber) => subscriber.status === 'Expired'
      );
      res.status(200).json(expiredSubscribers);
    });
});

//@desc Get Latest Subscribers
//@route GET /api/subscriber/get-latest-subscribers
//@access Private
const getLatestSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find({})
    .sort({ _id: -1 })
    .limit(20)
    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });
      res.status(200).json(subscribers);
    });
});

//@desc Search For Subscribers based on name,email,phone,telegram
//@route GET /api/subscriber/search-subscribers
//@access Private
const searchSubscribers = asyncHandler(async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(200).json([]);
  }

  const subscribers = await Subscriber.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { telegram: { $regex: search, $options: 'i' } },
    ],
  })
    .lean()
    .exec(function (err, subscribers) {
      if (err) {
        res.status(400);
        throw new Error('Could not get subscribers');
      }
      //Loop through all subscribers and add the status to each subscriber
      subscribers.forEach((subscriber) => {
        subscriber.status = getSubscriberStatus(
          subscriber.lastSubscriptionDate
        );
      });
      res.status(200).json(subscribers);
    });
});

module.exports = {
  addSubscriber,
  getAllSubscribers,
  getSubscriberInfoById,
  updateSubscriberDataById,
  getAllActiveSubscribers,
  getAllAlmostExpiredSubscribers,
  getAllExpiredSubscribers,
  getLatestSubscribers,
  searchSubscribers,
};
