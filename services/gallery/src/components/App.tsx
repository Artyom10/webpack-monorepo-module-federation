import {  Outlet } from "react-router-dom"

export const App = () => {
    return (
        <div data-testid="gallery">
            <div>Gallery module</div>
            <Outlet />
        </div>
    )
}