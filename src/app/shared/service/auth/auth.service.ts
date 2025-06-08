import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../models/interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.serverBaseUrl + 'users';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + '?email=' + email + '&password=' + password
    );
  }
}
