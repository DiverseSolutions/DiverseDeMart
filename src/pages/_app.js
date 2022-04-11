import { useEffect,useState } from 'react';

import '../styles/globals.css'
import Nav from '../components/Nav.js';

function MyApp({ Component, pageProps }) {
  const [hasMetamask,setHasMetamask] = useState(false)
  const [metamask,setMetamask] = useState(null)
  const [account,setAccount] = useState(null)
  const [network,setNetwork] = useState(null)

  return (
    <>
      <Nav 
        account={account} setHasMetamask={setHasMetamask}
        setAccount={setAccount} hasMetamask={hasMetamask}
        metamask={metamask} setMetamask={setMetamask} 
        network={network} setNetwork={setNetwork}
      />

      { metamask == null || account == null ? (
        <div class="hero min-h-screen bg-base-200">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">Problem 🥲</h1>
              <p class="py-6">Metamask isn't connected or Network is wrong</p>
              <a class="btn btn-primary">Diverse Github</a>
            </div>
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      ) }
    </>
  )
}

export default MyApp
