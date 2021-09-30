import './App.css';
import React from 'react'
// import { useParams } from 'react-router-dom'




export default class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            name: ''
        } 

        this.gitlist = this.gitlist.bind(this)
    }
    
    componentDidMount() {
        this.setState({name: this.props.username})

        // Fetching repositories for a user
        fetch(`https://api.github.com/users/${this.state.name}`)
        .then((response) => response.json())
        .then((data) => this.setState({user: data}))
    }


    gitlist() {
        return (
          this.state.user.map(item => 
            <div> {item.type} </div>
          )
        )
      }


    render() {
        return (
        <div>
            <h2>HEi ther {this.state.name} </h2>
            <div>
                {this.gitlist}
            </div>
            
        </div>
        ) 
    }
}


// const User = () => {
//     const { username } = useParams()


//     const response = await fetch(`https://api.github.com/users/${username}`)
//     const data = await response.json()


//     return (
//         <div className='User-info'>
//             <h2> User info - { }</h2>
//         </div>
//     )
// }

// export default User



