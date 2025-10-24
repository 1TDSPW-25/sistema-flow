type UseLogadoType = {
  userIsLogged: boolean;
  userEmail?: string;
  setLogin: (key: string, value: string) => void;
  clearLogin: (key: string) => void;
};

const handleLogin = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const handleLogout = (key: string) => {
  localStorage.removeItem(key);
};

const useLogado = (): UseLogadoType => {
  const usuarioLogado = localStorage.getItem("userToken") || null;

  const loginResponse: UseLogadoType = {
    userIsLogged: Boolean(usuarioLogado),
    setLogin: handleLogin,
    clearLogin: handleLogout,
  };

  if (usuarioLogado) {
    loginResponse.userEmail = usuarioLogado;
  }

  return loginResponse;
};

export { useLogado };
