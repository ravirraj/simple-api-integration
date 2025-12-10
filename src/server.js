import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({path: "./src/.env"}); //put you dot env in root directory

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT )

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
