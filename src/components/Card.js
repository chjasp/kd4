import React from "react";
import ButtonBar from "./ButtonBar";
import "./Card.css";

const Card = ( {id, handleChoice} ) => {
  return (
    <div className="card-wrapper">
      <p className="progress">Personalization: </p> 
      <img className="pic-front" src={`./shoes/${id}.jpg`} />
      <ButtonBar id={id} handleChoice={handleChoice} />
    </div>
  );
};

export default Card;
