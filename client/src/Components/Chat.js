import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import './Chat.css';

// List of queries, synonyms are separated with a | symbol
const loginQueries = ["can't|cannot|cant|trying to", "log in|login"]

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
    return ["It looks like you are trying to log in", "login"];
  }
  return userInput;
}

class Chat extends Component {

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
            trigger: 'results'
          },
          {
            id: 'login',
            message: "I will now help you log into your account",
            trigger: 'confirm'
          },
          {
            id: 'results',
            message: ({steps}) => CheckMessage(steps)[0],
            trigger: ({steps}) => CheckMessage(steps)[1]
          },
          {
            id: 'confirm',
            message: "Is this helpful?",
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

export default Chat;