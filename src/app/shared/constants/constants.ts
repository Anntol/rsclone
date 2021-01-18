export const BASE_URL = 'https://api.globalgiving.org/api';
export const MIN_LENGTH_QUERY = 3;
export const WAIT_FOR_INPUT = 1500;
export const NUMBER_RETRIES_OF_REQUESTS = 3;
export const NAV_MENU = {
  menuItems:
    [
      { icon: 'home', option: 'NAV_MENU.HOME' },
      { icon: 'attach_money', option: 'NAV_MENU.PROJECTS' },
      { icon: 'public', option: 'NAV_MENU.MAP' },
      { icon: 'settings', option: 'NAV_MENU.SETTINGS' },
      { icon: 'login', option: 'NAV_MENU.SIGN_IN' }
    ]
}
export const THEMES = [
  {
    id: 'animals',
    name: 'THEME.ANIMALS',
    img: './assets/svg/theme_animals.svg'
  },
  {
    id: 'children',
    name: 'THEME.CHILDREN',
    img: './assets/svg/theme_children.svg'
  },
  {
    id: 'climate',
    name: 'THEME.CLIMATE',
    img: './assets/svg/theme_climate.svg'
  },
  {
    id: 'disaster',
    name: 'THEME.DISASTER',
    img: './assets/svg/theme_disaster.svg'
  },
  {
    id: 'edu',
    name: 'THEME.EDU',
    img: './assets/svg/theme_edu.svg'
  },
  {
    id: 'health',
    name: 'THEME.HEALTH',
    img: './assets/svg/theme_health.svg'
  },
  {
    id: 'human',
    name: 'THEME.HUMAN',
    img: './assets/svg/theme_human.svg'
  },
  {
    id: 'sport',
    name: 'THEME.SPORT',
    img: './assets/svg/theme_sport.svg'
  },
  {
    id: 'hunger',
    name: 'THEME.HUNGER',
    img: './assets/svg/theme_hunger.svg'
  },
  {
    id: 'covid-19',
    name: 'THEME.COVID-19',
    img: './assets/svg/theme_covid-19.svg'
  },
  {
    id: 'water',
    name: 'THEME.WATER',
    img: './assets/svg/theme_water.svg'
  },
  {
    id: 'disability',
    name: 'THEME.DISABILITY',
    img: './assets/svg/theme_disability.svg'
  },
  {
    id: 'agriculture',
    name: 'THEME.AGRICULTURE',
    img: './assets/svg/theme_agriculture.svg'
  },
  {
    id: 'wildlife',
    name: 'THEME.WILDLIFE',
    img: './assets/svg/theme_wildlife.svg'
  },
]
export abstract class CommonConstants {
  public static readonly LANGUAGE_ARR: Array<string> = ['by', 'ua', 'en'];
}
