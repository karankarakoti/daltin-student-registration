import { Suspense } from "react";

import { Loader } from "components";

export const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);