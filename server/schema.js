const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
   type Hotel {
     id: ID!
     name: String!
     street: String!
     city: String!
     postal_code: String!
     price: Float!
     email: String!
     img: [String]
   }

   type User {
       id: ID!
       username: String!
       password: String!
       email: String!
       img: String
   }

   type Booking {
       id: ID!
       hotel_id: String!
       hotel_name: String!
       booking_date: String!
       booking_start: String!
       booking_end: String!
       user_id: String!
       
   }

   type Query {
     getHotels: [Hotel]
     getHotelById(id: ID!): Hotel
     getHotelByCity(city: String!): [Hotel]

     getUsers: [User]
     getUserById(id: ID!): User
     getUserByEmail(email: String!): User

     getBooking: [Booking]
     getBookingById(id: ID!): Booking
     getBookingByUserId(user_id: ID!): [Booking]
   }

   type Mutation {
      addHotel(name: String!
         street: String!
         city: String!
         postal_code: String!
         price: Float!
         email: String!): Hotel

      updateHotel(id: String!,
         name: String!
         street: String!
         city: String!
         postal_code: String!
         price: Float!
         email: String!
         img: String): Hotel

      updateHotelImg(id: String!,
         img: String
         ): Hotel

      deleteHotel(id: ID!): Hotel

      addUser(username: String!
        password: String!
        email: String!): User

      updateUserImg(id: String!,
         img: String
         ): User

      addBooking(hotel_id: String!
         hotel_name: String!
         booking_date: String!
         booking_start: String!
         booking_end: String!
         user_id: String!): Booking
         
      }
`