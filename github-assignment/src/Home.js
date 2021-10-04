import './App.css';
import React from 'react'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      gitusers: [],
      filterdata: []
    }
    
    this.gitlist = this.gitlist.bind(this)
    this.search = this.search.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.filteredlist = this.filteredlist.bind(this)
  }
  
  componentDidMount() {
    // Fetching a list of users
    fetch("https://api.github.com/users")
    .then((response) => response.json())
    .then((data) => this.setState({gitusers: data}))
  }
  
  gitlist() {
    // Return a list with Github users login name and link to details-page
    return (
      this.state.gitusers.map(user => 
        <button className='button'>
          <Link to={{pathname:`/user/${user.login}`}} style={{textDecoration: 'none'}}> {user.login} </Link>
        </button>
      )
    )
  }

  filteredlist() {
    // Diplaying the filtered list only containing user-login matching the users input
    return (
      this.state.filterdata.map(user => 
        <button className='button'>
          <Link to={{pathname:`/user/${user.login}`}} style={{textDecoration: 'none'}}> {user.login} </Link>
        </button>
      )
    )
  }

  handleFilter(event) {
    // Filter the list of Github users into a new list containing the user-login matching the users input
    const searchWord = event.target.value
    const newFilter = this.state.gitusers.filter((value) => {
      if(searchWord) {
        return value.login.includes(searchWord);
      }
    })
    this.setState({filterdata: newFilter})
  }

  search() {
    // Search bar for user the search the after a Github user, either with full name or only parts of it
    return (
      <div className='search'>
        <div className='searchInput'>
          <input type='text' placeholder={'search Github users'} onChange={this.handleFilter} />
        </div>
        <div className='result'>
          {this.filteredlist()}
        </div>

      </div>
    )
  }


  render() {
    return (
      <div>
        <div className='Homescreen'>
          <h2>Github Users</h2>
        </div>
        {this.gitlist()}
        {this.search()}
      </div>
    ) 
  }
}