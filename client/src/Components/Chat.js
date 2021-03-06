import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import { connect } from 'react-redux';
import { login } from '../Actions/action';
import { ThemeProvider } from 'styled-components';

import './Chat.css';

const bcrypt = require('bcryptjs');

// all available props
const theme = {
  background: '#f5f8fb',
  headerBgColor: '#ff9029',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

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
    var self = this;
    fetch('http://localhost:4200/api/users/' + email, {
      method: 'get'
    }).then(res =>
      res.json().then(json => {
          if(json.length > 0) {

            bcrypt.compare(password, json[0].PASSWORD, function(err, result) {
              if (result) {
                self.setState({triggerValue: 'password-success'});
              } else {
                self.setState({triggerValue: 'password-fail'});
              }
              self.triggerNext();
            });
          }
      })
  );
  }

  render() {
    return null
  }
}





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
    // Returns a percentage of how much the input matches the keywords
    return (matchCounter / matchMax) * 100;
}


// List of queries, synonyms are separated with a | symbol
const loginQueries = ["trouble|struggling to|can't|cannot|cant|trying to", "log in|login|log into|logging into"]
const contactAdminQueries = ["want to|can i|wanna|like to", "speak|talk|contact", "admin|owner|manager"]

// Returns an array featuring a message [0] and a nextStep value [1]
function CheckMessage (steps)
{
  var userInput = steps.userQuery.value;
  // Check confidence in what the user is asking, this is easy to extend.
  var loginConfidence = CheckConfidence(userInput, loginQueries);
  var contactConfidence = CheckConfidence(userInput, contactAdminQueries);
  if(loginConfidence >= 50)
  {
    return ["Please tell me your email address and I will check if it is valid", "email"];
  } 
  else if (contactConfidence >= 50) 
  {
    return ["You can contact the site owners by heading to the 'Contact' page, it's up in the navigation bar at the top of the page. :)", "confirm-1"];
  }
  return ["Sorry, I don't quite understand what you're asking", "2"];
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
        <ThemeProvider theme={theme}>
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
            message: "What can I help you with today?",
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
            message: "Sorry to hear that, perhaps try rephrasing your query and maybe I can find something for you!",
            trigger: 2
          }
      
        ]}
      />
      </ThemeProvider>
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