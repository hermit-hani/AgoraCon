// FORM VALIDATION for /register.  Returns a list of errors: [{ id, message }].
// `id` is the id of the input that has the problem, so the error summary can link to it.
// An empty list means the form is valid.
//
// form = { nickname, age, teams: { [eventId]: { teamName, members: [{ name, age }] } } }
// lines = the lines from buildPlan()

import { parseAge, checkAge } from "./age.js";
import { isTeamEvent } from "./seats.js";

// Input ids are built here once so the form and the validator always agree.
export const ids = {
  nickname: "nickname",
  age: "age",
  teamName: (eventId) => `team-${eventId}-name`,
  memberName: (eventId, i) => `team-${eventId}-member-${i}-name`,
  memberAge: (eventId, i) => `team-${eventId}-member-${i}-age`,
};

export function validateRegistration(form, lines) {
  const errors = [];
  const add = (id, message) => errors.push({ id, message });

  if (!form.nickname.trim()) add(ids.nickname, "Enter a nickname.");

  const registrantAge = parseAge(form.age);
  if (registrantAge === null) add(ids.age, "Enter your age as a whole number (0 to 120).");

  for (const { event, quantity } of lines) {
    if (!isTeamEvent(event)) {
      // Individual event: the registrant is the person covered.
      if (registrantAge !== null) {
        const result = checkAge(event, registrantAge);
        if (!result.ok) {
          add(ids.age, `You are ${registrantAge}, so you cannot register for ${event.title} (${event.minAge}+). Remove it from your plan or correct your age.`);
        }
      }
      continue;
    }

    // Team event: a team name plus one name and age for each member.
    const team = form.teams[event.id] ?? { teamName: "", members: [] };
    if (!team.teamName.trim()) add(ids.teamName(event.id), `Enter a team name for ${event.title}.`);

    for (let i = 0; i < quantity; i++) {
      const member = team.members[i] ?? { name: "", age: "" };
      const label = member.name.trim() || `Member ${i + 1}`;
      if (!member.name.trim()) add(ids.memberName(event.id, i), `Enter a name for member ${i + 1} of ${event.title}.`);

      const age = parseAge(member.age);
      if (age === null) {
        add(ids.memberAge(event.id, i), `Enter an age for ${label} (${event.title}), as a whole number from 0 to 120.`);
      } else if (!checkAge(event, age).ok) {
        add(ids.memberAge(event.id, i), `${label} is ${age}, so cannot join ${event.title} (${event.minAge}+). Change the age or remove them.`);
      }
    }
  }
  return errors;
}
