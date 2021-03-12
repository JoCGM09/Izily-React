import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuarioActual, guardarUsuarioActual] = useState();
  const [carga, guardarCarga] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return usuarioActual.updateEmail(email);
  }

  function updatePassword(password) {
    return usuarioActual.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      guardarUsuarioActual(usuario);
      guardarCarga(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    usuarioActual,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!carga && children}
    </AuthContext.Provider>
  );
}
