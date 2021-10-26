import classes from './Board.module.css'
import { Card } from 'react-bootstrap';

function Board({ image, boardName, clicked }) {
    return (
        <Card onClick={clicked} className={classes.Card} style={{ width: '12rem', color: 'white', fontWeight: 'bold', margin: '0.5rem', height: '100%' }}>
            <Card.Img src={image} />
            <Card.ImgOverlay>
              <Card.Body>
                <Card.Title>{boardName}</Card.Title>
              </Card.Body>
            </Card.ImgOverlay>
        </Card>
    )
}

export default Board;