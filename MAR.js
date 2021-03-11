import Register from "./Register.js";

export default class MAR extends Register {
  constructor(computer) {
    super(computer);

    this.data = 0b0000;
    this.enable = true;
  }

  readIn = () => {
    this.data = (computer.bus.data & 0b00001111);
  };

  writeOut = () => {
    this.computer.ram.address = this.data;
  };
}
