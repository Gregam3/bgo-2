import React from "react";
import "./Card.css";

function Card({title, description, imagePath}) {
    return (
        <div className="card">
            <h2 className={"title"}>{title}</h2>
            <img src={imagePath} alt={""}/>
            <p>{description}</p>
        </div>
    );
}

export default Card;