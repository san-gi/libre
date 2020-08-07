import { render } from 'react-dom'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useMessagesFetch, useFetch } from './hooks'



const VIEW = 'VIEW'
const EDIT = 'EDIT'

function Messages({ message, user }) {
    const { items: messages, setItems: setMessages, load, loading } = useMessagesFetch('/api/messages')
    const addMessage = useCallback(message => {
        setMessages(messages => [message, ...messages])
    }, [])
    const deleteMessage = useCallback(message => {
        setMessages(messages => messages.filter(m => m != message))
    }, [])
    const updateMessage = useCallback((newMessage, oldMessage) => {
        setMessages(messages => messages.map(m => m == oldMessage ? newMessage : m))
    }, [])
   



    useEffect(() => {
        load()
    }, [])
    return <div>

        {loading && 'Chargement...'}
        {messages.map(m => <Message key={m.id}
            message={m}
            canEdit={m.author.id == user}
            onDelete={deleteMessage}
            onUpdate={updateMessage} />)}

        {user && <MessagesForm onMessage={addMessage} />}

    </div>
}

const MessagesForm = React.memo(({ onMessage, message = null }) => {

    const ref = useRef(null)

    const onSucess = useCallback(message => {
        onMessage(message)
        ref.current.value = ''
    }, [ref, onMessage])
   
    const method = message ? 'PUT' : 'POST'
    const url = message ? message['@id'] : '/api/messages'
    const { load, loading } = useFetch(url, method, onSucess)
    
    const onSubmit = useCallback(e => {
        console.log('submit')
        e.preventDefault()
        load({
            content: ref.current.value,
        })
    }, [load, ref])


    useEffect(() => {
        if(message && message.content && ref.current){
            ref.current.value = message.content
            console.log(message.content)
        }
    }, [message,ref])
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
const Message = React.memo(({ message, onDelete, canEdit, onUpdate }) => {
    const [state, setState] = useState(VIEW)
    const edit = useCallback(() => {
        setState(state => state == VIEW ? EDIT : VIEW)
    }, [])
    const date = new Date(message.date)
    const onDeleteCallback = useCallback(() => {
        onDelete(message)
    }, [message])

    const onMessage = useCallback((newMessage) => {
            onUpdate(newMessage,message)
        },[message])
    const { loading: loadingDelete, load: callDelete } = useFetch(message['@id'], 'DELETE', onDeleteCallback)
    return <div className="row ">
        <h4 className="col-sm-3">{message.author.username}</h4>
        {state == VIEW ?
            <div>{message.content}</div> :
            <MessagesForm message={message} onMessage={onMessage} />
        }
        {canEdit &&
            <p>
                <button className="btn btn-danger" onClick={callDelete.bind(this, null)} disabled={loadingDelete}>supprimer</button>
                <button className="btn btn-secondary" onClick={edit} disabled={loadingDelete}>edit</button>
            </p>
        }
        <strong>{date.toLocaleString()}</strong>
    </div>

})


class MessagesElement extends HTMLElement {

    connectedCallback() {
        const user = parseInt(this.dataset.user, 10)
        render(<Messages user={user} />, this)
    }
}

customElements.define('post-messages', MessagesElement)