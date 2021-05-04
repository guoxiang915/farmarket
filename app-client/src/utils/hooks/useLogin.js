import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/actions/appActions';

const useLogin = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.authState);

  const checkLogin = () => {
    if (isLoggedIn) {
      return true;
    }

    dispatch(openModal('login-modal'));
    return false;
  };

  return { checkLogin };
};

export default useLogin;
