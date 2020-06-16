import React from 'react'

import './dashboard-content.css';

import Navbar from '../../navbar';
import {Footer} from '../../footer';

import { connect } from 'react-redux';
import { login } from '../../../Actions/action';

class Dashboard extends React.Component {  
    render() {
        return(
            <div className="content">
                <Navbar/>
                { /* If the user is not logged in, or is not an administrator, hide the page content. Otherwise render it. */
                this.props.isSeller &&
                <div className="admin-panel">
                    <header>
                        <h1>Dashboard</h1>
                    </header>
                    <div className="admin-input-panel">
                        
                    </div>
                </div>
                }
                {
                !this.props.isSeller &&
                <div className="admin-panel">
                    <header>
                        <h1>ACCESS DENIED</h1>
                    </header>
                    <h2>You do not have access to this page, please log into an Administrator account.</h2>
                </div>
                }
                <Footer/>
            </div>
        )
    }
}

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError,
        isSeller: state.isSeller
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
  