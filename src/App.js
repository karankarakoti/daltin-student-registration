import React from "react";

import { MessageAndError } from "components";
import AppRoutes from "routes";

const App = () => {

  return (
    <>      
      <AppRoutes />
      <MessageAndError />      
    </>
  )
}

export default App