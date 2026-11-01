import type { ExperienceDetails } from "./types";
import { Field } from "./Field";
import { shortDate, usd } from "./format";
import { biggest, card, cardBody, imgSpot, kind } from "./cardStyles";

// Tall strip on the left, activity name as the biggest text, purple labels.
export function ExperienceCard({ d }: { d: ExperienceDetails }) {
  return (
    <article data-card="experience" className={`${card} grid grid-cols-[88px_1fr]`}>
      <div className={`${imgSpot} min-h-full`} aria-hidden="true">Photo</div>
      <div className={cardBody}>
        <span className={kind}>Experience</span>
        <p className={biggest}>
          <Field value={d.experienceTitle} />
        </p>
        <span className="block">
          <span className="rounded-md bg-purple-soft px-[7px] py-0.5 text-[0.78rem] font-bold text-purple">
            <Field value={d.date} format={shortDate} />
          </span>{" "}
          <Field value={d.startTime} /> · <Field value={d.durationHours} format={(h) => `${h} hours`} />
        </span>
        <span className="block text-muted">
          <Field value={d.category} /> · Host <Field value={d.hostFirstName} />
        </span>
        <span className="block">
          <Field value={d.pricePerGuestUsd} format={(n) => `${usd(n)} per guest`} />
        </span>
        <span className="block text-[0.85rem] text-muted">
          Meet: <Field value={d.meetingPoint} />
        </span>
      </div>
    </article>
  );
}
