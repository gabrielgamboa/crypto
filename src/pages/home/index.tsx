import { BiSearch } from 'react-icons/bi'
import styles from './home.module.css'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder="Digite o nome da moeda" type="text" />
        <button>
          <BiSearch size={30} color="#FFF"/>
        </button>
      </form>

      <table>
        <thead className={styles.thead}>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor Mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.tdLabel}>
              <Link to="/detail/btc">
                <span>Bitcoin</span> / BTC
              </Link>
            </td>
            <td className={styles.tdLabel}>
                            R$19.000,00
            </td>
            <td className={styles.tdLabel}>
                            R$29.000,00
            </td>
            <td className={styles.tdLabel}>
              <span>-5.29</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}