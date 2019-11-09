import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UsersComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, private activateRoute: ActivatedRoute){}

  user = '';

  ngOnInit(){

    this.userService.auth().then(res =>{
      let user = this.activateRoute.snapshot.params.name;
      this.user = user;
      console.log(user);
      if(!res.data.isAuth){
        this.router.navigate(['/']);
      }
    })

  }

}
