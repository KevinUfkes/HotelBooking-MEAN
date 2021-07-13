import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  private query1: QueryRef<any>;
  private query2: QueryRef<any>;
  private query3: QueryRef<any>;

  user_id: any;
  hotel_id: any[] = [];
  bookings: any[] = ["hotel_id", "booking_date", "booking_start", "booking_end", "hotel_name"];
  hotel_names: any[] = [];
  username: any;

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user_id = this.authenticationService.getUserId();

    const USER_QUERY = gql`
      query{
        getUserById(id: "${this.user_id}"){
          username
        }
      }
    `

    const BOOKING_QUERY = gql`
      query{
        getBookingByUserId(user_id: "${this.user_id}"){
          hotel_id,
          booking_date,
          booking_start,
          booking_end,
          hotel_name
        }
      }
    `

    this.query1 = this.apollo.watchQuery({
      query: BOOKING_QUERY
    })

    this.query1.valueChanges.subscribe(result => {
      this.bookings = result.data.getBookingByUserId;

      for(let x=0; x<this.bookings.length; x++){
        this.hotel_id[x] = this.bookings[x].hotel_id

        const HOTEL_QUERY = gql`
          query{
            getHotelById(id: "${this.hotel_id[x]}"){
              name
            }
          }
        `

        this.query3 = this.apollo.watchQuery({
          query: HOTEL_QUERY
        })

        this.query3.valueChanges.subscribe(result => {
          this.hotel_names[x] = result.data.getHotelById.name
          this.bookings[x]["hotel_name"] = result.data.getHotelById.name
        })
      }
    })

    this.query2 = this.apollo.watchQuery({
      query: USER_QUERY
    })

    this.query2.valueChanges.subscribe(result => {
      this.username = result.data.getUserById.username;
      console.log(this.username)
    })

  }

}
