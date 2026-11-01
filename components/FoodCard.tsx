import type { FoodDetails } from "./types";
import { Field } from "./Field";
import { usd } from "./format";

// Full-height panel on the right, meal type as the biggest text in amber.
export function FoodCard({ d }: { d: FoodDetails }) {
  return (
    <article className="card food">
      <div className="card-body">
        <span className="kind">Food</span>
        <p className="biggest amber">
          <Field value={d.meal} />
          <span className="price-level">
            {" · "}
            <Field value={d.priceLevel} />
          </span>
        </p>
        <Field value={d.placeName} className="line strong" />
        <span className="line muted">
          <Field value={d.cuisine} /> · <Field value={d.neighbourhood} />
        </span>
        <span className="line">
          <Field value={d.estCostFor2Usd} format={(n) => `About ${usd(n)} for 2`} /> ·{" "}
          <Field value={d.walkFromStayMin} format={(m) => `${m} min walk`} />
        </span>
        <span className="line muted small">
          <Field value={d.bookingNote} />
        </span>
      </div>
      <div className="img-spot panel" aria-hidden="true">Photo</div>
    </article>
  );
}
