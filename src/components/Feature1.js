import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import Home from './Home';

const Feature1 = () => {

  let { id } = useParams();
  const [access, setAccess] = useState({});
  const { usersList } = useContext(UserContext);

  useEffect(() => {
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].id == id) {
        setAccess({
          read: usersList[i].feature1.read,
          write: usersList[i].feature1.write
        });
        break;
      }
    }
  }, [usersList, id]);

  const editContent = () => {
    document.querySelector('.feature-content').setAttribute("contenteditable", "true");
  }

  var content;

  if (access.read === false) {
    content = (
      <div>
        <Home></Home>
        <h3>You don't have access to this feature!</h3>
      </div>
    );
  } else {
    content = ( <div>
      <Home></Home>
      <div className='feature-content'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      <br />
      {
      access.write && <Button variant="contained" onClick={editContent}>Edit</Button>
    }
    </div>
    );
  }

return (
  <div>
  {content}
  </div>
)
}

export default Feature1;
