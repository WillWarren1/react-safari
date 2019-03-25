import React, { Component } from 'react'
import axios from 'axios'
class App extends Component {
  state = {
    animals: [],
    location: '',
    animalsByLocation: []
  }
  componentDidMount() {
    axios.get('https://localhost:5001/api/Animals').then(resp => {
      this.setState({
        animals: resp.data
      })
    })
  }

  addLocationToState = event => {
    this.setState({
      location: event.target.value
    })
  }

  findByLocation = () => {
    axios
      .get(`https://localhost:5001/api/Animals/location=${this.state.location}`)
      .then(resp => {
        this.setState({
          animalsByLocation: resp.data
        })
      })
  }

  deleteByLocation = () => {}

  render() {
    return (
      <>
        <h1>Safari Vacation Full Stack Project</h1>
        <p>
          I have created a database to track animals seen on a safari. Click
          some buttons to make some API calls to retrieve, add, update, and
          delete information about these animals!
        </p>
        <ul>
          Here are all the animals!
          {this.state.animals.map(animal => {
            return (
              <li key={animal.id}>
                {animal.species} seen {animal.countOfTimesSeen} times in the{' '}
                {animal.locationOfLastSeen}
              </li>
            )
          })}
        </ul>
        <span>
          <input
            type="text"
            placeholder="search by location"
            className="location"
            onChange={this.addLocationToState}
          />
          <button onClick={this.findByLocation}>Enter</button>
          <button onClick={this.deleteByLocation}>Delete from database</button>
        </span>
        <ul>
          {this.state.animalsByLocation.map(animal => {
            return <li key={animal.id}>{animal.species}</li>
          })}
        </ul>
      </>
    )
  }
}

export default App
