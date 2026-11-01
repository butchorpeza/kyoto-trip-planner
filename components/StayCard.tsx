import type { StayDetails } from "./types";
import { Field, isEmpty } from "./Field";
import { shortDate, usd, year } from "./format";
import { biggest, card, cardBody, imgSpot, kind } from "./cardStyles";

// Wide banner on top, travel dates as the biggest text, coral top border.
export function StayCard({ d }: { d: StayDetails }) {
  const hasDates = !isEmpty(d.checkIn) && !isEmpty(d.checkOut);
  return (
    <article data-card="stay" className={`${card} border-t-4 border-t-coral`}>
      <div className={`${imgSpot} aspect-[16/6] max-w-full`} aria-hidden="true">Photo</div>
      <div className={cardBody}>
        <span className={kind}>Stay</span>
        <p className={biggest}>
          {hasDates ? (
            <>
              {shortDate(d.checkIn!)} – {shortDate(d.checkOut!)} {year(d.checkOut!)}
              {!isEmpty(d.nights) && ` · ${d.nights} nights`}
            </>
          ) : (
            <Field value={null} />
          )}
        </p>
        <Field value={d.listingTitle} className="block font-semibold" />
        <span className="block text-muted">
          <Field value={d.propertyType} /> · <Field value={d.neighbourhood} />
        </span>
        <span className="block">
          <Field value={d.pricePerNightUsd} format={(n) => `${usd(n)} / night`} />
        </span>
        <span className="block text-muted">
          <Field value={d.highlight} />
        </span>
        <span className="block text-[0.85rem] text-muted">
          <Field value={d.guestRating} format={(r) => `★ ${r}`} /> ·{" "}
          <Field value={d.reviewCount} format={(c) => `${c} reviews`} /> · Host{" "}
          <Field value={d.hostFirstName} />
        </span>
      </div>
    </article>
  );
}
