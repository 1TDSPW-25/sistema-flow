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
  const usuarioLogado = localStorage.getItem("userLogado");
  const isUserLogado =
    typeof usuarioLogado === "string" ? JSON.parse(usuarioLogado) : null;

  const loginResponse: UseLogadoType = {
    userIsLogged: Boolean(usuarioLogado),
    setLogin: handleLogin,
    clearLogin: handleLogout,
  };

  if (isUserLogado) {
    loginResponse.userEmail = isUserLogado.email;
  }

  return loginResponse;
};

export { useLogado };
