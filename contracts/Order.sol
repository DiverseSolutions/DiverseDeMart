// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./OrderTransaction.sol";

contract Order is Ownable {
  event NewOrderTransaction(address indexed _buyer,address indexed _address);
  event OrderFulfilled(address indexed _orderAddress,address indexed _orderTransactionAddress);

  string[] public imgUrl;
  string public name;
  string public desc;
  uint public price;

  bool public fulfilled;
  bool public hasOrderTransaction;
  address public orderTransactionAddress;

  constructor(address accountOwner,string[] memory _imgUrl,string memory _name,string memory _desc,uint _price) {
    _transferOwnership(accountOwner);
    imgUrl = _imgUrl;
    name = _name;
    desc = _desc;
    price = _price;

    fulfilled = false;
  }

  function buyOrder(uint _releaseTime) external payable {
    require(fulfilled == false,"Order Already Sold");
    require(msg.sender != owner(),"Cant Buy Own Order");
    require(hasOrderTransaction == false,"Order is already being transactioned to user");
    require(msg.value == price,"Price Ether Wrong");

    OrderTransaction _orderTransaction = new OrderTransaction(address(this),msg.sender,owner(),_releaseTime);
    (bool data,) = payable(address(_orderTransaction)).call{value: msg.value}("");
    require(data,"Sending Ether To OrderTransaction Failed");

    hasOrderTransaction = true;
    orderTransactionAddress = address(_orderTransaction);

    emit NewOrderTransaction(msg.sender,address(_orderTransaction));
  }

  function fulfill() external {
    require(fulfilled == false,"Order Already Sold");
    require(hasOrderTransaction,"There is no Order Transaction");
    require(msg.sender == orderTransactionAddress,"Caller isn't orderTransaction");

    fulfilled = true;

    emit OrderFulfilled(address(this),orderTransactionAddress);
  } 
}
