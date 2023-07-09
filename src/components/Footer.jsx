import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FooterLinks } from '../data/FooterLink';
import { FooterDatas } from '../data/FooterDatas';

const Footer = () => {

    return (
        <Row className="row d flex justify-content-around align-items-center text-light bg-dark py-5 px-5 mt-5">
           
                {FooterLinks.map((link) => {
                    return(
                        <Col className='col-md-4'>
                        <a key={link.id} href={link.href}>{link.title}</a>
                        <p>{link.description}</p>
                        </Col>
                    )
                })}

                {FooterDatas.map((data)=> {
                    return(
                        <Col className='col-md-2 mt-2'>
                        <a style={{fontSize: 'smaller'}} key={data.id}>{data.title} {data.description}</a>
                        </Col>
                    )
                })}
          
        </Row>
    )
}

export default Footer;