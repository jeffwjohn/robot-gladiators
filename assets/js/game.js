var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10
  };

//var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
//var enemyHealth = 20;
//var enemyAttack = 12;

var enemyInfo = [
    {
      name: "Roborto",
      attack: 12
    },
    {
      name: "Amy Android",
      attack: 13
    },
    {
      name: "Robo Trumble",
      attack: 14
    }
  ];

//console.log(enemyNames[enemyNames.length - 1]);
//window.alert("Welcome to Robot Gladiators!");

var fight = function (enemy) {
    

    while (enemyHealth > 0 && playerInfo.health > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money fromplayerInfo.money for skipping
               playerInfo.money = Math.max(0,playerInfo.money - 10);
                console.log("playerplayerInfo.money",playerInfo.money);
                break;
            }
        }

        //if (promptFight === "fight" || promptFight === "FIGHT") {
        //enemyHealth = Math.max(0, enemyHealth - playerInfo.attack);

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(playerInfo.name + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
           playerInfo.money =playerInfo.money + 20;
            break;

        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");

        }

        //playerInfo.health = Math.max(0, playerInfo.health - enemyAttack);

        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(enemyName + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;

        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};


// function to start a new game
var startGame = function () {

    // reset player stats
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;
    window.alert("Welcome to Robot Gladiators!");


    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight
            //enemyHealth = Math.floor(Math.random() * 21) + 10;
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }

        } else {
            window.alert("You have lost your robot in battle!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();

};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " +playerInfo.money + ".");
    }
    else {
        window.alert("Game Over.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }


};

var shop = function () {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
        case "R":
        case "r":
            if (playerplayerInfo.money >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerInfo.health = playerInfo.health + 20;
               playerInfo.money =playerInfo.money - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;

        case "UPGRADE":
        case "upgrade":
        case "U":
        case "u":
            if (playerplayerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
               playerInfo.money =playerInfo.money - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;

        case "LEAVE":
        case "leave":
        case "L":
        case "l":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

startGame();

