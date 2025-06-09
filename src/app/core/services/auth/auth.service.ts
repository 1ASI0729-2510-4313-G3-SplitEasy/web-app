import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.serverBaseUrl + 'users';
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.url + '?email=' + email + '&password=' + password
    );
  }

  public existUser(email: string) {
    return this.http.get<User[]>(this.url + '?email=' + email);
  }

  public changePassword(user_id: string, new_password: string) {
    return this.http.patch<User>(this.url + '/' + user_id, {
      password: new_password,
    });
  }
}
