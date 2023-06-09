import React, { useContext, useEffect, useState } from "react"
import PageContext from "./PageContext";



const Pages = (props) => {
    const imgBaseUrl = "https://uploads.mangadex.org/";
    const baseUrl = "https://api.mangadex.org/at-home/"
    
    const {pag}=useContext(PageContext)

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


    let img = document.querySelectorAll('img')
    let style = [];
    let count = -1;
    if (img) {
        img.forEach(i => {            
            count++;
            pag==count?style.push(''):pag==count-1?style.push(''):style.push('display:none')
            i.setAttribute('class', `manga-page img${count}`)
            i.setAttribute('style', style[count])
            let aspect = i.naturalHeight / i.naturalWidth
            if (aspect > 1)
                return
            style.push('display:none')
            i.setAttribute('class', `wide img${count + 1}`)
            count++
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
                    loading='lazy'
                />))}
            </div>    
        </div>
    )
}
export default Pages