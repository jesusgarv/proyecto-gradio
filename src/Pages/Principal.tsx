import React, {useEffect} from "react";
import axios from "axios";
import ImageContainer from "../Components/ImageContainer";

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

export default function Principal() {
    useEffect(()=>{
        fetchGalleries();
    },[])

    const [galleries, setGalleries] = React.useState(Array<gallery>);

    const fetchGalleries = ()=>{
        axios.get('http://192.168.100.11:5000/get_galleries').then(response=>{
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
        </>
    )
}