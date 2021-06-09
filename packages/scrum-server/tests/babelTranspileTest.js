const assert = require('assert');

describe('Map', () => {
  describe('set', () => {
    it('should add an element to the map', done => {
      const k1 = { id: 1 };
      const k2 = { id: 2 };
      const storyVotes = new Map();
      console.log(storyVotes);
      storyVotes.set(k1.id, k1);
      console.log(storyVotes);
      const foundK1 = storyVotes.get(k1.id);
      storyVotes.should.have.key(k1.id);
      storyVotes.should.not.have.key(k2.id);
      assert.equal(k1, foundK1);
      done();
    });
  });
});

describe('Array', () => {
  describe('find', () => {
    it('should return an element to the array', done => {
      const storyVotes = [5, 12, 8, 130, 44];
      const idToFind = 8;
      const found = storyVotes.find(id => id === idToFind);
      // console.log(found);
      assert.equal(found, idToFind);
      done();
    });
  });
});

const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'cherries', quantity: 8 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 },
  { name: 'cherries', quantity: 15 },
];

const result = inventory.find(({ name }) => name === 'cherries');

console.log(result); // { name: 'cherries', quantity: 5 }
