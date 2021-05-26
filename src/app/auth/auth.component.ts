import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../_models/login-request';
import { SignupRequest } from '../_models/signup-request.model';
import { SignupResponse } from '../_models/signup-response.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string = null;
  loading = false;
  loginMode = true;

  authObservable: Observable<any>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(authForm: NgForm) {

    this.loading = true;

    this.loginMode  = true;
    if (this.loginMode) {
      const signinRequest: LoginRequest = {
        'email': authForm.value.email,
        'password': authForm.value.password,
        'returnSecureToken': true
      };
      this.authObservable = this.authService.signin(signinRequest);
    } else {
      const signupRequest: SignupRequest = {
        'email': authForm.value.email,
        'password': authForm.value.password,
        'returnSecureToken': true
      };
      this.authObservable = this.authService.signup(signupRequest);
    }

    this.authObservable.subscribe(() => {
      this.loading = false
      this.error = null;

      this.router.navigate(['/recipes']);
    }, error => {
      this.loading = false
      this.error = error;
    })

    authForm.reset()
  }

  toggle() {
    this.loginMode = !this.loginMode;

    this.error = null;
  }

}
