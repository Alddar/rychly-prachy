import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {useContext, useState} from "react";
import WorkCard from "../../../../components/complex/WorkCard";
import {getOffer, getProvider} from "../../../../fixtures/app";
import {StateContext} from "../../../_app";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

const customIcons: {
  [index: string]: {
    icon: typeof SvgIcon;
    color: 'error' | 'warning' | 'success';
    label: string;
  };
} = {
  1: {
    icon: SentimentVeryDissatisfiedIcon,
    color: "error",
    label: 'Naprosto špatné',
  },
  2: {
    icon: SentimentDissatisfiedIcon,
    color: "error",
    label: 'Zásadní problémy',
  },
  3: {
    icon: SentimentSatisfiedIcon,
    color: "warning",
    label: 'Šlo to',
  },
  4: {
    icon: SentimentSatisfiedAltIcon,
    color: "success",
    label:'Drobné problémy',
  },
  5: {
    icon: SentimentVerySatisfiedIcon,
    color: "success",
    label: 'Vše v pořádku',
  },
};

export default function OfferRating() {
    const { state, setOffer } = useContext(StateContext)
    const router = useRouter()
    const { id } = router.query
    const offer = getOffer(state.offerList, Number(`${id}`));
    const provider = getProvider(state.providerList, offer.ownerId)

    const [value, setValue] = useState<number | null>(null);
    const [hover, setHover] = useState(-1);
    const selectedIndex = hover !== -1 ? hover : value

    return (
        <Container maxWidth="sm" sx={{ paddingBottom: "2rem" }}>
        <Stack spacing={3}>
            <WorkCard offer={offer}></WorkCard>
            <Typography variant="h5">Hodnocení</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center'
              }}
            >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center'
                  }}
                >
                  {Object.keys(customIcons).map(it => {
                    const index = Number(it)
                    const customIcon = customIcons[it]
                    const Icon = customIcon.icon
                    return (
                      <IconButton
                        key={it}
                        size="large"
                        onClick={() => {
                            setValue(index);
                        }}
                        onMouseEnter={() => {
                            setHover(index)
                        }}
                        onMouseLeave={() => {
                          setHover(-1)
                        }}
                      >
                        <Icon
                          color={customIcon.color}
                          sx={{
                            fontSize: "4rem",
                            color: index !== selectedIndex ? "gray" : ""
                          }}
                        />
                      </IconButton>
                    )
                  })}
                </Box>
                {selectedIndex !== null && (
                  <Box sx={{ mt: 2, fontWeight: "bold" }}>{customIcons[selectedIndex].label}</Box>
                )}
            </Box>
            <Button variant="contained">Ohodnotit</Button>
        </Stack>
        </Container>
    );
}
