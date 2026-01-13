import {LeafletMouseEvent} from "leaflet";
import {StateContext} from "./App";
import {Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useContext, useEffect} from "react";

import {useNavigate} from "react-router-dom";
import {initialState, setCoordinate, setError, setCrime, setSelect, CrimeProps} from "./State";



function Normalizza_categoria(s:CrimeProps){
    let nome = s.category
    return nome[0].toUpperCase()+nome.slice(1).replace(/[-]/g, ' ')
}


function LocationMarker() {

    const {state, dispatch} = useContext(StateContext)

    const Navigate=useNavigate()


    const map = useMap()
    useMapEvents(
        {
            click: (e: LeafletMouseEvent) => {
                const coord = e.latlng
                dispatch(setCoordinate(coord))
                map.flyTo(coord, 10)
            }
        }
    )


    useEffect( () => {
        if (state.coordinate === initialState.coordinate) return
        fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${state.coordinate.lat}&lng=${state.coordinate.lng}&date=${state.year}-${state.month}`)
            .then( v => v.json() )
            .then( j => j!== null ? dispatch(setCrime(j)) : dispatch(setCrime([])) )
            .catch( e => dispatch(setError(e)) )
    }, [state.coordinate, state.year,state.month, dispatch])



    return(
        <div>

            {state.crime.map( s => <Marker key={s.id}
                                           position={[s.location.latitude,s.location.longitude]}
                                           eventHandlers={
                                               {
                                                   mouseover: (event) => event.target.openPopup(),
                                                   click: (_: L.LeafletMouseEvent) => {dispatch(setSelect(s)); Navigate(`/statistics/${s.id}`)}
                                               }

                                           }

                >
                    <Popup className={"request-popup"}> <b>{ Normalizza_categoria(s) }</b><small className={"text-muted"}>: click for more</small> </Popup>
                </Marker>
            )}

        </div>
    )

}



export default LocationMarker