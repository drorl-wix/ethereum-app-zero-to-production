import './App.css';
import React, {useState} from 'react';
import { Contract, providers } from "ethers";
import { TailSpin } from  'react-loader-spinner'

function App() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');

  const onBuyTeslaClick = async () => {
    setIsCreating(true);

    try {
      const teslaFactoryContract = await getTeslaFactoryContract();
      const buyTeslaCall = await teslaFactoryContract.buyTesla();
      const transaction = await buyTeslaCall.wait();
      setTransactionHash(transaction.transactionHash);
    } finally {
      setIsCreating(false);
    }
  };

  const getTeslaFactoryContract = async (): Promise<Contract> => {
    const abi = [
      "function buyTesla() public",
    ];

    const signer = await getSignerFromMetaMask();
    const contractAddress = "0x91D851a9aE3FAe94dD74B21e00908EBe8cFbf1B6"; // Replace it with your contract address

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

          {!isCreating && <div className="button" onClick={onBuyTeslaClick}>Buy Tesla</div>}
          {transactionHash && <a href={`https://goerli.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer"> View in Etherscan </a>}
        </header>
      </div>
  );
}

export default App;
