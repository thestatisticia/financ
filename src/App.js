import React, { useState } from 'react';
import Web3 from 'web3';
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import "./App.css";
import { ABI } from "./abi.mjs";

function App() {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [connected, setConnected] = useState(false);

  const web3 = new Web3(window.ethereum);
  web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/"));

  const contractInstance = address ? new web3.eth.Contract(ABI, address) : null;

  // Connect Metamask
  async function connectWallets() {
    try {
      window.alert('Please make sure you are connected to the Swisstronik network');
      const accounts = await web3.eth.requestAccounts();
      setConnected(true);
      console.log(accounts);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  }

  // Get the token name
  async function getName() {
    try {
      const result = await contractInstance.methods.name().call();
      setName(result);
    } catch (error) {
      console.error('Error getting name:', error);
    }
  }

  // Get the token symbol
  async function getSymbol() {
    try {
      const result = await contractInstance.methods.symbol().call();
      setSymbol(result);
    } catch (error) {
      console.error('Error getting symbol:', error);
    }
  }

  // Get total supply
  async function getTotalSupply() {
    try {
      const result = await contractInstance.methods.totalSupply().call();
      
      const formattedResult = web3.utils.fromWei(result, 'ether');
      setTotalSupply(formattedResult);
    } catch (error) {
      console.error('Error getting total supply:', error);
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='new-header'>Swisstronik dApp</h1>

        {!connected ? (
          <button onClick={connectWallets} className='button button-connect'>
            Connect Wallet
          </button>
        ) : (
          <>
            {/* Input field for contract address */}
            <input
              type="text"
              placeholder="Enter ERC20 contract address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='input-address'
            />
            <br />

            {/* Buttons to get data */}
            <button onClick={getName} className='button button-name'>
              Get Name
            </button>
            <button onClick={getSymbol} className='button button-symbol'>
              Get Symbol
            </button>
            <button onClick={getTotalSupply} className='button button-supply'>
              Get Total Supply
            </button>

          {/*Display the results*/}
            <div className='result'>
              <p><strong>Name:</strong> {name || '--'}</p>
              <p><strong>Symbol:</strong> {symbol || '--'}</p>
              <p><strong>Total Supply:</strong> {totalSupply || '0'}</p>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
