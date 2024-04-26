import Container from "react-bootstrap/Container";
import {Col, Form, Row} from "react-bootstrap";
import "./GalleryOptions.css";
import {Button} from "react-bootstrap";
import React, {useState} from "react";

type ImageProps = {
    "image" : string | File;
    "titulo" : string;
    "desc" : string;
}
function GalleryOptions(){

    const [imagenes , setImagenes] = useState(Array<ImageProps>);
    const [nombreGaleria, setNombreGalerias] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const agregarImagenes = () => {
        const newElement : ImageProps = {
            "image" : "",
            "titulo": "",
            "desc" : ""
        }
        setImagenes(imagenes => [...imagenes, newElement]);
    }

    const handleChangeImage = (index :number, image: File) => {
        let newState = imagenes.slice();
        newState[index]["image"] = image;
        setImagenes(newState);
    }

    const handleChangeTitle = (index :number, title:string) =>{
        let newState = imagenes.slice();
        newState[index].titulo = title;
        setImagenes(newState);
    }

    const handleChangeDesc = (index :number, desc:string) =>{
        let newState = imagenes.slice();
        newState[index].desc = desc;
        setImagenes(newState);
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        if(name==="nombre_galeria")
            setNombreGalerias(value);
        else
            setDescripcion(value);
    }

    const handleSubmit = (event : any) =>{
        event.preventDefault();

    }

    return(
        <>
            <Container>
                <Form className="create-gallery mt-4 mb-5">
                    <Form.Group className="mb-3" id="formUploadGallery" onSubmit={event => handleSubmit(event)}>
                        <Row>
                            <Col xs={6}>
                                <Form.Label htmlFor="nombre_galeria">Nombre de la galeria:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                    id="nombre_galeria"
                                    value={nombreGaleria}
                                    name="nombre_galeria"
                                    onChange={handleChange}
                                />
                                <Form.Label className="mt-4" htmlFor="descripcion_galeria">Descripción:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    id="descripcion_galeria"
                                    name="descripcion_galeria"
                                    value={descripcion}
                                    onChange={handleChange}
                                />
                                <h6 className="mt-4">Imagenes</h6>
                                <Button className="m-lg-4" onClick={agregarImagenes} type="button">Agregar imagenes</Button>
                            </Col>
                            <Col xs={6}>
                                <Button variant="success" type="submit" className="mt-md-4" size="lg">
                                    Enviar
                                </Button>
                            </Col>
                        </Row>
                        <Imagenes
                            images={imagenes}
                            handleChangeImage={handleChangeImage}
                            handleChangeTitle={handleChangeTitle}
                            handleChangeDesc={handleChangeDesc}
                        />

                    </Form.Group>

                </Form>

            </Container>
        </>
    );

}

type ImagesType = {
    images : Array<ImageProps>;
    handleChangeImage : Function;
    handleChangeTitle : Function;
    handleChangeDesc : Function;
}

function Imagenes(props: ImagesType){
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if(name.split("_")[0] === "title")
            props.handleChangeTitle(parseInt(name.split("_")[1]), value);
        else if(name.split("_")[0] === "desc")
            props.handleChangeDesc(parseInt(name.split("_")[1]),value);
        else{
            const {files} = e.target;
            const fileUpdated = files === null ? "" : files.item(0);
            props.handleChangeImage(parseInt(name.split("_")[1]), fileUpdated);
        }

    }

    return(
        <>
            {props.images.map((value, index) => {
                return (
                    <Row key={"row_"+index}>
                        <Col xs={5} className="mt-5">

                            <Form.Control
                                name={`title_${index}`}
                                id={`title_${index}`}
                                placeholder="Ingrese un titulo para la imagen"
                                key={"title_" + index }
                                value={value.titulo}
                                onChange={handleChange}
                            />
                            <Form.Control
                                name={`file_${index}`}
                                id={`file_${index}`}
                                type={"file"}
                                key={"file_" + index}
                                className="mt-3"
                                onChange={handleChange}
                            />
                            <Form.Control
                                name={`desc_${index}`}
                                id={`desc_${index}`}
                                as="textarea" rows={4}
                                className="mt-3"
                                value={value.desc}
                                key={"desc_"+index}
                                onChange={handleChange}
                            ></Form.Control>
                        </Col>
                        <Col xs={1} className="mt-5">
                            <Button variant="danger" key={"image_"+index} type="button">X</Button>
                        </Col>
                    </Row>
                )
            })}
        </>
    );
}

export default GalleryOptions;