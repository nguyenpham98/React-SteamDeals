import {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        let unmounted = false;
        axios.get(url, {
            cancelToken: source.token
        })
        .then(res => {
            if(!unmounted){
                setData(res.data);
                setIsLoading(false);
                setError(null);
            }
            
            
        })
        .catch(err => {
            if(!unmounted){
                setIsLoading(false);
                setError(err.message);
            }
            
        });
        return function () {
            unmounted=true;
            source.cancel();
        }    
        
    }, [url]);
    return {data, isLoading, error};
}

export default useFetch
