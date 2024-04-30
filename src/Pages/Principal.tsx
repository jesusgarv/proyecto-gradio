import React, {useEffect} from "react";
import axios from "axios";
import ImageContainer from "../Components/ImageContainer";
import {gallery} from "../Types/image_gallery";
import Container from "react-bootstrap/Container";

export default function Principal() {
    useEffect(()=>{
        fetchGalleries();
    },[])

    const [galleries, setGalleries] = React.useState(Array<gallery>);

    const fetchGalleries = ()=>{
        axios.get('http://localhost:5000/get_galleries').then(response=>{
            setGalleries(response.data['data']);
        });
    }

    return(
        <>
            {galleries.map((gallery,index,i)=>{
                return <ImageContainer
                    idgallery={gallery.idgallery}
                    name_gallery={gallery.name_gallery}
                    gallery_description={gallery.gallery_description}
                    images={gallery.images}
                    key={index}
                />
            })}
            {galleries.length === 0 ? <Container className="mt-5" style={{color:"white"}}><h2>Aún no hay galerias registradas</h2></Container> : <></>}
        </>
    )
}