import { interestsShifter } from "./constants";

export class InterestsHandler {
  static interestsToInt(interests: string[] | undefined): number {
    let num = 0;
    if (!interests) return num;
    for (let i = 0; i < interests.length; ++i)
      num |=
        1 <<
        interestsShifter.find((element) => element.name === interests[i])!
          .value;
    return num;
  }

  static intToInterests(interests: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < interestsShifter.length; ++i)
      if (interests & (1 << interestsShifter[i].value))
        result.push(interestsShifter[i].name);
    return result;
  }
}
