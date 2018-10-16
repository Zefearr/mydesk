
import Particles from 'react-particles-js';
import '../css/particles.css';
import React, { Component } from 'react';


export default class Parts extends Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.messages !== nextProps.messages);
    }
  render() {
      
    return (
        <div className="particles-container">
           <Particles 
                  params={{
                        particles: {
                            number: {
                                value: 50,
                                density: {
                                  enable: true,
                                  value_area: 800
                                }
                              },
                              color: {
                                value: "#fff"
                              },
                              shape: {
                                type: 'circle',
                                stroke: {
                                  width: 1,
                                  color:'#333'
                                }
                              

                             
                                // image: {
                                //   src: "img/github.svg",
                                //   width: 100,
                                //   height: 100
                                // }
                              },
                              opacity: {
                                value: 1
                              },
                              size: {
                                value: 15,
                                random: true,
                                anim: {
                                  enable: false,
                                  speed: 40,
                                  size_min: 0.1,
                                  sync: false
                                }
                              },
                              line_linked: {
                                enable: false
                              },
                              move: {
                                enable: true,
                                speed: 1.333805622463184,
                                direction: "top",
                                random: false,
                                straight: false,
                                out_mode: "out",
                                bounce: false,
                                attract: {
                                  enable: false,
                                  rotateX: 600,
                                  rotateY: 1200
                                }
                              }
                        }
                    }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%" 
                    
                  }}
                /> 
          
        </div>
      )
  }
}
