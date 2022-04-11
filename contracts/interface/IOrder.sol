// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IOrder {
  function imgUrl() external view returns (string[] memory);
  function name() external view returns (string memory);
  function desc() external view returns (string memory);
  function price() external view returns (uint);

  function fulfilled() external view returns (bool);
  function hasOrderTransaction() external view returns (bool);
  function orderTransactionAddress() external view returns (address);

  function buyOrder() external payable;
  function fulfill() external;
}
