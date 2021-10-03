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
    return (
      this.state.gitusers.map(user => 
        <button className='button'>
          <Link to={{pathname:`/user/${user.login}`}} style={{textDecoration: 'none'}}> {user.login} </Link>
        </button>
      )
    )
  }

  filteredlist() {
    return (
      this.state.filterdata.map(user => 
        <button className='button'>
          <Link to={{pathname:`/user/${user.login}`}} style={{textDecoration: 'none'}}> {user.login} </Link>
        </button>
      )
    )
  }

  handleFilter(event) {
    const searchWord = event.target.value
    const newFilter = this.state.gitusers.filter((value) => {
      return value.login.includes(searchWord);
    })
    this.setState({filterdata: newFilter})
  }

  search() {
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
        <div>
          <h2>Github Users</h2>
        </div>
        {this.gitlist()}
        {this.search()}
      </div>
    ) 
  }
}