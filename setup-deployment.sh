#!/bin/bash

echo "🚀 Configuration du déploiement GitHub Pages"
echo "============================================="
echo ""

# Demander le nom du repository
read -p "Entrez le nom de votre repository GitHub (ex: voyage-spatial-mots): " repo_name

if [ -z "$repo_name" ]; then
    echo "❌ Erreur: Le nom du repository ne peut pas être vide"
    exit 1
fi

echo ""
echo "📝 Mise à jour du fichier de workflow..."

# Mettre à jour le fichier deploy.yml
sed -i "s|VITE_BASE_PATH: /.*|VITE_BASE_PATH: /$repo_name/|" .github/workflows/deploy.yml

echo "✅ Configuration terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Créez un repository sur GitHub nommé '$repo_name'"
echo "2. Exécutez les commandes suivantes :"
echo ""
echo "   git add ."
echo "   git commit -m 'Configure deployment for $repo_name'"
echo "   git remote add origin https://github.com/VOTRE-USERNAME/$repo_name.git"
echo "   git push -u origin main"
echo ""
echo "3. Activez GitHub Pages dans Settings > Pages > Source > GitHub Actions"
echo ""
echo "Pour plus de détails, consultez le fichier DEPLOYMENT.md"
