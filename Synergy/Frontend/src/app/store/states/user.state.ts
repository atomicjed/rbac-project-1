import {User, UserActions} from "../actions/user.action";
import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";

export interface UserStateModel {
  loggedInUser: User
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedInUser: {} as User
  }
})
@Injectable()
export class UserState {
  @Action(UserActions.SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: UserActions
    .SetUser) {
    ctx.patchState({loggedInUser: action.payload})
  }
}

