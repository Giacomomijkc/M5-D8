import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import DeleteCommentButton from "./DeleteCommentButton";
import "./commentArea.css";


const CommentArea = ({ asin, newComment }) => {
    //uso useState per gestire i dati dei commenti che arrivano dall'api
	const [historyBookComments, setHistoryBookComments] = useState(null);
    const apiUrl = "https://striveschool-api.herokuapp.com/api/comments/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODg3NDY2NDYsImV4cCI6MTY4OTk1NjI0Nn0.6KNasLqDpWKlXXumFe9O5bpqnPDe1tzXmrpykIFESpE";

    //uso useState per gestire l'eliminazione di un nuovo commento in modo da poter refreshare la lista 
    //una volta eliminato un commento
    const [deleteComment, setDeleteComment] = useState(false)

    //eseguo la chiamata fetch per ottenere i commenti dall'api
	const getCommentsFromHistoryBook = async () => {
		try {
			const data = await fetch(
				apiUrl +`${asin}`,
				{
					headers: {
						"Content-Type": "application/json",
                        "Authorization": "Bearer " + apiKey
					}
				}
			);
			const response = await data.json();
			setHistoryBookComments(response);
		} catch (error) {
			console.log(error);
		}
	};

    //uso useEffect per eseguire la fetch quando il componente viene montato e
    //nell'array delle dipendenze inserisco i gli stati al cambio dei quali deve essere rilanciata la fetch
	useEffect(() => {
		getCommentsFromHistoryBook();
	}, [asin, newComment, deleteComment]);


	return (
        <>
		<div className="comment-container mt-3">
            <h1 className="ps-2 pt-2">Commenti</h1>
					{historyBookComments &&
						historyBookComments.map((comment) => {
							return (
								<ListGroup
                                    key={comment._id}
									className="d-flex justify-content-between align-items-start"
                                >
									<div className="ms-2 me-auto my-3 box-comment">
										<div>Commento: {comment.comment}</div>
										<div>Voto: {comment.rate}</div>
                                        <div>Autore: {comment.author}</div>
                                        <div>Data creazione: {comment.createdAt}</div>
                                        <div>Data creazione: {comment.updatedAt}</div>
                                        <DeleteCommentButton setDeleteComment={setDeleteComment} comment={comment} />
									</div>
								</ListGroup>
							);
						})}
                    {historyBookComments && historyBookComments.length === 0 && (
                    <div className="alert alert-warning">
                    Non abbiamo trovato nessuna recensione per questo libro
                    </div>)}
		</div>
        </>
	);
};

export default CommentArea;