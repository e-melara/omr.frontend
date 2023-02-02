export interface IUser {
  fullName: string;
  username: string;
}

export interface LoginInput {
  documento: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  username: string;
  full_name: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface INotify {
  detail?: string;
  summary?: string;
  severity?: string;
}

export interface IMenu {
  width: number;
  menuWidth: number;
  hideLeftArrow: boolean;
  hideRightArrow: boolean;
}

// Menu sidebar interfaces
export interface ISideBarMenu {
  headTitle1?: string;
  headTitle2?: string;
  type: IMenuType;
  title?: string;
  icon?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  children?: IChildren[];
  path?: string;
  bookmark?: boolean;
}

export interface IChildren {
  path?: string;
  title: string;
  type: IMenuType;
  active?: boolean;
  children?: SubChildren[];
  icon?: string;
}

export interface SubChildren {
  path: string;
  title: string;
  type: IMenuType;
}

export enum IMenuType {
  Headtitle = "headtitle",
  Link = "link",
  Sub = "sub",
}

// token interfaces roles
export interface IModulos {
  short_name: string;
}
export interface IRoles {
  roles: string[];
  perfil: string;
  modulos: IModulos[];
}