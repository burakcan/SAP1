const HA = 0b100000000000000;
const MI = 0b10000000000000;
const RI = 0b1000000000000;
const RO = 0b100000000000;
const IO = 0b10000000000;
const II = 0b1000000000;
const AI = 0b100000000;
const AO = 0b10000000;
const EO = 0b1000000;
const SU = 0b100000;
const BI = 0b10000;
const OI = 0b1000;
const CE = 0b100;
const CO = 0b10;
const JU = 0b1;

export default class Controller {
  constructor(computer) {
    this.computer = computer;
    this.controlWord = 0b000000000000000 | RO | AI;

    this.signalMap = [
      [HA, computer.clock, "halt"],

      [MI, computer.mar, "load"],

      [RI, computer.ram, "load"],
      [RO, computer.ram, "enable"],

      [IO, computer.instructionRegister, "enable"],
      [II, computer.instructionRegister, "load"],

      [AI, computer.registerA, "load"],
      [AO, computer.registerA, "enable"],

      [EO, computer.alu, "enable"],
      [SU, computer.alu, "subtract"],

      [BI, computer.registerB, "load"],

      [OI, computer.output, "load"],

      [CE, computer.programCounter, "increment"],
      [CO, computer.programCounter, "enable"],
      [JU, computer.programCounter, "load"],
    ];

    this.processControlWord();
  }

  processControlWord = () => {
    const { controlWord, signalMap } = this;

    for (let i = 0; i < signalMap.length; i++) {
      const [mask, component, signal] = signalMap[i];
      const val = mask & controlWord;
      component[signal] = Boolean(val);
    }
  };
}
