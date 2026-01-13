import {NavLink} from "react-router-dom";
import "./App.css"

function Navbar(){

    return(

        <div>
            <nav className = "navbar navbar-expand-lg navbar-light bg-light ">
                <div className={"container-fluid border-bottom  justify-content-between "}>


                    <div className={"mr-n5"}  >
                        <NavLink to={"/"} > <img alt={"thumb"}  src={"crime_logo.png"}  height={"50vh"} /> </NavLink>
                    </div>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="toggler-icon top-bar"></span>
                        <span className="toggler-icon middle-bar"></span>
                        <span className="toggler-icon bottom-bar"></span>
                    </button>

                    <div className={"collapse navbar-collapse container-fluid my-2"} id="navbarNavAltMarkup" >
                        <div className={"container-fluid"}>
                            <ul className="navbar-nav d-flex flex-row justify-content-between justify-content-lg-start ">
                                <li>
                                    <NavLink style={{cursor:"default"}} className={"nav-link"} to={"/"}><h5>Home</h5></NavLink>
                                </li>
                                <li>
                                    <h5> <NavLink to={"statistics"} style={{cursor:"default"}} className={"nav-link"}> Statistics </NavLink></h5>
                                </li>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>



    )
}

export default Navbar


