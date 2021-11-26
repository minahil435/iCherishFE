import React from "react";
import { Link } from "react-router-dom";

function BackgroundImagesDisplay(props) {
    return (

        <div className="HomeGridCube">
            <Link to={{ pathname: `/main/${props.category}` }}>
                <img
                    className="wallpaper"
                    src={props.item}
                    alt={props.item}
                />
            </Link>
        </div>
    )
}

export default BackgroundImagesDisplay;