export default class ALU {
  constructor(computer) {
    this.subtract = false;
    this.enable = false;
    this.data = 0b00000000;
    this.computer = computer;

    this.loop();
  }

  loop = () => {
    const { registerA, registerB, bus } = this.computer;
    const a = registerA.data;
    const b = this.subtract ? -registerB.data : registerB.data;
    this.data = (a + b) & 0b11111111;

    if (this.enable) {
      bus.data = this.data;
    }

    requestAnimationFrame(() => this.loop());
  };
}
