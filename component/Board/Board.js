import classes from './Board.module.css'
import { Card } from 'react-bootstrap';

function Board({ image, boardName }) {
    return (
        <Card className={classes.Card} style={{ width: '12rem', color: 'white', fontWeight: 'bold', margin: '0.5rem' }}>
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