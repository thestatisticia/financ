
import Web3 from 'web3';
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import "./App.css"
import {ABI} from "./abi.mjs";
function App() {

    const web3=new Web3(window.ethereum);
    //register plugin
    web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/"));
    const ADDRESS= window.prompt('please enter your ERC20 contract  address you want to interact with');
    const contractInstance=new web3.eth.Contract(ABI,ADDRESS);
    
    //connect metamask
    async function connectWallets() {
      window.alert('Please make sure youa re connected to the swisstronik network');
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts);
    }
    
    async function name() {
      const result= await contractInstance.methods.name().call();
      console.log('name',result);
    }
    async function symbol() {
      const result= await contractInstance.methods.symbol().call()
      console.log('symbol',result);
    }
    
    async function totalSupply() {
       const result = await contractInstance.methods.totalSupply().call()
       console.log('total supply', result)
    }
    
return (
    <div className='App'>
      <header className='App-header'>
      
      <h1 className='new-header'>Swisstronik dApp</h1>
      
      <button onClick={connectWallets} className='button button-click'>connect wallet</button>
      <button className='button button-deposit' onClick={name}>get name</button>
      <button className='button button-withdraw' onClick={symbol}>Symbol</button>
      <button className='button button-supply' onClick={totalSupply}>Total Supply</button>
      </header>
    </div>
  );
}

export default App;