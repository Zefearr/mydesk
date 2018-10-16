import React, { Component } from 'react';
import '../css/footer.css'; 

export default class Footer extends Component { 
  render() {
   
    return (
     <div>
         <footer className="site-footer">
         <div className="container container-footer">
            <div className="wrapper">
            {/* <p className="copyright">Designed by SKdesign</p> 
            <span style={style}>Copyright 2018 MIT</span>  */}
            </div>
         </div>
         </footer>
     </div>
    )
  }
}
