import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator from './components/Calculator';

function App() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="d-flex flex-column min-vh-100">
      <header  className="bg-primary text-white text-center py-3">
      <h1>Calculator App</h1>
      </header>
      <main className="container my-5 flex-grow-1">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <Calculator/>
          </div>
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
<p>&copy; {year} Jose Bohorquez. All rights reserved.</p>
</footer>
    </div>
  );
}

export default App;
