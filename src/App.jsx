import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [showPlusOne, setShowPlusOne] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [boost, setBoost] = useState(6500);
  const [coinPerTap, setcoinPerTap] = useState(1);
  const [level, setLevel] = useState(1);
  const [isdisablet, setIsdisablet] = useState(false);
  let [coin, setCoin] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBoost((prevBoost) => (prevBoost < 6500 ? prevBoost + 3 : 6500));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBtn = (event) => {
    if (!isdisablet) {
      const rect = event.currentTarget.getBoundingClientRect();
      setClickPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      levelUp()
      setShowPlusOne(true);
      boostCalc()
      setCoin(coin + coinPerTap);
      setTimeout(() => {
        setShowPlusOne(false);
      }, 500);
    }

  };

  function levelUp() {
    if (coin == 20) {
      setLevel((prevLevel) => prevLevel + 1);
      setcoinPerTap(level * 2 + 1);
    }
    if (coin > 99 && level == 2) {
      setLevel((prevLevel) => prevLevel + 1);
      setcoinPerTap(level * 2 + 1);
    }
    if (coin > 99 && level == 3) {
      setLevel((prevLevel) => prevLevel + 1);
      setcoinPerTap(level * 2 + 2);
    }
  }


  function boostCalc() {
    if (boost - coinPerTap < coinPerTap) {
      setIsdisablet(true);
      setBoost(boost - coinPerTap);
    } else {

      setBoost(boost - coinPerTap);
    }
  }






  return (
    <div className='main'>
      <div className="box">
        <h2>Hamster Kombat</h2>
        <div className="header">
          <div className="header-box">
            <h3>Earn per tap</h3>
            <img src="./coin.png" alt="coin" /> <span>+{coinPerTap}</span>
          </div>
          <div className="header-box">
            <h3>Coins to level</h3>
            <img src="./coin.png" alt="coin" /> <span>+{level}</span>
          </div>
          <div className="header-box">
            <h3>Profit per hour</h3>
            <img src="./coin.png" alt="coin" /> <span>+{coinPerTap}</span>
          </div>
        </div>
        <div className="hamster-main">
          <h1><img src="./coin2.png" alt="" />{coin}</h1>
          <div style={{ position: 'relative' }}>
            <button onClick={handleBtn} className='hamster-btn'>
              <img src="./hamster.png" alt="" />
            </button>
            {showPlusOne && (
              <span
                style={{
                  position: 'absolute',
                  left: clickPosition.x,
                  top: clickPosition.y - 50,
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  animation: 'floatUp 0.5s ease-out',
                  pointerEvents: 'none',
                }}
              >
                +{coinPerTap}
              </span>
            )}
          </div>
          <div className="boost">
            <h3><img src="./Vector.png" alt="" />{boost}/6500</h3>
            <h4>Boost</h4>
          </div>
        </div>

        <div className="hamster-footer">
          <div className="footer-menu">
            <img src="./Union.png" alt="" />
            <p>Exchange</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-gavel"></i>
            <p>Mine</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-users"></i>
            <p>Friends</p>
          </div>
          <div className="footer-menu">
            <i class="fa-solid fa-coins"></i>
            <p>Earn</p>
          </div>
          <div className="footer-menu">
            <img src="./airdrop.png" alt="" />
            <p>Airdrop</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
