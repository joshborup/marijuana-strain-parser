import React, { Component } from "react";
import strainsParser from "./utils/stainsParser";
import axios from "axios";
import "./App.css";
import stainsParser from "./utils/stainsParser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strains: [],
      name: "",
      race: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://strainapi.evanbusse.com/qdLGxRo/strains/search/all")
      .then(res => {
        this.setState({
          strains: stainsParser.cleanData(res.data)
        });
      });
    axios
      .get("http://strainapi.evanbusse.com/qdLGxRo/strains/search/all")
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    const { strains } = this.state;
    const mappedStrains = strains
      .filter(strain =>
        strain.name.toLowerCase().includes(this.state.name.toLowerCase())
      )
      .filter(strain =>
        strain.race.toLowerCase().includes(this.state.race.toLowerCase())
      )
      .map(strain => {
        return (
          <div
            style={{
              background: strainsParser.background(strain.race)
            }}
            className="strain-card"
            key={strain.id}
          >
            <h2>{strain.name}</h2>
            <div className="effects-container">
              <div>
                <h3>Medical</h3>
                {strainsParser.effects(strain.effects.medical)}
              </div>
              <div>
                <h3>Positive</h3>
                {strainsParser.effects(strain.effects.positive)}
              </div>
              <div>
                <h3>Negative</h3>
                {strainsParser.effects(strain.effects.negative)}
              </div>
            </div>
          </div>
        );
      });
    console.log(strains);
    return (
      <div className="App">
        <h1>Marijuana Strains</h1>
        <div className="filter-container">
          <input
            placeholder="Strain Name"
            onChange={e => {
              this.setState({
                name: e.target.value
              });
            }}
            value={this.state.name}
          />
          <select
            onChange={e => {
              this.setState({
                race: e.target.value
              });
            }}
            value={this.state.race}
          >
            <option>Select A Race</option>
            <option value="sativa">Sativa</option>
            <option value="hybrid">Hybrid</option>
            <option value="indica">Indica</option>
          </select>
        </div>
        <div className="strains-container">{mappedStrains}</div>
      </div>
    );
  }
}

export default App;
