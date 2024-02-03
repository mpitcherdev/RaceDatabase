import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import './App.css';


const App = () => {
    return (
        <body>
            <div className="desktop">
                <Navbar />
                <p className="txt-title">Turn 1<br></br><br></br><br></br>Database</p>
                <Routes>
                    <Route className="track-name" exact path="/" element={<RecordList />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
        </body>
    );
};

export default App;