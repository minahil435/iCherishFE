import { useState } from "react";
import { isEmail, isStrongPassword } from "validator";

function useChangeInputConfig(inputType) {
    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [OnFocus, setOnFocus] = useState(false);

    function onChange(e) {
        let value = e.target.value;
        setValue(value);
        checkInput(value);
    }
    
    function handleInputOnFocus() {
        setOnFocus(true)
    };

    //here you can use other validation to check for correct input from user
    function checkInput(value) {
        if (value.length === 0) {
            setIsError(true);
            setErrorMessage(`${inputType} is required`);
            setIsDisabled(true);
        }
        else if (inputType === "email") {
            if (!isEmail(value)) {
                console.log()
                setIsError(true);
                setErrorMessage(`Not a correct email format`);
                setIsDisabled(true);
            }
            else {
                setIsError(false);
                setErrorMessage(``);
                setIsDisabled(false);
            }
        }
        else if (inputType === "password") {
            if (!isStrongPassword(value)) {
                setIsError(true);
                setErrorMessage("Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long");
                setIsDisabled(true);
            }
            else {
                setIsError(false);
                setErrorMessage(``);
                setIsDisabled(false);
            }
        }
        else {
            setIsError(false);
            setErrorMessage(``);
            setIsDisabled(false);
        }
    }

    return [value, onChange, isError, errorMessage, isDisabled, OnFocus, handleInputOnFocus]
}

export default useChangeInputConfig;
