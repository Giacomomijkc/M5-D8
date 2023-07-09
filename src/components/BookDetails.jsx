import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { Container, Col, Row } from 'react-bootstrap';
import CommentArea from './CommentArea';
import AddComment from './AddComment';
import './bookDetails.css';
import Footer from './Footer';
const apiUrl = 'https://epibooks.onrender.com/';

const BookDetails = () => {
    //recupero l'asin del libro destrutturando l'oggetto
    const {asin} = useParams()
    //utilizzo useState per gestire i dati relativi al libro
    const [book, setBook] = useState(null)
    //uso useState per gestire la creazione di un nuovo commento
    //e li passo ai componenti CommentArea e AddComment per refreshare la lista dei commenti
    const [newComment, setNewComment] = useState(false)


    const getBookDetail = async () => {
        try {
            const data = await fetch (apiUrl + `${asin}`);
            const response = await data.json();
            setBook(response);
            console.log('questo è il titolo'+response.title);
        } catch (error) {
            console.log(error)
        }
    }

    //uso useEffect per richiamare la chiamate fetch quando il componente viene montato
    //e nell'array delle dipendenze inserisco l'asin per rilanciare la fetch ogni volta che asin cambia
    useEffect(() => {
        getBookDetail();
    },[asin]);

    if (!book) {
        // se i dati non sono ancora arrivati renderizzo un div che indica il caricamento
        return <div>Loading...</div>;
      }
    
      return (
        <>
          <NavigationBar showSearch={false} />
          <Container>
            <Row >
              <Col>
                <div className='book-data-container'>
                    <img src={book[0].img} className='cover-book' />
                    <h3>{book[0].title}</h3>
                    <p>Categoria: {book[0].category}</p>
                    <p>Prezzo: {book[0].price}</p>
                </div>
                <div className='addComment-container'>
                    <AddComment asin={asin} setNewComment={setNewComment} />
                </div>
              </Col>
              <Col>
                <CommentArea asin={asin} newComment={newComment} />
              </Col>
            </Row>
          </Container>
          <Footer/>
        </>
      );
    };
    
    export default BookDetails;