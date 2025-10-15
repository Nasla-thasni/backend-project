const express = require('express');
const multer = require("multer");
const router = express.Router();
const { addbook , getbook , getbookbyid , updatebook , deleteBook,addToCart,getCartItems,removeCartItem,updateCartItem,clearCart} = require('../controller/usercontroller');


// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to store images (make sure it exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  },
});

const upload = multer({ storage: storage });




router.post('/add',upload.single('image'),addbook);     // Get all users
router.get('/get',getbook);
router.get('/get/:id',getbookbyid);
router.put('/update/:id',upload.single('image'),updatebook);
router.delete('/delete/:id',deleteBook)

router.post("/cart/add", addToCart);
router.get("/cart", getCartItems);
router.delete("/cart/remove/:id", removeCartItem); 


router.put("/cart/update/:id", updateCartItem);
router.delete("/cart/clear", clearCart);

module.exports = router;
