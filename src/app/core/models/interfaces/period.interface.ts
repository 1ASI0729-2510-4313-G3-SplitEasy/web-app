export interface Period {
  id: string;
  name: string;
  dateInit: Date;
  dateDue: Date;
  owner_id: string;
  house_id: string;
  house_name?: string;
}
