import React from "react";
import {Card} from "react-bootstrap";

function Banner(){
    return(
        <>
            <Card className="banner">
                <Card.Body>
                    <Card.Title style={{margin:"0 0 3vh 0"}}>
                        ¿En qué consiste el proyecto?
                    </Card.Title>
                    <Card.Text>
                        Este proyecto es lo mejor que le ha podido pasar a la humanidad y la verdad no sé como no lo habían hecho antes.
                        Aqui maybe es buena poner algun ejemplo wapo de como funciona todo esto de la ecualización de imagenes.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Banner;