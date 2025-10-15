const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'book title is required'],
    trim:true,
    maxlength:[100,'title cannot exceed 100 character']
  },
  author: {
    type: String,
    required:  [true,'book author is required'],
    trim: true,
  },
category : {
    type: String,
    required:  [true,'category is required'],
    trim: true,
  },
  price : {
    type: Number,
    required:  [true,'price is required'],
    trim: true,
  },
    image: {
    type: String, // store the filename or URL of uploaded image
    required: false,
  },
  language: {
    type: String,
    required:  [true,'language is required'],
    trim: true,
  },
  // published: {
  //   type: String,
  //   required:  [true,'published is required'],
  //   trim: true,
  // },

//  year:{
//   type:Number,
//   require:[true,'publication year is required '],
//    min:[1000,'year must be greater than 1000'],
//     max:[new Date().getFullYear(),'year must be the future']
 
// }
});
const Book = mongoose.model('Book', userSchema);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // if you have user authentication later
      required: false,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {Book , Cart};