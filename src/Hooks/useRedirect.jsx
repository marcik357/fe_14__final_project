import { useNavigate } from 'react-router-dom';

const useRedirect = (path) => {
  const navigate = useNavigate();

  const redirectTo = () => {
    navigate(path);
  };

  return redirectTo;
};

export default useRedirect;