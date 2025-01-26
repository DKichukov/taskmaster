import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {catchError, tap, throwError} from 'rxjs';

type TokenResponse = {
  token: string;
};

export type RegisterRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "USER" | "ROLE" | "MANAGER";

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/v1/auth";
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  login(email: string, password: string) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, {email, password})
      .pipe(
        tap((response) => {
          this.storageService.setToken(response.token);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(() => {
            new Error('Incorrect login, please try again');
          });
        })
      );
  }

  register({firstname, lastname, email, password, role}: RegisterRequest) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, {firstname, lastname, email, password, role})
      .pipe(
        tap((response) => {
          this.storageService.setToken(response.token);
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(() => new Error('Registration failed. Please try again.'));
        })
      );
  }

  logout() {
    this.storageService.clearToken();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return Boolean(this.storageService.getToken());
  }
}
