import React from 'react';
import './button1.css';
import { useUserContext } from '../../../contexts/user.context';

export default function Button1(): React.ReactElement {
  const { username } = useUserContext();
  let urlt = '/todo/';
  if (username === '') {
    urlt = '/login';
  } else {
    urlt = `/todo/${username}`;
  }
  return (
    <a className="bn31" href={urlt}>
      <span className="bn31span">Dashboard</span>
    </a>
  );
}
