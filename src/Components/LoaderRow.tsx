import React from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function LoaderRow(){
    return(
        <Container>
            <Row className="mt-5 row-images">
                <Col xs={12} className="centered">
                    <Spinner animation="border" variant="primary" style={{
                        height: '10rem',
                        width: '10rem',
                    }} />
                </Col>
            </Row>
        </Container>
    )
}