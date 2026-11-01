import type { FoodDetails } from "./types";
import { Field } from "./Field";
import { usd } from "./format";
import { biggest, card, cardBody, imgSpot, kind } from "./cardStyles";

// Full-height panel on the right, meal type as the biggest text in amber.
export function FoodCard({ d }: { d: FoodDetails }) {
  return (
    <article data-card="food" className={`${card} grid grid-cols-[1fr_96px]`}>
      <div className={cardBody}>
        <span className={kind}>Food</span>
        <p className={`${biggest} text-amber`}>
          <Field value={d.meal} />
        </p>
        <Field value={d.placeName} className="block font-semibold" />
        <span className="block text-muted">
          <Field value={d.cuisine} /> · <Field value={d.neighbourhood} />
        </span>
        <span className="block">
          <span className="font-semibold text-amber">
            <Field value={d.priceLevel} />
          </span>{" "}
          ·{" "}
          <Field value={d.estCostFor2Usd} format={(n) => `About ${usd(n)} for 2`} /> ·{" "}
          <Field value={d.walkFromStayMin} format={(m) => `${m} min walk`} />
        </span>
        <span className="block text-[0.85rem] text-muted">
          <Field value={d.bookingNote} />
        </span>
      </div>
      <div className={`${imgSpot} min-h-full`} aria-hidden="true">Photo</div>
    </article>
  );
}
