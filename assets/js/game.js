debugger;
var fightOrSkip = function () {
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Enter the conditional recursive function call here!
    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //if (!promptFight) {
    //  window.alert("You need to provide a valid answer! Please try again.");
    //  return fightOrSkip();
    //  }
    //The conditional statement above with the "not" or "!" operator will act similarly to our original conditional if statement, which executes if a blank or null response is evaluated.
    promptFight = promptFight.toLowerCase();
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {

        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping, but don't let them go into the negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            // return true if user wants to leave
            return true;
        }
    }
    return false;
}

var fight = function (enemy) {

    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask user if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " +
                enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;

            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};
// function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();
    // reset player stats
    //playerInfo.health = 100;
    //playerInfo.attack = 10;
    //playerInfo.money = 10;
    window.alert("Welcome to Robot Gladiators!");


    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Round " + (i + 1));


            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new fight
            //enemy.health = Math.floor(Math.random() * 21) + 10;
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
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
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        var highScore = localStorage.getItem("highscore");
        if (highScore === null) {
            highScore = 0;
        }
        if (playerInfo.money > highScore) {
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);
            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        }
        else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
    } else {
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
        "Press [1] to REFILL your health for $7, [2] to UPGRADE your attack for $7, or [3] to LEAVE the store.");

    // use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack()
            break;

        case 3:
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name + ".");
    return name;
};

var playerInfo = {
    //name: window.prompt("What is your robot's name?"),
    name: getPlayerName(),
    health: 100,
    attack: randomNumber(8, 14),
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = randomNumber(8, 14);
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

//var enemy.names = ["Roborto", "Amy Android", "Robo Trumble"];
//var enemy.health = 20;
//var enemy.attack = 12;

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(6, 12)
    },
    {
        name: "Amy Android",
        attack: randomNumber(7, 13)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(8, 14)
    }
];

startGame();

