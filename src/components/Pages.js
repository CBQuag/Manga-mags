import React, { useEffect, useState } from "react"



const Pages = (props) => {
    const imgBaseUrl = "https://uploads.mangadex.org/";
    const baseUrl    = "https://api.mangadex.org/at-home/"

    useEffect(() => {
        let currentChapter;
        props.chapterList.forEach(chapt => {
            if (chapt.attributes.chapter == props.chapter)
                currentChapter = chapt;
        })
        getPics(currentChapter.id);
    }, [])

    const [pics, setPics] = useState([]);
    const [chapterData, setCData] = useState('');
    

    //7135e626-11e7-4de2-a102-9b139a90bee4
    const getPics = async (chap) => {
        return fetch(`${baseUrl}/server/${chap}`)
        .then(response=> response.ok ? response.json() : null)
        .then(data => {
            setPics(data.chapter.data)
            setCData(data)
        })
    }
    
    
    return (
        <div>
            {console.log()}
            <div>
                {pics.map(pic =>
                (<img className='manga-page' key={pic}
                    src={`${imgBaseUrl}data/${chapterData.chapter.hash}/${pic}`}
                    alt='chapter page'
                />))}
            </div>    
        </div>
    )
}
export default Pages