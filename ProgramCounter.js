import Register from "./Register.js";

export default class ProgramCounter extends Register {
  constructor(computer) {
    super(computer);

    this.data = 0b0000;
    this.increment = false;
  }

  loop = (lastClockValue) => {
    const clockValue = this.computer.clock.output();

    if (this.enable) {
      this.writeOut();
    }

    if (lastClockValue !== clockValue && clockValue) {
      if (this.increment) {
        requestAnimationFrame(() => {
          this.data = 0b1111 & (this.data + 1);
        });
      }

      if (this.load) {
        requestAnimationFrame(this.readIn);
      }
    }

    requestAnimationFrame(() => this.loop(clockValue));
  };

  readIn = () => {
    this.data = (computer.bus.data & 0b00001111);
  };
}
