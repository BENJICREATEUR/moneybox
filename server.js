const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const GameController = require('./controllers/GameController');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');

// Initialisation de l'application Express
const app = express();

// Configuration de la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/moneybox', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
mongoose.connection.once('open', () => {
    console.log('Connexion à la base de données établie avec succès');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Définition des routes d'authentification
app.use('/auth', authRoutes);

// Middleware d'authentification pour les routes de jeu
app.use('/game', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send('Vous devez être connecté pour accéder à cette page');
    }
});

// Définition des routes de jeu
app.use('/game', gameRoutes);

// Route racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur Moneybox');
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
