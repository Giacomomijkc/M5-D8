import React, {useEffect} from 'react'
import { Button } from 'react-bootstrap';

const DeleteCommentButton = ({comment, setDeleteComment}) => {

    const apiUrl = "https://striveschool-api.herokuapp.com/api/comments/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODg3NDY2NDYsImV4cCI6MTY4OTk1NjI0Nn0.6KNasLqDpWKlXXumFe9O5bpqnPDe1tzXmrpykIFESpE";

    //eseguo la chiamata fetch per eliminare un commento
    const deleteComment = async() => {
        try{
            const response = await fetch(apiUrl + `${comment._id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiKey
                }
            }
        );

        if (response.ok) {
            console.log('commento eliminato con successo')
            //cambio lo stato di deleteComment per rilanciare la fetch del componente CommentArea
            setDeleteComment(true);
        } else {
            console.log("Errore durante l'eliminazione del commento':", response.status, response.statusText);
        }

        } catch(error){
            console.log("Errore durante la richiesta:", error);
        }
    }

    
    return (
        <Button variant='danger' style={{ width: '60px', fontSize: '8px' }} onClick={deleteComment}>Cancella Commento</Button>
    )
}

export default DeleteCommentButton