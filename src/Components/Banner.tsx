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
                        La ecualización de imágenes y el ajuste gamma aplicado a códices se enfoca en mejorar la visibilidad y el contraste de estos documentos históricos o en su defecto antiguos. Estos códices, a menudo desgastados por el tiempo y con pigmentos desvanecidos, pueden ser difíciles de leer y analizar, bajo esta premisa la ecualización de imágenes ajusta los niveles de brillo y contraste para resaltar detalles y mejorar la claridad del contenido. El ajuste gamma permite corregir desequilibrios en la luminancia, optimizando la visibilidad de áreas que podrían estar subexpuestas o sobreexpuestas. Este tipo de procesamiento digital es fundamental para la preservación digital, facilitando el estudio y análisis de textos históricos o antiguos, permitiendo el acceso a información que de otro modo sería difícil de interpretar.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Banner;