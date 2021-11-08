import { useParams } from 'react-router-dom';

const Edit = () => {
  const params = useParams();
  console.log(params);

  return <div>Edit</div>;
};

export default Edit;
