import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { House } from '../../models/interfaces/house.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl + 'houses';
  }

  getAllByRepre(repre_id: string): Observable<House[]> {
    return this.http.get<House[]>(this.url + '?owner_id=' + repre_id);
  }

  getById(house_id: string): Observable<House> {
    return this.http.get<House>(this.url + '/' + house_id);
  }

  updateById(
    house_id: string,
    name: string,
    description: string,
    currency: string
  ): Observable<House> {
    return this.http.patch<House>(this.url + '/' + house_id, {
      name: name,
      description: description,
      currency: currency,
    });
  }

  createById(
    owner_id: string,
    name: string,
    description: string,
    currency: string
  ): Observable<House> {
    return this.http.post<House>(this.url, {
      name: name,
      owner_id: owner_id,
      description: description,
      currency: currency,
      creationDate: new Date(),
    });
  }

  deleteById(house_id: string): Observable<any> {
    return this.http.delete(this.url + '/' + house_id);
  }
}
