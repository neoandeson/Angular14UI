import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private baseURL:string = "https://localhost:7214/api/Auth/"
  constructor(private http: HttpClient) {}

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseURL}register`, userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseURL}login`, loginObj)
  }

  public logout(routerObj:any) {
    localStorage.removeItem(this.tokenKey);
    routerObj.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('Token');
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
