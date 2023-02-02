import React, {useState, useEffect} from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Image from 'next/image';

import imageETH from '../ether.jpg';
import creator from "../avataar.png";

const Home = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState('');

  const failMessage = 'Please install MetaMask & connect your Metamask';
  const sucessMessage = 'Your account is connected successfully.';

  const INFURA_ID = "6664a8fd3d844a95a275e6e098d9f0fc";
  const provider = new ethers.providers.JsonRpcProvider(`https://celo-mainnet.infura.io/v3/${INFURA_ID}`);

  const checkIfWalletConnected = async () => {
    // const {ethereum} = window;  
    if (!window.ethereum) return;

    const accounts = await window.ethereum.request({method :"eth_accounts"});
    //console.log(accounts);
    
    if (accounts.length) {
      setCurrentAccount(accounts[0])
    }else{
      console.log("Fail");
    }

    const address = "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5";
    const balance = await provider.getBalance(address);
    const showBalance = `${ethers.utils.formatEther(balance)} ETH\n`;
    // console.log(showBalance);
    setBalance(showBalance);
  };

  const cWallet =async () => {
    if (!window.ethereum) {
      return console.log(failMessage);
    }

    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(accounts[0]);
    window.location.reload();
  }

  useEffect(() => {
    checkIfWalletConnected();
  });


  useEffect(() => {
   async function accountChanged(){
    window.ethereum.on('accountsChanged', async function(){
      const accounts = await window.ethereum.request({method: "eth_accounts"},);

      if(accounts.length){
        setCurrentAccount(accounts[0])
      }else{
        window.location.reload();
      }
    })
  }
  accountChanged();
}, []);
  
  
  
  return (
    <div className="card-container">
      {!currentAccount? "" : <span className="pro">PRO</span>}
      <Image src={creator} alt='profileimg' width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount? (
        <div>
          <div className="message">
            <p>{failMessage}</p>
          </div>

          <Image src={imageETH} alt='ether' width={100} height={100}/>
          <p>Welcome to ether account balance checker</p>
        </div>

      ) : (
        <div>
          <h6>Verified <span className='tick'>&#10004;</span></h6>
          <p>Ether account and balance Checker <br/> find account details</p>
          <div className='buttons'>
            <button className='primary ghost' onClick={() => {}}>
              Ether Account details
            </button>
          </div>
        </div>
      )}

      {!currentAccount && !connect ? (
        <div className='buttons'>
          <button className='primary' onClick={() => cWallet()}>Connect Wallet</button>
        </div>
      ) : (
        <div className='skills'>
          <h6>Your ether
            <ul>
              <li>Account</li>
              <li>{currentAccount}</li>
              <li>Balance</li>
              <li>{balance}</li>
            </ul>
          </h6>
        </div>
      )}
    </div>
  )
}

export default Home