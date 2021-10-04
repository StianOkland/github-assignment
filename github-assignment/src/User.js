import './App.css';
import React from 'react'

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
            imageurl: '',
            repositories: []
        } 

        this.repolist = this.repolist.bind(this)
    }
    
    componentDidMount() {
        // Get username from props
        this.setState({username: this.props.username})

        // Fetch selected user for details-page, and filter out real name and if so, company, blog and location of the user
        fetch(`https://api.github.com/users/${this.props.username}`)
        .then(response => response.json())
        .then(data => { 
            if(data.name) {
                this.setState({name: data.name})
            }
            else {
                this.setState({name: 'N/A'})
            }
            if(data.company) {
                this.setState({company: data.company})
            }
            else {
                this.setState({company: 'N/A'})
            }
            if(data.blog) {
                this.setState({blog: data.blog})
            }
            else {
                this.setState({blog: 'N/A'})
            }
            if(data.location) {
                this.setState({location: data.location}) 
            }
            else {
                this.setState({location: 'N/A'})
            }
            if(data.avatar_url) {
                this.setState({avatar_url: data.avatar_url})
            }
        })

        //Fetching repositories for a user
        fetch(`https://api.github.com/users/${this.props.username}/repos`)
        .then((response) => response.json())
        .then((data) => this.setState({repositories: data}))
    }


    repolist() {
        // Return a list of all repositories for the user
        return (
          this.state.repositories.map(item => 
            <div> {item.name} </div>
          )
        )
      }


    render() {
        return (
        <div>
            <div>
                <img src={this.state.avatar_url} alt='image' className='image_profile'/>
                <h2>Hei {this.state.username} </h2>
            </div>
            <h4>Name: {this.state.name}</h4>
            <h4>Company: {this.state.company}  </h4>
            <h4>Blog: {this.state.blog} </h4>
            <h4>Location: {this.state.location} </h4>
            <h4>Repositories </h4>
            <div>
                {this.repolist()}
            </div>
        </div>
        ) 
    }
}





