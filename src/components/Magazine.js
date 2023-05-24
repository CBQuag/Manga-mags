import { useEffect, useState } from "react"
import Manga from "./Manga";


const Magazine = (props) => {
    let baseUrl='https://api.jikan.moe/v4/manga?magazine='
    let limit = 3;

    const [manga, setManga] = useState([]);
    const [pageLimit, limitPages] = useState(0);
    
    useEffect(() => {
        getMangas(props.magazine);
    }, [])

    const getMangas = (magazine, page) => {
        

        setTimeout(() => {
            return fetch(`${baseUrl}${magazine ? magazine : 1}
            &order_by=popularity
            ${page ? `&page=${page}` : null}
            ${limit?`&limit=${limit}`:null}`)  
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setManga(data.data)
                limitPages(data.pagination.last_visible_page)
            })
        }, 1000)
    }

    const buildList = async (magazine) => {
        if (!pageLimit)
            return;

        for (let x = 0; x < pageLimit; x++){
            await getMangas(magazine, x);
        }
    }

    return (
        
        <div> 
            <div>
                {manga.map(mang => (
                    <div key={mang.title}>
                        <h3 key={mang.title}>{mang.title}</h3>
                        {mang.title ? <Manga title={mang.title} id={mang.mal_id} /> : null}
                    </div>
                    ))}
            </div>     
        </div>
    )
}
export default Magazine