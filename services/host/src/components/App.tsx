import { Link, Outlet } from "react-router-dom"
import {galleryRoutes} from '@packages/shared/src/routes/gallery'
import {adminRoutes} from '@packages/shared/src/routes/admin'

export const App = () => {
    return (
        <div data-testid="host">
            <div>Page</div>
            <Link to={adminRoutes.about}>About</Link>
            <Link to={galleryRoutes.main}>Test</Link>
            <Outlet />
        </div>
    )
}