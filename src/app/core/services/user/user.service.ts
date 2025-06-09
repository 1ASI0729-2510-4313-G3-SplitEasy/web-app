import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl + 'users';
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }
}
