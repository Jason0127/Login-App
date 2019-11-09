import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private router: Router) {}

  async auth(){

    let auth = await axios.get('/api/auth');

    return auth;

  }

}
