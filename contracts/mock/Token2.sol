//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token2 is ERC20 {
    constructor()
        ERC20("Token2", "TKN2") {
            _mint(msg.sender, 2 * (10 ** 6) * (10**18));
        }
    
}