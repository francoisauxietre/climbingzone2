export interface IRoute {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  physique?: number;
  technique?: number;
  tactique?: number;
  mental?: number;
  niveau?: string;
}

export const defaultValue: Readonly<IRoute> = {};
