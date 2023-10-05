// import styles from './detail.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { price } from '../../utils/format-number';

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
  error?: string;
}

export function Detail() {
  const { symbol } = useParams()

  const [coinDetail, setCoinDetail] = useState<CoinDetailProps>()
  const [loading, setLoading] = useState(true)

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
        }

        setCoinDetail(resultData)
        setLoading(false)
      })
  }

  useEffect(() => {
    getCoinDetails()
  })


  if (loading) {
    return (
      <div>
        <h1>Carregando informações...</h1>
      </div>
    )
  }

  return (
    <div className="cointainer">
      <h1 className="title">
        {coinDetail?.name}
      </h1>
      <p className="detail">{coinDetail?.symbol}</p>
    </div>
  )
}