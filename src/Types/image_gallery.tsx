export  interface image_gallery {
    idimage : number;
    image_name : string;
    image_description : string;
    image : string;
}

export interface gallery {
    idgallery : number;
    name_gallery : string;
    gallery_description : string;
    images: Array<image_gallery>;
}