import { styled } from "@mui/material/styles";
import { Grid,  Paper, Avatar, Button } from "@mui/material";

const Root = styled(Grid)(({ theme }) => ({
    height: "100vh",
    width: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: theme.palette.grey[50],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledPaper = styled(Paper)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main
}));

const FormContainer = styled('form')(({ theme }) => ({
    width: "80%",
    margin: 'auto',
    marginTop: theme.spacing(3)
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2)
}));

export { Root, StyledPaper, StyledAvatar, FormContainer, SubmitButton };