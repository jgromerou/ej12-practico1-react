import { Card, Row } from 'react-bootstrap';
import CardNoticia from './CardNoticias/CardNoticia';

const GridNoticias = ({ noticias, categ }) => {
  return (
    <>
      <Card className="mt-3">
        <Card.Title className="mt-4 display-6 fw-bold text-center text-lg-start p-3">
          Categoria seleccionada: {categ}
        </Card.Title>
        <Row className="mb-4 mt-2 px-3">
          {noticias.map((noticia, index) => (
            <CardNoticia key={index} noticia={noticia} />
          ))}
        </Row>
      </Card>
    </>
  );
};

export default GridNoticias;
