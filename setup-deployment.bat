@echo off
echo ================================================
echo Configuration du deploiement GitHub Pages
echo ================================================
echo.

set /p repo_name="Entrez le nom de votre repository GitHub (ex: voyage-spatial-mots): "

if "%repo_name%"=="" (
    echo Erreur: Le nom du repository ne peut pas etre vide
    exit /b 1
)

echo.
echo Mise a jour du fichier de workflow...

powershell -Command "(gc .github\workflows\deploy.yml) -replace 'VITE_BASE_PATH: /.*', 'VITE_BASE_PATH: /%repo_name%/' | Out-File -encoding ASCII .github\workflows\deploy.yml"

echo Configuration terminee !
echo.
echo Prochaines etapes :
echo 1. Creez un repository sur GitHub nomme '%repo_name%'
echo 2. Executez les commandes suivantes :
echo.
echo    git add .
echo    git commit -m "Configure deployment for %repo_name%"
echo    git remote add origin https://github.com/VOTRE-USERNAME/%repo_name%.git
echo    git push -u origin main
echo.
echo 3. Activez GitHub Pages dans Settings ^> Pages ^> Source ^> GitHub Actions
echo.
echo Pour plus de details, consultez le fichier DEPLOYMENT.md
pause
