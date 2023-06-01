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
  const [pai, setPai] = useState('');
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = async (datos = '') => {
    try {
      setMostrarSpinner(true);
      if (datos === '') {
        const resp = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_23780f986c99c831d5da97ac5387f0936f5f1`
        );
        const data = await resp.json();
        setNoticias(data.results);
      } else {
        const resp = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_23780f986c99c831d5da97ac5387f0936f5f1&q=${datos.categoria}&country=${datos.pais}`
        );
        const data = await resp.json();
        setNoticias(data.results);
        setCateg(datos.categoria);
        setPai(datos.pais);
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

            <Form.Group
              className="justify-content-center align-items-center mb-3"
              controlId="formCategory"
              as={Row}
            >
              <Col md={2}>
                <Form.Label>Buscar por país</Form.Label>
              </Col>
              <Col md={6}>
                <Form.Select
                  aria-label="Seleccione un país:"
                  {...register('pais', {
                    required: 'Debe seleccionar un país',
                  })}
                >
                  <option value="">Seleccione una opcion:</option>
                  <option value="us">Estados Unidos</option>
                  <option value="es">España</option>
                  <option value="ar">Argentina</option>
                  <option value="uy">Uruguay</option>
                </Form.Select>
                {errors.pais && (
                  <Alert variant="danger" className="my-2">
                    Por favor seleccione una País...
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
        <GridNoticias noticias={noticias} categ={categ} pai={pai} />
      )}
    </>
  );
};

export default FormNoticias;
