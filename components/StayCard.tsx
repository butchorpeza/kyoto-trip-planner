import type { StayDetails } from "./types";
import { Field, isEmpty } from "./Field";
import { shortDate, usd, year } from "./format";

// Wide banner on top, travel dates as the biggest text, coral top border.
export function StayCard({ d }: { d: StayDetails }) {
  const hasDates = !isEmpty(d.checkIn) && !isEmpty(d.checkOut);
  return (
    <article className="card stay">
      <div className="img-spot banner" aria-hidden="true">Photo</div>
      <div className="card-body">
        <span className="kind">Stay</span>
        <p className="biggest">
          {hasDates ? (
            <>
              {shortDate(d.checkIn!)} – {shortDate(d.checkOut!)} {year(d.checkOut!)}
              {!isEmpty(d.nights) && ` · ${d.nights} nights`}
            </>
          ) : (
            <Field value={null} />
          )}
        </p>
        <Field value={d.listingTitle} className="line strong" />
        <span className="line muted">
          <Field value={d.propertyType} /> · <Field value={d.neighbourhood} />
        </span>
        <span className="line">
          <Field value={d.pricePerNightUsd} format={(n) => `${usd(n)} / night`} />
        </span>
        <span className="line muted">
          <Field value={d.highlight} />
        </span>
        <span className="line muted small">
          <Field value={d.guestRating} format={(r) => `★ ${r}`} /> ·{" "}
          <Field value={d.reviewCount} format={(c) => `${c} reviews`} /> · Host{" "}
          <Field value={d.hostFirstName} />
        </span>
      </div>
    </article>
  );
}
