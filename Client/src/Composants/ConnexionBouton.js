import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import './button.css';

function ConnexionButton(){
    return(
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link to ="/connexion">
                    <Fab color="primary" aria-label="add">
                        <RssFeedIcon />
                    </Fab>
                </Link>   
            </Box>
        </>
    )
}
export default ConnexionButton;