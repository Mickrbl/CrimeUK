import {StateContext} from "./App";
import React, {useContext} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {initialState} from "./State";





function Statistiche() {

    const {state} = useContext(StateContext)


    return(
        <div className={"container mt-4"}>
            {(state.coordinate === initialState.coordinate || state.crime.length===0) ?
                <div className="alert alert-danger" role="alert">
                    No data found. Go back to the map and select an area.
                </div>

                : (
                    <div className="card mb-3 ">
                        <div className="row g-0">

                            <div className="col-md-8">
                                <div className="card-body m-3">
                                    <h5 className="card-title">Categoria: {state.selected?.category && state.selected?.category[0].toUpperCase()+state.selected?.category.slice(1).replace(/[-]/g, ' ')}<small>
                                        <h6 className="card-subtitle mb-2 text-muted mt-1">ID: {state.selected?.id}</h6>
                                    </small></h5>
                                    <p className="card-text"><strong>Street crimine</strong>: {state.selected?.location.street.name}  (street id:{state.selected?.location.street.id})<br/>

                                        <strong>Coordinate crimine</strong>: {state.selected?.location.latitude},{state.selected?.location.longitude}<br/>
                                        <strong>Data</strong>: {state.selected?.month}</p>
                                    <hr/>
                                    <p><strong>Outcome status</strong>: <br/>{
                                        state.selected?.outcome_status!==null ?
                                            state.selected?.outcome_status?.category :
                                            "niente"
                                    }
                                        <br/>date: {
                                            state.selected?.outcome_status!==null ?
                                                state.selected?.outcome_status?.date :
                                                "niente"
                                        } </p>





                                    <p className="card-text border-top"><small className="text-muted">Persistent id: {state.selected?.persistent_id}</small></p>
                                </div>
                            </div>

                            <div className="col-lg-4">

                                <div className={""}>

                                    <MapContainer
                                        center={state.selected!==undefined?  [state.selected.location.latitude, state.selected.location.longitude] : [0,0]}
                                        zoom={10}
                                        className={"cards"}

                                    >
                                        <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                                        <Marker
                                            position={state.selected!==undefined?  [state.selected.location.latitude, state.selected.location.longitude] : [0,0]}
                                            eventHandlers={
                                                {
                                                    mouseover: (event) => event.target.openPopup(),
                                                }

                                            }>
                                            <Popup className={"request-popup"}><b> {state.selected?.category && state.selected?.category[0].toUpperCase()+state.selected?.category.slice(1).replace(/[-]/g, ' ')}</b></Popup>
                                        </Marker>
                                    </MapContainer></div>

                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Statistiche