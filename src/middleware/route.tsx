import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setAuthError } from "../redux/reducers/rootSlice";
import { RootState } from "../redux/store";

interface ProtectedProps {
  children: ReactNode;
}

interface PublicProps {
  children: ReactNode;
}

interface AdminProps {
  children: ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const authError = useSelector((state: RootState) => state.root.authError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authError) {
      dispatch(setAuthError(false));
    }
  }, [authError, dispatch]);

  if (!token || authError) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return <>{children}</>;
};

export const Public: React.FC<PublicProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <>{children}</>;
  }
  return <Navigate to={"/"} replace={true} />;
};

export const Admin: React.FC<AdminProps> = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token")!);
  const authError = useSelector((state: RootState) => state.root.authError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authError) {
      dispatch(setAuthError(false));
    }
  }, [authError, dispatch]);

  if ((user as { isAdmin: boolean }).isAdmin && !authError) {
    return <>{children}</>;
  }
  return <Navigate to={"/login"} replace={true} />;
};
