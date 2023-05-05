class Rider {
    constructor(name, horse) {
        this.name = name;
        this.horse = horse;
    }

    describe(){
        return `${this.name} will be competing with ${this.horse}.`;
    }
}

class Barn {
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
        return `Barn ${this.name} has ${this.riders.length} riders.`
    }
}

class Menu {
    constructor () {
        this.barns = [];
        this.selectedBarn = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while(selection !=0) {
            switch(selection) {
                case '1':
                    this.createBarn();
                    break;
                case '2':
                    this.viewBarn();
                    break;
                case '3':
                    this.deleteBarn();
                    break;
                case '4':
                    this.displayBarns();
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
            1) Create a New Barn
            2) View a Barn
            3) Delete a Barn
            4) Display all Barns
            5) Exit`
        );
   }
   showBarnMenuOptions(barnInfo) {
    return prompt(`
        1) Create New Rider
        2) Delete a Rider
        3) Exit
        -------------------
        ${barnInfo}
        `);
   }
   displayBarns() {
    let barnString = "";
        for(let i = 0; i < this.barns.length; i++) {
            barnString += i + ") " + this.barns[i].name + `\n`;
        }
    alert(barnString);
   }
   createBarn() {
    let name = prompt ("Enter Name of the New Barn: ");
    this.barns.push(new Barn(name));
   }
   viewBarn(){
    let index = prompt('Enter the index of the Barn you would like to view.');
    if (index > -1 && index < this.barns.length) {
        this.selectedBarn = this.barns[index];
        let description = 'Barn Name: ' + this.selectedBarn.name + '\n';
        description += ' ' + this.selectedBarn.describe() + '\n';
        for (let i = 0; i < this.selectedBarn.riders.length; i++) {
            description += i + ') ' + this.selectedBarn.riders[i].describe() + '\n';
        }
        let selection1 = this.showBarnMenuOptions(description);
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
   deleteBarn() {
    let index = prompt(`Enter the index of the Barn you would like to Delete.`);
    if (index > -1 && index < this.barns.length) {
        this.barns.splice(index, 1);
    }
   }
   createRider() {
    let name = prompt(`Enter the Name of the New Rider:`);
    let horse = prompt(`Enter the Name of the rider's horse: `);
    this.selectedBarn.addRider(new Rider(name, horse));
   }
   deleteRider() {
    let index = prompt(`Enter the Name of the Rider you would like to delete: `);
    if (index > -1 && index < this.selectedBarn.riders.length) {
        this.selectedBarn.riders.splice(index, 1);
    }
   }
}
let menu = new Menu();
menu.start();