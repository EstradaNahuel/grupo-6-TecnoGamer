import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';
function RowTable(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.length}</td>
      <td>{props.rating}</td>
      <td>
        <ul>
          {props.genres.map((genre, i) => {
            return <li key={i}>{genre}</li>;
          })}
        </ul>
      </td>
      <td>{props.awards}</td>
    </tr>
  );
}

RowTable.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  awards: PropTypes.number.isRequired,
};

export default RowTable;