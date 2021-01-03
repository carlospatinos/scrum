/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const express = require('express');
const i18n = require('i18n');
const PlanningSession = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const save = async req => {
  try {
    const newSession = new PlanningSession(req.body);
    const docSession = await newSession.save();
    return {
      planningSession: docSession,
      planningRoomId: docSession._id,
    };
  } catch (e) {
    console.log(e);
    throw Error(i18n.__('serviceSaveError'));
  }
};

const find = async req => {
  const planningRoomId = req.params.id;
  if (!planningRoomId || !ObjectId.isValid(planningRoomId)) {
    throw Error(i18n.__('apiPlanningSessionInvalidId'));
  }
  const planningSession = await PlanningSession.findOne({ _id: planningRoomId });
  if (!planningSession) {
    throw Error(i18n.__('apiPlanningSessionNotFound'));
  } else {
    return { planningSession };
  }
};

module.exports = { save, find };
