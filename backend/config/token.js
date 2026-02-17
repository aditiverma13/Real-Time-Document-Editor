
import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } //  Correct property name
    );
  } catch (error) {
    console.error("JWT generation failed:", error.message);
    throw new Error("Token generation failed");
  }
};

export default genToken;
