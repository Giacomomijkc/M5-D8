import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './singleBook.css';

const SingleBook = ({ book, onClick, selectedBook }) => {

  //costante per verificare che il libro sia selezionato e che l'asin del libro selezionato corrisponda a quello corrente
  const isSelected = selectedBook && selectedBook.asin === book.asin;

    return (
      <Card className={`my-3 ${isSelected ? 'selected-book' : ''}`} style={{ width: '14rem' }} key={book.asin}>
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.category}</Card.Text>
          <Card.Text>{book.price}</Card.Text>
          <Card.Text>{book.asin}</Card.Text>
          <Button variant="primary" onClick={onClick}>Guarda recensioni</Button>
          <Link to={`/book/${book.asin}`}>
            <Button variant="success" className='mt-1' >Vai ai dettagli</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  };

export default SingleBook;