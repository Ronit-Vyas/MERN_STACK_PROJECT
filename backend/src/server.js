import notesRoutes from './routes/notesRoutes.js';
import express from 'express';
import {connectDB} from './config/db.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your exact frontend URL (e.g., http://localhost:5173 for Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Set to true if you pass cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(express.json())

app.use("/api/notes" , notesRoutes);


app.use("/api/notes" , notesRoutes);

connectDB();

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});