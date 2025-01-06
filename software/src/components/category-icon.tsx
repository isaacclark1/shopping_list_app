import {
  Apple,
  Cake,
  Candy,
  Carrot,
  Circle,
  CircleHelp,
  Coffee,
  CookingPot,
  CupSoda,
  Donut,
  Egg,
  FishSymbol,
  Ham,
  IceCreamCone,
  Microwave,
  Nut,
  Popcorn,
  Refrigerator,
  Sandwich,
  Utensils,
  UtensilsCrossed,
  Vegan,
  Wine,
} from "lucide-react";

const categoryIcons = new Map<string, JSX.Element>([
  ["Fruit", <Apple />],
  ["Meat", <Ham />],
  ["Fish", <FishSymbol />],
  ["Confectionary", <Candy />],
  ["Alcohol", <Wine />],
  ["Hot beverages", <Coffee />],
  ["Puddings", <Cake />],
  ["Vegetables", <Carrot />],
  ["Cookware", <CookingPot />],
  ["Cold beverages", <CupSoda />],
  ["Ready meals", <Microwave />],
  ["Bakery", <Donut />],
  ["Snacks", <Popcorn />],
  ["Frozen produce", <Refrigerator />],
  ["Vegan/Vegitarian items", <Vegan />],
  ["Kitchen utensils", <UtensilsCrossed />],
  ["Meal-deal section", <Sandwich />],
  ["Ice cream", <IceCreamCone />],
  ["Nuts/seeds", <Nut />],
  ["Baking", <Egg />],
  ["Miscellanious", <CircleHelp />],
  ["Cheese", <Circle />],
]);

type CategoryIconProps = {
  category?: string;
};

function CategoryIcon({ category }: CategoryIconProps) {
  if (category && categoryIcons.has(category)) {
    return categoryIcons.get(category);
  }

  return <Utensils />;
}

export default CategoryIcon;
