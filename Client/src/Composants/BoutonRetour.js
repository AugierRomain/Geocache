import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


function BoutonRetour(){
    return (
        <>
            <Link to ="/">
                <Button variant="primary" size="lg" active>
                    Retour
                </Button>
            </Link>
        </>
    )
}
export default BoutonRetour