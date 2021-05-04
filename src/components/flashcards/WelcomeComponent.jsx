import {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/flashcards/HelloWorldService.js'

import flashimage from '../../images/flashcard.jpg'


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: null
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your Flashcards <Link to="/flashcards">here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message
                    <button onClick={this.retrieveWelcomeMessage} 
                    className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                    <img src={flashimage} class="img-fluid" alt="flash card" width="800" height="50%"/>
                </div>
            </>
        )
    }

    retrieveWelcomeMessage() {

        HelloWorldService.executeHelloWorldService()
        .then((response) => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data
        })
    }

    handleError(error) {
        console.log(error)

        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({welcomeMessage: errorMessage})
    }

}


export default WelcomeComponent