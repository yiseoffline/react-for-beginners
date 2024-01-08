import {useEffect, useState} from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true); //loading 글자를 띄울지 말지를 결정하는 함수
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(0);
  const [getCoin, setGetCoin] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers") // 정보 가져올 url
    .then((response) => response.json()) // url에서 가져온 정보를 json으로 변환
    .then((json) => { 
      setCoins(json); // 변환된 json을 coins(빈 array)에 넣기
      setLoading(false); // loading 글자 지우기
    }
    )
  }, [])
  const writeMoney = (e) => setMyMoney(e.target.value);
  const selectCoin = (e) => setGetCoin(e.target.value);
  return ( //함수 사이에 string 삽입 시: `~`, string 사이에 인자나 함수 삽입 시: ${~}
    <div>
      <h1>the coins! {loading ? null : `(${coins.length})`}</h1>
      <div>
        <input type="number" value={myMoney} onChange={writeMoney} placeholder="WRITE UR USD"></input>
      </div>
      {loading ?
        <strong>Loading...</strong> : 
        <select onChange={selectCoin}>
          <option key="-1">
            select coin
          </option>
        {coins.map((coin, index) =>
          <option key={index} value={coin.quotes.USD.price}>
            {coin.name}({coin.symbol}): ${(coin.quotes.USD.price).toFixed(2)}
          </option>
          )
        }
      </select>
      }
      <div>
        <h2>Coins you can buy: { getCoin > 0 ? (myMoney / getCoin).toFixed(2) : null}</h2>
      </div>
    </div>
  );
}

export default App;
