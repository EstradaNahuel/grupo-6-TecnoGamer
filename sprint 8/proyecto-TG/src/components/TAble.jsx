import React from 'react';
import RowTable from './RowTable';

const peliculas = [
  {
    title: 'El Rey Leon',
    length: '180',
    rating: '10',
    genres: ['aventura', 'comedia'],
    awards: '10',
  },
  {
    title: 'Titanic',
    length: '200',
    rating: '10',
    genres: ['drama'],
    awards: '10',
  },
  {
    title: 'Saw',
    length: '200',
    rating: '10',
    genres: ['terror'],
    awards: '10',
  },
  {
    title: 'Saw 2',
    length: '220',
    rating: '10',
    genres: ['terror'],
    awards: '10',
  },
];
function Table() {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Color</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Titulo</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Color</th>
              </tr>
            </tfoot>
            <tbody>
              {peliculas.map((pelicula, i) => (
                <RowTable
                  key={i}
                  title={pelicula.title}
                  length={pelicula.length}
                  rating={pelicula.rating}
                  genres={pelicula.genres}
                  awards={pelicula.awards}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Table;