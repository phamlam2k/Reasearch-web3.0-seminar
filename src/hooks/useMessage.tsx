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

  const contractAddress = "0x00FF229cfABB2601f30c2f95c6e66dcdb3d60dDA";

  const getBalanceOf = async (addressInput: string) => {
    try{
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      const data = await contract?.balanceOf(addressInput);
      
      console.log('Balance: ', BigNumber.from(data._hex).toString())

    } catch (err) {
      console.log(err)
    }
  };

  const transferMoney = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, account?.library?.getSigner());
  
      await contract
        ?.transfer(address, parseEther(String(number)))
        .then((res: any) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error)
    }
  };

  return { transferMoney, getBalanceOf };
};

export default useMessage;
