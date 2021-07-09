import { Injectable } from '@angular/core';
// import Observable from 'zen-observable';
import { Observable, of } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private query: QueryRef<any>; 
  private user: any;
  private formEmail: String;
  private formPassword: String;

  isLoggedIn = false;
  

  constructor(private apollo: Apollo) { }

  login(email: String, password: String): Observable<boolean> {

    const USER_QUERY = gql`
      query{
        getUserByEmail(email: "${email}"){
          id,
          username,
          password,
          email,
          img
        }
      }
    `

    this.query = this.apollo.watchQuery({
      query: USER_QUERY,
      variables: {}
    })

    this.query.valueChanges.subscribe(result => {
      // console.log(result.data.getUserByEmail)
      this.user = result.data.getUserByEmail;
      // console.log(this.user.password)
      this.formEmail = email;
      this.formPassword = password;
      // console.log(this.formPassword)
    })
    
    console.log(this.user)

    this.isLoggedIn = this.formPassword == this.user.password;
    localStorage.setItem('isLoggedIn', this.isLoggedIn ? "true" : "false");

    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isValid():boolean{
    let storeData = localStorage.getItem("isLoggedIn");
    console.log("StoreData: " + storeData);

    if( storeData != null && storeData == "true")
    {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  }

  getUserId(){
    return this.user.id;
  }
}
