export enum DrinkType {
	HEINEKEN = "Heineken",
	CORONA = "Corona",
	MOJITO = "Mojito",
	MARGERITA = "Margerita",
	SPECIAL_BACARDI = "Special Bacardi",
}

export enum Ingredient {
	GIN = 85,
	TONIC_WATER = 20,
	SUGAR = 10,
	RUM = 65,
	MINT = 10,
	LIME_JUICE = 10,
}

type DrinkPriceMapping = {
	[key in DrinkType]: number | ((ingredients: Ingredient[]) => number);
};

export const drinkPrices: DrinkPriceMapping = {
	[DrinkType.HEINEKEN]: 74,
	[DrinkType.CORONA]: 110,
	[DrinkType.MOJITO]: 103,
	[DrinkType.MARGERITA]: (ingredients: Ingredient[]) =>
		ingredients.reduce((total, ingredient) => total + ingredient, 0),
	[DrinkType.SPECIAL_BACARDI]: (ingredients: Ingredient[]) =>
		ingredients[0] / 2 +
		ingredients
			.slice(1)
			.reduce((total, ingredient) => total + ingredient, 0),
};

const ingredientMapping: Record<DrinkType, Ingredient[]> = {
	[DrinkType.MARGERITA]: [
		Ingredient.GIN,
		Ingredient.TONIC_WATER,
		Ingredient.SUGAR,
	],
	[DrinkType.SPECIAL_BACARDI]: [
		Ingredient.GIN,
		Ingredient.RUM,
		Ingredient.MINT,
		Ingredient.LIME_JUICE,
	],
	[DrinkType.HEINEKEN]: [],
	[DrinkType.CORONA]: [],
	[DrinkType.MOJITO]: [],
};

export function calculateCost(
	drink: DrinkType,
	isStudent: boolean,
	amount: number
): number {
	if (
		amount > 2 &&
		(drink === DrinkType.MOJITO ||
			drink === DrinkType.MARGERITA ||
			drink === DrinkType.SPECIAL_BACARDI)
	) {
		throw new Error("Not allowed to order more than 2 cocktails");
	}

	const price = drinkPrices[drink];

	if (!price) {
		throw new Error("Drink does not exist");
	}

	const totalCost =
		typeof price === "function" ? price(ingredientMapping[drink]) : price;

	if (
		isStudent &&
		(drink === DrinkType.HEINEKEN || drink === DrinkType.CORONA)
	) {
		return Math.ceil(totalCost * amount * 0.9);
	}
	return Math.ceil(totalCost * amount);
}
