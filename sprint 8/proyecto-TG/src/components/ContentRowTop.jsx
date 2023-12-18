import { useEffect, useState } from 'react';
import ContentRowMovies from './ContentRowMovies';

function ContentRowTop() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const genresRes = await fetch(
        'http://localhost:3020/api/categoria',
      );

      const genresData = await genresRes.json();

      if (Array.isArray(genresData.data)) {
        setGenres(genresData.data);
      } else {
        console.error('Error al obtener las categorias', genresData);
      }
    }

    fetchData();
  }, []);
render () 
  return (
    <>
      {/* Content Row Top */}
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">TecnoGamer Dashboard</h1>
        </div>

        {/* Content Row Movies*/}
        <div className="row">
          <ContentRowMovies />
        </div>
        {/* End movies in Data Base */}

        {/* Content Row Last Movie in Data Base */}
        <div className="row">
          {/* Last Movie in DB */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800"></h5>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    src="http://localhost:3000/imgagenes/"
                    alt="Star Wars - Mandalorian"
                  />
                </div>
                <p>
                 ¿?
                </p>
                <a
                  className="btn btn-danger"
                  target="_blank"
                  rel="nofollow"
                  href="/"
                ></a>
              </div>
            </div>
          </div>
          {/* End content row last movie in Data Base */}

          {/* Genres in DB */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Genres in Data Base
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {genres.map((genre) => (
                    <div className="col-lg-6 mb-4" key={genre.id}>
                      <div className="card bg-dark text-white shadow">
                        <div className="card-body">{genre.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Content Row Top*/}
    </>
  );
}
export default ContentRowTop;