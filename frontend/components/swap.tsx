import { Form, FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReadContract, useWriteContract } from "wagmi";
import { Address } from "viem";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reserveB",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenB",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAdded",
        type: "address",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "read",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInput",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenFrom",
        type: "address",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const appName = "Uniswap";
export const projectId = "81a4d179344f689a0e2d8b1ce011e022";
export const address = "0xF3740c412Fc43916F3DbABe5ce86AdE5Cf6aa52c";

const EthSepoliaAddress = 0x1c7d4b196cb0c7b01d743fbc6116a902379c7238;
const AvalancheAddress = 0x5425890298aed601595a70ab815c96711a31bc65;

const initialAmountEth = 100;
const initialAmountAvalanche = 10000;

const formSchema = z.object({
  addreserve: z.coerce.number().gte(1, "Please enter at least 1 currency"),
  swapreserve: z.coerce.number().gte(1, "Please enter at least 1 currency"),
});

export default function Swap() {
  const { writeContract } = useWriteContract();

  async function addReserve(amountIn: number, tokenAdded: Address) {
    writeContract({
      address,
      abi,
      functionName: "add",
      args: [10, EthSepoliaAddress],
    });
  }
  function swapReserve(amountInput: number, tokenFrom: Address) {
    writeContract({
      address,
      abi,
      functionName: "add",
      args: [10, EthSepoliaAddress],
    });
  }
  function ViewReserve() {
    const { data } = useReadContract({
      abi,
      address,
      functionName: "read",
    });
    return data;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addreserve: 1,
      swapreserve: 10,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uniswap</CardTitle>
      </CardHeader>
      <CardDescription>
        Reserves Supply: {ViewReserve()?.toString()}
      </CardDescription>
      <CardContent>
        <Button className="p-2" onClick={() => addReserve(input, address)}>
          Add Reserve!
        </Button>
      </CardContent>
      <CardFooter>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="swapreserve"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Input: </FormLabel>
                  <FormControl>
                    <Input placeholder="Input swap amount" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="text-center">
              Swap!
            </Button>
          </form>
        </FormProvider>
      </CardFooter>
    </Card>
  );
}
