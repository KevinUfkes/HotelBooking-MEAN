import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import gql from 'graphql-tag';
import { Apollo, Mutation } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    passwordcheck: new FormControl()
  })

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm.value)
    console.log(this.signupForm.value.password)
    console.log(this.signupForm.value.passwordcheck)
    if(this.signupForm.value.username == null || this.signupForm.value.email == null || this.signupForm.value.password == null){
      alert("Please fill out all fields!");
    }
    else if(this.signupForm.value.password != this.signupForm.value.passwordcheck) {
      alert("Passwords do not match!");
    }
    else {
      var addUserRequest = gql `
        mutation{
          addUser(
            username: "${this.signupForm.value.username}",
            email: "${this.signupForm.value.email}",
            password: "${this.signupForm.value.password}"
          ){
            username
            email
            password
          }
        }
      `
      this.addUser(addUserRequest);
      console.log(addUserRequest)
    }
  }

  addUser(mutationReq) {
      this.apollo.mutate({
      mutation: mutationReq,
      }).subscribe(({ data }) => {
    },(error) => {
      console.log('there was an error sending the query', error);
      alert(`User was not created. Error: ${error}`)
    });
    this.router.navigate(['/login']);
  }
}
