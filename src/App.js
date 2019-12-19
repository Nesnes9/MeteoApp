import React, { Component } from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import Slide from './Slide'

const cities = [
  {
    city: "Paris",
    image: "https://theworldtravelblog.com/wp-content/uploads/2019/05/Photo-by-Catarina-Belova-1080x620.jpg",
    lat_ne: '48.86471476180278',
    lat_sw: '48.83579746243092',
    lon_ne: '2.373046875',
    lon_sw: '2.3291015625',
  },
  {
    city: "Bogota",
    image: "https://qc.croixbleue.ca/images/countries/CO.jpg",
    lat_ne: '5.266007882805492',
    lat_sw: '4.915832801313174',
    lon_ne: '-75.234375',
    lon_sw: '-75.5859375',

  },
  {
    city: "Berlin",
    image: "https://s2.best-wallpaper.net/wallpaper/1920x1440/1503/Berlin-Germany-city-night-lights-buildings-river_1920x1440.jpg",
    lat_ne: '52.3755991766591',
    lat_sw: '52.26815737376817',
    lon_ne: '13.7109375',
    lon_sw: '13.53515625',

  },
  {
    city: "New York",
    image: "https://images.localist.com/photos/843145/original/090941ff633544f507baff64330da26e57a372c4.jpg",
    lat_ne: '40.97989806962013',
    lat_sw: '38.82259097617712',
    lon_ne: '-71.5625',
    lon_sw: '-74.5625',
  },
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weather: [],
    }
  }

    componentDidMount() {

      const params = {
        grant_type: 'password',
        client_id:'5dfa3ade431c63347f37e995',
        client_secret: 't8NZoMcKPK6XqMg2rVhN6hmwCifTwQDTv',
        username:'nesrinetebaili@gmail.fr',
        password:'Nesnes.75',
        scope:"read_station"
      }
      const formData = new FormData();

      for (var k in params) {
          formData.append(k, params[k]);
      }
      fetch('https://api.netatmo.com/oauth2/token', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(apiResult => {
        const access_token = apiResult.access_token

        
      cities.forEach(city => {
        const endPoint = `https://app.netatmo.net/api/getpublicmeasures?lat_ne=${city.lat_ne}&lat_sw=${city.lat_sw}&lon_ne=${city.lon_ne}&lon_sw=${city.lon_sw}`

        fetch(endPoint, {
          headers: {
            'Authorization': 'Bearer ' + access_token,
          }
        }).then(res => {
          if (res.status !== 200) {
            // Essayer encore une fois car des fois l'API ne renvoie pas une bonne réponse 
            return fetch(endPoint, {
              headers: {
                'Authorization': 'Bearer ' + access_token,
              }
            }).then(res => res.json())
          }
          else {
            return res.json()
          }
        }).then(apiResult => {
          const firstResult = apiResult.body[0]

          const measures = firstResult.measures

          const firstObject = measures[Object.keys(measures)[0]].res
          const [temperature, humidity] = firstObject[Object.keys(firstObject)[0]]

          const secondObject = measures[Object.keys(measures)[1]].res
          const [pressure] = secondObject[Object.keys(secondObject)[0]]

          const newWeatherObject = {
            city: city.city,
            image: city.image,
            temperature,
            humidity,
            pressure,
          }
          this.setState({
            weather: [...this.state.weather, newWeatherObject]
          })
        })
        .catch(error => {
          console.log('Error', error)
        })
      })

      })
      .catch(error => {
        console.log('Error', error)
      })
  
    }

  render() {
    return (
      <div>
        { this.state.weather.length > 0 ?
        <AutoRotatingCarousel
          open={true}
          style={{ position: 'absolute' }}
          autoplay={true}
          interval={4000}
        >
          {
            this.state.weather.map(item => {
              return (
                <Slide 
                  temperature={item.temperature}
                  humidity={item.humidity}
                  pressure={item.pressure}
                  city={item.city}
                  backgroundUrl={item.image}
                
                />
              )
            })
          }
          
        </AutoRotatingCarousel> : <h1>Chargement ...</h1>}
        </div>
    )
  }
}

export default App