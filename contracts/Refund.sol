//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Refund {

    modifier calculateGas {
        uint256 gas = gasleft();
        _;
        assembly {
            sstore(0,0)
        }
        console.log("Gas used: %d", gas - gasleft());
    }

    function setStorage() public {
        assembly {
            sstore(0,1)
        }
    }

    function consumeGas(uint _gas) public calculateGas {
        uint iter = (_gas - 400) / 176;
        for (uint i = 0; i < iter; i++) {}
    }

}