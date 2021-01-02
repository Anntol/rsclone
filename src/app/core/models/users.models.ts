export interface IUserForApi {
  email: string;
  password: string;
}

export interface IUserToken {
  auth_response: {
    access_token: string;
  };
}
