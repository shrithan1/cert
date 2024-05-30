import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Wallet({ isConnected }: { isConnected: boolean }) {
  if (!isConnected) {
    return (
      <>
        <ConnectButton />
      </>
    );
  }
  return (
    <>
      <ConnectButton chainStatus={"full"} />
    </>
  );
}
