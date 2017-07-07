'use strict'

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = require('chai').assert;

const path = require('path');

const Sequelize = require('sequelize');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

//Importing our xxx model for our unit testing.
// e.g. const Index = require('../../api/models/index.js');
const User = require('../../api/models/user.js')

describe('User module', () => {
  describe('"user testing"', () => {
    it('should be type number', () => {
      expect(1).to.be.a('number')
    })
  })
})