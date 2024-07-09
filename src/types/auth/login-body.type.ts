export interface ILoginBody {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface ISignupBody extends ILoginBody {
  name: string;
  email: string;
}
