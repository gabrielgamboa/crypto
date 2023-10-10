import { BiSearch } from 'react-icons/bi'
import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import { price } from '../../utils/format-number'


interface CoinProps {
  name: string;
  price: string;
  delta_24h: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedDelta: number
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [symbol, setSymbol] = useState("")
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  function getCoins() {
    fetch('https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428&pref=BRL')
      .then(response => response.json())
      .then((data: DataProps) => {
        const dataCoins = data.coins.slice(0, 15)

        const formatedCoins = dataCoins.map(coin => {
          return {
            ...coin,
            formatedPrice: price.format(Number(coin.price)),
            formatedMarket: price.format(Number(coin.market_cap)),
            formatedDelta: parseFloat(coin.delta_24h.replace(',', '.'))
          }
        })


        setCoins(formatedCoins)
        setloading(false)
      })
      .catch(err =>{
        console.log(err)
      })
  }


  useEffect(() => {
    getCoins()
  }, [])

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    
    if (symbol === "") {
      alert('Digite algum símbolo para pesquisar')
      return
    }

    navigate(`/details/${symbol}`)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color='#FFF' size={48}></ClipLoader>
        <h1>Carregando Criptos... </h1>
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          placeholder="Digite o símbolo da moeda"
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}/>
        <button type='submit'>
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
          {coins.map(coin => {
            return (
              <tr className={styles.tr}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <Link className={styles.link} to={`/details/${coin.symbol}`}>
                    <span>{coin.name}</span> / {coin.symbol}
                  </Link>
                </td>
                <td className={styles.tdLabel} data-label="Valor Mercado">
                  {coin.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label="Preço">
                  {coin.formatedPrice}
                </td>
                <td className={coin.formatedDelta >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                  <span>{coin.delta_24h}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}