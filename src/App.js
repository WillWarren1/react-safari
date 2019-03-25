import React, { Component } from 'react'
import axios from 'axios'
class App extends Component {
  state = {
    animals: [],
    location: '',
    animalsByLocation: [],
    totalNumberOfAnimals: '',
    animalsToCount: [],
    lionTigerBear: ''
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

  deleteByLocation = () => {
    for (let i = 0; i < this.state.animals.length; i++) {
      if (
        this.state.animals[i].locationOfLastSeen === `${this.state.location}`
      ) {
        axios.delete(
          `https://localhost:5001/api/Animals/${this.state.animals[i].id}`
        )
      }
    }
    this.componentDidMount()
  }
  countAnimals = () => {
    let count = 0
    let ligerbearCount = 0
    for (var i = 0; i < this.state.animals.length; i++) {
      count += this.state.animals[i].countOfTimesSeen
    }
    this.setState({
      totalNumberOfAnimals: count
    })

    for (i = 0; i < this.state.animals.length; i++) {
      if (
        this.state.animals[i].species === 'Lion' ||
        this.state.animals[i].species === 'Tiger' ||
        this.state.animals[i].species === 'Bear'
      )
        ligerbearCount += this.state.animals[i].countOfTimesSeen
    }
    this.setState({
      lionTigerBear: ligerbearCount
    })
  }

  componentDidMount() {
    axios.get('https://localhost:5001/api/Animals').then(resp => {
      this.setState({
        animals: resp.data
      })
    })
  }
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
          <p>
            I've seen {this.state.totalNumberOfAnimals} animals! Here are all
            the animals!
          </p>
          {this.state.animals.map(animal => {
            return (
              <li key={animal.id}>
                {animal.species} seen {animal.countOfTimesSeen} times in the{' '}
                {animal.locationOfLastSeen}
              </li>
            )
          })}
        </ul>
        <p>I've seen {this.state.lionTigerBear} lions, tiger, and bears!</p>
        <span>
          <input
            type="text"
            placeholder="search by location"
            className="location"
            onChange={this.addLocationToState}
          />
          <button onClick={this.findByLocation}>Enter</button>
          <button onClick={this.deleteByLocation}>Delete from database</button>
          <button onClick={this.countAnimals}>Count the animals</button>
        </span>
        <ul>
          <p>Enter a biome above to sort the animals into a list here!</p>
          {this.state.animalsByLocation.map(animal => {
            return <li key={animal.id}>{animal.species}</li>
          })}
        </ul>
      </>
    )
  }
}

export default App
