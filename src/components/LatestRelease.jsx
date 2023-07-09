import React, { useState } from 'react';
import SingleBook from './SingleBook';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import CommentArea from './CommentArea';

const LatestRelease = ({historyBooks, query }) => {

    //uso useState per gestire la selezione del libro e quindi mostrare o meno l'alert al posto dei commenti
    //e colorare il bordo di rosso
    const [selectedBook, setSelectedBook] = useState(null); 

    const filteredHistoryBooks = historyBooks.filter((filteredHistoryBook) =>
    filteredHistoryBook.title.toLowerCase().includes(query.toLowerCase()));

    const handleBookClick = (book) => {
        setSelectedBook(book);
      };

    return (
      <Container className="my-5 justify-content-center">
        <Row>
          <Col className="col-md-8">
            <div className='d-flex justify-content-between gap-1 flex-wrap'>
              {query !== '' ? (
                filteredHistoryBooks.map((filteredBook) => (
                  <SingleBook
                  key={filteredBook.asin}
                  book={filteredBook}
                  onClick={() => handleBookClick(filteredBook)}
                  selectedBook={selectedBook}
                  />
                ))
              ) : (historyBooks &&
                historyBooks.map((historyBook) => (
                <SingleBook 
                key={historyBook.asin} 
                book={historyBook}
                onClick={() => handleBookClick(historyBook)}
                selectedBook={selectedBook}
                />
              ))
            )}
            </div>  
          </Col>
          <Col className="col-md-4">
            {selectedBook ? (
            <CommentArea asin={selectedBook.asin} />
            ) : (
                <div className="alert alert-danger">
                    Devi prima selezionare un libro per vedere i commenti
                </div>
                )}
          </Col>
        </Row>
      </Container>
    );
  };

export default LatestRelease;