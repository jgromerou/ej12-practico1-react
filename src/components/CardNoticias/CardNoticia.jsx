import { Card, Col, Button } from 'react-bootstrap';
import './card-noticia.css';

const CardNoticia = ({ noticia }) => {
  return (
    <Col md={6} lg={4} className="mb-3">
      <Card id="newCard">
        <Card.Img variant="top" src={noticia.image_url} />
        <Card.Body>
          <Card.Title className=" fw-bold">{noticia.title}</Card.Title>
          <Card.Text className="line-clamp">{noticia.description}</Card.Text>
          <Card.Footer className="text-muted text-center fw-bold">
            <Button
              variant="primary"
              className="text-uppercase text-light fw-bold py-2"
              href={noticia.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir a la noticia completa
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardNoticia;
