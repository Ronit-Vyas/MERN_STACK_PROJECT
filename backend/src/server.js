import notesRoutes from './routes/notesRoutes.js';
import express from 'express';
import {connectDB} from './config/db.js';

const app = express();

app.use(express.json())

app.use("/api/notes" , notesRoutes);

connectDB();

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});