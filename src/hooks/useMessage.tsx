import { BigNumber, ethers } from "ethers";
import { useReducer, useState } from "react";
import { reducer, StateType } from "../utils/reducer";
import contractABI from "../contract/index.json";
import { useSelector } from "react-redux";
import { parseEther } from "ethers/lib/utils";
import { toast } from "react-toastify";

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
};

const useMessage = () => {
  const { address: account }: any = useSelector((state) => state);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const contractAddress = "0xA4BF3B264605cF5701C63aB7206BcF6F9fcf5B80";

  const mint = async (address: any, amount: any) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        account?.library?.getSigner()
      );

      const data = await contract?.mint(address, amount);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getBalanceOf = async (addressInput: string) => {
    try {
      setLoadingBalance(true);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        account?.library?.getSigner()
      );

      const data = await contract?.balanceOf(addressInput);
      setLoadingBalance(false);
      return BigNumber.from(data._hex).toString();
    } catch (err) {
      console.log(err);
    }
  };

  const transferMoney = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        account?.library?.getSigner()
      );

      const data = await contract?.transfer(
        address,
        parseEther(String(number))
      );

      return data;
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const approveToken = async (address: any, number: any) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        account?.library?.getSigner()
      );

      const data = await contract?.approve(address, parseEther(String(number)));

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const allowance = async (owner: any, spender: any) => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        account?.library?.getSigner()
      );

      const data = await contract?.allowance(owner, spender)

      return data
    } catch (error) {
      console.log(error);
    }
  };

  return {
    transferMoney,
    getBalanceOf,
    approveToken,
    mint,
    allowance,
    loadingBalance,
  };
};

export default useMessage;
