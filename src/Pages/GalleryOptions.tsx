import Container from "react-bootstrap/Container";
import {Alert, Col, Form, Row} from "react-bootstrap";
import "./GalleryOptions.css";
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

type ImageProps = {
    "image" : string | File;
    "titulo" : string;
    "desc" : string;
}

class BreakException extends Error {
    constructor(msg: string) {
        super();
        Object.setPrototypeOf(this, BreakException.prototype);
        this.message = msg;
    }

    errorEmptyValues(){
        return "Error: Hay campos vacios en su formulario"
    }

    getErrorMessage(){
        return this.message;
    }
}

function GalleryOptions() {

    const [imagenes, setImagenes] = useState(Array<ImageProps>);
    const [nombreGaleria, setNombreGalerias] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [messageStatus, setMessageStatus] = useState(Array<string>);

    const agregarImagenes = () => {
        const newElement: ImageProps = {
            "image": "",
            "titulo": "",
            "desc": ""
        }
        setImagenes(imagenes => [...imagenes, newElement]);
    }

    const handleChangeImage = (index: number, image: File) => {
        let newState = imagenes.slice();
        newState[index]["image"] = image;
        setImagenes(newState);
    }

    const handleChangeTitle = (index: number, title: string) => {
        let newState = imagenes.slice();
        newState[index].titulo = title;
        setImagenes(newState);
    }

    const handleChangeDesc = (index: number, desc: string) => {
        let newState = imagenes.slice();
        newState[index].desc = desc;
        setImagenes(newState);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "nombre_galeria")
            setNombreGalerias(value);
        else
            setDescripcion(value);
    }

    const handleSubmit = (event : React.FormEvent<HTMLElement>) =>{
        event.preventDefault();
        const host = "http://192.168.100.11:5000";
        setIsCorrect(true);

        const titulos : Array<String> = [];
        const desc : Array<String> = [];
        const images : Array<string|File> = [];
        try {
            if (nombreGaleria === "" || descripcion === "")
                throw new BreakException("Error: Nombre o descripcion vacios");

            if (imagenes.length === 0)
                throw new BreakException("Error: Debe agregar imagenes");

            imagenes.forEach((value, index) => {
                if (!(value.titulo !== "" && value.image !== "")) {
                    setIsCorrect(false);
                    throw new BreakException("Error: Titulo de la imagen e imagen deben tener un valor");
                } else {
                    titulos.push(value.titulo);
                    desc.push(value.desc);
                    images.push(value.image);
                }
            });

            const formData = new FormData();
            formData.append("galeria", nombreGaleria);
            formData.append("descripcion", descripcion);
            formData.append("titulos", JSON.stringify(titulos));
            formData.append("descripciones_extra", JSON.stringify(desc));
            formData.append("imagenes", JSON.stringify(images));

            axios.put(`${host}/create_gallery`,formData, {
                headers: {
                    'content-type': `multipart/form-data;`,
                }
            }).then((response) => {
                console.log(response);
                setIsCorrect(false);
                setMessageStatus([response.data["statusCode"] === 200 ? "success" : "danger",response.data['message']]);
            });
        }catch(e){
            setIsCorrect(false)
            if(e instanceof BreakException)
                setMessageStatus(["danger",e.getErrorMessage()]);
        }
    }

    return(
        <>
            <Container>
                <Form className="create-gallery mt-4 mb-5">
                    <Form.Group className="mb-3" id="formUploadGallery" onSubmit={(event)=>handleSubmit(event)}>
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
                                <Button
                                    variant="success"
                                    type="submit"
                                    className="mt-md-4"
                                    size="lg"
                                    onClick={e=> handleSubmit(e)}
                                >
                                    Enviar
                                </Button>
                                {!isCorrect ? <Alert variant={messageStatus[0]} className="mt-4">{messageStatus[1]}</Alert> : null}
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