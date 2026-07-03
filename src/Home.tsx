import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./Home.css";

// Patrón real de tus imágenes: https://www.aapospotosi.com/gallery_gen/{hash}_fit.jpeg
const IMG_BASE = "https://www.aapospotosi.com/gallery_gen/";
const img = (hash: string) => `${IMG_BASE}${hash}_fit.jpeg`;

// TODO: reemplaza cada hash por el real (clic derecho en la imagen del sitio -> "Copiar dirección de imagen")
const HERO_BUILDING_PHOTO = "5631192585255e8421d6ed7076280db9";
const HERO_MASCOT_POSTER = "e2e89c75c9c40784e9c7720ad7847ea3";
const FULL_WIDTH_BUILDING_PHOTO = "510b3ed635f638b74fd73c7db56920c0";
const GERENTE_PHOTO = "ce535d786b51b48668266740063ca034_720x538";
const SINDICATO_PHOTO = "5631192585255e8421d6ed7076280db9";
const TRABAJO_PROFESIONAL_PHOTO = "c9bfc6823ba769aaa628c1692baba64f_714x536";
const CALIDAD_PHOTO = "459ba8bad48f6f71b2263ab5372f7d3b_854x640";

const NOTICIAS = [
  {
    titulo: "ACCIÓN COMUNAL DE LIMPIEZA LAGUNAS DEL KARI KARI",
    texto:
      "De la mano de todos los trabajadores de AAPOS POTOSÍ, se realizó la tarea de limpieza y mantenimiento de nuestras lagunas de la cuenca del Kari Kari.",
    video:
      "https://www.aapospotosi.com/gallery/406710365_7079647365391039_3478056463346338230_n-ts1701348720.mp4",
  },
  {
    titulo: "AAPOS POTOSÍ",
    texto:
      "Te recuerda: las conexiones clandestinas son un delito que perjudica a todos, contaminan el agua potable y no permiten que más familias accedan al servicio. Si conoces algún vecino con conexión ilegal o clandestina, denuncia.",
    video:
      "https://www.aapospotosi.com/gallery/406710365_7079647365391039_3478056463346338230_n-ts1701348720.mp4",
  },
  {
    titulo: "Distribución de agua mediante cisternas",
    texto: "Estamos trabajando día a día para brindar un mejor servicio.",
    video:
      "https://www.aapospotosi.com/gallery/406710365_7079647365391039_3478056463346338230_n-ts1701348720.mp4",
  },
  {
    titulo: "Trasvase Juchuy Chaluma – Lacachaca",
    texto:
      "Se puso en funcionamiento el proyecto provisional de aducción de trasvase de la Laguna Juchuy Chaluma - Lacachaca de la zona alta de la ciudad de Potosí. Más de 20 mil usuarios serán beneficiados, proyecto financiado por el Gobierno Autónomo Departamental de Potosí.",
    video:
      "https://www.aapospotosi.com/gallery/406710365_7079647365391039_3478056463346338230_n-ts1701348720.mp4",
  },
  {
    titulo: "¡Seguimos trabajando!",
    texto:
      "Se realiza la entrega de tanques estacionarios de 5.000 litros al municipio de Potosí, mismos que beneficiarán a las zonas más afectadas por la sequía.",
    video:
      "https://www.aapospotosi.com/gallery/406710365_7079647365391039_3478056463346338230_n-ts1701348720.mp4",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img
          className="hero__photo"
          src={img(HERO_BUILDING_PHOTO)}
          alt="Edificio AAPOS"
        />
        <img
          className="hero__poster"
          src={img(HERO_MASCOT_POSTER)}
          alt="AAPOS Administración Autónoma para Obras Sanitarias"
        />
        <img
        className="hero__wide"
        src={img(FULL_WIDTH_BUILDING_PHOTO)}
        alt="Edificio central AAPOS"
      />
      </section>

      

      {/* FRANJA DE MISIÓN */}
      <section className="mision">
        <p>
          La Administración Autónoma para Obras Sanitarias AAPOS-POTOSÍ es
          responsable de brindar los servicios de abastecimiento de agua
          potable y alcantarillado sanitario a la ciudad de Potosí.
        </p>
      </section>

      {/* NUESTRO EQUIPO */}
      <section className="equipo">
        <h2 className="section-title">Nuestro equipo</h2>

        <div className="equipo__row">
          <img
            className="equipo__photo"
            src={img(GERENTE_PHOTO)}
            alt="Gerente General"
          />
          <div className="equipo__texto">
            <p className="equipo__cargo">
              Gerente General Ing. Carlos Chumacero Pacheco
            </p>
            <p>
              Es la máxima autoridad ejecutiva, la cual está encargada de
              cumplir las resoluciones y determinaciones, siendo responsable
              de la administración de la empresa, en lo que corresponde a sus
              funciones y atribuciones establecidas en el estatuto orgánico,
              manual de funciones y demás normas conexas.
            </p>
          </div>
        </div>

        <div className="equipo__row equipo__row--reverse">
          <div className="equipo__texto">
            <p className="equipo__cargo">
              Sede del sindicato de Trabajadores de la empresa
            </p>
            <p>
              Toda una organización a disposición de la sociedad, cumpliendo
              las funciones que sean asignadas a cada área de trabajo y
              mejorando día a día por el bien de la empresa.
            </p>
          </div>
          <img
            className="equipo__photo"
            src={img(SINDICATO_PHOTO)}
            alt="Sindicato de trabajadores"
          />
        </div>
      </section>

      {/* AAPOS INFORMA */}
      <section className="informa">
        <h2 className="section-title section-title--light">AAPOS Informa</h2>

        <div className="informa__grid">
          {NOTICIAS.map((n) => (
            <article className="informa__card" key={n.titulo}>
              {"video" in n && n.video ? (
                <video className="informa__thumb" controls preload="metadata">
                  <source src={n.video} type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              ) : (
                <div className="informa__thumb-wrap">
        
                  <span className="informa__play" aria-hidden="true">
                    ▶
                  </span>
                </div>
              )}
              <h3>{n.titulo}</h3>
              <p>{n.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* RAZONES PRINCIPALES */}
      <section className="razones">
        <h2 className="section-title section-title--light">
          ¡Razones principales para elegirnos!
        </h2>

        <div className="razones__row">
          <h3>Trabajo profesional</h3>
          <p>
            Su objetivo es apoyar el fortalecimiento e incremento de la
            cobertura de los servicios de agua potable, alcantarillado y
            saneamiento que prestan los organismos operadores de los
            municipios, a través de las entidades.
          </p>
          <img src={img(TRABAJO_PROFESIONAL_PHOTO)} alt="Trabajo profesional" />
        </div>

        <div className="razones__row razones__row--reverse">
          <img src={img(CALIDAD_PHOTO)} alt="Calidad" />
          <div>
            <h3>Calidad</h3>
            <p>Con la transparencia en inspecciones necesarias para el buen uso del agua potable.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
