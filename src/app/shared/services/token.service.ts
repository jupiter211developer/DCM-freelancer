import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : environment.apiUrl + 'login',
    user_login : environment.apiUrl + 'user_login',
  };
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: object 
  ) { }

  handletoken(token){
    this.set(token);
  }

  set(token){
    if(isPlatformBrowser(this.platformId)){
    localStorage.setItem('token', token);
    }
  }
  

  get(){
    let token = '';
    //if(isPlatformBrowser(this.platformId)){
      token = localStorage.getItem('token')
    //}
    return token;
  }

  remove(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token');
    }
  }

  isValide(){
    const token = this.get();
    if(token !== null){
      const payload = this.payload(token);
      if(payload){
        return (Object.values(this.iss).indexOf(payload.iss) > -1) ? true : false;
      }
      return false;
    }
    return false;
  }

  payload(token){
      const payload = token.split('.')[1];
      return this.decode(payload);
  }

  decode(payload){
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValide();
  }

  getUserId(){
    if(!this.isValide()) return null;
    const token = this.get();
    const payload = this.payload(token);
    return payload.sub;
  }

  getToken(){
    let token = '';
    if(isPlatformBrowser(this.platformId)){
      token = localStorage.getItem('token')
    }
    return token ? true :  false ;
  }
  getRole(){
    if(!this.isValide()) return null;
    const token = this.get();
    const payload = this.payload(token);
    return payload.role;
  }
  getSlug(){
    if(!this.isValide()) return null;
    const token = this.get();
    const payload = this.payload(token);
    return payload.slug;
  }
  getId(){
    if(!this.isValide()) return null;
    const token = this.get();
    const payload = this.payload(token);
    return payload.id;
  }
  getEmail(){
    if(!this.isValide()) return null;
    const token = this.get();
    const payload = this.payload(token);
    return payload.email;
  }

}
