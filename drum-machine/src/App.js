import './App.css';
import React from 'react';

class App extends React.Component {
  doc = {
    "KeyQ": "Heater-1", "KeyW": "Heater-2", "KeyE": "Heater-3",
    "KeyA": "Heater-4", "KeyS": "Clap", "KeyD": "Open-HH",
    "KeyZ": "Kick-and-Hat", "KeyX": "Kick", "KeyC": "Closed-HH"
  };

  audio = {
    "Heater-1": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"),
    "Heater-2": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"),
    "Heater-3": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"),
    "Heater-4": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"),
    "Clap": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"),
    "Open-HH": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"),
    "Kick-and-Hat": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"),
    "Kick": new Audio("https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"),
    "Closed-HH": new Audio("https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3")
  };

  audio_links = {
    "Heater-1": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "Heater-2": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "Heater-3": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "Heater-4": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "Clap": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "Open-HH": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "Kick-and-Hat": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "Kick": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "Closed-HH": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  };



  constructor(props) {
    super(props);
    this.state = {
      lastPlayed: "",
      power: true,
      volume: 1
    };
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  };

  handleChange = (event) => {

    //this.handleKeyDown({ code: this.getKeyByValue(this.doc, event.target.value) });
    //this.handleKeyUp({ code: this.getKeyByValue(this.doc, event.target.value) });

    //this.audio[this.doc[event.code]].volume = this.state.volume;

    let btn = document.getElementById(event.target.value);
    let aud = btn.firstElementChild;
    aud.volume = this.state.volume;
    if (this.state.power) {
      this.setState({ lastPlayed: event.target.value });
      btn.click();
      btn.classList.add('active-on');
      aud.play();
    }
    else {
      btn.classList.add('active-off');
    }
    setTimeout(() => {
      btn.classList.remove('active-on');
      btn.classList.remove('active-off');
    }, 50);

  };

  handleKeyDown = (event) => {
    if (this.doc.hasOwnProperty(event.code)) {
      //this.audio[this.doc[event.code]].volume = this.state.volume;
      let aud = document.getElementById(event.code.slice(3, 5));
      aud.volume = this.state.volume;
      let btn = document.getElementById(this.doc[event.code]);
      if (this.state.power) {
        btn.click();
        btn.classList.add('active-on');
        aud.play();
      }
      else {
        btn.classList.add('active-off');
      }
    }
  }

  handleKeyUp = (event) => {
    if (this.doc.hasOwnProperty(event.code)) {
      let btn = document.getElementById(this.doc[event.code]);
      btn.classList.remove('active-on');
      btn.classList.remove('active-off');
    }
  }

  handlePower = (event) => {
    if (this.state.power) {
      document.getElementById("power-box").classList.remove("tune-box-on");
      document.getElementById("power-box").classList.add("tune-box-off");
    }
    else {
      document.getElementById("power-box").classList.add("tune-box-on");
      document.getElementById("power-box").classList.remove("tune-box-off");
    }
    this.setState((prevState) => ({ power: !prevState.power, lastPlayed: "" }));
  }

  componentDidMount() {
    document.addEventListener("keydown", event => this.handleKeyDown(event));
    document.addEventListener("keyup", event => this.handleKeyUp(event));
  }
  componentWillUnmount() {
    document.addEventListener("keydown", event => this.handleKeyDown(event));
    document.addEventListener("keyup", event => this.handleKeyUp(event));
  }

  render() {
    return (<div id="App" >
      <div id="drum-machine">
        <div id="display">
          <div id="buttons">
            <button className="drum-pad" id="Heater-1" value="Heater-1" onClick={this.handleChange}>Q
              <audio controls hidden className="clip" id="Q" src={this.audio_links[this.doc["KeyQ"]]}></audio>
            </button>
            <button className="drum-pad" id="Heater-2" value="Heater-2" onClick={this.handleChange}>W
              <audio controls hidden className="clip" id="W" src={this.audio_links[this.doc["KeyW"]]}></audio>
            </button>
            <button className="drum-pad" id="Heater-3" value="Heater-3" onClick={this.handleChange}>E
              <audio controls hidden className="clip" id="E" src={this.audio_links[this.doc["KeyE"]]}></audio>
            </button>
            <button className="drum-pad" id="Heater-4" value="Heater-4" onClick={this.handleChange}>A
              <audio controls hidden className="clip" id="A" src={this.audio_links[this.doc["KeyA"]]}></audio>
            </button>
            <button className="drum-pad" id="Clap" value="Clap" onClick={this.handleChange}>S
              <audio controls hidden className="clip" id="S" src={this.audio_links[this.doc["KeyS"]]}></audio>
            </button>
            <button className="drum-pad" id="Open-HH" value="Open-HH" onClick={this.handleChange}>D
              <audio controls hidden className="clip" id="D" src={this.audio_links[this.doc["KeyD"]]}></audio>
            </button>
            <button className="drum-pad" id="Kick-and-Hat" value="Kick-and-Hat" onClick={this.handleChange}>Z
              <audio controls hidden className="clip" id="Z" src={this.audio_links[this.doc["KeyZ"]]}></audio>
            </button>
            <button className="drum-pad" id="Kick" value="Kick" onClick={this.handleChange}>X
              <audio controls hidden className="clip" id="X" src={this.audio_links[this.doc["KeyX"]]}></audio>
            </button>
            <button className="drum-pad" id="Closed-HH" value="Closed-HH" onClick={this.handleChange}>C
              <audio controls hidden className="clip" id="C" src={this.audio_links[this.doc["KeyC"]]}></audio>
            </button>
          </div>
          <div id="tuning">
            <div id="logo">
              <em>FCC<i class="fa-brands fa-free-code-camp"></i></em>
            </div>
            <div id="power">
              <p>POWER</p>
              <div className="tune-box" id="power-box">
                <div className="regulator" id="tune-regulator" onClick={this.handlePower}></div>
              </div>
            </div>
            <div id="last-played">{this.state.lastPlayed}</div>
            <div id="volume-tuning">
              <p>VOLUME</p>
              <input id="volume"
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={this.state.volume}
                onChange={event => {
                  this.setState({ volume: event.target.valueAsNumber })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default App;
