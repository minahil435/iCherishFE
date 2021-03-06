import React, { useContext, useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { TextField } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AuthContext } from "../../context/AuthContext";
import SendIcon from '@mui/icons-material/Send';
import Axios from "../../utils/Axios"
import { makeStyles } from "@material-ui/core/styles";

import "./Post.css";

const useStyles = makeStyles({
    root: {
        // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        //     borderColor: "orange"
        // },
        // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        //     borderColor: "orange"
        // },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5E3707"
        },
        // "& .MuiOutlinedInput-input": {
        //     color: "orange"
        // },
        // "&:hover .MuiOutlinedInput-input": {
        //     color: "orange"
        // },
        // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        //     color: "orange"
        // },
        // "& .MuiInputLabel-outlined": {
        //     color: "orange"
        // },
       
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#5E3707"
        }
    }
});
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {
    const classes = useStyles();
    const { state: { user }, dispatch } = useContext(AuthContext);
    const [alreadyFavourite, setAlreadyFavorite] = React.useState(isPostAlreadyFav());
    const [count, setCount] = React.useState(props.item.LikeCount);
    const [expanded, setExpanded] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [commentArray, setCommentArray] = useState(props.item.comments);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function isPostAlreadyFav() {
        return props.LikedPostArray.includes(props.item._id)
    }

    async function loveItemClicked() {
        if (isPostAlreadyFav()) { return }
        else {
            await Axios.post(`/api/memories/liked-post`,
                {
                    _id: props.item._id,
                    email: user.email
                });

            setAlreadyFavorite(true)
            setCount(count + 1)

            let updatedArray = [...user.postArray]
            updatedArray.push(props.item._id)
            console.log(updatedArray)

            dispatch({
                type: "Update",
                user: {
                    postArray: updatedArray
                },
            });
        }
    }

    async function sendComment() {
        if (comment === "") { return }
        else {
            let postComment = await Axios.post("/api/comment/save-comment",
                {
                    postId: props.item._id,
                    comment: comment,
                    creatorName: user.userName,
                    creatorImage: user.userImage
                });
            setCommentArray([postComment.data, ...commentArray])
            setComment("")
           
        }
    }
   

    return (
        <Card className="hvr-glow" sx={{ width: 320, border: 2, borderColor: '#5E3707', bgcolor: '#FFEEDC', height: expanded ? 630 : 400, }} style={{ }}>
            <CardHeader
                avatar={
                    <Avatar style={{
                        border: '2px solid white'}} src={process.env.REACT_APP_PICTURES + user.userImage} alt="user profile picture"/>
                }
                action={
                    (props.item.creatorEmail == user.email) ?
                        <IconButton  aria-label="settings" onClick={() => props.DeletePostButtonPressed(props.item._id)} >
                            <HighlightOffIcon sx={{ color: 'black' }} />
                        </IconButton> : ""
                }
                title={<div style={{ fontWeight: "bold"}}>{props.item.title}</div>}
                subheader={`${user.userName}`}
            />
            <CardMedia
                component="img"
                height="250"
                image={process.env.REACT_APP_PICTURES + props.item.memoryImage}
                alt={props.item.memoryImage}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={loveItemClicked}  >
                    <FavoriteIcon sx={{ color: alreadyFavourite ? "#970003" : "white" }}/>
                </IconButton>
                <Typography variant="caption" color="text.secondary">
                    {count}
                </Typography>
                <LocationOnIcon sx={{ color: 'black' }} />
                <Typography variant="caption" color="text.secondary"
                    style={{ wordWrap: "break-word" }}>
                    {props.item.location}
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon sx={{ color: 'black' }}  />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <CardContent>
                    <h1 id= "Experience"class= "bold">Experience:</h1>
                    <p class="paragraph">
                        {props.item.message}
                    </p>
                    <br />
                    <h1 class="bold">Reviews:</h1>

                    <div class="comment">
                        <div><img class="userImage" src={process.env.REACT_APP_PICTURES + user.userImage} alt={"userPicture"} /></div>
                        <div><TextField
                            name="comment"
                            variant="outlined"
                            label="Comment"
                            fullWidth
                            rows={1}
                            inputProps={{ maxLength: 25 }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} 
                            className={classes.root}/></div>
                           
                        <div><IconButton aria-label="add to favorites" onClick={sendComment}>
                            <SendIcon sx={{ color: 'black' }}/>
                        </IconButton></div>
                    </div>

                     <div id="div2" >
                        {commentArray.map((item) => {
                            return (
                                <div class="comment">
                                    <div><img class="userImage" src={process.env.REACT_APP_PICTURES + item.creatorImage} alt={"userPicture"} /></div>
                           <div> <TextField
                                id="outlined-read-only-input"
                                name="message"
                                variant="outlined"
                                fullWidth
                                label={item.creatorName}
                                rows={1}
                                inputProps={{ readOnly: true }}
                                value={item.comment}
                                        color="warning"
                                        focused
                                        className={classes.root}
                                        
                            /></div>
                        </div>)})}
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}