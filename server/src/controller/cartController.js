import Cart from "../models/cartModel.js";

const addItem = async (req, res) => {
  const { userID, productID, quantity, size } = req.body;

  // Validate input
  if (!userID || !productID || quantity === undefined || !size) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive integer" });
  }
  if (typeof size !== "string" || size.trim() === "") {
    return res.status(400).json({ error: "Invalid size" });
  }

  try {
    const cart = await Cart.findOne({ userID: userID });

    const newItem = {
      productID: productID,
      quantity: quantity,
      size: size,
    };
    if (!cart) {
      const newCart = await Cart.create({
        userID: userID,
        items: [newItem],
      });
      await newCart.save();
      return res.status(200).json({ message: "added to cart" });
    }

    const cartItems = cart.items;

    const itemExists = await Cart.findOne({
      userID: userID,
      "items.productID": productID,
      "items.size": size,
    });
    if (itemExists) {
      return res.status(409).json({ message: "item already added" });
    }

    cartItems.push(newItem);
    await cart.save();

    res.status(200).json({ message: "Added to Cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  const { userID } = req.params;

  try {
    const cart = await Cart.findOne({ userID: userID });

    if (!cart)
      return res.status(200).json({ message: "Your Shopping Cart Is empty" });

    const data = {
      userID: cart.userID,
      items: cart.items,
    };

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  const { itemID } = req.body;
  const { userID } = req.params;

  // Validate input
  if (!itemID || !userID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const deleteCartItem = await Cart.updateOne(
      { userID: userID },
      { $pull: { items: { _id: itemID } } }
    );

    if (deleteCartItem.modifiedCount !== 1) {
      return res
        .status(404)
        .json({ error: "Item not found in cart" });
    }

    return res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateItem = async (req, res) => {
  const { userID } = req.params;
  const { itemID, quantity } = req.body;

  // Validate input
  if (!itemID || quantity === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive integer" });
  }

  try {
    const updatedCart = await Cart.updateOne(
      { userID: userID, "items._id": itemID },
      { $set: { "items.$.quantity": quantity } }
    );

    if (updatedCart.modifiedCount !== 1) {
      return res
        .status(404)
        .json({ error: "Item not found in cart" });
    }

    return res.status(200).json({ message: "successfully updated Item" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addItem, getCart, deleteItem, updateItem };
