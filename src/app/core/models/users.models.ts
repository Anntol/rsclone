export interface IServiceUser {
  email: string;
  password: string;
}

export interface IUserToken {
  auth_response: {
    access_token: string;
  };
}

export interface IUser {
  authorized: boolean,
  login: string,
  lang: string,
  theme: string,
  country: string,
  darckStyle: boolean
}
