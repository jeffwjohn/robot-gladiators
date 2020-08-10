var playerName = window.prompt("What is your robot's name?");
var playerHealth = 36;
var playerAttack = 10;
var playerMoney = 10;
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 20;
var enemyAttack = 12;

//console.log(enemyNames[enemyNames.length - 1]);
window.alert("Welcome to Robot Gladiators!");

var fight = function (enemyName) {

    while (enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //if (promptFight === "fight" || promptFight === "FIGHT") {
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                      // award player money for winning
                playerMoney = playerMoney + 20;
                break;

            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");

            }

            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
             }
        }
  };  


for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 20;
    debugger;
    fight(pickedEnemyName);

}
