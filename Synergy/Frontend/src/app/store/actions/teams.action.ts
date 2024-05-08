export interface Team {
  id: string;
  teamName: string;
  urlSlug: string;
  standardOfFootball: string;
  ageGroup: string;
  primaryColour: string;
  secondaryColour: string;
  managers: string[];
  players: string[];
  personalTrainers: string[];
}

export namespace TeamsActions {
  export class SetTeams {
    static readonly type = `[Team] Set teams`;
    constructor(public payload: Team[]) {
    }
  }
}
