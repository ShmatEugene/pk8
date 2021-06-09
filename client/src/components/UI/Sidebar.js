import React from 'react';
import sidebarImg from '../../assets/img/sidebar.png';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <img src={sidebarImg} alt="sidebar" className="sidebar__banner" />
    </div>
  );
}
