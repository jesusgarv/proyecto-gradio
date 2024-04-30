import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import React from "react";
import LoaderRow from "./LoaderRow";
import {gallery} from "../Types/image_gallery";
import host from "../../hosts";


function ImageContainer(props : gallery) {
    const [selected , setSelected] = React.useState(-1);
    const [isReady, setIsReady] = React.useState(true);
    const [imageEcualized, setImageEcualized] = React.useState("");
    const [imageInverted, setImageInverted] = React.useState("");
    const [imageGamma, setImageGamma] = React.useState("");

    const selectInput = async (event: React.MouseEvent<HTMLDivElement>, index : number)=>{
        setSelected(index);
        setIsReady(false);
        const base64 = await blobToData(props.images[index].image);

        const formData = new FormData();
        // @ts-ignore
        formData.append("image", base64);

        axios.post(host + "/image",formData).then(response=> {
            setImageEcualized(response.data["imagen_ecualizada"]);
            setImageInverted(response.data["imagen_invertida"]);
            setImageGamma(response.data["imagen_gamma"]);
            setIsReady(true);
        }).catch(error => console.log(error));
    }



    const blobToData = async (url: string) : Promise<string|ArrayBuffer|null> => {
        return await fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((res) => {
                    reader.onloadend = () => {
                        res(reader.result);
                    }
                })
            });
    }

    return(
        <>
            <Container className="row-images mt-5">
                <Row className="justify-content-center">
                    <h3 className="header-gallery mt-3">{props.name_gallery}</h3>
                </Row>
                <Row className="mt-5 row-axis">
                    {props.images.map((obj, index)=>
                        <ImageComponent image_name={obj.image_name}
                                        image={obj.image}
                                        key={index}
                                        index={index}
                                        selectInput={selectInput}
                        />
                    )}
                </Row>
                {isReady ? (selected !== -1 ? <ImageDescription
                    gallery_description={props.gallery_description}
                    image_description={props.images[selected].image_description}
                    image_ecualized={imageEcualized}
                    image_inverted={imageInverted}
                    image_gamma={imageGamma}
                    image_name={props.images[selected].image_name}
                /> : <></> ): <LoaderRow></LoaderRow> }
            </Container>
        </>
    )
}

type ImageProps = {
    "image_name" : string;
    "image" : string;
    "index" : number;
    "selectInput" : (event : React.MouseEvent<HTMLDivElement>,index: number) => void;
}

class ImageComponent extends React.Component<ImageProps, any>{

    render() {
        return(
            <>
                <Col xs={3} className="image-all col-row">
                    <Image src={this.props.image} className="image-content"/>
                    <div className="title-image" onClick={(e) => this.props.selectInput(e,this.props.index)}>{this.props.image_name}</div>
                </Col>
            </>
        );
    }
}

type imageDescriptionProps = {
    gallery_description : string;
    image_description: string;
    image_ecualized : string;
    image_inverted : string;
    image_gamma : string;
    image_name : string;
}

class ImageDescription extends React.Component<imageDescriptionProps, any>{
    render() {
        return(
            <>
                <Row className="mt-5 row-description">
                    <Col xs={4}>
                        <h3 className="header-gallery">Imagen ecualizada</h3>
                        <Image className="image-description-image" src={"data:image/jpeg;base64,"+this.props.image_ecualized} />
                    </Col>
                    <Col xs={4} >
                        <h3 className="header-gallery">Imagen invertida</h3>
                        <Image className="image-description-image"
                               src={"data:image/jpeg;base64," + this.props.image_inverted}/>
                    </Col>
                    <Col xs={4}>
                        <h3 className="header-gallery">Imagen gamma</h3>
                        <Image className="image-description-image"
                               src={"data:image/jpeg;base64," + this.props.image_gamma}/>
                    </Col>
                </Row>
                <Row className="descriptions-section">
                    <Col xs={4} className="image-description">
                        <h2>{this.props.image_name}</h2>
                        <p>
                            {this.props.gallery_description}
                        </p>
                        <p>
                            {this.props.image_description}
                        </p>
                    </Col>
                </Row>
            </>
        );
    }
}

export default ImageContainer;