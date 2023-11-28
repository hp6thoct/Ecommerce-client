import axios from "axios";

export function getProduct (){
    return axios.get('http://localhost:8080/products')
}

