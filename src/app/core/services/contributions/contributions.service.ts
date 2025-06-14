import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contribution } from '../../models/interfaces/contribution.interface';
import { StatusContribution } from '../../models/enums/contribution.enum';

@Injectable({
  providedIn: 'root',
})
export class ContributionsService {
  private url: string = environment.serverBaseUrl;
  constructor(private http: HttpClient) {
    this.url = this.url + 'contributions';
  }

  getAll(query: string | null = null): Observable<Contribution[]> {
    const url = query ? this.url + '?' + query : this.url;
    return this.http.get<Contribution[]>(url);
  }

  getAllByHouse(house_id: string): Observable<Contribution[]> {
    return this.getAll('house_id=' + house_id);
  }
  getAllByHouseNotBilling(house_id: string): Observable<Contribution[]> {
    return this.getAll('house_id=' + house_id + '&is_billing=false');
  }
  getAllByHouseIsBilling(house_id: string): Observable<Contribution[]> {
    return this.getAll('house_id=' + house_id + '&is_billing=true');
  }

  getAllByPeriod(period_id: string): Observable<Contribution[]> {
    return this.getAll(this.url + 'period_id=' + period_id);
  }

  getAllByOwner(owner_id: string): Observable<Contribution[]> {
    return this.getAll(this.url + 'owner_id=' + owner_id);
  }

  create(
    owner_id: string,
    descripcion: string,
    amount: number,
    user_id: string,
    currency: string,
    house_id: string,
    period_id: string,
    is_billing: boolean
  ): Observable<Contribution> {
    return this.http.post<Contribution>(this.url, {
      user_id: user_id,
      descripcion: descripcion,
      amount: amount,
      owner_id: owner_id,
      currency: currency,
      status: StatusContribution.PENDING,
      house_id: house_id,
      dateCreate: new Date(),
      period_id: period_id,
      is_billing: is_billing,
    });
  }

  update(
    id: string,
    user_id: string,
    descripcion: string,
    amount: number,
    currency: string,
    house_id: string,
    period_id: string,
    status: StatusContribution,
    is_billing: boolean
  ): Observable<Contribution> {
    return this.http.patch<Contribution>(this.url + '/' + id, {
      user_id: user_id,
      descripcion: descripcion,
      amount: amount,
      currency: currency,
      status: status,
      house_id: house_id,
      dateCreate: new Date(),
      period_id: period_id,
      is_billing: is_billing,
    });
  }

  delete(id: string): Observable<Contribution> {
    return this.http.delete<Contribution>(this.url + '/' + id);
  }
}
