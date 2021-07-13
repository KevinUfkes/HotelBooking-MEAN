import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {

  private query: QueryRef<any>;
  hotel: any;
  hotel_name: any;
  arrivalDate: any;
  checkoutDate: any;
  bookingDate: any;
  userId: any;
  hotelId: any;

  createBookingForm = new FormGroup({
    arrivalDate: new FormControl(),
    checkoutDate: new FormControl(),
  })

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId')
    console.log(this.hotelId);
    const HOTEL_QUERY = gql`
      query{
        getHotelById(id: "${this.hotelId}"){
          id,
          name,
          street,
          city,
          postal_code,
          price,
          email,
          img
        }
      }
    `
    this.query = this.apollo.watchQuery({
      query: HOTEL_QUERY,
      variables: {}
    })


    this.query.valueChanges.subscribe(result => {
      console.log(result.data)
      console.log(result.data.getHotelById)

      this.hotel = result.data.getHotelById;

      this.hotel_name = result.data.getHotelById.name
      console.log(this.hotel);
    })
  }

  onSubmit(){
    this.arrivalDate = this.createBookingForm.value.arrivalDate;
    this.checkoutDate = this.createBookingForm.value.checkoutDate;
    this.bookingDate = Date();
    this.userId = this.authenticationService.getUserId();
    const CREATE_BOOKING_MUTATION = gql`
      mutation{
        addBooking(hotel_id: "${this.hotelId}",
        booking_date: "${this.bookingDate}",
        booking_start: "${this.arrivalDate}",
        booking_end: "${this.checkoutDate}",
        hotel_name: "${this.hotel.name}",
        user_id: "${this.userId}"){
        hotel_id
        booking_date
        booking_start
        booking_end
        hotel_name
        user_id
      }}
    `
    this.apollo.mutate({
      mutation: CREATE_BOOKING_MUTATION,
      }).subscribe(({ data }) => {
    },(error) => {
      console.log('there was an error sending the query', error);
      alert(`Booking was not created. Error: ${error}`)
    });
    this.router.navigate(['/hotels']);
  }

}
