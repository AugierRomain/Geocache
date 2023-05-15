import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function AddGeocacheButton({handleAddCacheClick}){
    return(
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link  onClick={(e)=>handleAddCacheClick(e)}>
                    <Fab color="warning" aria-label="add">
                        <AddCircleIcon />
                    </Fab>
                </Link>   
            </Box>
        </>
    )
}
export default AddGeocacheButton;