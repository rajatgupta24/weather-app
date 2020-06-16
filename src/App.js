import React from 'react';
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/Weather.component";
import Form from "./components/form.component"
import './App.css';

const key = "6f26b7d0d5c18f595afe214440a7091f";

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempMax: undefined,
      tempMin: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
}

  calcel (temp) {
    let cel = Math.floor( temp - 273.15 );
    return cel;
  }

  getIcon(icons, id){
    console.log(id);
      if (id >= 200 && id <=232)
        this.setState({ icon: this.weatherIcon.Thunderstorm }); 
      else if (id >= 300 && id <=321)
        this.setState({ icon: this.weatherIcon.Drizzle });  
      else if (id >= 500 && id <=531)
        this.setState({ icon: this.weatherIcon.Rain });  
      else if (id >= 600 && id <=622)
        this.setState({ icon: this.weatherIcon.Snow }); 
      else if (id >= 701 && id <=781)
        this.setState({ icon: this.weatherIcon.Atmosphere }); 
      else if (id === 800)
        this.setState({ icon: this.weatherIcon.Clear }); 
      else if (id >= 801 && id <=804)
        this.setState( { icon: this.weatherIcon.Clouds }); 
      else console.log(0);
  }

  getWeather = async (e) =>{
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`);

      const response = await apiCall.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calcel(response.main.temp),
        tempMax: this.calcel(response.main.temp_max),
        tempMin: this.calcel(response.main.temp_min),
        description: response.weather[0].description
      });
  
      this.getIcon(this.weatherIcon, response.weather[0].id);  
    } else {
      this.setState({ error: true });
    }
  };

  render(){
    return(
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather
         city={this.state.city}
         country={this.state.country}
         tempCel={this.state.celsius}
         tempMax={this.state.tempMax}
         tempMin={this.state.tempMin}
         description={this.state.description}
         weatherIcon={this.state.icon}
         />
      </div>
    )
  }
}

export default App;