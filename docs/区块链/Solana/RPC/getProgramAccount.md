# getProgramAccount

用于查询属于特定程序的所有账户的信息

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "getProgramAccounts",
  "params": [
    "<PROGRAM_ID>", // 替换为你要查询的程序ID
    {
      "commitment": "confirmed", // 可选，指定数据的一致性级别
      "filters": [
        {
          "memcmp": {
            "offset": <OFFSET>, // 偏移量，从账户数据的哪个字节开始比较
            "bytes": "<BYTES>" // 需要匹配的字节序列
          }
        },
        {
          " dataSize": <SIZE> // 可选，指定账户数据大小必须等于SIZE
        }
      ]
    }
  ]
}
```

```bash
curl https://api.devnet.solana.com -s -X \
  POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "Stake11111111111111111111111111111111111111",
      {
        "encoding": "jsonParsed",
        "filters": [
          {
            "memcmp": {
              "offset": 12,
              "bytes": "6iNoDCSgcnfuEkwmE6vXhn1UfG3U15eAwnUu1pWib4p5"
          }
        ]
      }
    ]
  }'
```
