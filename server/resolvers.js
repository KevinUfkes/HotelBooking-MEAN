const Hotel = require('./model/HotelModel.js');
const User = require('./model/UserModel.js');
const Booking = require('./model/BookingModel.js')

exports.resolvers = {
    Query: {
        getHotels: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelById: async (parent, args) => {
            return await Hotel.findById(args.id);
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city});
        },
        getBooking: async (parent, args) => {
            return await Booking.find({});
        },
        getUsers: async (parent, args) => {
            return await User.find({});
        },
        getUserByEmail: async(parent, args) => {
            return await User.findOne({"email": args.email})
        },
        getBookingByUserId: async(parent, args) => {
            return await Booking.find({"user_id": args.user_id})
        }

    },
    Mutation: {
        addHotel: async (parent, args) => {
            console.log(args)
            // const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            // const isValidEmail =  emailExpression.test(String(email).toLowerCase())
            
            // if(!isValidEmail){
            //     throw new Error("email not in proper format")
            // }

            let newHotel = new Hotel({
                name: args.name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email
            });
        return await newHotel.save();
      },
      updateHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await Hotel.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    name: args.name,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    img: args.img
                }
            }, {new: true}, (err, hotel) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the hotel');
                } else 
                {
                    return hotel
                }
            }
        );
      },
      updateHotelImg: async(parent, args) => {
        console.log(args)
        if (!args.id){
            return;
        }
        return await Hotel.findOneAndUpdate(
        {
            _id: args.id
        },
        {
            $set: {
                img: args.img
            }
        }, {new: true}, (err, hotel) => {
            if (err) 
            {
                console.log('Something went wrong when updating the hotel');
            } else 
            {
                return hotel
            }
        });
    },

      deleteHotel: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Hotel.findByIdAndDelete(args.id)
      },

      addUser: async (parent, args) => {
        console.log(args)
        // const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        // const isValidEmail =  emailExpression.test(String(email).toLowerCase())
        
        // if(!isValidEmail){
        //     throw new Error("email not in proper format")
        // }

        let newUser = new User({
            username: args.username,
            password: args.password,
            email: args.email
        });
        return await newUser.save();
    },

    addBooking: async (parent, args) => {
        console.log(args)
        // const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        // const isValidEmail =  emailExpression.test(String(email).toLowerCase())
        
        // if(!isValidEmail){
        //     throw new Error("email not in proper format")
        // }

        let newBooking = new Booking({
            hotel_id: args.hotel_id,
            booking_date: args.booking_date,
            booking_start: args.booking_start,
            booking_end: args.booking_end,
            user_id: args.user_id
        });
        return await newBooking.save();
    },
    }
  }