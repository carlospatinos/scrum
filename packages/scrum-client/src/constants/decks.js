const tshirtValues = [
  { val: 1, image: '/card-decks/size-xs.svg', id: 'size-xs' },
  { val: 2, image: '/card-decks/size-s.svg', id: 'size-s' },
  { val: 3, image: '/card-decks/size-m.svg', id: 'size-m' },
  { val: 4, image: '/card-decks/size-l.svg', id: 'size-l' },
  { val: 5, image: '/card-decks/size-xl.svg', id: 'size-xl' },
  { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
  { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
  { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
];
// Votes are passed in an array of arrays. "user, vote"
const userVotesToVotes = (values = [['user', 0]]) =>
  values.map(valArr => valArr[1]).filter(value => value < 100);

const getMaxValue = values => Math.max(...userVotesToVotes(values));

const getMinValue = values => Math.min(...userVotesToVotes(values));

const getAvgValue = values => {
  const arr = userVotesToVotes(values);
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

const DECKS = {
  POWER_OF_TWO: {
    key: 1,
    name: 'power of two',
    labels: '0, 1, 2, 4, 8, 16, 32, 64, ?, I, C',
    values: [
      { val: 1, image: '/card-decks/number-1.svg', id: 'number-1' },
      { val: 2, image: '/card-decks/number-2.svg', id: 'number-2' },
      { val: 4, image: '/card-decks/number-4.svg', id: 'number-4' },
      { val: 8, image: '/card-decks/number-8.svg', id: 'number-8' },
      { val: 16, image: '/card-decks/number-16.svg', id: 'number-16' },
      { val: 32, image: '/card-decks/number-32.svg', id: 'number-32' },
      { val: 64, image: '/card-decks/number-64.svg', id: 'number-64' },
      { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
      { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
      { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
    ],
    getMaxVote: getMaxValue,
    getMinVote: getMinValue,
    getAvgVote: getAvgValue,
  },
  FIBBONACI: {
    key: 2,
    name: 'fibbonaci',
    labels: '0, 1, 2, 3, 5, 8, 13, 21, 34, ?, I, C',
    values: [
      { val: 1, image: '/card-decks/number-1.svg', id: 'number-1' },
      { val: 2, image: '/card-decks/number-2.svg', id: 'number-2' },
      { val: 3, image: '/card-decks/number-3.svg', id: 'number-3' },
      { val: 5, image: '/card-decks/number-5.svg', id: 'number-5' },
      { val: 8, image: '/card-decks/number-8.svg', id: 'number-8' },
      { val: 13, image: '/card-decks/number-13.svg', id: 'number-13' },
      { val: 21, image: '/card-decks/number-21.svg', id: 'number-21' },
      { val: 34, image: '/card-decks/number-34.svg', id: 'number-34' },
      { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
      { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
      { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
    ],
    getMaxVote: getMaxValue,
    getMinVote: getMinValue,
    getAvgVote: getAvgValue,
  },
  TSHIRT: {
    key: 3,
    name: 't-shirt sizing',
    labels: 'xs, s, m, l, xl, ?, I, C',
    values: [...tshirtValues],
    getMaxVote: values => {
      const maxValue = getMaxValue(values);
      return tshirtValues.find(card => card.val === maxValue).id.replace('size-', '');
    },
    getMinValue: values => {
      const maxValue = getMinValue(values);
      return tshirtValues.find(card => card.val === maxValue).id.replace('size-', '');
    },
    getAvgVote: getMinValue,
  },
};
// TODO - to implement  TSHIRT

const byLabels = labels => Object.values(DECKS).find(deck => deck.labels === labels);
export default { ...DECKS, byLabels };
