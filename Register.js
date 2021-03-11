export default class Register {
  constructor(computer) {
    this.data = 0b00000000;
    this.enable = false;
    this.load = false;
    this.computer = computer;

    this.loop();
  }

  loop = (lastClockValue) => {
    const clockValue = this.computer.clock.output();

    if (this.enable) {
      this.writeOut();
    }

    if (lastClockValue !== clockValue && clockValue && this.load) {
      requestAnimationFrame(this.readIn);
    }

    requestAnimationFrame(() => this.loop(clockValue));
  };

  readIn = () => {
    this.data = this.computer.bus.data;
  };

  writeOut = () => {
    this.computer.bus.data = this.data;
  };
}
