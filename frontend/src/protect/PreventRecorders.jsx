import { Navigate } from 'react-router-dom';
/* This special protect component prevents recorders from viewing the Recorders page or adding recorders -- It restricts this functionality to only actual Admins */
const PreventRecorders = ({ admin, redirectPath = '/login', children }) => {
  if (!admin) {
    return <Navigate to={redirectPath} replace />;
  }

  if (
    admin.admin_level !== 'Administrator' ||
    admin.admin_level === 'Recorder'
  ) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PreventRecorders;
