import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Row, Col} from 'react-bootstrap'

const AddComment = ({asin, setNewComment}) => {

    //utilizzo useState per gestire lo stato dei commenti e dei voti da inviare quando eseguo la fetch
    const [handlerComment, setHandlerComment] = useState(''); 
    const [handlerRate, setHandlerRate] = useState('');
    const apiUrl = "https://striveschool-api.herokuapp.com/api/comments/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODg3NDY2NDYsImV4cCI6MTY4OTk1NjI0Nn0.6KNasLqDpWKlXXumFe9O5bpqnPDe1tzXmrpykIFESpE";

    //eseguo la chiamata fetch per inviare un commento
    const postComment = async () => {

        const newComment = {
            "comment": handlerComment,
            "rate": handlerRate,
            "elementId": asin,
        };

        const payload = newComment;

        try {
            const response = await fetch (apiUrl,{
                    method: "POST",
                    body: JSON.stringify(payload),
					headers: {
						"Content-Type": "application/json",
                        "Authorization": "Bearer " + apiKey
					}
				}
            );
            if (response.ok){

                setHandlerComment(''); 
                setHandlerRate('');
           
            } else {
                // La richiesta non è andata a buon fine
                console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
            }
            
        } catch (error) {
            console.log("Errore durante la richiesta:", error);
        }
    }

    //uso l'handle che richiamo nell'onClick del form per richiamare la fetch
    //modificare lo stato di newComment e svuotare i valori dell'input
    const handlePostComment = async () => {
        await postComment();
        setNewComment(true);
        setHandlerComment('');
        setHandlerRate('');
      };

    return(
        <Container style={{background: "white"}}>
            <Row style={{ display: "block" }}>
                <Col>
                    <Form.Group className="d-flex justify-content-center align-items-center mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control className='mx-2' type="text" placeholder="scrivi un commento" name="comment" value={handlerComment} onChange={(e) => setHandlerComment(e.target.value)} />
                        <Form.Control type="number" placeholder="dai un voto" name="voto" value={handlerRate} onChange={(e) => setHandlerRate(e.target.value)} />
                        <Button 
                            type="submit" 
                            variant="success" 
                            id="button-addon2" 
                            className='mx-2'
                            onClick={handlePostComment}>
                            Invia
                        </Button>
                    </Form.Group>
                </Col>
            </Row>  
        </Container>
    )
}

export default AddComment;