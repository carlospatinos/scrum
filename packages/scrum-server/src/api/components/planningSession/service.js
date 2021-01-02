/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const express = require('express');
const i18n = require('i18n');
const PlanningSession = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const save = (req, cb) => {
  const newSession = new PlanningSession(req.body);
  newSession.save((err, docSession) => {
    if (err) {
      console.log(err);
      return cb({ status: 400, success: false });
    }
    cb({
      status: 200,
      success: true,
      session: docSession,
      planningRoomId: docSession._id,
    });
  });
};

const find = (req, cb) => {
  const planningRoomId = req.params.id;
  if (!planningRoomId || !ObjectId.isValid(planningRoomId)) {
    console.log('invalid session id');
    return cb({ status: 400, success: false, message: 'invalid session id' });
  }
  PlanningSession.findOne({ _id: planningRoomId }, function (err, session) {
    if (err || !session) {
      console.log(err);
      return cb({ status: 400, success: false });
    } else {
      return cb({ status: 200, success: true, sessionInformation: session });
    }
  });
};

module.exports = { save, find };
