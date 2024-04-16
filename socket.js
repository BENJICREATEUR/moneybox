const socketIO = require('socket.io');
const GameSession = require('./models/GameSession');

module.exports = function (server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('Nouvelle connexion socket établie');

        // Logique pour gérer les événements en temps réel
        socket.on('joinGame', async (userId) => {
            try {
                // Logique pour rejoindre une session de jeu
                const gameSession = await GameSession.findOne({ userId });
                if (!gameSession) {
                    // Créer une nouvelle session de jeu pour l'utilisateur
                    const newGameSession = new GameSession({ userId });
                    await newGameSession.save();
                }
                socket.join(userId);
            } catch (error) {
                console.error('Erreur lors de la connexion au jeu:', error.message);
            }
        });

        socket.on('answerQuestion', async ({ userId, questionId, selectedOption }) => {
            try {
                // Logique pour enregistrer la réponse de l'utilisateur
                const gameSession = await GameSession.findOne({ userId });
                if (gameSession) {
                    gameSession.answers.push({ questionId, selectedOption });
                    await gameSession.save();
                }
                // Émettre un événement pour mettre à jour l'interface utilisateur avec la réponse
                io.to(userId).emit('answerResult', { questionId, selectedOption });
            } catch (error) {
                console.error('Erreur lors de la réponse à la question:', error.message);
            }
        });

        // Gérer d'autres événements en temps réel selon les besoins
    });
};
