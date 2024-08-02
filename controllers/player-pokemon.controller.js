import PlayerPokemon from "../models/playerPokemon.model.js";
import Player from "../models/player.model.js";
import Pokemon from "../models/pokemon.model.js";

const playerPokemonController = {
  // Assign a Pokémon to a player
  assignPokemon: async (req, res) => {
    try {
      const { playerId, pokemonId, nickname, level, experience } = req.body;

      // Check if player exists
      const playerExists = await Player.findById(playerId);
      if (!playerExists) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Check if Pokémon exists
      const pokemonExists = await Pokemon.findOne({ id: pokemonId });
      if (!pokemonExists) {
        return res.status(404).json({ message: "Pokémon not found" });
      }
      if (!level) {
        level = 1;
      }
      if (!experience) {
        experience = 0;
      }

      // Create new PlayerPokemon
      const newPlayerPokemon = new PlayerPokemon({
        playerId,
        pokemonId,
        nickname,
        level,
        experience,
      });

      await newPlayerPokemon.save();

      res.status(201).json({ message: "Pokémon assigned to player", playerPokemon: newPlayerPokemon });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get all Pokémon for a player
  getPlayerPokemon: async (req, res) => {
    try {
      const { playerId } = req.params;
      const playerPokemon = await PlayerPokemon.find({ playerId });
      res.status(200).json(playerPokemon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Update a player's Pokémon (e.g., level up, change nickname)
  updatePlayerPokemon: async (req, res) => {
    try {
      const { id } = req.params;
      const { level, experience, nickname } = req.body;
      const updatedPlayerPokemon = await PlayerPokemon.findByIdAndUpdate(id, { level, experience, nickname }, { new: true });
      if (!updatedPlayerPokemon) {
        return res.status(404).json({ message: "PlayerPokemon not found" });
      }
      res.status(200).json(updatedPlayerPokemon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Remove a Pokémon from a player
  removePlayerPokemon: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlayerPokemon = await PlayerPokemon.findByIdAndDelete(id);
      if (!deletedPlayerPokemon) {
        return res.status(404).json({ message: "PlayerPokemon not found" });
      }
      res.status(200).json({ message: "Pokémon removed from player" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default playerPokemonController;
