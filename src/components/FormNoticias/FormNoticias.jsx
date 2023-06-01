import { Card, Form, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import './form-noticias.css';
import GridNoticias from '../GridNoticias';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormNoticias = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [noticias, setNoticias] = useState([]);
  const [categ, setCateg] = useState('');
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = async (datos = '') => {
    try {
      setMostrarSpinner(true);
      const resp = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_23780f986c99c831d5da97ac5387f0936f5f1&q=${datos.categoria}`
      );
      const data = await resp.json();
      setNoticias(data.results);
      if (datos !== '') {
        setCateg(datos.categoria);
      }
      setMostrarSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mt-2 mb-4 text-uppercase display-6 fw-bold text-center">
            Noticias
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="justify-content-center align-items-center mb-3"
              controlId="formCategory"
              as={Row}
            >
              <Col md={2}>
                <Form.Label>Buscar por categoria</Form.Label>
              </Col>
              <Col md={6}>
                <Form.Select
                  aria-label="Seleccione una categoria:"
                  {...register('categoria', {
                    required: 'Debe seleccionar una categoria',
                  })}
                >
                  <option value="">Seleccione una opcion:</option>
                  <option value="science">Ciencia</option>
                  <option value="sports">Deportes</option>
                  <option value="health">Salud</option>
                  <option value="technology">Tecnología</option>
                </Form.Select>
                {errors.categoria && (
                  <Alert variant="danger" className="my-2">
                    Por favor seleccione una Categoria...
                  </Alert>
                )}
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {mostrarSpinner ? (
        <div className="d-flex justify-content-center align-items-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <GridNoticias noticias={noticias} categ={categ} />
      )}
    </>
  );
};

export default FormNoticias;
