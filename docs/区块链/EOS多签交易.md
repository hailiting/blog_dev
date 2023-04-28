# EOS 多签交易

```shell
amcli push action -djs amax.token transfer ["user1","user2","1.00000000 AMAX",""] -puser1@owner
```

transfer
amax.token

["user1","user2","1.00000000 AMAX",""]

```
[
  {account: amax.token, name: transfer, authorization: [{actor: msigtest1111, permission: active}],
data: {from: msigtest1111, to: merchantx, quantity: 1.00000000 AMAX, memo: }}
]
```
