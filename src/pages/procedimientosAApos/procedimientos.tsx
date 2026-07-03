import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./procedimientos.css";

export default function Procedimientos() {
  return (
    <>
      <Navbar />

      <main className="procedimientos">
        <h1>Procedimientos</h1>

        <p>
          Aquí se mostrarán los procedimientos para acceder a los servicios de
          AAPOS.
        </p>
      </main>

      <Footer />
    </>
  );
}