import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private query: QueryRef<any>;

  user: any;
  email!: String;
  password!: String;


  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(private apollo: Apollo, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    
    this.authenticationService.login(this.email, this.password)
      .subscribe(data => {
        console.log( "Login Status: " + data);

        if(data){
          this.router.navigate(['/hotels']);
        }else{
          alert("Username or Password incorrect!")
        }
      })
   
  }

}
