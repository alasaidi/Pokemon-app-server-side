import player from "../models/player.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import hashPassword from "../utils/hashPassword.js";

//post Player
const playerController = {
  Register: async (req, res) => {
    try {
      const { name, email, password, address } = req.body;

      // Check if Player already exists
      const existingPlayer = await player.findOne({ email });
      if (existingPlayer) {
        return res.status(409).json({ message: "Player already exists" });
      }
      const hashedPassword = await hashPassword(password);

      const players = await player.create({ name, email, password: hashedPassword, address });
      res.status(200).json({ message: "Player has been created successfully", player: players });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find player
      const players = await player.findOne({ email }).select("+password");

      if (!players) {
        return res.status(401).json({ message: "no player found" });
      }
      console.log(players);

      // Check password

      const isMatch = await bcrypt.compare(password, players.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ id: player.id }, process.env.TOKEN_ACCESS_SECRET, { expiresIn: "1h" });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });

      res.json({ message: "Login successful", playerId: player.id });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
export default playerController;
