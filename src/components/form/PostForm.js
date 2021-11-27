import React, { useState, useEffect, useRef, useContext} from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { AuthContext } from "../../context/AuthContext";
import Axios from "../../utils/Axios"
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';


const PostForm = (props) => {
    const {
        state: { user }
    } = useContext(AuthContext);

    const [address, setAddress] = React.useState("");
    const [postData, setPostData] = useState({ creatorName: '', creatorEmail: '', category: '', title: '', message: '', location: '', memoryImage: '' });
    const [errorTitle, setErrorTitle] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [errorLocation, setErrorTitleLocation] = React.useState("")
    const [errorSelectedFile, setErrorSelectedFile] = React.useState("")
    const classes = useStyles();
    const ref = useRef();

    const clear = () => {
        setPostData({ creatorName: '', creatorEmail: '', category: '', title: '', message: '', location: '', memoryImage: '' });
        ref.current.value = ""
        setAddress("")

    };

    const handleSelect = async value => {
        setAddress(value);
        setPostData({ ...postData, location: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (postData.title.length === 0) {
            setErrorTitle("Title can not be empty")
            return
        }
        else {
            setErrorTitle("")
        }
        if (postData.message.length === 0) {
            setErrorMessage("Message can not be empty")
            return
        }
        else {
            setErrorMessage("")
        }
        if (address.length === 0) {
            setErrorTitleLocation("Location can not be empty")
        }
        else {
            setErrorTitleLocation("")
        }

        if (postData.memoryImage.length === 0) {
            setErrorSelectedFile("Upload picture")
            return
        }
        else {
            setErrorSelectedFile("")
        }

        try {
            const formData = new FormData();
            formData.append("location", postData.location);
            formData.append("creatorName", user.creatorName);
            formData.append("creatorEmail", user.email);
            formData.append("category", props.category);
            formData.append("title", postData.title);
            formData.append("message", postData.message);
            formData.append("memoryImage", postData.memoryImage);

            let success = await Axios.post("/api/memories/save-Post", formData);
            let object = success.data
            props.AddPostButtonPressed(object)
            clear();

        } catch (e) {
            console.log("failed");
        }

    };
    
    return (
        <Box
            sx={{
              
                    width: 400,
                    height: 450,
                  
                
            }}
        >
        <Paper className={classes.paper} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{'Share An Experience'}</Typography>
                <div style={{ width: "95%" }}>
                    <TextField
                        required
                        error={errorTitle}
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={postData.title}
                        helperText={errorTitle}
                        id={errorTitle ? "outlined-error" : ""}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                </div>

                <div style={{ width: "95%" }}>
                    <TextField
                        required
                        error={errorMessage}
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        multiline
                        rows={3}
                        value={postData.message}
                        helperText={errorMessage}
                        id={errorMessage ? "outlined-error" : ""}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                </div>

                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect} >

                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{ width: "95%" }}>
                            <TextField
                                {...getInputProps()}
                                required
                                error={errorLocation}
                                name="location"
                                variant="outlined"
                                label="Location"
                                fullWidth
                                value={address}
                                helperText={errorLocation}
                                id={errorLocation ? "outlined-error" : ""} />
                            <div>
                                {loading ? <div>...loading</div> : null}
                                {suggestions.map(suggestion => {
                                    const style = {
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    };

                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                <div className={classes.fileInput} style={{ color: errorSelectedFile ? 'red' : 'black' }}>
                    <input type="file"
                        required
                        ref={ref}
                        onChange={(e) => setPostData({ ...postData, memoryImage: e.target.files[0] })} /> 
                </div>
                    {/* {errorSelectedFile} */}
                <Button
                    className={classes.buttonSubmit}
                    variant="contained" color="primary"
                    size="large"
                    type="submit" o
                    nClick={handleSubmit}
                    fullWidth>
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth>
                    Clear
                </Button>
            </form>
         </Paper>
        </Box>
    );
};

export default PostForm;