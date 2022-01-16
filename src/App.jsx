import React, { Component } from 'react'
import axios from 'axios'


class App extends Component {
  state = {
    geolocation: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async position => {

      const openCageKey = process.env.REACT_APP_KEY_OPENCAGE;
      const openWeatherMapKey = process.env.REACT_APP_WEATHERKEY;
      

      let { latitude, longitude } = position.coords

      let locationResponse = await axios.get
      (`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`)
      let weatherResponse = await axios.get
      (`https://api.openweathermap.org/data/2.5/onecall?&lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMapKey}`)

      let weatherInfo = {
        city: locationResponse.data.results[0].components.city,
        temp: weatherResponse.data.current.temp
      }

      this.setState({ location: weatherInfo })
      debugger
    })
  }
  render() {
    return (
      <div>

      </div>
    )
  }

}

export default App 