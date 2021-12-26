import { TokenService } from './../../shared/services/token.service';
import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')] }),
    password: new FormControl('', Validators.required),
    remember_me: new FormControl(false),
  });
  loginError = null;
  prevUrl: any = null;
  show: boolean = false;
  token: any;

  constructor(
    public http: HttpClient,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.token = this.tokenService.get();
    console.log( 'the token value is: ', this.token);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          this.tokenService.handletoken(data.access_token);
          this.tokenService.set(data.access_token);
        },
        (error) => {
          this.loginError = error.error.error
        },
        () => {
          //this.router.navigateByUrl('me');
        },
      );
    }
  }

}
