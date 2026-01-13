import {LatLng} from "leaflet";

export interface State {
    loading: boolean,
    error?: Error,
    crime: CrimeProps[]
    coordinate: LatLng
    selected?: CrimeProps
    year: string
    month: string
    categorie: CategoriaProps[]
}

export interface OutcomeStatusProps {
    category: string
    date: string
}

export interface CategoriaProps {
    categoria: string
    numero: number
}


export const initialState: State = {
    loading: false,
    crime: [],
    categorie: [],
    coordinate : new LatLng(52.629729,-1.131592),
    selected: undefined,
    year: "2023",
    month: "01",

}
export interface StreetProps {
    "id": number,
    "name": string
}

export interface LocationProps {
    "latitude": number,
    "street": StreetProps,
    "longitude": number
}

export interface CrimeProps {
    "category": string,
    "location_type": string,
    "location": LocationProps,
    "context"?: string,
    "outcome_status"?: OutcomeStatusProps,
    "persistent_id": string,
    "id": number,
    "location_subtype": string,
    "month": string
}


export type Action =
    | {type: "setError", error: Error}
    | {type: "setCrime", crimes: CrimeProps[]}
    | {type: "setCoordinate",coordinate: LatLng}
    | {type: "setSelect", crime: CrimeProps}
    | {type: "setYear", year: string}
    | {type: "setMonth", month: string}
    | {type: "setCategorie", categorie: CategoriaProps[]}




export const setCoordinate = (coordinate: LatLng): Action => ({ type: "setCoordinate", coordinate})
export const setCrime = (crimes: CrimeProps[]): Action => ({ type: "setCrime", crimes})
export const setError = (error:Error): Action => ({type: "setError",error})
export const setSelect = (crime: CrimeProps) : Action => ({type: "setSelect",crime})
export const setYear = (year: string): Action => ({type:"setYear", year})
export const setMonth = (month: string): Action => ({type:"setMonth", month})
export const setCategorie = (categorie: CategoriaProps[]): Action => ({type:"setCategorie", categorie})



export function reducer(state: State, action: Action): State {
    switch (action.type) {

        case "setCoordinate":
            return {
                ...state,
                coordinate: action.coordinate,
                loading:true,
                error: undefined
            }

        case "setCrime" :
            return {
                ...state,
                crime: action.crimes,
                loading:false,
                error:undefined
            }
        case "setSelect":
            return {...state, selected: action.crime}

        case "setYear": return {...state,
            year: action.year
        }
        case "setMonth": return {...state,
            month: action.month
        }
        case "setCategorie": return {...state,
            categorie: action.categorie
        }
        case "setError": return { ...state,
            loading: false,
            error: action.error,
            crime: []
        }

    }
}
