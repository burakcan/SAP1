import Clock from "./Clock.js";
import ProgramCounter from "./ProgramCounter.js";
import Bus from "./Bus.js";
import Register from "./Register.js";
import ALU from "./ALU.js";
import InstructionRegister from "./InstructionRegister.js";
import RAM from "./RAM.js";
import MAR from "./MAR.js";
import Controller from "./Controller.js";

class Computer {
  constructor() {
    this.clock = new Clock(this);
    this.programCounter = new ProgramCounter(this);
    this.bus = new Bus(this);
    this.registerA = new Register(this);
    this.registerB = new Register(this);
    this.output = new Register(this);
    this.instructionRegister = new InstructionRegister(this);
    this.alu = new ALU(this);
    this.mar = new MAR(this);
    this.ram = new RAM(this);
    this.controller = new Controller(this);

    this.ram.data[0] = 0b00011110;
    this.ram.data[1] = 0b00101111;
    this.ram.data[2] = 0b11100000;
    this.ram.data[14] = 0b00011100;
    this.ram.data[15] = 0b00001110;
  }
}

const computer = new Computer();
const view = document.getElementById("view");
window.computer = computer;

function renderLed(state, color = "orangered") {
  return `
    <div class="led" style="background: ${state ? color : "slategray"}"></div>
  `;
}

function renderBusLine(data) {
  return `
    <div class="busline">
      ${renderLed(data)}
    </div>
  `;
}

function renderRegister(label, register) {
  return `
    <div class="module">
      <h5>${label}</h5>
      <div style="border-bottom: 1px dashed black; margin-bottom: 4px; padding-bottom: 4px;">
        Load: ${renderLed(register.load, "greenyellow")}
        Enable: ${renderLed(register.enable, "mediumblue")}
      </div>
      <div>
        ${renderLed(register.data & 0b10000000)}
        ${renderLed(register.data & 0b01000000)}
        ${renderLed(register.data & 0b00100000)}
        ${renderLed(register.data & 0b00010000)}
        ${renderLed(register.data & 0b00001000)}
        ${renderLed(register.data & 0b00000100)}
        ${renderLed(register.data & 0b00000010)}
        ${renderLed(register.data & 0b00000001)}
      </div>
    </div>
  `;
}

function renderClock() {
  return `
    <div class="module" onclick="computer.clock.manualStep()">
      Clock ${renderLed(computer.clock.output(), "mediumblue")}
    </div>
  `;
}

function renderRam() {
  const { data, load, enable, address } = computer.ram;
  return `
    <div class="module">
      <h5>RAM</h5>
      <div style="border-bottom: 1px dashed black; margin-bottom: 4px; padding-bottom: 4px;">
        Load: ${renderLed(load, "greenyellow")}
        Enable: ${renderLed(enable, "mediumblue")}
        Address: 0b${address.toString(2)}
      </div>
      <div>
      ${renderLed(data[address] & 0b10000000)}
      ${renderLed(data[address] & 0b01000000)}
      ${renderLed(data[address] & 0b00100000)}
      ${renderLed(data[address] & 0b00010000)}
      ${renderLed(data[address] & 0b00001000)}
      ${renderLed(data[address] & 0b00000100)}
      ${renderLed(data[address] & 0b00000010)}
      ${renderLed(data[address] & 0b00000001)}
      </div>
    </div>
  `;
}

function renderProgramCounter() {
  const { data, load, enable, increment } = computer.programCounter;
  return `
    <div class="module">
      <h5>Program Counter</h5>
      <div style="border-bottom: 1px dashed black; margin-bottom: 4px; padding-bottom: 4px;">
        Load: ${renderLed(load, "greenyellow")}
        Enable: ${renderLed(enable, "mediumblue")}
        Increment: ${renderLed(increment)}
      </div>
      <div>
      ${renderLed(data & 0b00001000)}
      ${renderLed(data & 0b00000100)}
      ${renderLed(data & 0b00000010)}
      ${renderLed(data & 0b00000001)}
      </div>
    </div>
  `;
}

let lastData = [];

function render() {
  const data = [
    computer.clock.output(),

    computer.programCounter.data,
    computer.programCounter.enable,
    computer.programCounter.load,
    computer.programCounter.increment,

    computer.bus.data,

    computer.registerA.data,
    computer.registerA.load,
    computer.registerA.enable,

    computer.registerB.data,
    computer.registerB.load,
    computer.registerB.enable,

    computer.output.data,
    computer.output.load,
    computer.output.enable,

    computer.instructionRegister.data,
    computer.instructionRegister.load,
    computer.instructionRegister.enable,

    computer.alu.data,
    computer.alu.enable,

    computer.mar.data,
    computer.mar.load,

    computer.ram.load,
    computer.ram.enable,
    computer.ram.address,
    computer.ram.data[computer.ram.address],
  ];

  const changed = data.some((val, i) => lastData[i] !== val);
  lastData = data;

  if (changed) {
    view.innerHTML = `
      <div style="display: flex;">
        <div>
          ${renderClock()}
          ${renderRegister(
            "Instruction Register",
            computer.instructionRegister
          )}
          ${renderRegister("Memory Addr Register", computer.mar)}
          ${renderRam()}
          <div class="module">
            <h5>Controller</h5>
          </div>
        </div>
        <div style="display: flex">
          ${renderBusLine(computer.bus.data & 0b10000000)}
          ${renderBusLine(computer.bus.data & 0b01000000)}
          ${renderBusLine(computer.bus.data & 0b00100000)}
          ${renderBusLine(computer.bus.data & 0b00010000)}
          ${renderBusLine(computer.bus.data & 0b00001000)}
          ${renderBusLine(computer.bus.data & 0b00000100)}
          ${renderBusLine(computer.bus.data & 0b00000010)}
          ${renderBusLine(computer.bus.data & 0b00000001)}
        </div>
        <div>
          ${renderProgramCounter()}
          ${renderRegister("Register A", computer.registerA)}
          ${renderRegister("ALU", computer.alu)}
          ${renderRegister("Register B", computer.registerB)}
          ${renderRegister("Output", computer.output)}
        </div>
      </div>
    `;
  }

  requestAnimationFrame(render);
}

render();
