import React, { useEffect } from "react";

function Advertisement() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//directlink.monetizemore.com/publisher///psuftoum.com/4/5888527.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}

export default Advertisement;
