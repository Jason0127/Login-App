import { Component } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { LoginService } from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent{

  constructor(public loginService: LoginService, private router: Router) { }

  message = '';
  error = false;

  inActiveusername = false;
  inActivepassword = false;

  onClickusername() {
    this.inActiveusername = true;
  }

  onBlurusername(e: NgModel){

    if (e.value !== '') {
      this.inActiveusername = true;
    } else {
      this.inActiveusername = false;
    }

  }

  onClickpassword(){
    this.inActivepassword = true;
  }

  onBlurpassword(e: NgModel){

    if (e.value !== '') {
      this.inActivepassword = true;
    } else {
      this.inActivepassword = false;
    }

  }

  handleLoginSubmit(form: NgForm){

    let userData = {
      username: form.value.username,
      password: form.value.password
    }

    this.loginService.userLogin(userData).then(res => {
      let timeOut;
      clearTimeout(timeOut);
      if(res.data.success){
        this.router.navigate([`/users/${res.data.user.username}`], {queryParams: {name: res.data.user.username}})
      } else {
        this.error = true;
        this.message = 'Username or Password is Invalid';
        console.log(this.message)
        setTimeout(()=>{
          this.error = false;
        }, 2000);
      }
    });

  }

}
