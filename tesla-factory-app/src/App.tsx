import './App.css';
import React, {useState} from 'react';
import { Contract, providers } from "ethers";
import { TailSpin } from  'react-loader-spinner'

function App() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  const onCreateTeslaCarClick = async () => {
    setIsCreating(true);

    try {
      const teslaFactoryContract = await getTeslaFactoryContract();
      const createCarCall = await teslaFactoryContract.createTesla();
      const transaction = await createCarCall.wait();
      setTransactionHash(transaction.transactionHash);
    } finally {
      setIsCreating(false);
    }
  };

  const getTeslaFactoryContract = async (): Promise<Contract> => {
    const abi = [
      "function createTesla() public",
    ];

    const signer = await getSignerFromMetaMask();
    const contractAddress = "0x2f991C16E94694C6CF2668eC008D30d6f2787396";

    return new Contract(contractAddress, abi, signer);
  }

  const getSignerFromMetaMask = async (): Promise<providers.JsonRpcSigner> => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const metaMaskProvider = new providers.Web3Provider(window.ethereum);
    return metaMaskProvider.getSigner();
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1>Tesla Factory</h1>
          <img src="https://www.leaseplan.com/-/media/leaseplan-digital/int/business/images/car-spotlight-pages/tesla/tesla-3/tesla-model-3-image-1.png?iar=0&rev=44add536550041e5b55cac337bb9c481&mw=1300" alt=""/>
          {(isCreating) && <TailSpin color="#fcba03" ariaLabel="tail-spin-loading"/>}

          {!isCreating && <div className="button" onClick={onCreateTeslaCarClick}>Get Tesla</div>}
          {transactionHash && <a href={`https://goerli.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer"> View in Etherscan </a>}
        </header>
      </div>
  );
}

export default App;

