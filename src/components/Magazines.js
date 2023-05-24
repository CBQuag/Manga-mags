import { useState, useEffect} from "react"
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Magazine from "./Magazine";

const Magazines = (props) => {

    const isLeaning = (num) => {
        let nums = `${`${(((Math.random() + 1) * Math.PI) / 10)}`.slice(2)}${`${(((Math.random() + 1) * Math.PI) / 10)}`.slice(2)}`.slice(num, num + 1)
        if (nums < 3)
            return -1
        if (nums > 6)
            return 1
        return 0;
    }
    isLeaning()

    const [mags, setMags] = useState([])
    const [pg, setPage]=useState(1)

    useEffect(() => {
        getMags(pg);
    }, [])

    const increment = () => {
        setPage(pg + 1);
        getMags(pg)
    }
    const decrement = () => {
        setPage(pg>1?pg - 1:pg);
        getMags(pg)
    }
    
    const getMags = (page) => {
        setTimeout(() => {
            return fetch(`https://api.jikan.moe/v4/magazines?page=${pg ? pg : 1}`)
            .then(response => response.ok ? response.json() : null)
                .then(data => {
                console.log(pg)
                setMags(data.data)
            })
            
        },700)
        
    }

    const shortenName = (name) => {
        if (name == name.substring(0, 15))
            return name;
        return `${name.substring(0,15)}...`
    }

    let style = 
        mags.map(mag => ({
            rotate:`${90+isLeaning(mag.mal_id)}deg`
        }))
    
    return (
        <div>
            
            <div className="magazine-control">
            <button onClick={()=>decrement()} className="left-mag">&#9664;</button>
                <div className="magazine-shelf">
                    
                    {mags[0] ? mags.map(mag => (
                        <div key={mag.mal_id} className="book-spine">
                            <div className="magazine-spine"  style={style[mags.indexOf(mag)]} key={mag.name}>
                                <NavLink className={({isActive}) => isActive ? "active-link" : "inactive-link"}
                                    key={mag.mal_id}
                                    to={`./magazine/${mag.mal_id}`}
                                >
                                    {shortenName(mag.name)}
                                </NavLink>
                            </div>
                        </div>
                    )) : null}   
                </div>
                <button onClick={()=>increment()} className="right-mag">&#9654;</button>
            </div>
            
            <div className="manga-area">
                
                {mags[0] ? mags.map(mag => (
                    <div key={mag.name}>
                        <Routes>
                            <Route
                                path={`magazine/${mag.mal_id}`}
                                element={<Magazine magazine={mag.mal_id} magazineTitle={mag.name} />}    
                            />
                        </Routes>
                    </div>
                )) : null}                      
            </div>
        </div>
    )
}
export default Magazines