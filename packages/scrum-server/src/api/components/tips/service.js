/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const express = require('express');
const i18n = require('i18n');
const Tips = require('./model');

const DEFAULT_PAGE_SIZE = 10;

const find = async (pageSizeParam) => {
  let pageSize = pageSizeParam || DEFAULT_PAGE_SIZE;
  const data = await Tips.find({}, null, {limit: pageSize});
  if (!data) {
    throw Error(i18n.__('serviceFindError'));
  } else {
    return { data };
  }

};

module.exports = { find };
