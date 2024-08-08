import pokemon from "../models/pokemon.model.js";
import playerPokemon from "../models/playerPokemon.model.js";
//post pokemon
const pokemonController = {
  postpokemons: async (req, res) => {
    try {
      const pokemons = await pokemon.create(req.body);

      res.status(200).json(pokemons);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  deletepokemons: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(name);
      const result = await pokemon.deleteOne({ name: name });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  updatepokemons: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pokemon.findByIdAndUpdate(id, req.body);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // update just the name by the id
  updateNameById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const result = await pokemon.updateOne({ id: id }, { $set: { name: name } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // get all pokemons
  selectAllpokemons: async (req, res) => {
    try {
      if (req.user) {
        // User is logged in, get their Pokémon
        console.log("Entire req.user object:", req.user);
        console.log("User ID:", req.user.id);
        const playerId = Number(req.user.id);
        console.log("player id: ", req.user.id, typeof playerId);
        const playerPokemons = await playerPokemon.find({ playerId: playerId }).lean();
        // Fetch details for Pokémon if needed
        const pokemonIds = playerPokemons.map((pp) => pp.pokemonId);
        const pokemons = await pokemon.find({ id: { $in: pokemonIds } }).lean();

        // Add Pokémon details to PlayerPokemons
        const detailedPlayerPokemons = playerPokemons.map((pp) => ({
          ...pp,
          pokemon: pokemons.find((p) => p.id === pp.pokemonId),
        }));

        res.status(200).json(detailedPlayerPokemons);
      } else {
        // No user logged in, get all Pokémon
        const allPokemon = await pokemon.find();
        res.status(200).json(allPokemon);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // get pokemon by id
  selectpokemonById: async (req, res) => {
    try {
      const pokemons = await pokemon.find({ id: req.params.id });

      res.status(200).json(pokemons);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
export default pokemonController;
