import NftContratc from "@/components/NftContratc";
import NftList from "@/components/NftList";
import NftMint from "@/components/NftMint";
import { client } from "@/utils/thirdweb";
import { getContract, NFT } from "thirdweb";
import { ethereum } from "thirdweb/chains";
import { getNFTs } from "thirdweb/extensions/erc721";

export default async function Home() {
  const contract = getContract({
    client: client,
    address: "0x6aa0e1910353af11f1f21eb5b2e4a0e9b0374d8a",
    chain: ethereum,
  });

  const nfts = await getNFTs({
    contract,
    start: 1,
    count: 100,
  });
  console.log({ nfts });
  // return (
  //   <div className="grid grid-cols-4 gap-4">
  //     {nfts.map((val: NFT) => {
  //       return <NftList val={val} key={val.id} />;
  //     })}
  //   </div>
  // );
  return(
    <>
    <NftContratc/>
    
    </>
  )
}
