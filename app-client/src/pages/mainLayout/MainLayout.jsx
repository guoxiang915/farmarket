import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';

const MainLayout = () => {
  const { push } = useHistory();

  return (
    <div>
      <Button onClick={() => push('/login')} />
    </div>
  );
};

export default MainLayout;
