#!/bin/bash

echo "🔍 Vérification de la configuration de déploiement"
echo "=================================================="
echo ""

# Vérifier que le fichier de workflow existe
if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ Le fichier .github/workflows/deploy.yml est manquant"
    exit 1
fi

# Extraire le VITE_BASE_PATH
base_path=$(grep "VITE_BASE_PATH:" .github/workflows/deploy.yml | sed 's/.*VITE_BASE_PATH: //' | tr -d ' ')

echo "📋 Configuration actuelle :"
echo "   Chemin de base : $base_path"
echo ""

# Vérifier si c'est toujours la valeur par défaut
if [ "$base_path" == "/spark-template/" ]; then
    echo "⚠️  ATTENTION : Vous utilisez encore le chemin par défaut !"
    echo ""
    echo "Vous devez changer '/spark-template/' par le nom de votre repository GitHub."
    echo ""
    echo "Options :"
    echo "1. Exécutez './setup-deployment.sh' pour une configuration automatique"
    echo "2. Modifiez manuellement le fichier .github/workflows/deploy.yml"
    echo ""
    exit 1
fi

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "⚠️  Git n'est pas initialisé"
    echo "   Exécutez : git init"
    echo ""
fi

# Vérifier si il y a un remote
if git remote -v &> /dev/null; then
    remote_url=$(git remote get-url origin 2>/dev/null)
    if [ -n "$remote_url" ]; then
        echo "✅ Remote Git configuré : $remote_url"
    else
        echo "⚠️  Aucun remote 'origin' configuré"
        echo "   Ajoutez-en un avec : git remote add origin URL"
    fi
else
    echo "ℹ️  Git remote non configuré (normal pour un nouveau projet)"
fi

echo ""
echo "✅ Configuration valide !"
echo ""
echo "📋 Prochaines étapes pour le déploiement :"
echo "1. Commitez vos changements : git add . && git commit -m 'Ready for deployment'"
echo "2. Poussez sur GitHub : git push -u origin main"
echo "3. Activez GitHub Pages dans Settings > Pages > Source > GitHub Actions"
echo ""
echo "Pour plus de détails, consultez DEPLOYMENT.md"
