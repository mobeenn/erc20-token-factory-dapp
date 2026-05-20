// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyERC20 {

    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address owner
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _supply * 10**18;

        balanceOf[owner] = totalSupply;

        emit Transfer(address(0), owner, totalSupply);
    }
}

contract ERC20Factory {

    address[] public allTokens;

    event TokenCreated(
        address tokenAddress,
        address owner,
        string name,
        string symbol,
        uint256 supply
    );

    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _supply
    ) public returns(address) {

        MyERC20 token = new MyERC20(
            _name,
            _symbol,
            _supply,
            msg.sender
        );

        allTokens.push(address(token));

        emit TokenCreated(
            address(token),
            msg.sender,
            _name,
            _symbol,
            _supply
        );

        return address(token);
    }

    function getAllTokens() public view returns(address[] memory) {
        return allTokens;
    }
}