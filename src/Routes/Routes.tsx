import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import GalleryOptions from "../Pages/GalleryOptions";
import DeleteGallery from "../Pages/DeleteGallery";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/gallery_options",
        element: <GalleryOptions />
    },
    {
        path: "/delete_gallery",
        element: <DeleteGallery />
    }
]);