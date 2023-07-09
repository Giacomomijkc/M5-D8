import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = ({query, setQuery, showSearch}) => {
    //passo al componente lo stato e la funzione di query e la props showSearch per non far comparire il search 
    //nella pagine di dettaglio dove non mi serve

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Epic Books: la nostra selezione di libri Storici!</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            {showSearch && (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                className="me-2"
                aria-label="Search"
                //dichiaro che il value è uguale a query
                value={query}
                //gestisco il cambio del valore di query dentro l'input
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}


export default NavigationBar;