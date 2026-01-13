import React, {createContext, useReducer} from 'react';
import "./App.css"
import ContentPane from "./ContentPane";
import {State, Action, initialState, reducer} from "./State";



type AppContext = {
    state: State,
    dispatch: (_:Action) => void
}
export const StateContext = createContext<AppContext>(
    {
        state: initialState,
        dispatch: ()=>{}
    }
)

function App() {
    const [state,dispatch] = useReducer(reducer, initialState)
    return (
        <StateContext.Provider value={{state,dispatch}}>

            <ContentPane/>


        </StateContext.Provider>
    );
}

export default App;