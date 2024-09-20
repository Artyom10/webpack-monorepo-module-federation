import { App } from "@/components/App";
import { AboutLazy } from "@/pages/about/About.lazy";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "@packages/shared/src/routes/admin";
import { Loader } from '@packages/shared/src/components/Loader'

const routes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: adminRoutes.about,
        element: (
          <Suspense fallback={<Loader />}>
            <AboutLazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
