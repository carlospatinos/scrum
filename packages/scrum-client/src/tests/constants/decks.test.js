import { DECKS } from '../../constants';

const expectDeckHasMandatoryAttributes = deck => {
  const { SPECIAL_CARDS } = DECKS;

  expect(deck).toBeDefined();
  expect(deck.key).toBeDefined();
  expect(deck.name).toBeDefined();
  expect(deck.labels).toBeDefined();
  expect(deck.labels.includes(SPECIAL_CARDS.LABELS)).toBe(true);
  expect(deck.getMaxVote).toBeDefined();
  expect(deck.getMinVote).toBeDefined();
  expect(deck.getAvgVote).toBeDefined();
};

describe('Deck - POWER_OF_TWO', () => {
  const { SPECIAL_CARDS } = DECKS;
  const deck = DECKS.POWER_OF_TWO;
  const votes = { minVote: 1, maxVote: 4, avgVote: 2.25 };

  test('Deck POWER_OF_TWO contains mandatory attributes', () =>
    expectDeckHasMandatoryAttributes(deck));

  test('Deck POWER_OF_TWO aggregated functions', () => {
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 2],
      ['user_3', 2],
      ['user_4', votes.maxVote],
    ];

    expect(deck.getMinVote(userVotes)).toBe(votes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(votes.maxVote);
    // TODO should the average be an full number ?
    expect(deck.getAvgVote(userVotes)).toBe(votes.avgVote);
  });
  test('Deck POWER_OF_TWO aggregated functions empty array', () => {
    expect(deck.getMinVote(undefined)).toBe(0);
    expect(deck.getMaxVote(undefined)).toBe(0);
    expect(deck.getAvgVote(undefined)).toBe(0);
  });

  test('Deck POWER_OF_TWO aggregated functions with special cards', () => {
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 2],
      ['user_3', 2],
      ['user_4', votes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the calculations
    expect(deck.getMinVote(userVotes)).toBe(votes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(votes.maxVote);
    expect(deck.getAvgVote(userVotes)).toBe(votes.avgVote);
  });
  test('Deck POWER_OF_TWO aggregated functions with only special cards', () => {
    const userVotes = [
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the calculations
    expect(deck.getMinVote(userVotes)).toBe(0);
    expect(deck.getMaxVote(userVotes)).toBe(0);
    expect(deck.getAvgVote(userVotes)).toBe(0);
  });

  test('Deck POWER_OF_TWO summary of votes', () => {
    const summaryVotes = {
      minVote: votes.minVote,
      maxVote: votes.maxVote,
      avgVote: votes.avgVote,
      question: 1,
      infinity: 1,
      coffee: 1,
    };
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 2],
      ['user_3', 2],
      ['user_4', votes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the aggregated calculations
    // Special cards should be counted
    expect(deck.getSummaryVote(userVotes)).toStrictEqual(summaryVotes);
  });
});

describe('Deck - FIBBONACI', () => {
  const { SPECIAL_CARDS } = DECKS;
  const deck = DECKS.FIBBONACI;
  test('Deck POWER_OF_TWO contains mandatory attributes', () =>
    expectDeckHasMandatoryAttributes(deck));

  test('Deck FIBBONACI aggregated functions', () => {
    const votes = { minVote: 1, maxVote: 34 };
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 5],
      ['user_3', 5],
      ['user_4', votes.maxVote],
    ];
    expect(deck.getMinVote(userVotes)).toBe(votes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(votes.maxVote);
    // TODO should the average be an full number ?
    expect(deck.getAvgVote(userVotes)).toBe(11.25);
  });
  test('Deck FIBBONACI aggregated functions with special cards', () => {
    const votes = { minVote: 1, maxVote: 34 };
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 5],
      ['user_3', 5],
      ['user_4', votes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the calculations
    expect(deck.getMinVote(userVotes)).toBe(votes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(votes.maxVote);
    // TODO should the average be an full number ?
    expect(deck.getAvgVote(userVotes)).toBe(11.25);
  });

  test('Deck FIBBONACI summary of votes', () => {
    const summaryVotes = {
      minVote: 1,
      maxVote: 34,
      avgVote: 11.25,
      question: 1,
      infinity: 1,
      coffee: 1,
    };
    const userVotes = [
      ['user_1', summaryVotes.minVote],
      ['user_2', 5],
      ['user_3', 5],
      ['user_4', summaryVotes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the aggregated calculations
    // Special cards should be counted
    expect(deck.getSummaryVote(userVotes)).toStrictEqual(summaryVotes);
  });
});

describe('Deck - TSHIRT', () => {
  const { SPECIAL_CARDS } = DECKS;
  const deck = DECKS.TSHIRT;
  const votes = { minVote: 1, maxVote: 5 };
  const tshirtVotes = { minVote: 'xs', avgVote: 'm', maxVote: 'xl' };

  test('Deck POWER_OF_TWO contains mandatory attributes', () =>
    expectDeckHasMandatoryAttributes(deck));
  test('Deck TSHIRT aggregated functions', () => {
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 3],
      ['user_3', 3],
      ['user_4', votes.maxVote],
    ];
    expect(deck.getMinVote(userVotes)).toBe(tshirtVotes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(tshirtVotes.maxVote);
    // TODO should the average be an full number ?
    expect(deck.getAvgVote(userVotes)).toBe(tshirtVotes.avgVote);
  });
  test('Deck TSHIRT aggregated functions with special cards', () => {
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 3],
      ['user_3', 3],
      ['user_4', votes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the calculations
    expect(deck.getMinVote(userVotes)).toBe(tshirtVotes.minVote);
    expect(deck.getMaxVote(userVotes)).toBe(tshirtVotes.maxVote);
    // TODO should the average be an full number ?
    expect(deck.getAvgVote(userVotes)).toBe(tshirtVotes.avgVote);
  });

  test('Deck TSHIRT summary of votes', () => {
    const summaryVotes = {
      minVote: tshirtVotes.minVote,
      maxVote: tshirtVotes.maxVote,
      avgVote: tshirtVotes.avgVote,
      question: 1,
      infinity: 1,
      coffee: 1,
    };
    const userVotes = [
      ['user_1', votes.minVote],
      ['user_2', 3],
      ['user_3', 3],
      ['user_4', votes.maxVote],
      ['user_?', SPECIAL_CARDS.QUESTION.val],
      ['user_I', SPECIAL_CARDS.INFINITY.val],
      ['user_C', SPECIAL_CARDS.COFFEE.val],
    ];
    // Special cards should not alter the aggregated calculations
    // Special cards should be counted
    expect(deck.getSummaryVote(userVotes)).toStrictEqual(summaryVotes);
  });

  test('Deck TSHIRT aggregated functions empty array', () => {
    expect(deck.getMinVote(undefined)).toBe('?');
    expect(deck.getMaxVote(undefined)).toBe('?');
    expect(deck.getAvgVote(undefined)).toBe('?');
  });
});
