import React from "react"

// API Endpoint && key
const asteroid_key = "7UpN204mxX9ABjxG3j8quPfoLak8N2WGyZBaY741"
const asetroid_endpoint = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${asteroid_key}`
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      asteroids: [],
      isLoading: false,
      error: null
    }
  }
  

  // fetch data from NASA's NEoW API
  componentDidMount() {
    // get loading key
    this.setState({
      isLoading: true
    })

    fetch(asetroid_endpoint)
      .then(response => response.json())
      .then((data) =>
        this.setState({
          asteroids: data.near_earth_objects,
          isLoading: false
        })
      ).catch(error => {
          this.setState({
            error, isLoading: true
          })
      })
  }

  render() {
    const { asteroids, isLoading } = this.state

    // perform react conditional rendering
    // by displaying either a loader or text indicating that data is being fetched
    if(isLoading) {
      return <p>Loading ...</p>
    }
    
    return (
      <div className='app__base asteroids'>
        <h1>Asteroids</h1>
        <div className="asteroids-base">
          {asteroids && asteroids.map(asteroid => {
            return(
              <div key={asteroid.id} className="asteroids-info">
                <h3>{asteroid.name}</h3>
                <a href={asteroid.nasa_jpl_url} target="__blank">NASA URL</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
