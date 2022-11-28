import SvgIcon from "@mui/material/SvgIcon/SvgIcon";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

interface CustomIcon {
    icon: typeof SvgIcon;
    color: 'error' | 'warning' | 'success';
    label: string;
}

export const ratingIcons: {
    [index: number]: CustomIcon;
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
        label: 'Drobné problémy',
    },
    5: {
        icon: SentimentVerySatisfiedIcon,
        color: "success",
        label: 'Vše v pořádku',
    },
};

export function RatingIcon({rating, selected = true}: { rating: number, selected?: boolean }) {
    const customIcon = ratingIcons[rating]
    const Icon = customIcon.icon

    return (
        <Icon
            color={customIcon.color}
            sx={{
                fontSize: "4rem",
                color: !selected ? "gray" : ""
            }}
        />
    )
}