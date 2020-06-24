const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    acceso: {
      type: Array,
      required: true,
      dashboard: {
        type: Boolean,
        default: true,
      },
      tarjetas: {
        type: Boolean,
        default: true,
      },
      agregarTarjeta: {
        type: Boolean,
        default: true,
      },
      detalleTarjeta: {
        type: Boolean,
        default: true,
      },
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

module.exports = User = mongoose.model("user", UserSchema);
