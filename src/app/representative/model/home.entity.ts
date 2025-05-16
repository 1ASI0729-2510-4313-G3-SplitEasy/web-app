export class Home {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  currency: string;
  creationDate: Date;
  creationDateFormatted: string;

  constructor(home: {
    id?: string | number; // <- aceptamos number también
    name?: string;
    description?: string;
    membersCount?: number;
    currency?: string;
    creationDate?: Date | string;
  }) {
    this.id = home.id?.toString() || ''; // <- forzamos que sea string
    this.name = home.name || '';
    this.description = home.description || '';
    this.membersCount = home.membersCount ?? 3;
    this.currency = home.currency || '';
    this.creationDate = home.creationDate ? new Date(home.creationDate) : new Date();

    const day = this.creationDate.getDate().toString().padStart(2, '0');
    const month = (this.creationDate.getMonth() + 1).toString().padStart(2, '0');
    const year = this.creationDate.getFullYear();
    this.creationDateFormatted = `${day}/${month}/${year}`;
  }
}
