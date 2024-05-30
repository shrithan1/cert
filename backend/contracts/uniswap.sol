/*
track both token amounts and set an arbitrary ratio
function to add liquidity
functions to swap between the two tokens
function to read the pool state

*/
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// USDC and ETH

// reservesA, reservesB, ierc20 


contract Uniswap {

    uint256 reserveA;
    uint256 reserveB;

    address tokenA;
    address tokenB;

    uint256 ratio;

    constructor(uint256 _reserveA, uint256 _reserveB, address _tokenA, address _tokenB) {
        reserveA = _reserveA;
        reserveB = _reserveB;
        tokenA = _tokenA;
        tokenB = _tokenB;
        ratio = _reserveA / _reserveB;
    }


    // resrve A = 100, reserve B = 50 ratio = 2
    // add 100 of A, add 50 of B
    // add 25 of token B, 


    function add(uint256 amountIn, address tokenAdded) public {
        if (tokenAdded == tokenA) {
            reserveA += amountIn;
            reserveB += amountIn / ratio;
        }
        else if  (tokenAdded == tokenB) {
            reserveB += amountIn;
            reserveA += amountIn * ratio;
        }
        else {
            revert();
        }  
    }

    function read() public view returns(uint256, uint256) {
        return (reserveA, reserveB);
    }

    // 10000 of token A, 100 of token B
    // price  = 100 A for B
    // swap 10 of token B
    // k = 1000000 / 110 = 9090.90909091 of token A
    // give back 10,000 - 9090.9090909 = 909 of token A
    // implied price of 909 / 10 = 90.9 A for B
    // getAmount(10, 100, 10000)

    function getAmount(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
        uint256 total = reserveIn * reserveOut;
        uint256 output = total / (amountIn + reserveIn);
        uint256 amount = reserveOut - output;
        return amount;
    }

    function swap(uint256 amountInput, address tokenFrom) public {
        // swapping token A -> B, token A increases, -> later add more of token B
        if (tokenFrom == tokenA) {
            uint256 newAmountB = getAmount(amountInput, reserveA, reserveB);
            reserveA += amountInput;
            reserveB -= newAmountB;

            uint256 expectedB = reserveA / ratio;
            uint256 amountBadd = expectedB - reserveB;

            add(amountBadd, tokenB);
        }
        else if (tokenFrom == tokenB) {
            uint256 newAmountA = getAmount(amountInput, reserveB, reserveA);
            reserveB += amountInput;
            reserveA -= newAmountA;

           uint256 expectedA = reserveB * ratio;
           uint256 amountAadd = expectedA - reserveA;

            add(amountAadd, tokenA);
        } else {
            revert();
        }
    }




    











}