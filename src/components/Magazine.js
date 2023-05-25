import { useEffect, useState } from "react"
import Manga from "./Manga";


const Magazine = (props) => {
    let baseUrl='https://api.jikan.moe/v4/manga?magazine='
    let limit = 3;

    const [manga, setManga] = useState([]);
    const [pageLimit, limitPages] = useState(0);
    const [pag, setPage]=useState(0)
    
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
                console.log(data.data.map(d=>(d.title)))
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

    const decrement = () => {
        setPage(pag>2?pag-2:pag)
    }
    const increment = () => {
        setPage(pag+2)
    }

    document.addEventListener('keydown',(e)=>{
        if (e.key == 'ArrowLeft') 
            decrement()
        if (e.key == 'ArrowRight')
            increment()
        console.log(pag)
    })

    return (
        
        <div className="magazine-content"> 
            <h1>{props.magazineTitle}</h1>
            <div className="inner-mag">
                <button onClick={()=>decrement()} className="left-mag">&#9664;</button>
                <div className="pages">
                    {manga.map(mang => (
                        <div key={mang.title}>
                            {mang.title ? <Manga title={mang.title} id={mang.mal_id} page={pag} /> : null}
                        </div>
                    ))}
                </div> 
                <button onClick={()=>increment()} className="right-mag">&#9654;</button>    
            </div>
               
        </div>
    )
}
export default Magazine