import React from "react";
import { Provider } from "react-redux";

import Routes from "./routes/Routes";
import Loading from "./components/loading/Loading";

import { store } from "./store/store";

import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Loading />

        <Routes />
      </Provider>
    </div>
  );
}

export default App;
