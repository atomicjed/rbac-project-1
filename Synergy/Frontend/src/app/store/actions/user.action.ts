export interface User {
  userId: string;
  role: string;
  permissions: string[];
  teams?: string[]
}

export namespace UserActions {
  export class SetUser {
    static readonly type = `[User] Set user`;
    constructor(public payload: User) {
    }
  }
}
