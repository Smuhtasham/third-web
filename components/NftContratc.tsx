"use client";
import React, { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { baseSepolia, polygon } from "thirdweb/chains";
import { deployERC721Contract } from "thirdweb/deploys";
import { useActiveAccount, useConnect } from "thirdweb/react";
import {
  createWallet,
  injectedProvider,
  walletConnect,
} from "thirdweb/wallets";
import NftMint from "./NftMint";

const NftContratc = ({}) => {
  const [contract, setContract] = useState("");
  const { connect, isConnecting, error: errorConnect } = useConnect();
  const account = useActiveAccount();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
  });

  const client = createThirdwebClient({
    clientId: "074b6a8558ffbe2e992a7d07c34c481b",
  });
  const wallet = walletConnect();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      symbol: "",
      description: "",
    });
    if (account != null) {
      var chain = baseSepolia;
      const contractAddress = await deployERC721Contract({
        chain,
        client,
        account,
        type: "TokenERC721",
        params: {
          name: formData.name,
          description: formData.description,
          symbol: formData.symbol,
        },
      });
      setContract(contractAddress);
      console.log(contractAddress)
    }
  };

  const connectWallet = async (walletId: string) => {
    const wallet = createWallet("io.metamask");

    try {
      const data = await connect(async () => {
        if (walletId === "io.metamask" && injectedProvider(walletId)) {
          await wallet.connect({ client });
        } else {
          await wallet.connect({
            client,
            walletConnect: { showQrModal: true },
          });
        }
        return wallet;
      });

      console.log("Wallet connected:", data);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-6 flex justify-end">
        {account ? (
          <div>
            <button className="bg-[#00000a] text-white py-2 px-4 text-[20px] rounded-xl">
              Disconnect
            </button>
            <h1>{account?.address}</h1>
          </div>
        ) : (
          <button
            onClick={() => connectWallet("io.metamask")}
            className="bg-[#00000a] text-white py-2 px-4 text-[20px] rounded-xl"
          >
            Connect
          </button>
        )}
      </div>
      <div className="flex flex-col w-[40%] gap-6 m-auto mt-60">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Name</label>
            <input type="text" className="border border-b-amber-700" />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="symbol">Symbol</label>
            <input type="text" className="border border-b-amber-700" />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description</label>
            <input type="text" className="border border-b-amber-700" />
          </div>
          <button
            type="submit"
            className="bg-orange-300 text-white mt-6 rounded-lg py-2 px-4"
          >
            Submit
          </button>
        </form>
      </div>
      <NftMint />
    </>
  );
};

export default NftContratc;
