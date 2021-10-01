import './App.css';
import React from 'react'
// import { useParams } from 'react-router-dom'




export default class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            name: '',
            username: '',
            company: '',
            blog: '',
            location: '',
            repositories: []
        } 

        this.repolist = this.repolist.bind(this)
    }
    
    componentDidMount() {
        this.setState({username: this.props.username})

        fetch(`https://api.github.com/users/${this.props.username}`)
        .then(response => response.json())
        .then(data => { this.setState({name: data.name})
            this.setState({company: data.company})
            this.setState({blog: data.blog})
            this.setState({location: data.location}) })

        //Fetching repositories for a user
        fetch(`https://api.github.com/users/${this.props.username}/repos`)
        .then((response) => response.json())
        .then((data) => this.setState({repositories: data}))
    }


    repolist() {
        return (
          this.state.repositories.map(item => 
            <div> {item.name} </div>
          )
        )
      }


    render() {
        return (
        <div>
            <h2>Hei there {this.state.username} </h2>
            <h4>Name: {this.state.name}</h4>
            <h4>Company: {this.state.company}  </h4>
            <h4>blog: {this.state.blog} </h4>
            <h4>location: {this.state.location} </h4>
            <div>
                {this.repolist()}
            </div>
        </div>
        ) 
    }
}





