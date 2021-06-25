/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const i18n = require('i18n');
const PlanningSession = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;
const { Logger } = require('../../../utils/Logger');
const MAX_RESULTS_FROM_DB = 200;

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

const findById = async planningRoomId => {
  console.log(planningRoomId);
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

const findAllByAdminId = async adminId => {
  if (!adminId || !ObjectId.isValid(adminId)) {
    throw Error(i18n.__('serviceInvalidId'));
  }
  const planningSessions = await PlanningSession.find({ userAdmin: adminId }).select('creationDate').select('title').limit(MAX_RESULTS_FROM_DB);
  if (!planningSessions) {
    throw Error(i18n.__('serviceFindError'));
  } else {
    return { planningSessions };
  }
};

const deleteSessionById = async sessionId => {
  try {
    const session = await PlanningSession.findOneAndDelete({ _id: sessionId });
    return session;
  } catch (e) {
    logger.error(e.message);
    throw Error(e.message);
  }
};

const deleteAllSessionByAdminId = async adminId => {
  try {
    const sessions = await PlanningSession.deleteMany({ userAdmin: adminId });
    return sessions.length;
  } catch (e) {
    logger.error(e.message);
    throw Error(e.message);
  }
};



module.exports = { save, findById, findAllByAdminId, deleteSessionById, deleteAllSessionByAdminId };
