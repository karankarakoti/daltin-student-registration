import React, { useEffect } from "react";

import { PageError } from "components";
import { scrollToTop } from "utils/utilities";

const NotFound = () => {

  useEffect(() => {    
    scrollToTop(window);
  }, []);

  return (
    <>      
      <PageError
        title="404"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        buttonType="Link"
        buttonLabel="Back to Home"
        buttonLink="/"
      />
    </>
  )
}

export default NotFound;