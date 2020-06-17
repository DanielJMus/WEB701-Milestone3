import React from 'react';

import { connect } from 'react-redux';
import { login } from '../Actions/action';


export class Bid extends React.Component {
    constructor() {
        super();
        this.state = {
            product: undefined,
            bids: undefined,
            content: undefined
        }
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
            })
        );
    }

    componentDidMount () {
        this.GetProductData();
        this.GetBidData();
    }

    render () {
        const { product, bids } = this.state;
        if (product == null || bids == null) return null;
        var bidcontent = bids.map(item =>
            <tr>
                <td>{item.USERNAME}</td>
                <td>${item.PRICE}</td>
            </tr>
        )
        return (
            <div className="bid-box">
                    { product && 
                        <div className="bid-header">
                            Current Bid: ${bids[0].PRICE}
                            { this.props.isLoginSuccess && 
                                <button className="btn-bid">Place Bid</button>
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
                                {bidcontent}
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