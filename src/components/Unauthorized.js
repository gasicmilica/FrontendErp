import { useNavigate } from "react-router-dom"
import React from "react";
import './GotovProizvod.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div>
            <hr/>
            <h1>Unauthorized</h1>
            <hr/>
            <br/>
            <br/>
            <div className="centeredDiv">
             <h6>
                Nemate pristup ovoj stranici!
             </h6>
            </div>
            <br/>
            <br/>
            <div className="centeredDiv">
                <button className="btn" onClick={goBack}>Vrati se nazad</button>
            </div>
        </div>
    )
}

export default Unauthorized