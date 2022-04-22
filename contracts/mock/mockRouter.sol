//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;

import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";

contract mockRouter is UniswapV2Router02 {
    constructor(address factory_, address WETH_)
        UniswapV2Router02(factory_, WETH_) public {}
}