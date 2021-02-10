export interface IFavourite {
  projectId: number;
  title: string;
}

export interface IFavouriteResponse {
  message: string;
  favourites: IFavourite[];
}
