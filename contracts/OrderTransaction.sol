// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interface/IOrder.sol";

contract OrderTransaction {
  address public orderAddress;
  address public buyerAddress;
  address public ownerAddress;
  uint public releaseTime;

  receive() external payable{ }
  fallback() external payable{ }

  constructor(address _orderAddress,address _buyerAddress,address _ownerAddress,uint _releaseTime) {
    orderAddress = _orderAddress;
    buyerAddress = _buyerAddress;
    ownerAddress = _ownerAddress;

    releaseTime = _releaseTime;
  }

  function fulfillOrder() external {
    require(msg.sender == buyerAddress,"Is not order buyer address");

    IOrder(orderAddress).fulfill();

    (bool sent,) = payable(address(buyerAddress)).call{value: address(this).balance}("");

    require(sent,"Order creator paying process failed");
  }

  function releaseToUser() external {
    require(msg.sender == ownerAddress,"Is not order owner address");
    require(block.timestamp >= releaseTime, "Current time is before release time");

    (bool sent,) = payable(address(ownerAddress)).call{value: address(this).balance}("");

    require(sent,"Release to user paying process failed");
  }

  function getBalance() view external returns( uint ){
    return address(this).balance;
  }

}
