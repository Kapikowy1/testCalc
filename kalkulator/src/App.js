import React, { useReducer } from "react";

// Definicja reducer
// Reducer to funkcja, która zarządza stanem na podstawie akcji (action). 
// Zawsze zwraca nowy obiekt stanu na podstawie obecnego stanu (state) i akcji (action).
const counterReducer = (state, action) => {
  // `state` to obecny stan komponentu.
  // Reducera używamy, gdy mamy wiele powiązanych fragmentów stanu, które dotyczą wspólnej logiki. 
  

  
  // tu mamy zwykły switch case
  switch (action.type) {
    case "ADD":
      // Przykład dodawania wartości do obecnego stanu
      return {
        ...state, // Zawsze kopiujemy obecny stan, aby zachować inne wartości w stanie.
        count: state.count + action.payload, // Modyfikujemy tylko to, co potrzebujemy. ( tutaj to to samo jakby co state=state, state.count= state.count+action.payload)
      };
    case "MULTIPLY":
      // Przykład mnożenia wartości w stanie
      return {
        ...state,
        count: state.count * action.payload,
      };
    default:
      // Zawsze zwracamy stan bez zmian, jeśli typ akcji nie jest obsługiwany, przydatne ponieważ czasami będzie przerenderowywać cały stan, a nie zawsze wywoływać akcje, wtedy utracilibyśmy po prostu dane których nie chcemy
      return state;
  }
};

function App() {
  // Inicjalizacja useReducer
  // `useReducer` zwraca tablicę: [stan, funkcję dispatch].
  // Stan (`state`) to obecny stan komponentu, a `dispatch` pozwala wysyłać akcje do reduktora.
  const [state, dispatch] = useReducer(counterReducer, { count: 0 , countMultiplier:2}); // Inicjalizujemy stan z wartością `count: 0`, każdy kolejną zmienną możemy tutaj dorzucać tym sposobem zamiast pisać 10000 useState, useState,useState

  console.log(state)

  // Funkcja pomocnicza, aby wysyłanie akcji było czytelniejsze.
  const dispatchAdd = () => {
    dispatch({
      type: "ADD", // Typ akcji: "ADD".
      payload: 1,  // Dodatkowe dane, które będą wykorzystane w reducerze.
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Kalkulator</h1>
      <h2>Wynik: {state.count}</h2>
      
      <div>
        {/* Guzik, który wysyła akcję `ADD` */}
        <button
          onClick={dispatchAdd}
          style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
        >
          Dodaj 1
        </button>

        {/* Guzik, który wysyła akcję `MULTIPLY` */}
        <button
          onClick={() => dispatch({ type: "MULTIPLY", payload: 2 })}
          style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
        >
          Pomnóż przez 2
        </button>
      </div>
    </div>
  );
}

export default App;
