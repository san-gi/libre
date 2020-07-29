import { render } from 'react-dom'
import React, { useEffect, useRef, useCallback } from 'react'
import { useMessagesFetch, useFetch } from './hooks'

function Messages({ message, user }) {
    const { items: messages, load, loading } = useMessagesFetch('/api/messages')
    useEffect(() => {
        load()
    }, [])
    return <div>

        {loading && 'Chargement...'}
        {messages.map(m => <Message key={m.id} message={m} />)}

        {<MessagesForm />}

    </div>
}

const MessagesForm = React.memo(() => {
    const ref = useRef(null)
    const { load, loading } = useFetch('/api/messages', 'POST')
    const onSubmit = useCallback(e => {
        e.preventDefault()
        load({
            content: ref.current.value,
        })
    }, [load, ref])
    return <div className="well">
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Messages</legend>
            </fieldset>
            <div className="form-group">
                <textarea ref={ref} id="" cols="30" rows="10" className="form-control"></textarea>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" disabled={loading}>
                    Envoyer
                </button>
            </div>
        </form>
    </div>
})
const dateFormat = {
    dateStyle: 'medium',
    timeStyle: 'short'
}
const Message = React.memo(({ message }) => {
    const date = new Date(message.date)
    return <div className="row ">
        <h4 className="col-3">{message.author.username}</h4>
        <div>{message.content}</div>
        <strong>{date.toLocaleString()}</strong>
    </div>

})


class MessagesElement extends HTMLElement {

    connectedCallback() {
        render(<Messages />, this)
    }
}

customElements.define('post-messages', MessagesElement)