import { useEffect } from 'react';

export default function Nav({ account , setAccount , hasMetamask , setHasMetamask , metamask , setMetamask , network , setNetwork }){

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true)
      setMetamask(window.ethereum)

      if(window.ethereum.selectedAccount != null){
        setAccount(window.ethereum.selectedAccount)
      }
    }
  },[])

  useEffect(() => {
    if(window.ethereum.selectedAccount != null){
      setAccount(window.ethereum.selectedAccount)
    }
  },[metamask])

  useEffect(() => {
    if(account != null){
      setNetwork(window.ethereum.networkVersion)
    }
  },[account])

  async function handleMetamaskConnect(){
    if(window.ethereum.selectedAccount != null){
      setAccount(window.ethereum.selectedAccount)
      return;
    }

    try{
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    }catch(e){
      if (error.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl"><span className="text-blue-600 mr-1">Diverse</span> DeMart</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          { network == null && network !== '5777' ? (
            <li><a>Network Not Ganache</a></li>
          ) : (
            <li><a>Ganache</a></li>
          ) }

          { hasMetamask && account == null && (
            <li><a className="btn btn-primary text-white" onClick={handleMetamaskConnect}>Connect To Metamask</a></li>
          ) }
        </ul>
      </div>
    </div>
  )
}
