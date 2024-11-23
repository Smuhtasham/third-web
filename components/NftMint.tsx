import React, { useState, useEffect } from "react";
import { lazyMint, mintTo } from "thirdweb/extensions/erc721"; // Import mintTo
import {
  createThirdwebClient,
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
} from "thirdweb"; // Import sendTransaction
import { useActiveAccount } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";

const NftMint = () => {
  const account = useActiveAccount();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const client = createThirdwebClient({
      clientId: "074b6a8558ffbe2e992a7d07c34c481b",
    });
    const address = "0xE4c061904Fdd2fD2c6312362Fa7C8F80077F385B"; // Contract address
    const contract = getContract({
      client,
      address: address,
      chain: baseSepolia,
    });
    console.log({ contract });
    if (!contract) {
      alert("Contract is not initialized yet.");
      return;
    }

    if (!account) {
      alert("Please connect your wallet.");
      return;
    }

    try {
        const transaction = lazyMint({
            contract,
            nfts: [
              {
                name: "My NFT",
                description: "This is my NFT",
                image: "https://example.com/image.png",
              },
            ],
          });
           
          await sendTransaction({ transaction, account });

      console.log("NFT Minted successfully!");
      alert("NFT successfully minted!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Check the console for more details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[50%] m-auto my-40 gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        Mint
      </button>
    </form>
  );
};

export default NftMint;
