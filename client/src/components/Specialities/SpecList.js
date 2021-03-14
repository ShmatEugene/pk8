import React from 'react';
import { NavLink } from 'react-router-dom';

const SpecList = ({ specialities, quantity = -1 }) => {
  function renderSpecs(specs) {
    return specs.map((spec, index) => {
      if (index < quantity) {
        return (
          <div key={index + spec.code} className="specialties-list__item">
            <div className="specialties-list__code">{spec.code}</div>
            <h3 className="specialties-list__title">{spec.title}</h3>
            <NavLink className="specialties-list__link" to={`/specialities/${spec._id}`}>
              подробнее
            </NavLink>
          </div>
        );
      } else if (quantity === -1) {
        return (
          <div key={index + spec.code} className="specialties-list__item">
            <div className="specialties-list__code">{spec.code}</div>
            <h3 className="specialties-list__title">{spec.title}</h3>
            <NavLink className="specialties-list__link" to={`/specialities/${spec._id}`}>
              подробнее
            </NavLink>
          </div>
        );
      }
    });
  }

  return (
    <div className="homes-specialties__specialties-list specialties-list">
      {specialities && renderSpecs(specialities)}
    </div>
  );
};

export default SpecList;
