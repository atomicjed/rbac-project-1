import {Team, TeamsActions} from "../actions/teams.action";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";

export interface TeamsStateModel {
  userTeams: Team[];
}

@State<TeamsStateModel>({
  name: 'teams',
  defaults: {
    userTeams: []
  }
})
@Injectable()
export class TeamsState {
  @Action(TeamsActions.SetTeams)
  setTeams(ctx: StateContext<TeamsStateModel>, action: TeamsActions
    .SetTeams) {
    ctx.patchState({userTeams: action.payload})
  }
}
