import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseserviceService {

  constructor() { }

  BaseUrl():string{
    return "https://zp-bkd.herokuapp.com/rest";
    //return "http://localhost:8080/ZP_Backend/rest";
  }
}