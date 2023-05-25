import { useEffect, useState } from "react";
import Chapters from "./Chapters";


const Manga = (props) => {

    const [manga, setManga] = useState('');

    useEffect(() => {    
        getManga(props.title)
    }, [])


    const getManga = async (title) => {
        if (!title)
            return;
        title = title;
        return fetch(`https://api.mangadex.org/manga?title=${title}`)
        .then(response => response.ok ? response.json() : null)
        .then(data => {
            let properManga = data.data.find(element => element.attributes.links.mal == props.id)
            setManga(properManga)
        })
    }
    
    
    return (
        <div>   
            {manga ? <Chapters id={manga.id} chapter={props.chapter ? props.chapter : 1} page={props.page} /> : null}
        </div>
    )
}
export default Manga;