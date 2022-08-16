import './App.css';
import React, {useState} from 'react';
import { Contract, providers } from "ethers";
import { TailSpin } from  'react-loader-spinner'

function App() {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasTesla, setHasTesla] = useState<boolean>(false);

  const onLoginClick = async () => {
    setIsChecking(true);

    try {
      const carFactoryContract = await getTeslaClubContract();
      const hasTesla = await carFactoryContract.hasTesla();
      setHasTesla(hasTesla);
    } finally {
      setIsChecking(false);
    }
  };

  const getTeslaClubContract = async (): Promise<Contract> => {
    const abi = [
      "function hasTesla() public view returns (bool)",
    ];

    const signer = await getSignerFromMetaMask();
    const contractAddress = "0x2f991c16e94694c6cf2668ec008d30d6f2787396";

    return new Contract(contractAddress, abi, signer);
  }

  const getSignerFromMetaMask = async (): Promise<providers.JsonRpcSigner> => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const metaMaskProvider = new providers.Web3Provider(window.ethereum);
    return metaMaskProvider.getSigner();
  }

  const disconnectState = () => {
    return (<>
    <img src="https://i.ibb.co/X784xFb/Screen-Shot-2022-08-15-at-14-28-07.png" alt=""/>
    {(isChecking) && <TailSpin color="#fcba03" ariaLabel="tail-spin-loading"/>}

    {!isChecking && <div className="button" onClick={onLoginClick}>Login</div>}
    {hasTesla &&
        <div>
          <img src="https://pbs.twimg.com/card_img/1555318370555383809/uBwQ-riq?format=png&name=900x900" alt=""/>
        </div>
    }
    </>);
  }

  const connectState = () => {
    return <img src="https://i.etsystatic.com/33079089/r/il/6cf055/3740443262/il_570xN.3740443262_pkmv.jpg" alt=""/>;
  }

  return (
      <div className="App">
        <header className="App-header">
          {!hasTesla && disconnectState()}
          {hasTesla && connectState()}
        </header>
      </div>
  );
}

export default App;

