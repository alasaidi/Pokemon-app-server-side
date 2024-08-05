import express from "express";
import pokemonController from "../controllers/pokemon.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/api", pokemonController.postpokemons);
router.delete("/api", verifyToken, pokemonController.deletepokemons);
router.put("/api/pokemon/:id", verifyToken, pokemonController.updatepokemons);
router.put("/api/:id", verifyToken, pokemonController.updateNameById);
router.get("/api/", auth, pokemonController.selectAllpokemons);
router.get("/api/:id", verifyToken, pokemonController.selectpokemonById);

export default router;
