import { App } from "@/components/App";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import {galleryRoutes} from '@packages/shared/src/routes/gallery'
import { GalleryLazy } from "@/pages/test/Gallery.lazy";
import { Loader } from '@packages/shared/src/components/Loader'

const routes = [
    {
      path: "/gallery",
      element: <App />,
      children: [
        {
          path: galleryRoutes.main,
          element: (
            <Suspense fallback={<Loader />}>
              <GalleryLazy />
            </Suspense>
          ),
        },
        {
          path: galleryRoutes.another,
          element: (
            <Suspense fallback={<Loader />}>
              <div>
                <h1 style={{ color: 'red' }}>Another</h1>
              </div>
            </Suspense>
          ),
        },
      ],
    },
  ]

export const router = createBrowserRouter(routes);

export default routes