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
        
                <img className="" src={"img/" + chapter.couverture} />
         
            <div className="container h-100 ">
            <div className="chapitreGran" id={"chapter-" + num}>


                <h1> {chapter.titre}</h1>
                {chapter.content}
                </div>
            </div>
        </div>
    )
}

function Cartes({ num }) {
    const { items: chapter, setItems: setChapter, load, loading } = useChapitreFetch('/api/chapitres/' + num)

    function handleClick(e) {

        const Chapitresbas = <Test num={num} />

        ReactDOM.render(Chapitresbas, document.querySelector('#ChapitresBas'))

        document.getElementById("ChapitresBas").scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className="customcart" onClick={handleClick}>

        </div>
    )
}


export class CarteHTML extends HTMLElement {
    connectedCallback() {
        const numbercarte = (this.dataset.numberchap)
        console.log(numbercarte)
        render(<Cartes num={numbercarte} />, this)
    }
}

class ImgFond extends Component {
    render() {
        return (
            <div className="headimagediv" >
                <img className="headblog" src="img/path.jpg" alt="beautifull" />
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



