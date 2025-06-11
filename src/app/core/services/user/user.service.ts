import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/interfaces/auth.interface';
import { Observable } from 'rxjs';
import { Roles } from '../../models/enums/roles.enum';

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

  updateUser(
    user_id: string,
    email: string,
    role: Roles,
    firstName: string,
    lastName: string
  ): Observable<User> {
    return this.http.patch<User>(this.url + '/' + user_id, {
      email: email,
      role: role,
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateUserPassword(user_id: string, password: string): Observable<User> {
    return this.http.patch<User>(this.url + '/' + user_id, {
      password: password,
    });
  }

  getAllByHouse(house_id: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.url + '?house_id=' + house_id + '&role=member'
    );
  }

  deleteById(id: string): Observable<User> {
    return this.http.delete<User>(this.url + '/' + id);
  }
}
