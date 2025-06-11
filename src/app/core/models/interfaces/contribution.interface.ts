import { StatusContribution } from '../enums/contribution.enum';

export interface Contribution {
  user_id: string;
  memberName?: string;
  descripcion: string;
  amount: string;
  owner_id: string;
  currency: string;
  status: StatusContribution;
  house_id: string;
  dateDue: Date;
  dateCreate: Date;
  period_id: string;
  id: string;
  is_billing: boolean;
}
