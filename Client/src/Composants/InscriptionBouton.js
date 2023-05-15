import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './button.css';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function InscriptionButton(){
    return(
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link to ="/inscription">
                    <Fab color="primary" aria-label="add">
                        <AppRegistrationIcon />
                    </Fab>
                </Link>   
            </Box>
        </>
    )
}
export default InscriptionButton;