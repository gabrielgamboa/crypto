import styles from './detail.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { price } from '../../utils/format-number';
import ClipLoader from 'react-spinners/ClipLoader'

interface CoinDetailProps {
  name: string;
  price: string;
  delta_24h: string;
  low_24h: string;
  high_24h: string;
  total_volume_24h: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  formatedDelta: number;
  error?: string;
}

export function Detail() {
  const { symbol } = useParams()

  const [coinDetail, setCoinDetail] = useState<CoinDetailProps>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  function getCoinDetails() {
    fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=67f9141787211428&symbol=${symbol}`)
      .then(response => response.json())
      .then((data: CoinDetailProps) => {
        const resultData = {
          ...data,
          formatedPrice: price.format(Number(data.price)),
          formatedMarket:  price.format(Number(data.market_cap)),
          formatedLowPrice:  price.format(Number(data.low_24h)),
          formatedHighPrice:  price.format(Number(data.high_24h)),
          formatedDelta: parseFloat(data.delta_24h.replace(',', '.'))
        }

        setCoinDetail(resultData)
        setLoading(false)
      })
      .catch(() => {
        window.alert('Moeda não encontrada, tente novamente com um nome válido')
        navigate('/')
      })
  }

  useEffect(() => {
    getCoinDetails()
  })


  if (loading) {
    return (
      <div className={styles.container}>
        <ClipLoader color='#FFF' size={48}></ClipLoader>
        <h1>Carregando informações...</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>
        {coinDetail?.name}
      </h1>
      <p>{coinDetail?.symbol}</p>

      <section className={styles.coinInfos}>
        <p><strong>Preço:</strong> {coinDetail?.formatedPrice}</p>
        <p><strong>Maior preço 24h:</strong> {coinDetail?.formatedHighPrice} </p>
        <p><strong>Menor preço 24h:</strong> {coinDetail?.formatedLowPrice} </p>
        <p><strong>Delta 24h:</strong> <span className={coinDetail?.formatedDelta && coinDetail?.formatedDelta >= 0 ? styles.profit : styles.loss}>{coinDetail?.delta_24h} </span> </p>
        <p><strong>Valor mercado:</strong> {coinDetail?.formatedMarket} </p>
      </section>
    </div>
  )
}