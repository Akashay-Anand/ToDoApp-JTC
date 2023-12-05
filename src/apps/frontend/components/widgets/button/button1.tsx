import './button1.css';
import React from 'react';

interface Button1Props {
  task: () => void;
}

const Button1: React.FC<Button1Props> = ({ task }) => (
  <a className="bn31" onClick={task}>
    <span className="bn31span">Dashboard</span>
  </a>
);

export default Button1;
