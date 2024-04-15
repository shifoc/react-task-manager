import { ListItem, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.grey[200]
    }
}));
