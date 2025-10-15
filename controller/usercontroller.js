const { Book, Cart } = require('../models/Book');




const addbook = async (req, res) => {
  try {
    const { title, author, category, price, language, published } = req.body;
    const image = req.file ? req.file.filename : null; // multer file name

    if (!title || !author || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ Create new book entry
    const newBook = await Book.create({
      title,
      author,
      category,
      price,
      language,
      // published,
      image, // save the filename
    });

    res.status(201).json({
      success: true,
      message: "✅ Book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.error("❌ Error adding book:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while adding the book",
      error: error.message,
    });
  }
};


const getbook = async (req,res) =>{
  try {
    const books = await Book.find()
    res.status(201).json({
      success:true,
      message:"fetched successfully",
      data:books
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"somthing went wrong"
    })
    
  }
}

const getbookbyid = async (req,res) =>{
  try {
     const { id } = req.params; 
    const books = await Book.findById(id)

    if (!books) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }


    res.status(201).json({
      success:true,
      message:"fetched successfully",
      data:books
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"somthing went wrong"
    })
    
  }
}


const updatebook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the book",
    });
  }
};



const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// ✅ Add to cart
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    // Check if already in cart
    let existingItem = await Cart.findOne({ bookId });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.json({ success: true, message: "Cart updated", data: existingItem });
    }

    const newCartItem = await Cart.create({ bookId, quantity });
    res.status(201).json({ success: true, message: "Added to cart", data: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// ✅ Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("bookId");
    res.json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart items" });
  }
};

// ✅ Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing item" });
  }
};


// usercontroller.js
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
    if (!cartItem) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany();
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { addbook , getbook ,getbookbyid , updatebook , deleteBook ,addToCart,getCartItems,removeCartItem,updateCartItem,clearCart};
