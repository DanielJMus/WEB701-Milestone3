import React from 'react';

import { connect } from 'react-redux';
import { login } from '../Actions/action';


export class Bid extends React.Component {
    constructor() {
        super();
        this.state = {
            js: undefined,
            content: undefined
        }
    }

    GetJsonData () {
        fetch('http://localhost:4200/api/products/' + this.props.productID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ js: json});
                console.log(json);
            })
        );
    }

    componentDidMount () {
        this.GetJsonData();
    }

    render () {
        const { js } = this.state;
        return (
            <div className="bid">
                    { js && 
                    <div className="bid-header">Current bid: ${this.state.js[0].PRICE}</div>}
            </div>
        );
    }
};

// Retrieve the redux state and add it to the component properties.
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bid);