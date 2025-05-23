import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
app.use(cors());
app.use('/contact', contactRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
