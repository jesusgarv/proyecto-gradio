import React, {useEffect, useState} from "react";
import {gallery} from "../Types/image_gallery";
import axios from "axios";
import Container from "react-bootstrap/Container";
import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import host from "../utils/hosts";

export default function DeleteGallery(){

    useEffect(()=>{
        fetchGalleries();
    },[]);

    const [galleries, setGalleries] = React.useState(Array<gallery>);

    const fetchGalleries = ()=>{
        axios.get(host+'/get_galleries').then(response=>{
            setGalleries(response.data['data']);
        });
    }

    const deleteGallery = (index:number) =>{
        console.log(index)
        const formData = new FormData();
        formData.append("idgallery", index.toString());

        axios.post(host + '/delete_gallery', formData).then(response => {
            setGalleries(response.data['data']);
        })
    }

    return(
        <>
            {galleries.map((gallery,index,i)=>{
                return <ImageContainer
                    gallery={gallery}
                    deleteGallery={deleteGallery}
                    key={index}
                />
            })}
            {galleries.length === 0 ? <Container className="mt-5" style={{color:"white"}}><h2>Aún no hay galerias registradas</h2></Container> : <></>}
        </>
    )
}

type containerGallery = {
    gallery : gallery;
    deleteGallery : Function;
}

function ImageContainer(props : containerGallery) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmedDelete = () => {
        props.deleteGallery(props.gallery.idgallery)
        handleClose();
    }

    return(
        <>
            <Container className="row-images mt-5">
                <Row className="justify-content-center">
                    <h3 className="header-gallery mt-3">{props.gallery.name_gallery}</h3>
                    <Button type="button" variant="danger" onClick={e=> handleShow()}>
                        Eliminar Galeria
                    </Button>
                </Row>
                <Row className="mt-5 row-axis">
                    {props.gallery.images.map((obj, index)=>
                        <ImageComponent image_name={obj.image_name}
                                        image={obj.image}
                                        key={index}
                                        index={index}
                        />
                    )}
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Desea eliminar esta galeria?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Este cambio es irreversible</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="danger" onClick={(e) => confirmedDelete()}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

type ImageProps = {
    "image_name" : string;
    "image" : string;
    "index" : number;
}

class ImageComponent extends React.Component<ImageProps, any>{

    render() {
        return(
            <>
                <Col xs={3} className="image-all col-row">
                    <Image src={`${host}${this.props.image}`} className="image-content"/>
                    <div className="title-image">{this.props.image_name}</div>
                </Col>
            </>
        );
    }
}