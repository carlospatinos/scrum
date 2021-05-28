/* eslint-disable */
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const i18n = require('i18n');
const UserStory = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

const save = async jsonData => {
  try {
    const newUserStory = new UserStory(jsonData);
    const docUserStory = await newUserStory.save();
    return {
      data: docUserStory,
    };
  } catch (e) {
    console.log(e);
    throw Error(i18n.__('serviceSaveError'));
  }
};

const find = async objectId => {
  if (!objectId || !ObjectId.isValid(objectId)) {
    throw Error(i18n.__('serviceInvalidId'));
  }
  const userStory = await UserStory.findOne({ planningSessionId: objectId });
  console.log(userStory);
  if (!userStory) {
    throw Error(i18n.__('serviceFindError'));
  } else {
    return { data: userStory };
  }
};

module.exports = { save, find };
