import React from "react";
import {Card} from "react-bootstrap";

function Banner(){
    return(
        <>
            <Card className="banner">
                <Card.Body>
                    <Card.Title>
                        ¿En qué consiste el proyecto?
                    </Card.Title>
                    <Card.Text>
                        Este proyecto es lo mejor que le ha podido pasar a la humanidad y la verdad no sé como no lo habían hecho antes.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Banner;