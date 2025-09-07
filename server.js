import dotenv from 'dotenv'
dotenv.config()

import app from "./src/app.js";
import connectDb from './src/config/db.js';
const port=process.env.PORT;

connectDb()
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});