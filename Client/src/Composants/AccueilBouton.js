import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './button.css';
import HomeIcon from '@mui/icons-material/Home';

function AccueilButton(){
    return(
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link to ="/">
                    <Fab color="primary" aria-label="add">
                        <HomeIcon/>
                    </Fab>
                </Link>   
            </Box>
        </>
    )
}
export default AccueilButton;