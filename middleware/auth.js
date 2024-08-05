import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found in cookies");
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET);
    console.log("Decoded token:", decoded);

    // Log the entire decoded object
    console.log("Full decoded token payload:", JSON.stringify(decoded, null, 2));

    // Check if 'id' exists in the decoded token
    if (decoded.id === undefined) {
      console.log("Warning: 'id' not found in decoded token. Available properties:", Object.keys(decoded));
    }

    req.user = { id: decoded.id };
    console.log("Set req.user to:", req.user);
    next();
  } catch (error) {
    console.log("Error verifying token:", error.message);
    req.user = null;
    next();
  }
};
