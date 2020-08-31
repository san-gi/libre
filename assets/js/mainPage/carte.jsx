import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef, useCallback, Component } from 'react'
import io from 'socket.io-client';
import { useChapitreFetch } from '../messages/hooks'



function Test({ num }) {

    const { items: chapter, setItems: setChapter, load, loading } = useChapitreFetch('/api/chapitres/' + num)

    useEffect(() => {

        load()

    }, [num])
    return (
        <div className="cardChapter " >

            <div className="container h-100 w-50">
                <div className="chapitreGran " id={"chapter-" + num}>
                    <h1> {chapter.titre}</h1>
                    <img className="img-fluid" src={"img/" + chapter.couverture} />
                    {<Content data={chapter.content} />}


                </div>
            </div>
        </div>
    )
}

function Content({ data }) {
    const data_content = data;
    const content = typeof data_content === "string" ? data_content.split("#") : "";
    let rendue = "<div>";
    for (let i = 0; i < content.length; i++) {
        if (content[i][0] == "v")
            rendue += '<video src=vid/' + content[i].split("-")[1] + '>sorry, le chargement de la vidéo a échouer</video>'
        else if (content[i][0] == "i")
            rendue += '<img class="img-fluid pt-3 pb-3" src=img/' + content[i].split("-")[1] + ">sorry, le chargement de l'image a échouer</img>"
        else
            rendue += "<p class='text-justify '>" + content[i] + "</p>"
    }
    rendue += "</div>"


    return (
        <div dangerouslySetInnerHTML={{ __html: rendue }} />
    )
}

function Cartes({ num }) {
    const { items: chapter, setItems: setChapter, load, loading } = useChapitreFetch('/api/chapitres/' + num)

    let vue = false
    function handleClick(e) {
        if (!vue) {
            vue = true
            const Chapitresbas = <div><div dangerouslySetInnerHTML={{ __html: $("#ChapitresBas").html() }} /><Test num={num} /></div>

            ReactDOM.render(Chapitresbas, document.querySelector('#ChapitresBas'))
        }
        document.getElementById("chapter-"+num).scrollIntoView({ behavior: 'smooth' })
    }



    return (
        <div className="customcart" onClick={handleClick}>

        </div>
    )
}


export class CarteHTML extends HTMLElement {
    connectedCallback() {
        const numbercarte = (this.dataset.numberchap)

        render(<Cartes num={numbercarte} />, this)
    }
}

class ImgFond extends Component {
    render() {
        return (
            <div className="headimagediv" >
                <img className="headblog" src="img/nuage.jpg" alt="beautifull" />
            </div>
        )
    }
}

customElements.define('post-p', CarteHTML)
export class Blog extends HTMLElement {
    connectedCallback() {

        render(<ImgFond />, this)
    }
}
customElements.define('post-m', Blog)



