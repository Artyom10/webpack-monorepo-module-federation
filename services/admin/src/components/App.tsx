import { Outlet } from "react-router-dom"

export const App = () => {
    return (
        <div data-testid="admin">
            <div>Admin module</div>
            <Outlet />
        </div>
    )
}