import React, { useEffect } from "react";
import "./home.css";
import { AuthContext } from "../../context/AuthContext";

function Home(props) {


    const travelImages = [
        "/images/cover.jpg",
        "/images/cover1.jpg",
        "/images/cover2.jpg",
       
        "/images/cover4.jpg",
        "/images/travelmain.jpeg",
        "/images/cover1.jpg",


        "/images/cover4.jpg",
        "/images/cover.jpg",
        "/images/cover1.jpg",
        "/images/cover2.jpg",
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

                    {/* {travelImages.map((item, index) => {
                        return <BackgroundImagesDisplay
                            key={item.id}
                            item={item}
                            index={index}
                            searchModeOn={searchModeOn}
                        />
                    })
                    } */}



                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
                    

                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
                  

                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
                    <div className="HomeGridCube"></div>
             


                </div>
            </div>

            <div className="HomeGrid">
                <div className="HomeGridInner">

                </div>
            </div>



        </div>


    );

}
export default Home;