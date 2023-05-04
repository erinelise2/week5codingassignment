class Rider {
    constructor(name, horse) {
        this.name = name;
        this.horse = horse;
    }

    describe(){
        return `${this.name} will be competing with ${this.horse}.\n`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.riders = [];
    }

    addRider(rider) {
        if (rider instanceof Rider) {
            this.riders.push(rider);
        } else {
            throw new Error(`You can only add an instance of Rider. Argument is not a rider: ${rider}`);
        }
    }
    describe() {
        return `${this.name} has ${this.riders.length} riders.`
    }
}

class Menu {
    constructor () {
        this.teams = [];
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while(selection !=0) {
            switch(selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert("Goodbye!");
    }
    showMainMenuOptions() {
        return prompt (`
            1) Create a New Team
            2) View a Team
            3) Delete a Team
            4) Diplay all Teams
            5) Exit`
        );
   }
   showTeamMenuOptions(teamInfo) {
    return prompt(`
        1) Create New Rider
        2) Delete a Rider
        3) Exit
        -------------------
        ${teamInfo}
    `)
   }
   displayTeams() {
    let teamString = "";
        for(let i = 0; 1 < this.teams.length; i++) {
            teamString += i + ") " + this.teams[i].name + `\n`;
        }
    alert(teamString);
   }
   createTeam() {
    let name = prompt ("Enter Name of the new Team: ");
    this.teams.push(new Team(name));
   }
   viewTeam(){
    let index = prompt("Enter the index of the team you would like to view.");
    if (index > -1 && index < this.teams.length) {
        this.selectedTeam = this.teams[index];
        let description = `Team Name: ` + this.selectedTeam.name + `\n`;
        description += " " + this.selectedTeam.describe() + `\n`;
        for (let i = 0; i < this.selectedTeam.riders.length; i++) {
            description += i + `) ` + this.selectedTeam.riders[i].describe() + `\n`;
        }
        let selection1 = this.showTeamMenuOptions(description);
        switch(selection1) {
            case '1':
                this.createRider();
                break;
            case '2':
                this.deleteRider();
                break;
        }
    }
   }
   deleteTeam() {
    let index = prompt(`Enter the index of the Team you would like to Delete.`);
    if (index > -1 && index < this.selectedTeam.rider.length) {
        this.selectedTeam.rider.splice(index,1);
    }
   }
}
let menu = new Menu();
menu.start();