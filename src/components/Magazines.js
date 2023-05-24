import { useState, useEffect} from "react"
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Magazine from "./Magazine";

const Magazines = (props) => {

    const [mags, setMags] = useState([])

    useEffect(() => {
        getMags(props.page);
    }, [])
    
    const getMags = (page) => {
        setTimeout(() => {
            return fetch(`https://api.jikan.moe/v4/magazines?page=${page ? page : 1}`)
            .then(response => response.ok ? response.json() : null)
            .then(data => {
                setMags(data.data)
            })
            
        },700)
        
    }
    
    return (
        <div>
            <h1>
                Magazines
            </h1>
            <div>
                {mags[0] ? mags.map(mag => (
                    <div key={mag.name}>
                        <Link
                            key={mag.mal_id}
                            to={`./magazine/${mag.mal_id}`}
                        >
                            {mag.name}
                        </Link>
                    </div>
                )) : null}
            </div>
            <div>
                {mags[0] ? mags.map(mag => (
                    <div key={mag.name}>
                        <Routes>
                            <Route
                                path={`magazine/${mag.mal_id}`}
                                element={<Magazine magazine={mag.mal_id} />}    
                            />
                        </Routes>
                    </div>
                )) : null}                      
            </div>
        </div>
    )
}
export default Magazines