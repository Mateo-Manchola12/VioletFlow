import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  ApiResponseStatus,
  PublicUserAccount,
  UserAccount,
} from '@violetflow/types';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Session {
  constructor(private http: HttpClient) {}
  private user: BehaviorSubject<PublicUserAccount | null> =
    new BehaviorSubject<PublicUserAccount | null>(null);
  private sessionInitialized: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  setUser(): Observable<PublicUserAccount | null> {
    this.sessionInitialized.next(true);
    const res = this.http
      .get<
        ApiResponse<PublicUserAccount>
      >(environment.apiUrl + 'auth/session', { withCredentials: true })
      .pipe(
        map((res) => (res.status === ApiResponseStatus.Ok ? res.data : null)),
        tap({ next: (user) => this.user.next(user) }),
        catchError(() => {
          this.user.next(null);
          return of(null);
        }),
      );
    return res;
  }

  getUser() {
    return this.user.asObservable();
  }

  getUserData(): PublicUserAccount | null {
    return this.user.getValue();
  }

  clearUser() {
    this.user.next(null);
  }

  isSessionInitialized(): Observable<boolean> {
    return this.sessionInitialized.asObservable();
  }
}
