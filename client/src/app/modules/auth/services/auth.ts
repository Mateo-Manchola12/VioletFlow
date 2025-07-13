import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ApiResponseStatus } from '@violetflow/types';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  public signIn(
    email: string,
    password: string,
  ): Observable<{ success: boolean; message: string }> {
    const result = this.http
      .post<ApiResponse>(
        environment.apiUrl + 'auth/signin',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .pipe(
        map((response) => {
          const { status, message } = response;
          if (status === ApiResponseStatus.Ok) {
            return {
              success: true,
              message: message || 'Inicio de sesión exitoso',
            };
          }
          return {
            success: false,
            message: response.error || 'Error al iniciar sesión',
          };
        }),
        catchError(() =>
          of({ success: false, message: 'Error de red o servidor' }),
        ),
      );

    return result;
  }
}
