import {MapContainer, TileLayer} from "react-leaflet";
import LocationMarker from "./LocationMarker";
import React, {useContext, useEffect} from "react";
import {StateContext} from "./App";
import {setYear, setMonth, initialState, CrimeProps, CategoriaProps, setCategorie} from "./State";
import Loading from "./LoadingPane";
import ErrorPane from "./ErrorPane";




function Alert() {
    return (
        <div className="alert alertx alert-warning alert-dismissible fade show " role="alert">
            <strong>Click on the map</strong> to see crimes in the area
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
function Normalizza_singolo(s:string){
    let nome = s
    return nome[0].toUpperCase()+nome.slice(1).replace(/[-]/g, ' ')
}
function lista ( crime: CrimeProps ) : CategoriaProps {
    return {
        categoria: crime.category,
        numero:1
    }
}
function Conto(x: CategoriaProps[]) {
    let lista: CategoriaProps[] = [];

    for (let str of x as CategoriaProps[]) {
        if (!lista.map(c => c.categoria).includes(str.categoria)){
            lista = [...lista, str ]
        }
        else{
            lista.forEach(c => {if (c.categoria.includes(str.categoria)) c.numero = c.numero + 1} );
        }
    }


    return lista.sort((a,b) => b.numero - a.numero );
}



/*function HomePageContent(){
    const {state,dispatch} = useContext(StateContext)
    let categorie = state.crime.map(c => lista(c))
    let conteggio: CategoriaProps[] = Conto(categorie)
    useEffect( () => {dispatch(setCategorie(conteggio))},[conteggio, state.crime,dispatch] )*/  //non andava bene perchè creava un mega loop

function HomePageContent() {
    const { state, dispatch } = useContext(StateContext);

    useEffect(() => {
        // Calcolo delle categorie solo quando cambia state.crime
        const categorie = state.crime.map(c => lista(c));
        const conteggio: CategoriaProps[] = Conto(categorie);

        // Aggiorna lo stato globale
        dispatch(setCategorie(conteggio));
    }, [state.crime, dispatch]);












    return( <div>
            {
                state.coordinate===initialState.coordinate ? <div className="col-md-7 col-10 z-1 position-absolute mtop mt-lg-0 ">
                    <Alert></Alert>
                </div> : ""
            }


            <div className={"d-flex flex-lg-row flex-wrap flex-column-reverse "}>
                <div className={"col-lg-8 col-12 mapz"}>
                    <MapContainer
                        center={state.coordinate} //coppia di coordinate in cui centrare la mappa inizialmente
                        zoom={6}>
                        <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                        <LocationMarker/>
                    </MapContainer>
                </div>




                <div className=" d-lg-none accordion-item col accordion-borderless ">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button bg-white accordion-borderless" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                            Select Year and Month
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse show"
                         aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">


                            <div className={"col-lg col-12 mx-auto px-5 pt-lg-3 py-2"}>

                                <h5>Select year and month</h5>
                                <select className="form-select" aria-label="Default select example" onChange={e =>dispatch(setYear(e.target.value))}>
                                    <option selected>2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                                <select className="form-select" aria-label="Default select example" onChange={e=>dispatch(setMonth(e.target.value))}>
                                    <option selected>January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>

                                <div>{ (state.coordinate===initialState.coordinate || state.loading || state.error) ? ""
                                    : (state.crime.length!==0)?
                                        <div className="alert alert-secondary mt-4 rad m-3 " role="alert">



                                            <div className=" " id="accordionExample">
                                                <div className="accordion-item alert-secondary accordion-borderless">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button alert-secondary" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                                aria-expanded="true" aria-controls="collapseOne">
                                                            <strong>{state.crime.length}</strong>&nbsp; crimes in the area
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show"
                                                         aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <table className="table table-borderless"  >
                                                                <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>{state.categorie[0] && Normalizza_singolo(state.categorie[0].categoria)}</td>
                                                                    <td><strong>{state.categorie[0]?.numero}</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{state.categorie[1] && Normalizza_singolo(state.categorie[1].categoria)}</td>
                                                                    <td><strong>{state.categorie[1]?.numero}</strong></td>
                                                                </tr>
                                                                {(state.crime.length > 2) ?
                                                                    <tr>
                                                                        <td className={"text-muted nav-link" }>All other crime</td>
                                                                        <td><strong>{state.crime && state.crime.length-(state.categorie[1]?.numero + state.categorie[0]?.numero)}</strong></td>
                                                                    </tr> : ""
                                                                }

                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    </div>
                                                </div></div>


                                        </div>



                                        : <div className="alert alert-info mt-4 rad m-3 " role="alert">
                                            No crimes in the selected area
                                        </div>}</div>
                                <div> {state.loading && <Loading></Loading>} </div>
                                <div> {!state.loading && state.error && <ErrorPane/>} </div>


                            </div>
                        </div>
                    </div>
                </div>









                <div className={" d-none d-lg-block  col-lg col-12 mx-auto px-5 pt-lg-3 py-2"}>

                    <h5>Select year and month to analyze</h5>
                    <select className="form-select" aria-label="Default select example" onChange={e =>dispatch(setYear(e.target.value))}>
                        <option selected>2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                    <select className="form-select" aria-label="Default select example" onChange={e=>dispatch(setMonth(e.target.value))}>
                        <option selected>January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <div>{ (state.coordinate===initialState.coordinate || state.loading || state.error) ? ""
                        : (state.crime.length!==0)?
                            <div className="alert alert-secondary mt-4 rad m-3 " role="alert">



                                <div className=" " id="accordionExample">
                                    <div className="accordion-item alert-secondary accordion-borderless">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button alert-secondary" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                    aria-expanded="true" aria-controls="collapseOne">
                                                <strong>{state.crime.length}</strong>&nbsp; crimes in the selected area
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show"
                                             aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <table className="table table-borderless"  >
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>{state.categorie[0] && Normalizza_singolo(state.categorie[0].categoria)}</td>
                                                        <td><strong>{state.categorie[0]?.numero}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{state.categorie[1] && Normalizza_singolo(state.categorie[1].categoria)}</td>
                                                        <td><strong>{state.categorie[1]?.numero}</strong></td>
                                                    </tr>
                                                    {(state.crime.length > 2) ?
                                                        <tr>
                                                            <td className={"text-muted nav-link" }>All other crime</td>
                                                            <td><strong>{state.crime && state.crime.length-(state.categorie[1]?.numero + state.categorie[0]?.numero)}</strong></td>
                                                        </tr> : ""
                                                    }

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div></div>


                            </div>



                            : <div className="alert alert-info mt-4 rad m-3 " role="alert">
                                No crimes in the selected area
                            </div>}</div>
                    <div> {state.loading && <Loading></Loading>} </div>
                    <div> {!state.loading && state.error && <ErrorPane/>} </div>


                </div>






            </div>
        </div>
    )
}
export default HomePageContent