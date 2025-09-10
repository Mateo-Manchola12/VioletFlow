import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiResponse,
  ApiResponseStatus,
  CreateCompanyAccount,
  CreateUserAccount,
} from '@violetflow/types';
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

  public signUp(
    user: CreateUserAccount,
    company: CreateCompanyAccount,
  ): Observable<{ success: boolean; message: string }> {
    const result = this.http
      .post<ApiResponse>(
        environment.apiUrl + 'auth/signup',
        {
          user,
          company,
        },
        { withCredentials: true },
      )
      .pipe(
        map((response) => {
          console.log('Response from signUp:', response);
          const { status, message } = response;
          if (status === ApiResponseStatus.Created) {
            return {
              success: true,
              message: message || 'Registro exitoso',
            };
          }
          return {
            success: false,
            message: response.error || 'Error al registrar',
          };
        }),
        catchError(() =>
          of({ success: false, message: 'Error de red o servidor' }),
        ),
      );

    return result;
  }

  public verifyEmail(): Observable<{ success: boolean; message: string }> {
    const result = this.http
      .post<ApiResponse>(
        environment.apiUrl + 'auth/verify-email',
        {},
        { withCredentials: true },
      )
      .pipe(
        map((response) => {
          const { status, message } = response;
          if (status === ApiResponseStatus.Ok) {
            return {
              success: true,
              message: message || 'Correo electrónico verificado correctamente',
            };
          }
          return {
            success: false,
            message:
              response.error || 'Error al verificar el correo electrónico',
          };
        }),
        catchError(() =>
          of({ success: false, message: 'Error de red o servidor' }),
        ),
      );

    return result;
  }
}
