import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


function CoolButton(){
    return (
        <>
            <Link to ="/inscription">
                <Button variant="primary" size="lg" active>
                    Inscription
                </Button>{' '}
            </Link>
            <Link to ="/connexion">
                <Button variant="primary" size="lg" active>
                    Connexion
                </Button>
            </Link>
        </>
    )
}
export default CoolButton