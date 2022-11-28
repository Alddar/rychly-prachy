import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Reply, ReplyAllOutlined } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const ReturnBackButton = () => {
  const { back } = useRouter();
  return (
    <Stack
      direction={"row"}
      spacing={".3em"}
      onClick={back}
      alignItems={"center"}
      mb={"1em"}
      pb={"4px"}
      borderBottom={"1px solid #e0e0e0"}
    >
      <Reply fill={"#29b6f6"} color={"primary"} />
      <Typography variant={"body1"} fontWeight={"500"} color={"#29b6f6"}>
        Vrátit se
      </Typography>
    </Stack>
  );
};

export default ReturnBackButton;
