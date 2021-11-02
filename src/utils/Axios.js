import axios from "axios";
require("dotenv").config()

const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_FORM,
  timeout: 50000,
});

export default Axios;
