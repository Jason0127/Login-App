import { Component } from "@angular/core";
import { NgForm, NgModel } from '@angular/forms';
import { RegisterService } from './register-page.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterComponent{

  constructor(public registerService: RegisterService){}

  inActiveusername = false;
  inActivepassword = false;
  inActiveFirstName = false;
  inActiveLastName = false;
  message = '';
  success = false;
  error = false;

  onClickusername() {

    this.inActiveusername = true;

  }

  onBlurusername(e: NgModel) {

    if(e.value !== ''){
      this.inActiveusername = true;
    } else {
      this.inActiveusername = false;
    }

  }

  onClickpassword() {

    this.inActivepassword = true;

  }

  onBlurpassword(e: NgModel) {

    if(e.value !== ''){
      this.inActivepassword = true;
    } else {
      this.inActivepassword = false;
    }

  }

  onClickFirstName() {

    this.inActiveFirstName = true;

  }

  onBlurFirstName(e: NgModel) {

    if(e.value !== ''){
      this.inActiveFirstName = true;
    } else {
      this.inActiveFirstName = false;
    }

  }

  onClickLastName() {

    this.inActiveLastName = true;

  }

  onBlurLastName(e: NgModel) {

    if(e.value !== ''){
      this.inActiveLastName = true;
    } else {
      this.inActiveLastName = false;
    }

  }

  handleRegisterSubmit(form: NgForm){

    let data = {
      username: form.value.username,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName
    }

    this.registerService.addUsers(data).then(res =>{
      console.log(res.data)
      let timeOut;
      clearTimeout(timeOut)
      if (res.data.error) {
        this.error = true;
        this.success = false;

        form.reset();

        this.message = 'That username is taken Or form not filled Up. try Again';

        timeOut = setTimeout(() => {

          this.success = false;
          this.error = false;

        }, 2000);

      } else if (res.data.success) {
        this.success = true;
        this.error = false;
        form.reset();
        this.message = 'Added Successfuly';
        timeOut = setTimeout(() => {

          this.success = false;
          this.error = false;

        }, 2000);
      }
    });

    console.log(data)

  }

}
