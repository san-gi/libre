import { render } from 'react-dom'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useMessagesFetch, useFetch } from '../messages/hooks'
import io from 'socket.io-client';

function Messages({ id }) {
    const chapitre = {
        titre: "chalut",
        couverture: "chalut",
        date: "2020-08-21T02:30:28.960Z",
        firstParag: "string",
        content: "string",
    }
    const onDeleteCallback = useCallback(() => {
        window.location.reload();
    }, [])
    const onSucess = useCallback(() => {
        window.location.reload();
    }, [])
    const onSubmit = useCallback(e => {

        e.preventDefault()
        load({
            titre: $("#ChapTitre" + id).val(),
            couverture: $("#ChapCouverture" + id).val(),
            date: "2020-08-21T02:30:28.960Z",
            firstParag: $("#ChapFirstParag" + id).val(),
            content: $("#ChapContent" + id).val(),
        })
    }, [load])

    const { load, loading } = useFetch('/api/chapitres/' + id, 'PUT', onSucess)
    const { loading: loadingDelete, load: callDelete } = useFetch('/api/chapitres/' + id, 'DELETE', onDeleteCallback)
    return <div className="h-100">
        <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal">
            close										</button>
        <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={callDelete.bind(this, null)}>
            Supprimer										</button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmit}>
            Edit Chapitre										</button>
    </div>
}

class MessagesElement extends HTMLElement {
    connectedCallback() {
        const id = this.dataset.id
        render(<Messages id={id} />, this)
    }
}

customElements.define('form-adm', MessagesElement)


function MakeChapter() {
    const onSucess = useCallback(() => {
        window.location.reload();
    }, [])
    const onSubmit = useCallback(e => {
        e.preventDefault()
        console.log($("#ChapTitreMake").val())
        load({
            titre: $("#ChapTitreMake").val(),
            couverture: $("#ChapCouvertureMake").val(),
            date: "2020-08-21T02:30:28.960Z",
            firstParag: $("#ChapFirstParagMake").val(),
            content: $("#ChapContentMake").val(),
        })
    }, [load])
    const { load, loading } = useFetch('/api/chapitres', 'POST', onSucess)
    return <div>
        <button onClick={onSubmit}
            type="button"
            className="btn btn-primary">
            Make chapitre
		</button>
    </div>
}
class MakeChapterElement extends HTMLElement {
    connectedCallback() {
        render(<MakeChapter />, this)
    }
}


customElements.define('make-chapitre', MakeChapterElement)

function MakeArticle() {
    const onSucess = useCallback(() => {
        window.location.reload();
    }, [])
    const onSubmit = useCallback(e => {
        e.preventDefault()
        console.log($("#ArtiTitreMake").val())
        load({
            titre: $("#ArtiTitreMake").val(),
            couverture: $("#ArtiCouvertureMake").val(),
            date: "2020-08-21T02:30:28.960Z",
            content: $("#ArtiContentMake").val(),
        })
    }, [load])
    const { load, loading } = useFetch('/api/articles', 'POST', onSucess)
    return <div>
        <button onClick={onSubmit}
            type="button"
            className="btn btn-primary">
            Make Article
		</button>
    </div>
}
class MakeArticleElement extends HTMLElement {
    connectedCallback() {
        render(<MakeArticle />, this)
    }
}
customElements.define('make-article', MakeArticleElement);


function EditArticle({ id }) {
    const Article = {
        titre: "chalut",
        couverture: "chalut",
        date: "2020-08-21T02:30:28.960Z",
        content: "string",
    }
    const onDeleteCallback = useCallback(() => {
        window.location.reload();
    }, [])
    const onSucess = useCallback(() => {
        window.location.reload();
    }, [])
    const onSubmit = useCallback(e => {

        e.preventDefault()
        load({
            titre: $("#ArtiTitre" + id).val(),
            couverture: $("#ArtiCouverture" + id).val(),
            date: "2020-08-21T02:30:28.960Z",
            content: $("#ArtiContent" + id).val(),
            author: "/api/users/1"
        })
    }, [load])

    const { load, loading } = useFetch('/api/articles/' + id, 'PUT', onSucess)
    const { loading: loadingDelete, load: callDelete } = useFetch('/api/articles/' + id, 'DELETE', onDeleteCallback)
    return <div className="h-100">
        <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal">
            close										</button>
        <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={callDelete.bind(this, null)}>
            Supprimer										</button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmit}>
            Edit Chapitre										</button>
    </div>
}

class ArticleElement extends HTMLElement {
    connectedCallback() {
        const id = this.dataset.id
        render(<EditArticle id={id} />, this)
    }
}

customElements.define('form-arti', ArticleElement)

function Drop(){
    return <div id="DropImage">
   
</div>
}
class DropZone extends HTMLElement {
    connectedCallback() {
        const id = this.dataset.id
        render(<Drop  />, this)
    }
}
customElements.define('drop-zone', DropZone)

function EditUser({ id }) {

    const onDeleteCallback = useCallback(() => {
        window.location.reload();
    }, [])
    const onSucess = useCallback(() => {
        window.location.reload();
    }, [])
    const onSubmit = useCallback(e => {

        e.preventDefault()
        load({
            email: $("#UserMail" + id).val(),
            username: $("#UserUsername" + id).val(),
            InscriptionDate: "2020-08-21T02:30:28.960Z",
            picture: $("#UserPicture" + id).val(),
          
        })
    }, [load])

    const { load, loading } = useFetch('/api/users/' + id, 'PUT', onSucess)
    const { loading: loadingDelete, load: callDelete } = useFetch('/api/users/' + id, 'DELETE', onDeleteCallback)
    return <div className="h-100">
        <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal">
            close										</button>
        <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={callDelete.bind(this, null)}>
            Supprimer										</button>
        <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmit}>
            Edit User										</button>
    </div>
}

class UserElement extends HTMLElement {
    connectedCallback() {
        const id = this.dataset.id
        render(<EditUser id={id} />, this)
    }
}

customElements.define('form-user', UserElement)

