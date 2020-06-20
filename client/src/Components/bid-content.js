import React from 'react';

import { connect } from 'react-redux';
import { login } from '../Actions/action';


export class Bid extends React.Component {
    constructor() {
        super();
        this.state = {
            product: undefined,
            bids: undefined,
            bid: 0,
            content: undefined
        }
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    GetProductData () {
        fetch('http://localhost:4200/api/products/' + this.props.productID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ product: json});
            })
        );
    }
    
    GetBidData () {
        fetch('http://localhost:4200/api/bids/' + this.props.productID, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                this.setState({ bids: json});
                this.setState({bid: json[0].PRICE})
            })
        );
    }

    componentDidMount () {
        this.GetProductData();
        this.GetBidData();
    }

    handleValueChange(e) {
        console.log(e.target.defaultValue);
        if(parseFloat(e.target.value) < parseFloat(e.target.defaultValue))
        {
            
        } else {
            this.setState({bid: e.target.value});
        }
        
    }

    render () {
        const { product, bids } = this.state;
        if (product == null || bids == null) return null;
        var bidContent = ""
        try {
            bidContent = bids.map(item =>
                <tr>
                    <td>{item.USERNAME}</td>
                    <td>${item.PRICE}</td>
                </tr>
            )
            console.log(this.state.bid);
        } catch (error)
        {
            bidContent = "";
        }
        return (
            <div className="bid-box">
                    { product && bids && 
                        <div className="bid-header">
                            { (bidContent.length > 0) && <div className="title">Bid: ${bids[0].PRICE}</div> }
                            { (bidContent.length === 0) &&<div className="title">Starting Price: ${product[0].PRICE}</div> }
                            { this.props.isLoginSuccess && 
                                <div className="bid-input">
                                    $<input className="btn-bid-input" type="number" defaultValue={bids[0].PRICE} value={this.state.bid} onChange={this.handleValueChange} ></input>
                                    <button className="btn-bid" onClick={this.submitBid}>Place Bid</button>
                                </div>
                            }
                            { !this.props.isLoginSuccess &&
                                <p className="login-note">Log in to bid on this product!</p>
                            }
                            <br></br>
                            <br></br>
                            <table>
                                <tr>
                                  <th>User</th>
                                  <th>Bid Amount</th>
                                </tr>
                                {bidContent}
                            </table>
                        </div>
                    }
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