# PokemonFight

### Overview  
Plongez dans l’univers de PokemonFight et vivez des combats Pokémon collaboratifs comme jamais auparavant ! Formez votre équipe idéale en sélectionnant 3 Pokémon différent parmi le Pokédex, puis unissez vos forces avec d'autres joueurs pour affronter des boss épiques en temps réel. Chaque clic sur le boss déclenche une attaque combinée de votre équipe, infligeant des dégâts visibles par tous les participants. Ensemble, vous réduisez les points de vie partagés du boss jusqu’à sa défaite, pour ensuite affronter un nouvel adversaire encore plus redoutable. 

Rejoignez la bataille dès maintenant !

### Installation

1. **Prérequis** :  
   - [Docker](https://www.docker.com) et [Docker Compose](https://docs.docker.com/compose/)
   - Git (pour cloner le projet)

2. **Cloner le projet** :  
   Ouvrez un terminal et clonez le dépôt en exécutant :  
     ```bash
     git clone git@github.com:Antoine-ValentinCharpentier/PokemonFight.git
     cd PokemonFight
     ```

3. **Lancer l'application** :  
    À la racine du projet, exécutez :  
     ```bash
     docker compose up
     ```  
   Le backend Express et le frontend Angular seront automatiquement démarrés.

4. **Accéder à l'application** :  
   Ouvrez un navigateur et rendez-vous sur `http://localhost:4200`.

### Fonctionnalités principales
- Création d'équipe à partir du Pokédex.
- Combat coopératif contre un boss unique.
- Synchronisation en temps réel entre tous les joueurs.
- Régénération automatique des boss pour des combats infinis.
