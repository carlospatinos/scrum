/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const i18n = require('i18n');
const PlanningSession = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;
const { Logger } = require('../../../utils/Logger');

const logger = Logger(__filename);

const save = async jsonData => {
  try {
    const newSession = new PlanningSession(jsonData);
    const docSession = await newSession.save();
    return {
      // TODO change for data?
      planningSession: docSession,
      planningRoomId: docSession._id,
    };
  } catch (e) {
    logger.error(e);
    throw Error(i18n.__('serviceSaveError'));
  }
};

const find = async planningRoomId => {
  if (!planningRoomId || !ObjectId.isValid(planningRoomId)) {
    throw Error(i18n.__('serviceInvalidId'));
  }
  const planningSession = await PlanningSession.findOne({ _id: planningRoomId });
  if (!planningSession) {
    throw Error(i18n.__('serviceFindError'));
  } else {
    return { planningSession };
  }
};

module.exports = { save, find };
