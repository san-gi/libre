import { render } from 'react-dom'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useMessagesFetch, useFetch } from './hooks'
import io from 'socket.io-client';
 


const VIEW = 'VIEW'
const EDIT = 'EDIT'
let somsg = true
function Messages({ message, user }) {
    const socket = io('192.168.1.34:3005', { jsomp: false });
    const { items: messages, setItems: setMessages, load, loading } = useMessagesFetch('/api/messages')
    const addMessage = useCallback(message => {
        socket.emit("addMessage", message)
    }, [])
    const deleteMessage = useCallback(message => {
        socket.emit("deleteMessage", message.id)
    }, [])
    const updateMessage = useCallback((newMessage, oldMessage) => {
        // setMessages(messages => messages.map(m => m == oldMessage ? newMessage : m))
        socket.emit("updateMessage", newMessage)
    }, [])

    useEffect(() => {
        socket.on("addMessage", (msg) => {
            console.log(messages)
            setMessages(messages => [...messages, msg])
            document.getElementById("messageslist").scrollTop = document.getElementById("messageslist").scrollHeight;
        })
        socket.on("deleteMessage", (msg) => {

            setMessages(messages => messages.filter(m => m.id != msg))
            //document.getElementById("messageslist").scrollTop = document.getElementById("messageslist").scrollHeight;
        })
        socket.on("updateMessage", (msg) => {
            console.log(msg)
            setMessages(messages => messages.map(m => {
                if (m.id == msg.id)
                    m = msg
                return m
            }))
            //   document.getElementById("updateMessage").scrollTop = document.getElementById("messageslist").scrollHeight;
        })

        load()
      

    }, [])
    return <div className="h-100">
        <div className="h-75" id="messageslist">
            {loading && 'Chargement...'}

            {messages.map(m => <Message key={m.id}
                message={m}
                canEdit={m.author.id == user}
                onDelete={deleteMessage}
                onUpdate={updateMessage} />)}
        </div>
        {user ? <MessagesForm onMessage={addMessage} className="h-25" /> : <h4 className="font-weight-bold text-center">Vous devez être connecter pour participer au chat </h4>}

    </div>
}

const MessagesForm = React.memo(({ onMessage, message = null }) => {

    const ref = useRef(null)

    const onSucess = useCallback(message => {
        onMessage(message)
        ref.current.value = ' '
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

        if (message && message.content && ref.current) {
            ref.current.value = message.content

        }
    }, [message, ref])
    return <div className="well">
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Messages</legend>
            </fieldset>
            <div className="form-group">
                <input ref={ref} id="" className="form-control" ></input>
            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-sm" disabled={loading}>
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

        onUpdate(newMessage, message)
        edit()

    }, [message])
    const { loading: loadingDelete, load: callDelete } = useFetch(message['@id'], 'DELETE', onDeleteCallback)
    return <div className="p-3">
        <h4 className="col-sm-3 ">{message.author.username}</h4>
        {state == VIEW ?
            <div>{message.content}</div> :
            <MessagesForm message={message} onMessage={onMessage} />
        }
        {canEdit && state == VIEW &&
            <p >
                <button className="btn btn-danger btn-sm" onClick={callDelete.bind(this, null)} disabled={loadingDelete}>supprimer</button>
                <button className="btn btn-secondary btn-sm" onClick={edit} disabled={loadingDelete}>edit</button>
            </p>
        }
        <strong>{date.toLocaleString()}</strong>
    </div>

})


class MessagesElement extends HTMLElement {
    constructor(props) {
        super(props);

    }

    connectedCallback() {

        const user = parseInt(this.dataset.user, 10)
        console.log(this.dataset)
        render(<Messages user={user} />, this)
    }
}

customElements.define('post-messages', MessagesElement)