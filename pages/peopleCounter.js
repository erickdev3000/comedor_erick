import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/authContext';

import dynamic from 'next/dynamic';
const PoseNetComponent = dynamic(
  () => import('./../components/PoseNetComponent'),
  {
    ssr: false,
  }
);

export default function peopleCounter() {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false)
  const { session } = useContext(AuthContext);

  useEffect(() => {
    if(Object.entries(session).length === 0 || session.role === 'user') return;
    fetch('/api/counter', {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => setCount(res.data));
  });

  function updateCounterget(counter) {
    setCount(counter)
  }

  return (
    <div>
      <h1>Contador en archivo {count}</h1>
      <PoseNetComponent 
        updateCounterget={updateCounterget} 
      />
    </div>
  );
}
