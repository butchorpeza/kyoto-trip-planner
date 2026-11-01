import type { ExperienceDetails } from "./types";
import { Field } from "./Field";
import { shortDate, usd } from "./format";

// Tall strip on the left, activity name as the biggest text, purple labels.
export function ExperienceCard({ d }: { d: ExperienceDetails }) {
  return (
    <article className="card experience">
      <div className="img-spot strip" aria-hidden="true">Photo</div>
      <div className="card-body">
        <span className="kind">Experience</span>
        <p className="biggest">
          <Field value={d.experienceTitle} />
        </p>
        <span className="line">
          <span className="purple-label">
            <Field value={d.date} format={shortDate} />
          </span>{" "}
          <Field value={d.startTime} /> · <Field value={d.durationHours} format={(h) => `${h} hours`} />
        </span>
        <span className="line muted">
          <Field value={d.category} /> · Host <Field value={d.hostFirstName} />
        </span>
        <span className="line">
          <Field value={d.pricePerGuestUsd} format={(n) => `${usd(n)} per guest`} />
        </span>
        <span className="line muted small">
          Meet: <Field value={d.meetingPoint} />
        </span>
      </div>
    </article>
  );
}
