import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Period } from '../../models/interfaces/period.interface';

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl + 'periodsContributions';
  }

  getAllByRepre(repre_id: string): Observable<Period[]> {
    return this.http.get<Period[]>(this.url + '?owner_id=' + repre_id);
  }

  getAll(query: string): Observable<Period[]> {
    return this.http.get<Period[]>(this.url + '?' + query);
  }

  getById(period_id: string): Observable<Period> {
    return this.http.get<Period>(this.url + '/' + period_id);
  }

  updateById(
    period_id: string,
    name: string,
    dateInit: Date,
    dateDue: Date,
    house_id: string
  ): Observable<Period> {
    return this.http.patch<Period>(this.url + '/' + period_id, {
      name: name,
      dateInit: dateInit,
      dateDue: dateDue,
      house_id: house_id,
    });
  }

  createById(
    user_id: string,
    name: string,
    dateInit: Date,
    dateDue: Date,
    house_id: string
  ): Observable<Period> {
    return this.http.post<Period>(this.url, {
      name: name,
      owner_id: user_id,
      dateInit: dateInit,
      dateDue: dateDue,
      house_id: house_id,
    });
  }

  deleteById(period_id: string): Observable<Period> {
    return this.http.delete<Period>(this.url + '/' + period_id);
  }
}
