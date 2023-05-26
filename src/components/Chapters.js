import { useEffect, useState } from "react"
import Pages from "./Pages"
import axios from "axios"


const Chapters = (props) => {

    
    const [chapters, setChapters]=useState([])

    useEffect(() => {
        getChapters(props.id)
    }, [])
    
    
    //4ee5e960-6329-4e1d-b038-93e8e0d53589
    const getChapters = async(chaptersId) => {
        return fetch(`https://api.mangadex.org/manga/${chaptersId}/feed?limit=500&&translatedLanguage[0]=en`)
        .then(response => response.ok ? response.json() : null)
        .then(data => {
            setChapters(data.data)
        })
    }


    return (
        <div>
            <div>
                {chapters[0] ? <Pages chapterList={chapters} chapter={props.chapter} /> : null}
            </div>
        </div>
    )
}
export default Chapters