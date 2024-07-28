// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestToken is ERC721 {
    uint256 private nextTokenId;

    constructor() ERC721("YbnDao", "YBN") {
        nextTokenId = 1; // Start token IDs at 1
    }

    // Private mint function
    function _mintToken() private {
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }

    // Public function to allow external calls to mint tokens
    function publicMintToken() external {
        _mintToken();
    }
}

