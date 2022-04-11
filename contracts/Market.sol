// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Account.sol";

contract Market is Ownable {
  event NewAccount(address indexed _owner,address indexed _address);

  mapping(address => address) public accounts;
  mapping(address => bool) public hasAccount;
  address[] private accountKeys;

  function createAccount() external {
    require(hasAccount[msg.sender] == false,"User already has an account");

    Account _account = new Account(msg.sender);
    accounts[msg.sender] = address(_account);
    hasAccount[msg.sender] = true;
    accountKeys.push(msg.sender);


    emit NewAccount(msg.sender,address(_account));
  }

  function getAccountLength() view external returns (uint) {
    return accountKeys.length;
  }

}
