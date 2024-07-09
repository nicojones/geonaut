import { ILoginFormFields } from "./login-form-fields.type";

export interface ISignupFormFields extends ILoginFormFields {
  name: string;
  email: string;
}
