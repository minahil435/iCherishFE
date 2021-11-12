import React, { useEffect } from "react";
import "./home.css";
import { AuthContext } from "../../context/AuthContext";
import BackgroundImagesDisplay from "./BackgroundImagesDisplay"

function Home(props) {


    const travelImages = [
        "/images/travel.jpeg",
        "/images/travel2.jpeg",
        "/images/travel3.jpeg",
       
        "/images/travel4.jpeg",
        "/images/travelmain.jpeg",
        "/images/travel5.jpeg",


        "/images/travel6.jpeg",
        "/images/travel7.jpeg",
        "/images/travel8.jpeg",

    ];
    const foodImages = [
        "/images/food.jpeg",
        "/images/food2.jpeg",
        "/images/food3.webp",

        "/images/food4.jpeg",
        "/images/foodmain.jpeg",
        "/images/food5.jpeg",


        "/images/food6.jpeg",
        "/images/food7.jpeg",
        "/images/food8.jpeg",

    ];



    useEffect(() => {
        // if (user !== null) {
        //     // props.history.push("/");
        // }
    }, [])

    return (
        <div className="MainHomeGrid">

            <div className="HomeGrid">
                <div className="HomeGridInner">

                    {travelImages.map((item, index) => {
                        return <BackgroundImagesDisplay
                            key={item.id}
                            item={item}
                            index={index}
                        />
                    })}
                </div>
            </div>

            <div className="HomeGrid">
                <div className="HomeGridInner">
                    {foodImages.map((item, index) => {
                        return <BackgroundImagesDisplay
                            key={item.id}
                            item={item}
                            index={index}
                        />
                    })}
                </div>
            </div>



        </div>


    );

}
export default Home;