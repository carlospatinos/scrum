/* eslint-disable */
// service.ts
// The service class acts like a wrapper for the database. Here we read and write data to the database. Furthermore, we can implement caching for example.
const express = require('express');
const i18n = require('i18n');
const Tips = require('./model');

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

const find = async (req) => {
  let pageSize = req.params.pageSize || DEFAULT_PAGE_SIZE;
  if (pageSize > MAX_PAGE_SIZE) {
    throw Error(`invalid pageSize using MAX_PAGE_SIZE as ${MAX_PAGE_SIZE}`);
    pageSize = MAX_PAGE_SIZE;
  }
  const data = await Tips.find({}, null, {limit: 50});
  if (!data) {
    throw Error('Tips not found' );
  } else {
    return { data };
  }

};

module.exports = { find };
