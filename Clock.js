export default class Clock {
  constructor() {
    this._speed = 250;
    this._astablePulse = false;
    this._manualPulse = false;
    this.select = false;
    this.halt = false;

    setInterval(() => (this._astablePulse = !this._astablePulse), this._speed);
  }

  manualStep = () => {
    this._manualPulse = true;
    setTimeout(() => (this._manualPulse = false), this._speed);
  };

  output = () => {
    const { _astablePulse, _manualPulse, select, halt } = this;

    return ((_astablePulse && select) || (_manualPulse && !select)) && !halt;
  };
}
