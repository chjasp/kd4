import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MdLocationPin } from "react-icons/md";
import Recommender from "./Recommender"
import { data } from "../data";
import "./Main.css";

const Main = ({ position, setPosition }) => {
  const [openMap, setOpenMap] = useState(false);

  let radarStyle = {
    position: "absolute",
    left: `${position[0]}px`,
    top: `${position[1]}px`,
  };

  let backbigstyle = {
    padding: "0.5rem",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "900",
    height: "1.7rem",
    marginTop: "0.3rem",
    bottom: "1.5rem",
    borderRadius: "0.8rem",
    background: "white",
    boxShadow: "rgb(47, 149, 193) 0px 7px 20px -8px",
    color: "rgb(47, 149, 193)",
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <div className="div-wrapper">
          <TransformWrapper
            initialScale={1}
            minScale={0.3}
            initialPositionX={-500}
            initialPositionY={-500}
            limitToBounds={false}
            className={`${openMap ? undefined : "hidden"}`}
          >
            <TransformComponent>
              <div className={`map fadein ${openMap ? undefined : "hidden"}`}>
                <a
                  class="intro-banner-vdo-play-btn pinkBg"
                  style={radarStyle}
                  target="_blank"
                >
                  <MdLocationPin className="radar-back" />
                  <i
                    class="glyphicon glyphicon-play whiteText"
                    aria-hidden="true"
                  ></i>
                  <span class="ripple pinkBg"></span>
                  <span class="ripple pinkBg"></span>
                  <span class="ripple pinkBg"></span>
                </a>
                {data.map((shoe, idx) => {
                  let indivStyle = {
                    position: "absolute",
                    height: "100px",
                    width: "100px",
                    left: `${shoe.x}px`,
                    top: `${shoe.y}px`,
                  };
                  return (
                    <img
                      className="pic"
                      style={indivStyle}
                      src={`./assets/main-app/shoes_small/${shoe.name}.jpg`}
                    />
                  );
                })}
              </div>
            </TransformComponent>
            <button className={`map-back-btn ${openMap ? undefined : "hidden"}`} style={backbigstyle} onClick={() => setOpenMap(false)}>
            BACK
          </button>
          </TransformWrapper>
        <Recommender position={position} setPosition={setPosition} openMap={openMap} setOpenMap={setOpenMap} />
    </div>
  );
};

export default Main;