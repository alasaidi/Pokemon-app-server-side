import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Please enter Pokémon name"],
  },
  type: {
    type: [String],
    required: [true, "Please enter Pokémon type(s)"],
  },
  picture: {
    type: String,
    required: [true, "Please provide a picture URL for the Pokémon"],
  },
  abilities: [
    {
      type: String,
    },
  ],
});
const pokemon = mongoose.model("Pokemon", pokemonSchema);
export default pokemon;
