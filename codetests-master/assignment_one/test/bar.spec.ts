import { DrinkType, calculateCost } from "../src/bar";
import { expect, assert } from 'chai';
import 'mocha';

describe('Ordering drinks gives the expected price', () => {
  it('Correctly calculates 74kr for a Heineken', () => {
    const price = calculateCost(DrinkType.HEINEKEN, false, 1);
    expect(price).to.equal(74);
  });

  it('Correctly calculates 103kr for a Mojito cocktail', () => {
    const price = calculateCost(DrinkType.MOJITO, false, 1);
    expect(price).to.equal(103);
  });

  it('Correctly calculates 110kr for a Corona', () => {
    const price = calculateCost(DrinkType.CORONA, false, 1);
    expect(price).to.equal(110);
  });

  it('Correctly calculates the price for a Margerita cocktail', () => {
    const price = calculateCost(DrinkType.MARGERITA, false, 1);
    expect(price).to.equal(115);
  });

  it('Correctly calculates the price for a special Bacardi cocktail', () => {
    const price = calculateCost(DrinkType.SPECIAL_BACARDI, false, 1);
    expect(price).to.equal(128);
  });
});

describe('Student discounts are correctly handled', () => {
  it('Correctly gives 10% discount for beers', () => {
    const price = calculateCost(DrinkType.HEINEKEN, true, 1);
    expect(price).to.equal(67);
    const price2 = calculateCost(DrinkType.CORONA, true, 1);
		expect(price2).to.equal(99);
  });

  it('Also gives discount for multiple beers', () => {
    const price = calculateCost(DrinkType.HEINEKEN, true, 3);
    expect(price).to.equal(200);
  });

  it('Does not allow discounts for cocktails', () => {
    const price = calculateCost(DrinkType.MOJITO, true, 1);
    expect(price).to.equal(103);
    const price1 = calculateCost(DrinkType.MARGERITA, true, 1);
    expect(price1).to.equal(115);
    const price2 = calculateCost(DrinkType.SPECIAL_BACARDI, true, 1);
    expect(price2).to.equal(128);
  });
});

describe('Error handling is correct', () => {
  it('Prevents people from ordering drinks that do not exist', () => {
    assert.throws(() => calculateCost("nonexistent_drink" as DrinkType, false, 1), 'Drink does not exist');
  });

  it('Does not allow ordering more than two cocktails', () => {
    assert.throws(() => calculateCost(DrinkType.MOJITO, false, 3), 'Not allowed to order more than 2 cocktails');
  });

  it('Allows ordering more than 2 beers', () => {
    assert.doesNotThrow(() => calculateCost(DrinkType.HEINEKEN, false, 3));
  });
});