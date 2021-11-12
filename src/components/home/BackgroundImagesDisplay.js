import React from "react";

function BackgroundImagesDisplay(props) {
    return (
        <div className="HomeGridCube">
            <img
                className= "wallpaper"
                src={props.item}
                alt={props.item}
            />
        </div>
    )
}

export default BackgroundImagesDisplay;