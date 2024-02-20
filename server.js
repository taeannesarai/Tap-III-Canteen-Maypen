import express from 'express';
import morgan from 'morgan';

//ROUTES
import { loginRoute } from './routes/loginRoute.js';

//configuration
const PORT = 4400;
const app = express();

// Setup the view engine
app.set('view engine', 'ejs');

// middlewares
//BODY PARSING
app.use(express.json({ limit: '1kb' }));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

// ENDPOINT ANATYLICS
app.use(morgan('dev'));

//Route Middleware
app.use('/', loginRoute);

//static folder for styles images etc
app.use('/', express.static('public'));

 
app.listen(PORT, () => {
    console.log(`Listening ... http://localhost:${PORT}`);
});