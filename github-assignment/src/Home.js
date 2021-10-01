import './App.css';
import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      gitusers: [],
    }
    
    this.gitlist = this.gitlist.bind(this)
  }
  
  componentDidMount() {
    // Fetching a list of users
    fetch("https://api.github.com/users")
    .then((response) => response.json())
    .then((data) => this.setState({gitusers: data}))
  }
  
  gitlist() {
    return (
      this.state.gitusers.map(user => 
        <button>
          <Link to={{pathname:`/user/${user.login}`}}> {user.login} </Link>
        </button>
      )
    )
  }

  render() {
    return (
      <div>
        {this.gitlist()}
      </div>
    ) 
  }
}