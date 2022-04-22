import { BigNumber, ethers } from "ethers";
import { useReducer } from "react";
import { reducer, StateType } from "../utils/reducer";
import contractABI from '../contract/index.json'
import { useSelector } from "react-redux";
import { parseEther } from "ethers/lib/utils";

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
};

const useMessage = () => {
  const { address: account }: any = useSelector((state) => state)

  const contractAddress = "0x84F9A6bBbdbf0dF26f713b30fe286c7996A3DEcb";

  const mint = async (address: any ,amount: any) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      await contract
        ?.mint(address, amount)
        .then((res: any) => {
          console.log(res);
        });
    } catch (err) {

    }
  }

  const getBalanceOf = async (addressInput: string) => {
    try{
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      const data = await contract?.balanceOf(addressInput);
      
      return BigNumber.from(data._hex).toString()

    } catch (err) {
      console.log(err)
    }
  };

  const transferMoney = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      const data = await contract?.transfer(address, parseEther(String(number)))

      return data
    } catch (error) {
      console.log(error)
    }
  };

  const approveToken = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      await contract
        ?.approval(address, parseEther(String(number)))
        .then((res: any) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error)
    }
  };

  const allowance = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      await contract
        ?.approval(address, parseEther(String(number)))
        .then((res: any) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error)
    }
  };

  return { transferMoney, getBalanceOf, approveToken, mint, allowance };
};

export default useMessage;
