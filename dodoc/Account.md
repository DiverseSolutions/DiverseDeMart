# Account









## Methods

### createOrder

```solidity
function createOrder(string[] _imgUrl, string _name, string _desc, uint256 _price) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _imgUrl | string[] | undefined |
| _name | string | undefined |
| _desc | string | undefined |
| _price | uint256 | undefined |

### getOrderLength

```solidity
function getOrderLength() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### orders

```solidity
function orders(uint256) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |



## Events

### NewOrder

```solidity
event NewOrder(uint256 indexed _orderId, address indexed _address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _orderId `indexed` | uint256 | undefined |
| _address `indexed` | address | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |



