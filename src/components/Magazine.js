import { useEffect, useState } from "react"
import Manga from "./Manga";
import PageContext from "./PageContext";


const Magazine = (props) => {
    let baseUrl='https://api.jikan.moe/v4/manga?magazine='
    let limit = 3;

    const [manga, setManga] = useState([]);
    const [pageLimit, limitPages] = useState(0);
    const [pag, setPage] = useState(0)
    
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') 
            decrement(2)
        if (e.key === 'ArrowRight')
            increment(2)
        // console.log(pag)
    }
    
    useEffect(() => {
        getMangas(props.magazine);
    }, [])
    

    const getMangas = (magazine, page) => {
        

        setTimeout(() => {
            let link=`${baseUrl}${magazine ? magazine : 1}&order_by=popularity${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
            console.log(link)
            
            return fetch(link)  
            .then(res => res.ok ? res.json() : null)
                .then(data => {
                console.log(data.data.map(d=>(d.title)))
                setManga(data.data)
                limitPages(data.pagination.last_visible_page)
            })
        }, 1000)
    }

    // const buildList = async (magazine) => {
    //     if (!pageLimit)
    //         return;

    //     for (let x = 0; x < pageLimit; x++){
    //         await getMangas(magazine, x);
    //     }
    // }

    const decrement = (adjust) => {
        setPage(pag>=adjust?pag-adjust:pag)
    }
    const increment = (adjust) => {
        setPage(pag+adjust)
    }

    

    return (
        <PageContext.Provider value={{pag, setPage, }}>
            <div onKeyDown={(e)=>handleKeyDown(e)} className="magazine-content"> 
                <h1>{props.magazineTitle}</h1>
                <button onClick={() => increment(1)} className="adjust-mag">adjust</button>
                <div className="inner-mag">
                    <button onClick={()=>decrement(2)} className="left-mag-p">&#9664;</button>
                    <div className="pages">
                        {manga.map(mang => (
                            <div key={mang.title}>
                                {mang.title ? <Manga title={mang.title} id={mang.mal_id}  /> : null}
                            </div>
                        ))}
                    </div> 
                    <button onClick={()=>increment(2)} className="right-mag-p">&#9654;</button>    
                </div>
                
            </div>
        </PageContext.Provider>
    )
}
export default Magazine