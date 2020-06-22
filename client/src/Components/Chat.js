import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import { connect } from 'react-redux';
import { login } from '../Actions/action';

import './Chat.css';

class EmailCheck extends Component {
  constructor (props) {
    super(props);
    this.state = {
      trigger: false,
      triggerValue: ""
    };
    this.triggerNext = this.triggerNext.bind(this);
  }

  triggerNext () {
    this.setState({trigger: true}, () => {
        this.props.triggerNextStep({trigger:this.state.triggerValue});
    });
  }

  componentWillMount () {
    const { steps } = this.props;
    const email = steps.email.value;
    fetch('http://localhost:4200/api/users/' + email, {
      method: 'get'
    }).then(res =>
      res.json().then(json => {
        console.log(json);
          if(json.length > 0) this.setState({triggerValue:"email-success"})
          else this.setState({triggerValue:"email-fail"});
          this.triggerNext();
      })
    );
  }

  render() {
    return null
  }
}

class PasswordCheck extends Component {
  constructor (props) {
    super(props);
    this.state = {
      trigger: false,
      triggerValue: ""
    };
    this.triggerNext = this.triggerNext.bind(this);
  }

  triggerNext () {
    this.setState({trigger: true}, () => {
        this.props.triggerNextStep({trigger:this.state.triggerValue});
    });
  }

  componentWillMount () {
    const { steps } = this.props;
    const email = steps.email.value;
    const password = steps.password.value;
    fetch('http://localhost:4200/api/users/' + email, {
      method: 'get'
    }).then(res =>
      res.json().then(json => {
          if(json.length > 0) {
              if(json[0].PASSWORD === password) {
                  this.setState({triggerValue: 'password-success'});
              } else {
                this.setState({triggerValue: 'password-fail'});
              }
          }
          this.triggerNext();
      })
  );
  }

  render() {
    return null
  }
}




// List of queries, synonyms are separated with a | symbol
const loginQueries = ["struggling to|can't|cannot|cant|trying to", "log in|login|log into"]

// Returns a percentage to 100 of confidence that user is making a specific query
function CheckConfidence (input, keywords)
{
    var matchCounter = 0;
    var matchMax = keywords.length;
    for(var i = 0; i < keywords.length; i++)
    {
      // Check if keywords or their synonyms are in the text
      if (keywords[i].split("|").some(v => input.toLowerCase().includes(v)))
      {
        matchCounter++;
      }
    }
    return (matchCounter / matchMax) * 100;
}

// Returns an array featuring a message [0] and a nextStep value [1]
function CheckMessage (steps)
{
  var userInput = steps.userQuery.value;
  var confidence = CheckConfidence(userInput, loginQueries);
  console.log("Login confidence: " + confidence);
  if(confidence >= 50)
  {
    return ["Please tell me your email address and I will check if it is valid", "email"];
  }
  return userInput;
}

class Chat extends Component {

    
    constructor(props) {
      super(props);
    }

    Login = (steps) => {
      this.props.login(steps.email.value, steps.password.value);
      return "Done! You should now be logged in.";
    }


    render () {
        return (
        <ChatBot
        headerTitle="Helper Bot"
        recognitionEnable={true}
        floating={true}
        style={{
            position:'fixed',
            right: 0,
            bottom: 0
        }}
        steps={[
          {
            id: '1',
            message: 'Hi!',
            trigger: 2
          },
          {
            id: '2',
            message: "What can I help you with?",
            trigger: 'userQuery',
          },
          {
            id: 'userQuery',
            user: true,
            trigger: 'queryResult'
          },
          {
            id: 'queryResult',
            message: ({steps}) => CheckMessage(steps)[0],
            trigger: ({steps}) => CheckMessage(steps)[1]
          },
          // LOGIN BRANCH
          {
            id: 'email',
            user: true,
            trigger: 'email-check'
          },
          {
            id: 'email-check',
            component: <EmailCheck/>,
            waitAction: true,
            asMessage: true,
            replace: true,
            trigger: ''
          },
          {
            id: 'email-success',
            message: "That email is valid, please enter your password",
            trigger: 'password'
          },
          {
            id: 'email-fail',
            message: "Hmm, that email does not exist in our site, try entering it again",
            trigger: 'email'
          },
          {
            id: 'password',
            user: true,
            trigger: 'password-check'
          },
          {
            id: 'password-check',
            component: <PasswordCheck/>,
            waitAction: true,
            asMessage: true,
            replace: true,
            trigger: ''
          },
          {
            id: 'password-success',
            message: "Your credentials are correct, would you like me to log you in?",
            trigger: 'login-check'
          },
          {
            id: 'password-fail',
            message: "That password seems to be incorrect, try entering it again",
            trigger: 'password'
          },
          {
            id: 'login-check',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'login-yes'},
              { value: 'no', label: 'No', trigger: 'login-no'}
            ],
          },
          {
            id: 'login-yes',
            message: ({steps}) => this.Login(steps),
            trigger: 'confirm-1'
          },
          {
            id: 'login-no',
            message: "ok :)",
            trigger: 'confirm-1'
          },


          {
            id: 'confirm-1',
            message: "Was this helpful?",
            trigger: "confirm-2"
          },
          {
            id: 'confirm-2',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'confirm-yes'},
              { value: 'no', label: 'No', trigger: 'confirm-no'}
            ],
          },
          {
            id: 'confirm-yes',
            message: "Great! Happy to help. :)",
            end: true
          },
          { 
            id: 'confirm-no',
            message: "Sorry to hear that, perhaps try rephrasing and maybe I can find something for you!",
            trigger: 2
          }
      
        ]}
      />
        );
    }
}

const mapStateToProps = (state) => {
  return {
      isLoginPending: state.isLoginPending,
      isLoginSuccess: state.isLoginSuccess,
      isLoginError: state.isLoginError,
      isSeller : state.isSeller
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);