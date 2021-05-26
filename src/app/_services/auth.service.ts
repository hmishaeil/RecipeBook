import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../_models/login-request';
import { LoginResponse } from '../_models/login-response';
import { SignupRequest } from '../_models/signup-request.model';
import { SignupResponse } from '../_models/signup-response.model';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient, private router: Router) { 
  }

  signup(signupRequest: SignupRequest) {
    return this.http.post<SignupResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey,
      signupRequest).pipe(
        catchError(this.handleError),
        tap(this.handleLogin),
      )
  }

  signin(loginRequest: LoginRequest) {

    return this.http.post<LoginResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
      loginRequest).pipe(
        catchError(this.handleError),
        tap((data) => {
          this.handleLogin(data)
        }),
      )
  }

  logout(){
    this.user$.next(null);
    localStorage.removeItem('userData')

    this.router.navigate(['/auth']);

  }

  autoLogin(){
    // check the localStorage
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(userData){
      const user = new User (userData.id,
        userData.email,
        userData._token,
        userData._tokenExpirationDate,
      );

      this.user$.next(user);
    } else{
      console.log("localstorage is not set")
    }

  }

  private handleError(error: any) {
    let errMsg: string = "unexpected error happened!!!!"

    switch (error.error.error.message) {
      case "INVALID_PASSWORD":
        errMsg = "buddy you entered wrong password..."
        break;
      case "EMAIL_EXISTS":
        errMsg = "buddy email exists..."
        break;
      case "EMAIL_NOT_FOUND":
        errMsg = "buddy email not found..."
        break;
      default:
        break;
    }
    return throwError(errMsg)
  }

  private handleLogin(res: LoginResponse){
    const expTime = new Date(new Date().getTime() + +res.expiresIn * 1000)
    const user: User = new User(res.localId, res.email, res.idToken, expTime);
    this.user$.next(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}

