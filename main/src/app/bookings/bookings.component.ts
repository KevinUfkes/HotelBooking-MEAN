import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  private query: QueryRef<any>;
  user_id: any;
  bookings: any[] = [];

  constructor(private apollo: Apollo, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user_id = this.authenticationService.getUserId();

    const BOOKING_QUERY = gql`
    query{
      getBookingByUserId(user_id: "${this.user_id}"){
       booking_date,
       booking_start,
       booking_end
      }
    }
  `

  this.query = this.apollo.watchQuery({
    query: BOOKING_QUERY,
    variables: {}
  })


  this.query.valueChanges.subscribe(result => {
    console.log(result.data)
    console.log(result.data.getBookingByUserId)

    this.bookings = result.data.getBookingByUserId;
    console.log(this.bookings);
  })
  }

}
