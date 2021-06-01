const SPECIAL_CARDS = {
  LABELS: '?, I, C',
  QUESTION: { val: 100, text: '?', image: '/card-decks/question-mark.svg', id: 'question-mark' },
  INFINITY: { val: 101, text: '∞', image: '/card-decks/infinity.svg', id: 'infinity' },
  COFFEE: { val: 102, text: 'Coffee', image: '/card-decks/coffee.svg', id: 'coffee' },
};

const tshirtValues = [
  { val: 1, text: '1', image: '/card-decks/size-xs.svg', id: 'size-xs' },
  { val: 2, text: '2', image: '/card-decks/size-s.svg', id: 'size-s' },
  { val: 3, text: '3', image: '/card-decks/size-m.svg', id: 'size-m' },
  { val: 4, text: '4', image: '/card-decks/size-l.svg', id: 'size-l' },
  { val: 5, text: '5', image: '/card-decks/size-xl.svg', id: 'size-xl' },
  SPECIAL_CARDS.QUESTION,
  SPECIAL_CARDS.INFINITY,
  SPECIAL_CARDS.COFFEE,
];
const toTshirtCardValue = cardValue => {
  if (cardValue === 0) {
    return '?';
  }
  return tshirtValues.find(card => card.val === cardValue).id.replace('size-', '');
};

// Votes are passed in an array of arrays. "user, vote"
const userVotesToVotes = values => {
  if (values === undefined || values.length === 0) {
    return [0];
  }
  const filteredVotes = values
    .map(valArr => valArr[1])
    .filter(value => value < SPECIAL_CARDS.QUESTION.val);

  return filteredVotes.length === 0 ? [0] : filteredVotes;
};

const getMaxValue = values => Math.max(...userVotesToVotes(values));

const getMinValue = values => Math.min(...userVotesToVotes(values));

const getAvgValue = values => {
  const arr = userVotesToVotes(values);
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

const getCountValue = (valueToCount, values = [['user', 0]]) =>
  values.map(valArr => valArr[1]).filter(value => value === valueToCount).length;

const getSummaryVote = values => {
  return {
    minVote: getMinValue(values),
    maxVote: getMaxValue(values),
    avgVote: getAvgValue(values),
    question: getCountValue(SPECIAL_CARDS.QUESTION.val, values),
    infinity: getCountValue(SPECIAL_CARDS.INFINITY.val, values),
    coffee: getCountValue(SPECIAL_CARDS.COFFEE.val, values),
  };
};

const DECKS = {
  POWER_OF_TWO: {
    key: 1,
    name: 'power of two',
    labels: '0, 1, 2, 4, 8, 16, 32, 64, ?, I, C',
    values: [
      { val: 1, text: '1', image: '/card-decks/number-1.svg', id: 'number-1' },
      { val: 2, text: '2', image: '/card-decks/number-2.svg', id: 'number-2' },
      { val: 4, text: '4', image: '/card-decks/number-4.svg', id: 'number-4' },
      { val: 8, text: '8', image: '/card-decks/number-8.svg', id: 'number-8' },
      { val: 16, text: '16', image: '/card-decks/number-16.svg', id: 'number-16' },
      { val: 32, text: '32', image: '/card-decks/number-32.svg', id: 'number-32' },
      { val: 64, text: '64', image: '/card-decks/number-64.svg', id: 'number-64' },
      SPECIAL_CARDS.QUESTION,
      SPECIAL_CARDS.INFINITY,
      SPECIAL_CARDS.COFFEE,
    ],
    getMaxVote: getMaxValue,
    getMinVote: getMinValue,
    getAvgVote: getAvgValue,
    getSummaryVote,
  },
  FIBBONACI: {
    key: 2,
    name: 'fibbonaci',
    labels: '0, 1, 2, 3, 5, 8, 13, 21, 34, ?, I, C',
    values: [
      { val: 1, text: '1', image: '/card-decks/number-1.svg', id: 'number-1' },
      { val: 2, text: '2', image: '/card-decks/number-2.svg', id: 'number-2' },
      { val: 3, text: '3', image: '/card-decks/number-3.svg', id: 'number-3' },
      { val: 5, text: '5', image: '/card-decks/number-5.svg', id: 'number-5' },
      { val: 8, text: '8', image: '/card-decks/number-8.svg', id: 'number-8' },
      { val: 13, text: '13', image: '/card-decks/number-13.svg', id: 'number-13' },
      { val: 21, text: '21', image: '/card-decks/number-21.svg', id: 'number-21' },
      { val: 34, text: '34', image: '/card-decks/number-34.svg', id: 'number-34' },
      SPECIAL_CARDS.QUESTION,
      SPECIAL_CARDS.INFINITY,
      SPECIAL_CARDS.COFFEE,
    ],
    getMaxVote: getMaxValue,
    getMinVote: getMinValue,
    getAvgVote: getAvgValue,
    getSummaryVote,
  },
  TSHIRT: {
    key: 3,
    name: 't-shirt sizing',
    labels: 'xs, s, m, l, xl, ?, I, C',
    values: [...tshirtValues],
    getMaxVote: values => toTshirtCardValue(getMaxValue(values)),
    getMinVote: values => toTshirtCardValue(getMinValue(values)),
    getAvgVote: values => toTshirtCardValue(Math.round(getAvgValue(values))),
    getSummaryVote: values => {
      const summaryVotes = getSummaryVote(values);
      return {
        minVote: toTshirtCardValue(summaryVotes.minVote),
        maxVote: toTshirtCardValue(summaryVotes.maxVote),
        avgVote: toTshirtCardValue(Math.round(summaryVotes.avgVote)),
        question: getCountValue(SPECIAL_CARDS.QUESTION.val, values),
        infinity: getCountValue(SPECIAL_CARDS.INFINITY.val, values),
        coffee: getCountValue(SPECIAL_CARDS.COFFEE.val, values),
      };
    },
  },
};

const byLabels = labels => Object.values(DECKS).find(deck => deck.labels === labels);
export default { ...DECKS, byLabels, SPECIAL_CARDS };
