import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Button from "../../../commons/button";
import style from './style.module.css'

const Header = () => {
	const [provider, setProvider] = useState<any>();
  const [info, setInfo] = useState({
    account: "",
    chainId: 0,
  });

  const handleConnect = useCallback(async function () {
    try {
      if ((window as any).ethereum) {
        const providers = new ethers.providers.Web3Provider(
          (window as any).ethereum,
          "any"
        );

        await providers.send("eth_requestAccounts", []);

        const signer = providers.getSigner();

        setProvider(providers);
        setInfo({
          account: await signer.getAddress(),
          chainId: await signer.getChainId(),
        });
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
          setInfo((prev) => ({ ...prev, account: accounts[0] }));
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
			window.location.reload()
			setInfo({
				account: "",
				chainId: 0,
			});
    }
		
  }, []);

  return (
    <div className={style.content}>
      <div className={style.box}>
        {info?.account !== "" ? (
          <>
            <div>Address: {info?.account}</div>
            <div>Chain ID: {info?.chainId}</div>
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
