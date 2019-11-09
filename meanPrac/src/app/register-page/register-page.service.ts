import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService{

  async addUsers(user){
    // console.log(...user)
    return await axios.post('/api/addUser', user);

  }

}
