// Logique côté client pour l'authentification
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        console.log(data);
        // Rediriger l'utilisateur vers une autre page ou afficher un message de succès
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        // Afficher un message d'erreur à l'utilisateur
    }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
        // Rediriger l'utilisateur vers une autre page ou afficher un message de succès
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        // Afficher un message d'erreur à l'utilisateur
    }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        const response = await fetch('/auth/logout', { method: 'POST' });
        const data = await response.json();
        console.log(data);
        // Rediriger l'utilisateur vers une autre page ou afficher un message de succès
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error.message);
        // Afficher un message d'erreur à l'utilisateur
    }
});

// Logique côté client pour le jeu de questions-réponses, la gestion des gains et des retraits, et les défis de quiz entre utilisateurs
// À compléter en fonction des fonctionnalités spécifiques de l'application Moneybox
