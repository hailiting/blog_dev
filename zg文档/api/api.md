# api
## nft
### 1. Tp Nft合集列表
- method: `get`
- url: `https://preserver.mytokenpocket.vip/v1/wallet/token_list`
- params: 
    - address: `0xC566f972059D2B5625FebBA968536e73AE6Ab637`
    - count: 500
    - start: 0
    - token_protocol: 1,2
        - `token_protocol: 1` nft721
        - `token_protocol: 2`  1155
    - blockchain_id: 1
### 2. debank币种数量
- method: `get`
- url: `https://pro-openapi.debank.com/v1/user/token_list`
- params: 
    - id: 0xC566f972059D2B5625FebBA968536e73AE6Ab637
    - chain_id: eth
    - is_all: false
    - has_balance: true

### 3. Tp Nft合集个数查询
- method: `post`
- url: `https://preserver.mytokenpocket.vip/v1/wallet/token_balance_list`
- params: 
    - blockchain_id: 1
    - address: 0xC566f972059D2B5625FebBA968536e73AE6Ab637
    - token_list: [
        {address: 0xfce969f7e15d9a0ed4f3d0f6e50653cf5adca627,bl_symbol: UNKNOWN,token_protocol: 2},
        {address: 0x495f947276749Ce646f68AC8c248420045cb7b5e,bl_symbol: OPENSTORE,token_protocol: 2},
        {address: 0x51cebd11b6b17e7f0613647089e5b2692e7e9a58,bl_symbol: UNKNOWN,token_protocol: 2},
        {address: 0x7789493c16e2e50410eb2c4312efb9c31d9cf1d8,bl_symbol: UNKNOWN,token_protocol: 2},
        {address: 0xd9ddf01163a45b69b8cdbffd635a7405fb39a516,bl_symbol: IKHY,token_protocol: 2},
        {address: 0x7789493c16e2e50410eb2c4312efb9c31d9cf1d8,bl_symbol: ,token_protocol: 2}
    ]
### 4. Tp Nft合集详情
- method: `get`
- url: `https://preserver.mytokenpocket.vip/v1/wallet/nft_token_info_list`
- params: 
    - count: 32
    - start: 0
    - token_protocol: 2
    - owner_address: 0xC566f972059D2B5625FebBA968536e73AE6Ab637
    - contract_address: 0x495f947276749Ce646f68AC8c248420045cb7b5e
    - blockchain_id: 1