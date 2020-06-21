import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

export class Footer extends React.Component {
    render () {
        return (
            <div className="footer">
                <ul className="footer-list">
                    <li className="footer-item"><a href="">Facebook</a></li> 
                    <li className="footer-item"><a href="">Twitter</a></li> 
                    <li className="footer-item"><Link to="/contact">Contact</Link></li> 
                </ul>
            </div>
        );
    }
};