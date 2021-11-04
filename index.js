const fs = require("fs");

class Simulator {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.f = "NORTH";
  }

  place({ x, y, f }) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  move() {
    if (this.f === "NORTH") {
      if (this.y === 5) return;
      this.y++;
    } else if (this.f === "SOUTH") {
      if (this.y === 0) return;
      this.y--;
    } else if (this.f === "WEST") {
      if (this.x === 0) return;
      this.x--;
    } else {
      if (this.x === 5) return;
      this.x++;
    }
  }

  left() {
    if (this.f === "NORTH") {
      this.f = "WEST";
    } else if (this.f === "WEST") {
      this.f = "SOUTH";
    } else if (this.f === "SOUTH") {
      this.f = "EAST";
    } else {
      this.f = "NORTH";
    }
  }
  right() {
    if (this.f === "NORTH") {
      this.f = "EAST";
    } else if (this.f === "EAST") {
      this.f = "SOUTH";
    } else if (this.f === "SOUTH") {
      this.f = "WEST";
    } else {
      this.f = "NORTH";
    }
  }

  report() {
    const currentPlace = { x: this.x, y: this.y, f: this.f };
    console.log(currentPlace);
  }
}

function readCommands() {
  const simulator = new Simulator();
  const file = fs.readFileSync("./commands.txt").toString();
  file.split(/\n/).forEach((command) => {
    if (command.match(/^PLACE/)) {
      const locates = command.replace("PLACE", "").trim().split(",");
      const entries = {
        x: locates[0],
        y: locates[1],
        f: locates[2],
      };
      simulator.place(entries);
    }
    if (command.match(/^MOVE/)) {
      simulator.move();
    }
    if (command.match(/^LEFT/)) {
      simulator.left();
    }
    if (command.match(/^RIGHT/)) {
      simulator.right();
    }
    if (command.match(/^REPORT/)) {
      simulator.report();
    }
  });
}

readCommands();
