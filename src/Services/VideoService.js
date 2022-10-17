import axios from 'axios';
export const getVideoDataServices = async = (pageNumber) => {
    let url = `http://wisdomapp.in/api/v1/content/?page=${pageNumber}&limit=10`
    console.log(url, '--url')
    return axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}