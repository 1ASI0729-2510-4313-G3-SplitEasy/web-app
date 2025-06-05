import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MemberContribution {
  date: Date;
  amount: number;
  comment: string;
  status: string;
}

export interface MemberSummary {
  id: string;
  name: string;
  homeId: string;
  assignedGoal: number;
  totalContributed: number;
  deadline: string;
  status: string;
  contributionHistory: MemberContribution[];
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:3000/members';

  constructor(private http: HttpClient) {}

  getMemberSummary(memberId: string): Observable<MemberSummary> {
    return this.http.get<MemberSummary>(`${this.apiUrl}/${memberId}`);
  }
}
