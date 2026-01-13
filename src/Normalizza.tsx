import {CategoriaProps} from "./State";


function Normalizza(s:CategoriaProps){
    let nome = s.categoria
    return nome[0].toUpperCase()+nome.slice(1).replace(/[-]/g, ' ')
}

export default Normalizza