"use client";
import { createThirdwebClient, NFT } from "thirdweb";
import { resolveScheme } from "thirdweb/storage";

const NftList = ({ val }: { val: NFT }) => {
  const client = createThirdwebClient({
    clientId: "074b6a8558ffbe2e992a7d07c34c481b",
  });
  const url = resolveScheme({ client, uri: val.metadata.image! });
  console.log({ url });
  return (
    <div>
      <img src={url} alt="" className="w-16 h-16 object-contain" />
      <p>{val?.metadata.name}</p>
    </div>
  );
};

export default NftList;
