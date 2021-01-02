/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const express = require('express');
const i18n = require('i18n');
const Tips = require('./model');

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const find = (req, cb) => {
  let pageSize = req.params.pageSize || DEFAULT_PAGE_SIZE;
  if (pageSize > MAX_PAGE_SIZE) {
    console.log(`invalid pageSize using MAX_PAGE_SIZE as ${MAX_PAGE_SIZE}`);
    pageSize = MAX_PAGE_SIZE;
  }

  Tips.find()
    .limit(pageSize)
    .exec(function (err, tipDocs) {
      // console.log(tipDocs);
      if (err) {
        console.log(err);
        return cb({ status: 400, success: false, message: 'tips not found' });
      } else {
        return cb({ status: 200, success: true, tips: tipDocs });
      }
    });
};

module.exports = { find };
