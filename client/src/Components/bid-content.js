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
        this.submitBid = this.submitBid.bind(this);
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

    submitBid(e) {
        e.preventDefault();

        if (this.state.bids != null)
        {
            if (parseFloat(this.Bid.value) < parseFloat(this.state.bids[0].PRICE)) {
                alert("Bid entered must be higher than current bid");
                return;
            }
        } else {
            if (parseFloat(this.Bid.value) < parseFloat(this.state.product[0].PRICE)) {
                alert("Bid entered must be higher than starting price");
                return;
            }
        }

        fetch('http://localhost:4200/api/bids', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "PRODUCTID": this.props.productID,
             "USERID": this.props.userID,
             "PRICE": parseFloat(this.Bid.value).toFixed(2)
            })
        }).then(res => {
            if (res.status === 201) 
            {
                    alert("Successfully added bid.")
                    this.GetProductData();
                    this.GetBidData();
            } else {
                alert(res.status)
            }
        });
    }

    render () {
        const { product, bids } = this.state;
        if (product == null || bids == null) return null;
        var bidContent = "";
        var defaultBid = 0;
        try {
            bidContent = bids.map(item =>
                <tr>
                    <td>{item.USERNAME}</td>
                    <td>${item.PRICE}</td>
                </tr>
            )
            defaultBid = bids[0].PRICE;
        } catch (error)
        {
            defaultBid = product[0].PRICE;
            bidContent = "";
        }
        return (
            <div className="bid-box">
                    { product && bids && 
                        <div className="bid-header">
                            { (bidContent.length > 0) && <div className="title">Bid: ${bids[0].PRICE} / L</div> }
                            { (bidContent.length === 0) &&<div className="title">Starting Price: ${product[0].PRICE} / L</div> }
                            { this.props.isLoginSuccess && !this.props.isSeller && 
                                <form className="bid-input" onSubmit={this.submitBid}>
                                    $<input ref={(ref) => {this.Bid = ref}} className="btn-bid-input" type="number" step='0.50' defaultValue={parseFloat(defaultBid) + 1}></input>
                                    <input className="btn-bid" type="submit" value="Place Bid"/>
                                </form>
                            }
                            { (!this.props.isLoginSuccess || this.props.isSeller) &&
                                <p className="login-note">Log into a customer account to bid</p>
                            }
                            <br></br>
                            <br></br>
                            { bidContent.length > 0 && 
                                <table>
                                    <tr>
                                      <th>User</th>
                                      <th>Bid Amount</th>
                                    </tr>
                                    {bidContent}
                                </table>
                            }
                            { bidContent.length === 0 && 
                                <p className="no-bids">Be the first to bid on this product</p>
                            }
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
        isSeller : state.isSeller,
        userID: state.userID
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bid);