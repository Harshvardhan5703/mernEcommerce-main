import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { MONGODB_URI } from "../../config.js";

import Product from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertProducts = async () => {
  try {
    // Drop the collection if it exists
    await Product.collection.drop().catch(() => console.log("Collection did not exist, creating new one"));

    let products = [];
    const products_file = path.join(__dirname, "converted_product.json");
    const data = await fs.readFile(products_file, { encoding: "utf8" });
    products = JSON.parse(data);

    for (const product of products) {
      delete product._id;
      await Product.create(product);
    }

    console.log("successfully added products to product collection");
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to mongodb");

    // inserting data into db.
    insertProducts();
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

connect();
