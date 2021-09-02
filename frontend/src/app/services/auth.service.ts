import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;

  setIsAuth(status: boolean): void{
    this.isAuth = status;
  }

  getIsAuth():boolean{
    return this.isAuth;
  }
}
