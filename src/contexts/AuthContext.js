import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuarioActual, guardarUsuarioActual] = useState();
  const [carga, guardarCarga] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(()=>{
      const user = auth.currentUser; 
      const userUid = user.uid;
      // const email = user.email;
      // const displayName = user.displayName;

      // valores iniciales
      const account = {
        loginid: userUid,
        calendly: " ",
        calificaciones: 0,
        cursos: [],
        descripcion: " ",
        disponible: false,
        esProfesor: false,
        horas: 0,
        imageURL: "https://firebasestorage.com",
        nombre: " ",
        presentacion: " ",
        puntuacion: 0
      }
      db.collection('usuarios').doc().set(account)
      .then(()=>{
        console.log("usuario creado en las colecciones");
      })
    })
    .catch((error) => {
      console.log(error);
    });
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
