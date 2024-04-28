import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import axios from "axios";
import React, {useEffect} from "react";
import LoaderRow from "./LoaderRow";

type image_gallery = {
    idimage : number;
    image_name : string;
    image_description : string;
    image : string;
}

type gallery = {
    idgallery : number;
    name_gallery : string;
    gallery_description : string;
    images: Array<image_gallery>;
}

function ImageContainer(props : gallery) {
    const [selected , setSelected] = React.useState(-1);
    const [isReady, setIsReady] = React.useState(true);
    const [image64, setImage64] = React.useState("");

    const selectInput = async (event: React.MouseEvent<HTMLDivElement>, index : number)=>{
        setSelected(index);
        setIsReady(false);
        const base64 = await blobToData(props.images[index].image);

        const formData = new FormData();
        // @ts-ignore
        formData.append("image", base64);

        axios.post("http://192.168.100.11:5000/image",formData).then(response=> {
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
                    image_description={props.images[selected].image_description}
                    image={image64}
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
                <Col xs={3} className="image-all">
                    <Image src={this.props.image} className="image-content"/>
                    <div className="title-image" onClick={(e) => this.props.selectInput(e,this.props.index)}>{this.props.image_name}</div>
                </Col>
            </>
        );
    }
}

type imageDescriptionProps = {
    image_description: string;
    image : string;
    image_name : string;
}

class ImageDescription extends React.Component<imageDescriptionProps, any>{
    render() {
        return(
            <>
                <Row className="mt-5 row-description">
                    <Col xs={8}>
                        <Image className="image-description-image" src={"data:image/jpeg;base64,"+this.props.image} />
                    </Col>
                    <Col xs={4} className="image-description">
                        <h2>{this.props.image_name}</h2>
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