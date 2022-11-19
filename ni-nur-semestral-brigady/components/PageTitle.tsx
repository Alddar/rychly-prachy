import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import * as React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageTitle = ({ children }: Props) => {
  return (
    <Box bgcolor={"primary.main"} p={".9em"}>
      <Typography
        textAlign={"center"}
        variant={"h5"}
        fontWeight={"bold"}
        color={"white"}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default PageTitle;
