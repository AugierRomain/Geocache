import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './button.css';
import MapIcon from '@mui/icons-material/Map';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


function MapButton(){
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate=useNavigate();
    function handlevent(event) {
        event.preventDefault();
        const url_access="http://localhost:3000/ma-page-protegee";
        fetch(url_access, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          credentials: 'include',
        })
        .then((response) =>response.json())
        .then((data) =>{
          if(data.access){
            navigate("/geocache");
          }
          else {
            console.log(data.message);
            setAlert(data.message);
            setShowAlert(true);
            setTimeout(() => {
                
                setShowAlert(false);
    
              }, 3000);
          }
            
        }
        )
    
      }
    return(
        <>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Link to ="/geocache" onClick={(e)=>handlevent(e)}>
                    <Fab color="primary" aria-label="add">
                        <MapIcon />
                    </Fab>
                </Link>   
            </Box>
            
        </>
        
    )
}
export default MapButton;