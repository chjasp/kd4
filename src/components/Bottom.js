import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { data } from "../data";
import "./Bottom.css";

const products = data;

const Bottom = ({ openMap, currentId, currentLikes, currentDislikes, currentSuperlikes }) => {
  const [bestFive, setBestFive] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [frontBack, setFrontBack] = useState(true);
  const [mode, setMode] = useState("bestFive");

  const showHistory = (passedMode) => {
    setMode(passedMode);
    setFilterActive(true);
    setFrontBack((front) => !front);
  };

  const closestFive = () => {
    setMode("bestFive");
    setFilterActive(true);
    setFrontBack((front) => !front);
    const currentshoe = products.filter(
      (product) => product.name == currentId
    )[0];
    let cleanProducts = products.filter((product) => product.name != currentId);

    let Idx = [];
    for (let i = 0; i < cleanProducts.length; i++) {
      let runningDist =
        (cleanProducts[i].x - currentshoe.x) ** 2 +
        (cleanProducts[i].y - currentshoe.y) ** 2;

      Idx.push({ distance: runningDist, name: cleanProducts[i].name });
    }

    var result = Array.from(Array(Idx.length).keys()).sort((a, b) =>
      Idx[a].distance < Idx[b].distance
        ? -1
        : (Idx[b].distance < Idx[a].distance) | 0
    );

    const tmpFive = [];
    for (let i = 0; i < 5; i++) {
      tmpFive.push(Idx[result[i]].name);
    }

    setBestFive(tmpFive);
    setFilterActive(true);
  };

  const renderSwitch = () => {
    switch (mode) {
      case "bestFive":
        return data.filter((shoe) => bestFive.includes(shoe.name));
      case "likes":
        let likeArray = data.filter((shoe) => currentLikes.includes(shoe.name));
        let superlikeArray = data.filter((shoe) => currentSuperlikes.includes(shoe.name)); 
        let allLikes = likeArray.concat(superlikeArray)
        return allLikes;
      case "dislikes":
        return data.filter((shoe) => currentDislikes.includes(shoe.name));
    }
  };

  let backbtnstyle = {
    display: `${frontBack ? "none" : "block"}`,
    width: "20%",
    fontWeight: "600",
    height: "1.7rem",
    marginRight: "0.6rem",
    marginLeft: "0.6rem",
    borderRadius: "0.8rem",
    background: "white",
    boxShadow: "rgb(47, 149, 193) 0px 7px 20px -8px",
    color: "rgb(47, 149, 193)",
    textAlign: "center",
    cursor: "pointer",
  };

  let personalization = Math.min(
    currentLikes.length * 2 + currentDislikes.length * 1 + currentSuperlikes.length*5,
    100
  );

  return (
    <div className="bottom-outer">
      <ReactCardFlip
        isFlipped={frontBack}
        flipDirection="horizontal"
        className="bottom-card"
        style={{ position: "relative", zIndex: "0 !important" }}
      >
        <div className="shoeshow">
          <button style={backbtnstyle} onClick={() => setFrontBack(!frontBack)}>
            BACK
          </button>
          {renderSwitch().map((shoe, idx) => {
            let indivStyle = {
              position: "relative",
              height: `${80}px`,
              marginRight: "10px",
              boxShadow: "rgba(50, 50, 93, 0.20) 0px 13px 23px -0px",
              width: `${80}px`,
            };
            return (
              <img
                className="pic"
                style={indivStyle}
                src={`./shoes/${shoe.name}.jpg`}
              />
            );
          })}
        </div>
        <div className="bottom-complete">
          <div className="progress-header">
            <p
              style={{
                background: `linear-gradient(90deg,rgba(252, 58, 129, 1) 0%,rgba(146, 171, 226, 1) ${
                  personalization * 1.3
                }%)`,
              }}
            >
              PERSONALIZATION
            </p>
          </div>
          <div className="bottom-button-wrapper">
            <div className="bottom-personal">
              <button
                className="bottom-likes"
                onClick={() => showHistory("likes")}
              >
                LIKES
              </button>
              <button
                className="bottom-dislikes"
                onClick={() => showHistory("dislikes")}
              >
                DISLIKES
              </button>
            </div>
            <div className="bottom-similar">
              <button className="ctrl-btn" onClick={() => closestFive()}>
                LIST SIMILAR
              </button>
              <button className="ctrl-btn" onClick={() => openMap(true)}>
                MAP SIMILAR
              </button>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Bottom;
