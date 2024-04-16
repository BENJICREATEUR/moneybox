const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Modèle pour un utilisateur
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    // Autres champs utilisateur
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

// Modèle pour une question
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: String, required: true },
});

const Question = mongoose.model('Question', questionSchema);

// Modèle pour une session de jeu
const gameSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    answers: [{ questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, selectedOption: String }],
    // Autres champs de la session de jeu
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = { User, Question, GameSession };
