import Register from "./Register.js";

export default class RAM extends Register {
  constructor(computer) {
    super(computer);

    this.data = new Uint8Array(16);
    this.address = 0b0000;

    this.data.fill(0b0000);
  }

  writeOut = () => {
    this.computer.bus.data = this.data[this.address];
  }

  readIn = () => {
    this.data[this.address] = this.computer.bus.data;
  }
}
