import React, { useEffect, useState, useContext } from "react";
import Axios from "../../utils/Axios"
import "./Main.css";
import Post from "./Post"
import PostForm from "../form/PostForm"
import { AuthContext } from "../../context/AuthContext";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Main(props) {

    const [PostArray, setPostArray] = useState([]);
    const [LikedPostArray, setLikedPostArray] = useState([]);
    const [value, setValue] = React.useState(0);
    const { state: { user } } = useContext(AuthContext);
    var categorySelected = props.match.params.category

    useEffect(() => {
        GetPostList();
    }, [categorySelected, value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function GetPostList() {
        try {
            let DataA = await Axios.get(`/api/user/getLikePostID?email=${user.email}`)
            setLikedPostArray(DataA.data)
            if (value === 0) {
                let Data = await Axios.get(`/api/memories/get-all-Posts?category=${categorySelected}`);
                setPostArray(Data.data)
            }
            if (value === 1) {
                let Data = await Axios.get(`/api/memories/get-all-favorite-posts?email=${user.email}`);
                let filteredPostArray = Data.data.filter((item) => {
                    return item.category === categorySelected
                });
                setPostArray(filteredPostArray)
            }
            if (value === 2) {
                let Data = await Axios.get(`/api/memories/get-all-user-posts?email=${user.email}&category=${categorySelected}`);
                setPostArray(Data.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
   
    function AddPostButtonPressed(item) {
        setPostArray([...PostArray, item])
    }

    async function DeletePostButtonPressed(itemID) {
        try {
            let postData = await Axios.delete(`/api/memories/delete-post-by-id/${itemID}`);
            let postIdToBeDeleted = postData.data.payload._id.toString()
            let filteredPostArray = PostArray.filter((item) => {
                return postIdToBeDeleted !== item._id
            });
            setPostArray(filteredPostArray)
        } catch (e) {
            console.log(e);
        }
    }

    return (

        <div id="mainPageDiv">
            {window.innerWidth <= "400" ? <div id="mainPageRightDiv">
                <PostForm
                    AddPostButtonPressed={AddPostButtonPressed}
                    category={categorySelected}
                />
            </div> : "" }

            <div id="Size">
                <Tabs value={value}
                    inkBarStyle={{ background: 'white' }}
                    onChange={handleChange}
                    aria-label="icon label tabs example"
                    centered
                    textColor="red"
                    sx={{ color: "white" }}
                    TabIndicatorProps={{ style: { background: '#6B2F02' } }}
                >
                    <Tab icon={<HomeIcon />} label="RECENTS" />
                    <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                    <Tab icon={<PersonPinIcon />} label="My POSTS" />
                </Tabs>

                {PostArray.length !== 0 ? (<div id="mainPageLeftDiv">
                    {PostArray.map((item, index) => {
                        return <Post
                            key={item.id}
                            item={item}
                            index={index}
                            DeletePostButtonPressed={DeletePostButtonPressed}
                            LikedPostArray={LikedPostArray}
                        />
                    })}
                </div>) : (<div id="mainPageLeftDiv">No Posts</div>)}
            </div>

            {window.innerWidth <= "400" ? "" : 
            <div id="mainPageRightDiv">
                <PostForm
                    AddPostButtonPressed={AddPostButtonPressed}
                    category={categorySelected}
                />
            </div>}
        </div>
    );
}
export default Main;