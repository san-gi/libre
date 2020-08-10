import { render } from 'react-dom'
import React, { useState, useEffect, useRef, useCallback, Component } from 'react'
import io from 'socket.io-client';


class Chat extends Component {
    render() {
        return (
            <div className="corp">
              <p>salut</p>
            </div>
        )
    }
}


class mes extends HTMLElement {


    connectedCallback() {
        
        render(<Chat/>,this)
    }
}


export default Chat

customElements.define('post-m', mes)