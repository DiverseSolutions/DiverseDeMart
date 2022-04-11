// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Order.sol";

contract Account is Ownable {
  using Counters for Counters.Counter;

  event NewOrder(uint indexed _orderId,address indexed _address);

  mapping(uint => address) public orders;
  Counters.Counter private _orderId;

  constructor(address accountOwner) {
    _transferOwnership(accountOwner);
  }

  function createOrder(string[] memory _imgUrl,string memory _name,string memory _desc,uint _price) external onlyOwner {
    _orderId.increment();

    Order _order = new Order(msg.sender,_imgUrl,_name,_desc,_price);
    orders[_orderId.current()] = address(_order);

    emit NewOrder(_orderId.current(),address(_order));
  }

  function getOrderLength() view external returns (uint) {
    return _orderId.current();
  }

}
