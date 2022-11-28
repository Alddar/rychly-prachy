import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import PageTitle from "../components/PageTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StateContext } from "./_app";
import { Email, Home, PhoneIphone } from "@mui/icons-material";
import ReturnBackButton from "../components/complex/ReturnBackButton";
import Divider from "@mui/material/Divider";

export default function Profile() {
  const StyledTypographyBody = (props: any) => (
    <Typography sx={{ pl: "2rem" }}>{props.children}</Typography>
  );

  const [error, setError] = React.useState<string | undefined>();
  const { push } = useRouter();
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    if (!state.user) {
      push("/login");
    }
  }, [state]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editProfile = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    setError(undefined);
    push("/edit-profile");
  };

  const uploadImage = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <Stack>
      <ReturnBackButton />
      <PageTitle>Profil uživatele</PageTitle>
      <Stack spacing={3}>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                onClick={handleOpen}
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            }
            sx={{ width: "16rem", mt: "2rem", mb: "2rem" }}
          >
            <Avatar sx={{ width: "16rem", height: "16rem" }}>T</Avatar>
          </Badge>
          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ p: "2rem" }}>
              <Typography variant="h5"> Nahrát profilový obrázek </Typography>
              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                <Input type="file" />
                <Button
                  onClick={uploadImage}
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Potvrdit
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
        <Divider />
        <Box bgcolor={'#e1f5fe'} py={'12px'} borderRadius={'16px'}>
        <Box sx={{ ml: "2rem" }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Email color={"primary"} />
            <Typography variant="h5" color={"#01579b"}>
              Email
            </Typography>
          </Stack>
          <StyledTypographyBody variant="body1">
            {state.user?.email}
          </StyledTypographyBody>
        </Box>

        <Box sx={{ ml: "2rem" }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <PhoneIphone color={"primary"} />
            <Typography variant="h5" color={"#01579b"}>
              Telefon
            </Typography>
          </Stack>
          <StyledTypographyBody variant="body1">
            {state.user?.phone}
          </StyledTypographyBody>
        </Box>

        <Box sx={{ ml: "2rem" }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Home color={"primary"} />
            <Typography variant="h5" color={"#01579b"}>
              Adresa
            </Typography>
          </Stack>
          <StyledTypographyBody variant="body1">
            {state.user?.address.street}
          </StyledTypographyBody>
          <StyledTypographyBody variant="body1">
            {state.user?.address.postCode} {state.user?.address.city}
          </StyledTypographyBody>
        </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <IconButton
              onClick={editProfile}
              size="large"
              sx={{
                bgcolor: "primary.main",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}
