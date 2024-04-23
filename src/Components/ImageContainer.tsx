import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import React from "react";
import LoaderRow from "./LoaderRow";

const images = [
    {
        imageURL : "/images/codice-1.jpg",
        imageTitle : "Titulo provisional en exceso largo",
        imageDescription : "Descripción demasiado elaborada de la imagen con reseña historica"
    },
    {
        imageURL: "/images/codice-2.jpg",
        imageTitle: "Titulo aún más provisional pero más largo igual",
        imageDescription : "Descripción demasiado elaborada de la imagen con reseña historica"
    }
]
function ImageContainer() {
    const [selected , setSelected] = React.useState(-1);
    const [isReady, setIsReady] = React.useState(true);
    const [image64, setImage64] = React.useState("");
    const selectInput = async (event: React.MouseEvent<HTMLDivElement>, index : number)=>{
        setSelected(index);
        setIsReady(false);
        const base64 = await blobToData(images[index].imageURL);

        const formData = new FormData();
        // @ts-ignore
        formData.append("image", base64);

        axios.post("http://localhost:5000/image",formData).then(response=> {
            setImage64(response.data["image"]);
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
            <Container>
                <Row className="mt-5 row-images">
                    {images.map((obj, index)=>
                        <ImageComponent imageTitle={obj.imageTitle} imageURL={obj.imageURL} key={index} index={index} selectInput={selectInput} />
                    )}
                </Row>
                {isReady ? (selected !== -1 ? <ImageDescription
                    imageDescription={images[selected].imageDescription}
                    imageURL={image64}
                    imageTitle={images[selected].imageTitle}
                /> : <></> ): <LoaderRow></LoaderRow> }
            </Container>
        </>
    )
}

type ImageProps = {
    "imageTitle" : string;
    "imageURL" : string;
    "index" : number;
    "selectInput" : (event : React.MouseEvent<HTMLDivElement>,index: number) => void;
}

class ImageComponent extends React.Component<ImageProps, any>{

    render() {
        return(
            <>
                <Col xs={3} className="image-all">
                    <Image src={this.props.imageURL} className="image-content"/>
                    <div className="title-image" onClick={(e) => this.props.selectInput(e,this.props.index)}>{this.props.imageTitle}</div>
                </Col>
            </>
        );
    }
}

type imageDescriptionProps = {
    imageDescription: string;
    imageURL : string;
    imageTitle : string;
}

class ImageDescription extends React.Component<imageDescriptionProps, any>{
    render() {
        return(
            <>
                <Row className="mt-5 row-description">
                    <Col xs={8}>
                        <Image className="image-description-image" src={"data:image/jpeg;base64,"+this.props.imageURL} />
                    </Col>
                    <Col xs={4} className="image-description">
                        <h2>{this.props.imageTitle}</h2>
                        <p>
                            {this.props.imageDescription}
                        </p>
                    </Col>
                </Row>
            </>
        );
    }
}

export default ImageContainer;