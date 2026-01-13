import React, {useContext} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,ArcElement,} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {StateContext} from "./App";
import {CategoriaProps} from "./State";
import Normalizza from "./Normalizza";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const options = {
    //indexAxis: 'y' as const,
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: "Crimes in the selected area",
        },
    },
};
export const options2 = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: "Crimes in the selected area",
        },
    },
};
export const options3 = {
    responsive: true,
    maintainAspectRatio: false ,

    plugins: {
        legend: {
            position: 'bottom' as const,
            align: "start" as const,
        },
        title: {
            display: true,
            text: "Percentage of crimes in the area",
        },
    },
};



function setTot( t : CategoriaProps[]){
    return t.map(n => n.numero).reduce((a, b) => a + b)
}
function Perc(tot: number,num: number) {
    return ((num/tot) * 100).toFixed(1);
}

function Grafico() {

    const {state} = useContext(StateContext)


    let totale = setTot(state.categorie)
    let percentuale = state.categorie.map( c => Perc(totale,c.numero))
    let labels = state.categorie.map(c => Normalizza(c))



    const data = {
        labels,
        datasets: [
            {
                label: 'Number of crimes',
                data: state.categorie.map( c => c.numero),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    };
    const data3 = {
        labels,
        datasets: [
            {
                label: "%",
                data: percentuale.map( c => c) ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className={""}>
            <div className={"d-none d-lg-block grafico "}>
                <Bar options={options} data={data} />
            </div>
            <div className={"d-lg-none mx-3 min-s "}>
                <Bar options={options2}  data={data} />
            </div>

            <div className={"container mt-2"}>

                <button className="btn btn-secondary justify-content-end" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                    Show more details
                </button>

                <div className="collapse" id="collapseExample">

                    <div className="card mb-3 container">
                        <div className="row g-0">

                            <div className="col-md-8">
                                <div className="card-body">


                                    <table className="table table-striped"  >
                                        <thead>
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Percentage</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            state.categorie.map( c => <tr>

                                                <td>{Normalizza(c)}</td>
                                                <td>{c.numero}</td>
                                                <td>{`${Perc(totale,c.numero)}%`}</td>
                                            </tr> )
                                        }

                                        </tbody>
                                    </table>


                                </div>
                            </div>
                            <div className="col-md-4 min-s">
                                <Pie data={data3} options={options3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
export default Grafico