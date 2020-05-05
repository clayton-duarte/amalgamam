import React from "react";

import colors from "../helpers/colors-enum";
import { useStateValue } from "../state";

const Header = () => {
  const [{ user, secret }] = useStateValue();

  return (
    <>
      <h1>
        {user} ⨿ {secret}
      </h1>
      <style jsx global>{`
        body {
          background: ${colors.black};
          color: ${colors.white};
          font-family: monospace;
          font-size: 16px;
          padding: 1rem;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Header;
