import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import pokemonRouter from "./routes/pokemon.route.js";
import playerRouter from "./routes/player.route.js";
import playerPokemonRouter from "./routes/playerPokemon.js";

const port = process.env.PORT;
const playerName = process.env.PLAYER_NAME;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

const app = express();

app.use(cors());
// using express.son middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.options("*", cors());
app.get("/", (req, res) => {
  // res.setHeader("Content-Type: application/json");
  // res.setHeader("Access-Control-Allow-Origin: *");
  // res.setHeader("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
  res.json({ message: "ok" });
});

app.use("/pokemons", pokemonRouter);
app.use("/players", playerRouter);
app.use(playerPokemonRouter);
// mongodb cnx setup
mongoose
  .connect(`mongodb+srv://${playerName}:${apiKey}@${dbUrl}`)
  .then(() => {
    console.log("db connected");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
