//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.16;

import "@uniswap/v2-core/contracts/UniswapV2Factory.sol";

contract mockFactory is UniswapV2Factory {
    constructor()
        UniswapV2Factory(msg.sender) public {}
}