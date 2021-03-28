import React from 'react';
import { NavLink } from 'react-router-dom';
import placeholder from '../../assets/img/post-placeholder.jpg';
import { API_URL } from '../../config';

const NewsListItem = ({ data }) => {
  return (
    <div className="news-list__item">
      <div className="news-list__img">
        <img
          src={data.thumbnailLink ? `${API_URL}uploads/${data.thumbnailLink}` : placeholder}
          alt="news"
        />
      </div>
      <div className="news-list__content">
        <h3 className="news-list__title">{data.title ? data.title : ''}</h3>
        <div className="news-list__date">{data.published ? data.published : ''}</div>
        <p className="news-list__text">
          {/* 11.02.2021 года на отделении «Коптевское» прошли интерактивные беседы с обучающимися
          первого курса на тему: «Закон в обществе». */}
        </p>
        {data._id && (
          <NavLink to={`/news/${data._id}`} className="news-list__link">
            подробнее
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NewsListItem;
