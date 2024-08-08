import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const playerPokemonSchema = new Schema({
  playerId: {
    type: Number,
    ref: "Player",
    required: true,
  },
  pokemonId: {
    type: Number,
    ref: "Pokemon",
    required: true,
  },
  nickname: { type: String },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
});

const playerPokemon = mongoose.model("playerPokemon", playerPokemonSchema);
export default playerPokemon;
