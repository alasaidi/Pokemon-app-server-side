import express from "express";
import playerPokemonController from "../controllers/player-pokemon.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/api/player-pokemon", playerPokemonController.assignPokemon);
router.get("/api/player-pokemon/:playerId", verifyToken, playerPokemonController.getPlayerPokemon);
router.put("/api/player-pokemon/:id", verifyToken, playerPokemonController.updatePlayerPokemon);
router.delete("/api/player-pokemon/:id", verifyToken, playerPokemonController.removePlayerPokemon);

export default router;
