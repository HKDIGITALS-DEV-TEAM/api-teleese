#!/bin/sh

echo "✅ Lancement de l'entrypoint..."

# Démarrage de l'app
echo "🚀 Démarrage de l'application Node.js..."
node dist/server.js || { echo "❌ Erreur Node.js détectée lors du démarrage"; exit 1; }
