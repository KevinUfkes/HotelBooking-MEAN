import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';

const HOTELS_QUERY = gql`
  query{
    getHotels{
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

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.query = this.apollo.watchQuery({
      query: HOTELS_QUERY,
      variables: {}
    })


    this.query.valueChanges.subscribe(result => {
      console.log(result.data)
      console.log(result.data.getHotels)

      this.hotels = result.data.getHotels;
      console.log(this.hotels);
    })

    
  }

}
