import type { CardItem } from "./types";
import { StayCard } from "./StayCard";
import { ExperienceCard } from "./ExperienceCard";
import { FoodCard } from "./FoodCard";

const ORDER = { stay: 0, experience: 1, food: 2 } as const;

// Always draws the cards in the order stay, Experience, food.
export function Cards({ items }: { items: CardItem[] }) {
  const sorted = [...items].sort((a, b) => ORDER[a.cardType] - ORDER[b.cardType]);
  return (
    <div className="cards">
      {sorted.map((item) => {
        switch (item.cardType) {
          case "stay":
            return <StayCard key={item.details.optionId} d={item.details} />;
          case "experience":
            return <ExperienceCard key={item.details.optionId} d={item.details} />;
          case "food":
            return <FoodCard key={item.details.optionId} d={item.details} />;
        }
      })}
    </div>
  );
}
