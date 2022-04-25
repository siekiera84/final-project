import React,{Component} from "react";
import pokepedia from "./pokepedia.png"

export default class NavBar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-nd navbar-dark bg-dark fixed-top">
                    <a
                        href="/"
                        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-left">
                        <img src={pokepedia} style={{width: '9em', height: '2em'}}/>
                    </a>

                </nav>
            </div>
        )
    }
}