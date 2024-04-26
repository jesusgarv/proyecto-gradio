import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import GalleryOptions from "../Pages/GalleryOptions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/gallery_options",
        element: <GalleryOptions />
    }
]);