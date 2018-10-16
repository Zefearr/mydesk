import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import '../css/asidemenu.css';


 class AsideMenu extends Component {
  render() {
    return (
      <nav className="post-feed__nav">
        <ul>
            <li>
                <Link to="#">Cat#1</Link>
            </li>
            <li>
                <Link to="#">Cat#2</Link>
            </li>
            <li>
                <Link to="#">Cat#3</Link>
            </li>
            <li>
                <Link to="#">Cat#4</Link>
            </li>
            <li>
                <Link to="#">Cat#5</Link>
            </li>
        </ul>
      </nav>
        
      
    )
  }
}
export default AsideMenu;