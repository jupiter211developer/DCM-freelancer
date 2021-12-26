import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  userEmailValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.post<any>(this.apiUrl + 'verifyEmail', { email: userControl.value }).subscribe(
          data => {
            if (data) {
              resolve({ emailNotAvailable: true });
            }
            else {
              resolve(null);
            }
          },
          error => console.log(error)
        )
      }, 500);
    });
  }

  verifyEmail(email):any{
    return this.http.post(this.apiUrl + 'verifyEmail', { email: email });
  }

  login(data) {
    return this.http.post<any>(this.apiUrl + 'login', data);
  }

  getPaymentStatus(id): any {
    return this.http.get(this.apiUrl + 'checkPayment/' + id);
  }

  authenticatedUser(): any {
    return this.http.get(this.apiUrl + '');
  }

  getPlan(plan_name) {
    return this.http.get<any>(this.apiUrl + 'payment-plan/' + plan_name);
  }

  sendRequest(data): any {
    return this.http.post<any>(this.apiUrl + 'forgotPassword', data);
  }

  reset(id, data): any {
    return this.http.post<any>(this.apiUrl + 'resetPassword/' + id, data);
  }

  getInformations(vat): any {
    return this.http.get<any>(this.apiUrl + 'getCompanyInfosFromVat/' + vat);
  }

  register(form) {
    return this.http.post<any>(this.apiUrl + 'register', form);
  }

  sendToken(token: string) {
    localStorage.setItem('LoggedInUser', token);
  }

  getSkillsUsingCodeNace(nace) {
    return this.http.get(this.apiUrl + 'getCompetencesUsingNace/' + nace);
  }




}
