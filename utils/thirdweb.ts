import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!,
});
