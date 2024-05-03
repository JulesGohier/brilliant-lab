#!/bin/bash

# Définir le répertoire à parcourir
repertoire="./"

# Vérifier si le répertoire existe
if [ ! -d "$repertoire" ]; then
    echo "Le répertoire spécifié n'existe pas."
    exit 1
fi

# Parcourir tous les fichiers dans le répertoire
for fichier in "$repertoire"/*; do
    # Vérifier si le fichier existe et est un fichier ordinaire
    if [ -f "$fichier" ]; then
        # Extraire le nom de fichier, supprimer "-dark" et le convertir en minuscules
        nouveau_nom=$(basename "$fichier" | sed 's/-dark//I' | tr '[:upper:]' '[:lower:]')

        # Renommer le fichier en minuscules
        mv "$fichier" "$repertoire/$nouveau_nom"
        echo "Le fichier $fichier a été renommé en $nouveau_nom"
    fi
done
