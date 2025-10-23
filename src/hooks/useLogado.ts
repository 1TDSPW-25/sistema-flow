type UseLogadoType = {
  userIsLogged: boolean;
  userEmail?: string;
  setLogin: (key: string, value: string) => void;
};

const handleLogin = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const useLogado = (): UseLogadoType => {
  const usuarioLogado = localStorage.getItem("userToken") || null;

  const loginResponse: UseLogadoType = {
    userIsLogged: Boolean(usuarioLogado),
    setLogin: handleLogin,
  };

  if (usuarioLogado) {
    loginResponse.userEmail = usuarioLogado;
  }

  return loginResponse;
};

export { useLogado };
