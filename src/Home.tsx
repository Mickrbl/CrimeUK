import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";

function Home(){

    return(
        <div className={"minimum"}>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home