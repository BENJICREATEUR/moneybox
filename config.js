// Configuration de l'application

module.exports = {
    // Configuration de la base de données MongoDB
    db: {
      url: 'mongodb://localhost:27017/moneybox' // URL de connexion à la base de données MongoDB
    },
  
    // Configuration de l'authentification
    auth: {
      sessionSecret: 'your_session_secret' // Clé secrète pour la gestion des sessions utilisateur
    },
  
    // Configuration du serveur
    server: {
      port: process.env.PORT || 3000 // Port sur lequel le serveur doit écouter
    }
  };
  