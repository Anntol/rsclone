export interface IProjects {
  projects: IAllProjects;
}

export interface IAllProjects {
  hasNext: boolean;
  nextProjectId: number;
  numberFound: number;
  project: IProject[];
}

export interface IProject {
  id: number;
  goal: number;
  active: boolean;
  activities: string;
  additionalDocumentation: string;
  approvedDate: string;
  contactAddress: string;
  contactCity: string;
  contactCountry: string;
  contactName: string;
  contactPostal: string;
  contactState: string;
  contactUrl: string;
  country: string;
  countries: ICountry[];
  dateOfMostRecentReport: string;
  donationOptions: IDonationOption[];
  funding: number;
  image: {
    id: number;
    title: string;
    imagelink: IImagelink[];
  };
  imageGallerySize: number;
  imageLink: string;
  iso3166CountryCode: string;
  latitude: number;
  longTermImpact: string;
  longitude: number;
  modifiedDate: string;
  need: string;
  numberOfDonations: number;
  numberOfReports: number;
  organization: IOrganisation;
  progressReportLink: string;
  projectLink: string;
  region: string;
  remaining: number;
  status: string;
  summary: string;
  themeName: string;
  themes: ITheme[];
  title: string;
  type: string;
}

export interface ICountry {
  iso3166CountryCode: string;
  name: string;
}

export interface IDonationOption {
  amount: number;
  description: string;
}

export interface IImagelink {
  size: string;
  url: string;
}

export interface IOrganisation {
  activeProjects: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  countries: ICountry[];
  country: string;
  id: string;
  iso3166CountryCode: string;
}

export interface ITheme {
  id: string;
  name: string;
}
