import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Uniswap", (m) => {
  const apollo = m.contract("Uniswap", [100, 10000, 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238, 0x5425890298aed601595a70ab815c96711a31bc65]);
  return { apollo };
});