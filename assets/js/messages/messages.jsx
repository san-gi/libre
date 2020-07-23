import { render } from 'react-dom'
import React, { useEffect } from 'react'
import { useFetch } from './hooks'

function Messages() {

    const { items: messages, load, loading } = useFetch('/api/messages')

    useEffect(() => {
        load()
    }, [])


    return <div>
        {loading && 'Chargement...'}
        {messages.map(m => <Message key={m.id} message={m} />)}

    </div>
}

function Message({ message }) {
    console.log(message)
    return <div className="row ">
        <h4 className="col-3">{message.author}</h4>
        <div>{message.content}</div>
        <div>{message.date}</div>
    </div>

}


class MessagesElement extends HTMLElement {

    connectedCallback() {
        render(<Messages />, this)
    }
}

customElements.define('post-messages', MessagesElement)