#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.underline.redBright("\n\t Welcome to Advnture Game With MehwishNaz \n\t"));
class Player {
    name;
    fuel = 100;
    constructor(name) { this.name = name; }
    decreaseFuel() {
        this.fuel -= 20;
        if (this.fuel < 0) {
            this.fuel = 0;
        }
    }
    increaseFuel() { this.fuel = 100; }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) { this.name = name; }
    decreaseFuel() {
        this.fuel -= 20;
        if (this.fuel < 0) {
            this.fuel = 0;
        }
    }
}
async function advantyre_Game() {
    console.log(chalk.bold.yellow("Welcome to the Battle Game!"));
    const playerName = await getPlayerName();
    const opponentName = await chooseOpponent();
    const player = new Player(playerName);
    const opponent = new Opponent(opponentName);
    while (true) {
        console.log(chalk.bold(`${player.name} VS ${opponent.name}`));
        const action = await getPlayerAction();
        switch (action) {
            case 'Attack':
                const player_Winner = Math.random() < 0.5;
                if (player_Winner) {
                    opponent.decreaseFuel();
                    console.log(chalk.yellow(`${opponent.name}'s fuel is now ${opponent.fuel}`));
                    if (opponent.fuel <= 0) {
                        console.log(chalk.red.bold(` Player ${player.name} is wins!`));
                        return;
                    }
                }
                else {
                    player.decreaseFuel();
                    console.log(chalk.yellow(`${player.name}'s fuel is now ${player.fuel}`));
                    if (player.fuel <= 0) {
                        console.log(chalk.red.bold(` Player ${player.name} loses!`));
                        return;
                    }
                }
                break;
            case 'Drink Energy':
                player.increaseFuel();
                console.log(chalk.yellow(`Great You drank a Energy. Your fuel is now ${player.fuel}`));
                break;
            case 'Run for life':
                console.log(chalk.red.bold(`Player ${player.name} runs away!`));
                return;
        }
    }
}
async function getPlayerName() {
    const { name } = await inquirer.prompt({
        name: 'name', type: 'input', message: 'Enter Player Name:'
    });
    return name;
}
async function chooseOpponent() {
    const { opponent } = await inquirer.prompt({
        name: 'opponent', type: 'list', message: 'Select your opponent:',
        choices: ['Dragon', 'Troll', 'Wizard']
    });
    return opponent;
}
async function getPlayerAction() {
    const { action } = await inquirer.prompt({
        name: 'action', type: 'list', message: 'What do you want to do?',
        choices: ['Attack', 'Drink Energy', 'Run for life']
    });
    return action;
}
advantyre_Game();
