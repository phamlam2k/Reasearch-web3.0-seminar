import { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import Button from "../../../commons/button";
import { addAddress } from "../../../hooks/useAddress";
import { reducer, StateType } from "../../../utils/reducer";
import style from './style.module.css'

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
}

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { address: account }: any = useSelector((state: any) => state);
  const { provider, address, chainId } = state
  const dispatchAddress = useDispatch()

  const handleConnect = useCallback(async function () {
    try {
      if ((window as any).ethereum) {
        const providers = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );

        await providers.send("eth_requestAccounts", []);

        const signer = providers.getSigner();

        dispatch({
          type: 'SET_WEB3_PROVIDER',
          provider: providers,
          address: await signer.getAddress(),
          chainId: await signer.getChainId(),
        })
        const action = addAddress({
          address: await signer.getAddress(),
          chainId: await signer.getChainId(),
          library: providers,
        })
        dispatchAddress(action)
      } else {
        alert("wtf");
      }
    } catch (err) {
      console.log("Error Connect with metamask: ", err);
    }
  }, []);

  useEffect(() => {
    try {
      if ((window as any).ethereum) {
        const { ethereum }: any = window;
        const handleAccountsChanged = (accounts: string[]) => {
          dispatch({
            type: 'SET_ADDRESS',
            address: accounts[0],
          })
        };

        const handleChainChanged = (_hexChainId: string) => {
          console.log(_hexChainId);
        };

        const handleDisconnect = (error: { code: number; message: string }) => {
          void handleDisconnectWallet();
        };

        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);
        ethereum.on("disconnect", handleDisconnect);

        return () => {
          if (ethereum?.removeListener) {
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("chainChanged", handleChainChanged);
            ethereum.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  const handleDisconnectWallet = useCallback(async function () {
    const { ethereum }: any = window;
    if (ethereum?._handleDisconnect && typeof ethereum._handleDisconnect === "function") {
      await ethereum._handleDisconnect();
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
      const action = addAddress({
        address: null,
        chainId: null,
        library: null,
      })
      dispatchAddress(action)
			window.location.reload()
    }
		
  }, []);

  return (
    <div className={style.content}>
      <div className={style.box}>
        {account?.address !== null ? (
          <>
            <div>Welcome {address}!</div>
            <div>Chain ID: {chainId}</div>
            <Button text={"Disconnect"} onClick={handleDisconnectWallet} />
          </>
        ): (
					<Button text={"Connect"} onClick={handleConnect} />
				)}
      </div>
    </div>
  );
};

export default Header;
