// 封装axios
import axios from "axios";

var instance = axios.create({
    withCredentials: true
});

export default instance