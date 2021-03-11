import Register from "./Register.js";

export default class InstructionRegister extends Register {
  writeOut = () => {
    this.computer.bus.data = this.data & 0b00001111;
  }
}
