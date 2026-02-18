import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Home";
import HomePageContent from "./HomePageContent";
import Statistiche from "./Statistiche";
import Dettaglio from "./Dettaglio";


function ContentPane () {

    return(
        <BrowserRouter>

            <Routes>
                <Route path={"/"} element={<Home/>}>

                    <Route path={""} index element={<HomePageContent/>}/>
                    <Route path={"statistics"}>
                        <Route path={""} element={<Statistiche/>}/>
                        <Route path={":qualunque"} element={<Dettaglio/>}/>
                    </Route>


                </Route>
            </Routes>

        </BrowserRouter>)
}

export default ContentPane
