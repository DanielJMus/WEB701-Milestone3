import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import './Chat.css';

function parseInput (userInput)
{
    return userInput;
}

class Search extends Component {
    constructor (props)
    {
        super(props);
        this.state = {
            userQuery: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { userQuery } = steps;

        this.setState({userQuery});
    }

    render() {
        const {userQuery} = this.state;
        return (
            <div style={{width:'100%'}}>
                {parseInput(userQuery.value)}
            </div>
        );
    }
}

Search.propTypes = {
    steps: PropTypes.object,
};

Search.defaultProps = {
    steps: undefined
};

class Chat extends Component {
    render () {
        return (
        <ChatBot
        headerTitle="Helper Bot"
        recognitionEnable={true}
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
            message: 'What are you looking for today?',
            trigger: 'userQuery',
          },
          {
            id: 'userQuery',
            user: true,
            trigger: 'results'
          },
          {
            id: 'results',
            component: <Search/>,
            asMessage: true,
            trigger: 'confirm'
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