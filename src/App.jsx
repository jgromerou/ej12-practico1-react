import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import FormNoticias from './components/FormNoticias/FormNoticias';

function App() {
  return (
    <>
      <Container className="paginaPrincipal my-5">
        <FormNoticias />
      </Container>
      <Footer />
    </>
  );
}

export default App;
