import type { UserTipo } from "../../types/gitUserTipo";

export default function Card({usuario}: UserTipo) {
  return (
    <figure className="card">
        <img src={usuario.avatar_url} alt={usuario.login} />
        <hr />
        <figcaption>{usuario.login}</figcaption>
    </figure>
  )
}
