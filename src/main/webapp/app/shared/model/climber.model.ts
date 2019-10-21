import { Moment } from 'moment';
import { IClimber } from 'app/shared/model/climber.model';

export interface IClimber {
  id?: number;
  firstName?: string;
  lastName?: string;
  birth?: Moment;
  friends?: IClimber[];
}

export const defaultValue: Readonly<IClimber> = {};
