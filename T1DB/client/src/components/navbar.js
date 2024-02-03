import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <container>
            <nav className="navbar navbar-expand navbar-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <NavLink className="nav-link" to="/create">
                            <button type="button" class="btn btn-primary">
                                New Race
                            </button>
                        </NavLink>
                        <NavLink className="nav-link" to="/">
                            <button type="button" class="btn btn-primary">
                                My Data
                            </button>
                        </NavLink>                        
                    </ul>
                </div>
            </nav>
        </container>
    );
}