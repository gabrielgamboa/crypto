// import styles from './detail.module.css'
import { useParams } from 'react-router-dom'

export function Detail() {
  const { symbol } = useParams()

  return (
    <div>
      <h1>Página Detalhes: {symbol}</h1>
    </div>
  )
}