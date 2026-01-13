import React, {useContext} from 'react';
import {StateContext} from "./App";
import {initialState} from "./State";
import Grafico from "./Grafico";

function Statistiche() {
    const {state,} = useContext(StateContext)
    return(


        <div>

            {
                (state.coordinate === initialState.coordinate || state.crime.length===0) ?

                    <div className="alert alert-danger" role="alert">
                        No data found. Go back to the map and select an area.
                    </div>

                    : <Grafico/>
            }

        </div>


    )
}

export default Statistiche