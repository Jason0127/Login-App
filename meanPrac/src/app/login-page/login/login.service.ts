import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class LoginService{

  async userLogin(userData){
    return await axios.post('/api/login', userData);
  }

}
