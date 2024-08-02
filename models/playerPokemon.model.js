import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const playerPokemonSchema = new Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  pokemonId: { type: Number, required: true },
  nickname: { type: String },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
});

const playerPokemon = mongoose.model("playerPokemon", playerPokemonSchema);
export default playerPokemon;
