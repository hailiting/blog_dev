# BlockScout 一些环境变量

当前websocket 推送：apps/block_scout_web/lib/block_scout_web/channels/block_channel.ex
需要的websocket 推送：apps/block_scout_web/lib/block_scout_web/views/api/v2/block_view.ex

<!-- cd .. && -->
ssh-add -D && ssh-add -K ~/.ssh/github_do
cd ..  &&  git pull && cd docker-compose/ && sudo docker-compose up 

cd docker-compose/ && sudo docker-compose up


- BlockScout -> 抓RPC的块
  - frontend 纯静态
  - backend 
  
## 通用
| Variable | Required | Description | Default | Version | Need recompile 需要重新编译 | Applications 应用 |
- DATABASE_URL
  - ✅
  - 定义 Postgres 的数据库端点
  - (empty)
  - all
  -
  - API, Indexer
- TEST_DATABASE_URL
  - 在测试时期使用 Postgres 数据库的端点
  - (empty)
  - v6.6.0+
  -
  - API, Indexer
- ETHEREUM_JSONRPC_VARIANT
  - ✅
  - 应用程序节点正在使用哪个 RPC 客户端，(i.e. erigon, geth, nethermind, besu, filecoin, or ganache)
  - ganache
  - all
  -
  - API, Index
- ETHEREUM_JSONRPC_HTTP_URL
  - ✅
  - RPC端点 used to fetch blocks, transactions, receipts, tokens.
  - localhost:8545
  - all
  - API, Indexer
- DATABASE_READ_ONLY_API_URL
  - ✅
  - 用于定义一个 Postgres 数据库的只读副本 (read-only replica) 的 API 端点。当这个变量被设置时,API v2 和 UI 中的大部分读取操作都会通过这个只读副本的 API 端点来执行,而不是直接访问主数据库。
  - (empty)
  - all
  - API
- TEST_DATABASE_READ_ONLY_API_URL
  - Variable to define the endpoint of the Postgres Database read-only replica that is used during testing. If it is provided, most of the read queries from API v2 and UI would go through this endpoint. Implemented in #9662.
  - (empty)
  - v6.6.0+
  - API
- DATABASE_QUEUE_TARGET
  - 数据库操作尽量确保操作平均处理时间小于这个目标值。Management of DB queue target. Implemented in #8991.
  - 50ms
  - v5.4.0+
  - API, Indexer
- ETHEREUM_JSONRPC_TRACE_URL
  - 用于跟踪以太坊交易和区块rpc端点，被用于`trace_block`和`trace_replayTransaction`这两个RPC方法。The RPC endpoint specifically for the Erigon/Geth/Nethermind/Besu client used by trace_block and trace_replayTransaction. This can be used to designate a tracing node.
  - localhost:8545
  - all
  - API, Indexer
- ETHEREUM_JSONRPC_WS_URL
  - 用于以太坊WebSocket RPC订阅的端点，主要作用
    - newHeads订阅：这个WebSocket RPC端点用于订阅以太坊网络的newHands事件。当有新的区块产生时，该事件会被触发并通知订阅方
    - 通知索引器获取新区块：有新的区块产生,需要去获取并处理这些新区块的数据。
  - ws://localhost:8546
  - all
  - Indexer
- ETHEREUM_JSONRPC_TRANSPORT
  - 指定Blockscout用于连接以太坊节点的传输协议
    - http 使用http协议
    - ipc 使用IPC就必须设置IPC_PATH
  - http
  - v3.1.0+
  - API, Indexer
- ETHEREUM_JSONRPC_HTTP_INSECURE
If true is set, allows insecure HTTP connections to the archive node. For instance, it allows to bypass expired SSL certificate at the archive node endpoint. Implemented in #6573
(empty)
v5.0.0+
API, Indexer
ETHEREUM_JSONRPC_HTTP_TIMEOUT
Timeout for ethereum json rpc http requests in seconds. Implemented in #7089
60
v5.1.2+
API, Indexer
ETHEREUM_JSONRPC_USER
User in basic auth for JSON RPC endpoint. Implemented in #6897
(empty)
v5.1.2+
API, Indexer
ETHEREUM_JSONRPC_PASSWORD
Password in basic auth for JSON RPC endpoint. Implemented in #6897
(empty)
v5.1.2+
API, Indexer
ETHEREUM_JSONRPC_HTTP_HEADERS
Custom headers for JSON RPC endpoint in form of json object, example: {"x-api-key": "nbvkhadvnbkdfav", "x-id": "ndjkfvndfkjv"}. Implemented in #7898
(empty)
v5.2.1+
API, Indexer
ETHEREUM_JSONRPC_FALLBACK_HTTP_URL
Fallback JSON RPC HTTP url. Implemented in #7246
(empty)
v5.1.4+
API, Indexer
ETHEREUM_JSONRPC_FALLBACK_TRACE_URL
Fallback JSON RPC trace url. Implemented in #7246
(empty)
v5.1.4+
API, Indexer
ETHEREUM_JSONRPC_FALLBACK_ETH_CALL_URL
Fallback JSON RPC eth_call url. Implemented in #9511
(empty)
v6.3.0+
API, Indexer
ETHEREUM_JSONRPC_WAIT_PER_TIMEOUT
Wait time for each recent timeout from node. Implemented in #8292
20s
v5.2.3+
API, Indexer
ETHEREUM_JSONRPC_ETH_CALL_URL
JSON RPC url for eth_call method. Implemented in #9112
(empty)
v6.0.0+
API, Indexer
NETWORK
Environment variable for the main EVM network such as Ethereum or POA.
POA
all
API
SUBNETWORK
Environment variable for the subnetwork such as Core or Sokol Network. This will be displayed as selected in the chains list dropdown.
POA Sokol
all
API
IPC_PATH
Path to the IPC file of the running node if IPC transport is chosen.
(empty)
v2.1.1+
API, Indexer
NETWORK_PATH
Used to set a network path other than what is displayed in the root directory. An example would be to add /eth/mainnet/ to the root directory.
/
all
API
BLOCKSCOUT_HOST
Host for API endpoint examples.
localhost
v2.1.0+
API
BLOCKSCOUT_PROTOCOL
Url scheme for blockscout.
in prod env https is used, in dev env http is used
v2.1.0+
API
SECRET_KEY_BASE
✅
The value is used to sign cookies. Use mix phx.gen.secret to generate a new Secret Key Base string to protect production assets.
(empty)
all
API
CHECK_ORIGIN
Used to check the origin of requests when the origin header is present. It defaults to false. In case of true, it will check against the host value.
false
all
API
PORT
Default port the application runs on is 4000.
4000
all
API
COIN
The coin here is checked via the CoinGecko API to obtain USD prices on graphs and other areas of the UI.
POA
all
API, Indexer
COIN_NAME
Displayed name of the coin. Also used for "Add chain to MetaMask" button and for Account functionality as native coin name in the email letters for watch list.
(empty)
v4.1.2+
API
EMISSION_FORMAT
Should be set to POA if you have block emission identical to POA Network. This env var is used only if CHAIN_SPEC_PATH is set.
DEFAULT
v2.0.4+
API, Indexer
CHAIN_SPEC_PATH
Chain specification path (absolute file system path or URL) to import block emission reward ranges and genesis account balances from. Geth- and OpenEthereum-style specs are supported.
(empty)
v2.0.4+
API, Indexer
PRECOMPILED_CONTRACTS_CONFIG_PATH
Precompiled contracts description path (absolute file system path or URL) to import ABI and source code of the precompiled contracts.
(empty) or /app/config/assets/precompiles-arbitrum.json for arbitrum chaintype
v6.5.0+
API, Indexer
SUPPLY_MODULE
This environment variable is used by the RSK in order to tell the application how to calculate the total supply of the chain. Available values is RSK
(empty)
all
API, Indexer
POOL_SIZE
Variable to define the number of database connections allowed excluding read-only API endpoints requests.
50
all
API, Indexer
POOL_SIZE_API
Variable to define the number of database connections allowed for read-only API endpoints requests.
50
v4.1.0+
API
ECTO_USE_SSL
Production environment variable to use SSL on Ecto queries.
true
all
API, Indexer
HEART_BEAT_TIMEOUT
Production environment variable to restart the application in the event of a crash.
30
all
API, Indexer
HEART_COMMAND
Production environment variable to restart the application in the event of a crash.
(empty)
all
API, Indexer
ELIXIR_VERSION
Elixir version to install on the node before Blockscout deploy. It is used in bash script in Terraform / Ansible deployment script
(empty)
all
API, Indexer
- DISABLE_WEBAPP
  - If true, endpoints to webapp are hidden (compile-time). Also, enabling it makes notifications go through db_notify
  - false
  - v2.0.3+
  - ✅
  - API, Indexer
- API_V1_READ_METHODS_DISABLED
  - If true, read-only endpoints to API v1 are hidden (compile-time).
  - false
  - v5.1.5+
  - ✅
  - API
- API_V1_WRITE_METHODS_DISABLED
  - If true, write endpoints to API v1 are hidden (compile-time).
  - false
  - v5.1.5+
  - ✅
  - API
- DISABLE_API
  - API 端点不会被启动。也就是说,系统将无法通过 API 进行访问和交互。If true, endpoint is not started. Set this if you want to use an indexer-only setup. Implemented in #10032
  - false
  - v6.6.0+
  - API, Indexer
- WEBAPP_URL
  -  WEBAPP_URL 保持为空,则表示没有配置 web 应用程序的访问地址, Link to web application instance, e.g. protocol://host/path
  - (empty)
  - v2.0.3+
  - API
- API_URL
  - Link to API instance, e.g. protocol://host/path
  - (empty)
  - v2.0.3+
  - API
- API_V2_ENABLED
  - Enable API V2. Implemented in #6361 (v5.0.0+), default true since #8802
  - true
  - v5.3.2+
  - API
API_SENSITIVE_ENDPOINTS_KEY
API key to protect some sensitive endpoints. Implemented in #7355
(empty)
v5.1.5+
API
CHECKSUM_ADDRESS_HASHES
If set to true, redirects to checksummed version of address hashes.
true
v3.1.0+
API
CHECKSUM_FUNCTION
Defines checksum address function. 2 available values: rsk, eth
eth
v2.0.1+
API
RESTRICTED_LIST
A comma-separated list of addresses to enable restricted access to them.
(empty)
v3.3.3+
API
RESTRICTED_LIST_KEY
A key to access addresses listed inRESTRICTED_LIST variable. Can be passed via query param to the page's URL: ?key=...
(empty)
v3.3.3+
API
CHAIN_TYPE
Specifies the model of data, enables fetchers, specific to the chain. Available values are ethereum, optimism, arbitrum, polygon_zkevm, polygon_edge, rsk, shibarium, stability, suave, zetachain, filecoin, default.
default
v5.3.0+
✅
API, Indexer
CHAIN_ID
Chain ID of the network. For instance, 100 in the case of xDai chain.
(empty)
v3.7.0+
API, Indexer
JSON_RPC
JSON RPC endpoint of the chain for the WalletConnect integration. Implemented in #4931
(empty)
v4.1.0+
API, Indexer
HEALTHY_BLOCKS_PERIOD
New blocks indexed max delay in /health API endpoint. Time format. Implemented in #2294
5 m
v2.0.2+
API, Indexer
NEW_TAGS
Add public tag labels. More info in #6316
(empty)
v5.0.0+
API
CUSTOM*CONTRACT_ADDRESSES*${tag_name}
Specify addresses for some label. More info in #6316
(empty)
v5.0.0+
API
SESSION_COOKIE_DOMAIN
Value of this env will be added to domain of session cookie. Implemented in #6544
(empty)
v5.0.0+
API
DECODE_NOT_A_CONTRACT_CALLS
Allows to decode contract calls directed to addresses which are not contracts. Implemented in #6541
false
v5.1.0+
✅
API
EIP_1559_ELASTICITY_MULTIPLIER
EIP-1559 elasticity multiplier. Implemented in #7253
2
v5.1.3+
API
EIP_1559_BASE_FEE_MAX_CHANGE_DENOMINATOR
EIP-1559 base fee max change denominator. Implemented in #9202
8
v6.2.0+
API
TOKEN_INSTANCE_OWNER_MIGRATION_CONCURRENCY
Concurrency of new fields backfiller implemented in #8386
5
v5.3.0+
API, Indexer
TOKEN_INSTANCE_OWNER_MIGRATION_BATCH_SIZE
Batch size of new fields backfiller implemented in #8386
50
v5.3.0+
API, Indexer
TOKEN_INSTANCE_OWNER_MIGRATION_ENABLED
Enable of backfiller from #8386 implemented in #8752
false
v5.3.2+
API, Indexer
TOKEN_ID_MIGRATION_FIRST_BLOCK
Bottom block for token id migration. Implemented in #6391
0
v5.0.0+
API, Indexer
TOKEN_ID_MIGRATION_CONCURRENCY
Number of workers performing the token id migration. Implemented in #6391
1
v5.0.0+
API, Indexer
TOKEN_ID_MIGRATION_BATCH_SIZE
Interval of token transfer block numbers processed by a token id migration worker at a time. Implemented in #6391
500
v5.0.0+
API, Indexer
ADDRESSES_TABS_COUNTERS_TTL
TTL for cached tabs counters (works only for counters which are < 51, if counter >= 51, then ttl == :infinity). Implemented in #8512
10m
v5.3.0+
API
API_INTERNAL_TRANSACTIONS_INDEXING_FINISHED_THRESHOLD
In the case when the 1st tx in the chain already has internal transactions, If the number of blocks in pending_block_operations is less than the value in this env var, Blockscout will consider, that indexing of internal transactions finished, otherwise, it will consider, that indexing is still taking place and the indexing banner will appear at the top. Implemented in #7576.
1000
v5.2.0+
API
DATABASE_EVENT_URL
Variable to define the Postgres Database endpoint that will be used by event listener process. Applicable for separate indexer and API setup. More info in related PR. Implemented in #10164.
(empty)
master
API
Indexer management
Variable Required Description Default Version Application
BLOCK_TRANSFORMER
Transformer for blocks: base or clique.
base
v1.3.4+
Indexer
DISABLE_INDEXER
If true, indexer application doesn't run.
false
v2.0.3+
API, Indexer
INDEXER_HIDE_INDEXING_PROGRESS_ALERT
If true, indexer progress alert will be disabled even if initial catchup indexing is still in place. Implemented in #7360.
false
v5.1.5+
API
- INDEXER_DISABLE_PENDING_TRANSACTIONS_FETCHER
  - 待处理交易获取器，If true, pending transactions fetcher is disabled.
  - false
  - v4.1.2+
  - Indexer
- INDEXER_DISABLE_INTERNAL_TRANSACTIONS_FETCHER
  - 控制Blockscout的内部交易获取器的开启/关闭。 If true, internal transactions fetcher is disabled.
  - 内部交易是合约触发的交易，由于合约调用逻辑复杂，所以需要单独处理和索引
  - false
  - v4.1.2+
  - Indexer
- INDEXER_DISABLE_BLOCK_REWARD_FETCHER
  - 为true时，区块奖励数据获取功能将被禁用。 if true, block rewards fetcher is disabled.
  - false
  - v4.1.3+
  - Indexer
- INDEXER_DISABLE_ADDRESS_COIN_BALANCE_FETCHER
  - If true, coin balances fetcher is disabled.
  - false
  - v4.1.3+
  - Indexer
INDEXER_DISABLE_CATALOGED_TOKEN_UPDATER_FETCHER
If true, cataloged tokens metadata fetcher is disabled.
false
v4.1.3+
Indexer
INDEXER_MEMORY_LIMIT
Memory soft limit for the indexer.
1Gb
v4.1.3+
API, Indexer
INDEXER_EMPTY_BLOCKS_SANITIZER_BATCH_SIZE
Batch size for empty block sanitizer (re-fetcher).
100
v4.1.3+
Indexer
INDEXER_CATCHUP_BLOCKS_BATCH_SIZE
Batch size for blocks catchup fetcher. Implemented in #6196.
10
v5.0.0+
Indexer
INDEXER_CATCHUP_BLOCKS_CONCURRENCY
Concurrency for blocks catchup fetcher. Implemented in #6196.
10
v5.0.0+
Indexer
INDEXER_DISABLE_EMPTY_BLOCKS_SANITIZER
Empty blocks sanitizer is disabled if true
false
v5.1.2+
Indexer
DISABLE_REALTIME_INDEXER
If true, realtime fetcher doesn't run
false
v4.1.6+
Indexer
FIRST_BLOCK
The block number, where import of blocks by catchup fetcher begins from.
0
v1.3.8+
API, Indexer
LAST_BLOCK
The block number, where import of blocks by catchup fetcher stops.
(empty)
v2.0.3+
Indexer
TRACE_FIRST_BLOCK
The block number, where indexing of internal transactions begins from.
0
v4.1.0+
API, Indexer
TRACE_LAST_BLOCK
The block number, where indexing of internal transactions stops.
(empty)
v4.1.0+
API, Indexer
BLOCK_RANGES
Block ranges to import by catchup fetcher. Example: BLOCK_RANGES="1..3,123..500,30..50,500..latest". Implemented in #5783
v4.1.7+
Indexer
FETCH_REWARDS_WAY
Tells the application how to calculate block rewards, by fetching via json_rpc (trace_block) or manual by block params (manual).
trace_block
v4.1.4+
Indexer
IPFS_GATEWAY_URL
IPFS gateway url for fetching token instances metadata from IPFS including token instance icon.
https://ipfs.io/ipfs
v5.3.0+
Indexer
IPFS_GATEWAY_URL_PARAM_KEY
The key of the parameter to add to IPFS gateway url. Implemented in #9898.
(empty))
v6.5.0+
Indexer
IPFS_GATEWAY_URL_PARAM_VALUE
The value of the parameter to add to IPFS gateway url. Implemented in #9898.
(empty))
v6.5.0+
Indexer
IPFS_GATEWAY_URL_PARAM_LOCATION
Whether to add extra params: to query string or to the headers. Available values: query/header. Implemented in #9898.
(empty))
v6.5.0+
Indexer
ETHEREUM_JSONRPC_DEBUG_TRACE_TRANSACTION_TIMEOUT
Timeout for debug_traceTransaction/debug_traceBlockByNumber JSON RPC method requests in case of geth archive node. Supported time formats: https://pkg.go.dev/time#ParseDuration. Introduced in #5505
5s
v4.1.3+
Indexer
ETHEREUM_JSONRPC_DISABLE_ARCHIVE_BALANCES
If true, all the requests with the method eth_getBalance with any block as parameter but latest are ignored. Implemented in #6001
false
v5.0.0+
API, Indexer
ETHEREUM_JSONRPC_PENDING_TRANSACTIONS_TYPE
Defines which method will be used for fetching pending transactions: default - default method for fetching internal transactions for current ETHEREUM_JSONRPC_VARIANT, geth - txpool_content method will be used, parity - parity_pendingTransactions will be used. Implemented in #6001
default
v5.0.0+
Indexer
INDEXER_INTERNAL_TRANSACTIONS_BATCH_SIZE
Batch size for internal transactions fetcher. Implemented in #6450.
10
v5.0.0+
Indexer
INDEXER_INTERNAL_TRANSACTIONS_CONCURRENCY
Concurrency for internal transactions fetcher. Implemented in #6450.
4
v5.0.0+
Indexer
INDEXER_BLOCK_REWARD_BATCH_SIZE
Batch size for block reward fetcher. Implemented in #6952.
10
v5.1.2+
Indexer
INDEXER_BLOCK_REWARD_CONCURRENCY
Concurrency for block reward fetcher. Implemented in #6952.
4
v5.1.2+
Indexer
INDEXER_RECEIPTS_BATCH_SIZE
Batch size for transaction receipts fetcher. Implemented in #6454.
250
v5.0.0+
Indexer
INDEXER_RECEIPTS_CONCURRENCY
Concurrency for transaction receipts fetcher. Implemented in #6454.
10
v5.0.0+
Indexer
INDEXER_COIN_BALANCES_BATCH_SIZE
Batch size for coin balances fetcher. Implemented in #6454.
100
v5.0.0+
Indexer
INDEXER_COIN_BALANCES_CONCURRENCY
Concurrency for coin balances fetcher. Implemented in #6454.
4
v5.0.0+
Indexer
INDEXER_TOKEN_CONCURRENCY
Concurrency for token fetcher. Implemented in #8167.
10
v5.2.2
Indexer
INDEXER_TOKEN_BALANCES_BATCH_SIZE
Batch size for token balances fetcher. Implemented in #7439.
100
v5.1.5+
Indexer
INDEXER_TOKEN_BALANCES_CONCURRENCY
Concurrency for token balances fetcher. Implemented in #8167.
10
v5.2.2
Indexer
INDEXER_TX_ACTIONS_ENABLE
If true, transaction action indexer is active. Implemented in #6582.
false
v5.1.0+
Indexer
INDEXER_TX_ACTIONS_MAX_TOKEN_CACHE_SIZE
Maximum number of items in an internal cache of tx actions indexing process (to limit memory consumption). Implemented in #6582.
100000
v5.1.0+
Indexer
INDEXER_TX_ACTIONS_REINDEX_FIRST_BLOCK
The first block of a block range for historical indexing or reindexing of tx actions. Implemented in #6582.
(empty)
v5.1.0+
Indexer
INDEXER_TX_ACTIONS_REINDEX_LAST_BLOCK
The last block of a block range for historical indexing or reindexing of tx actions. Implemented in #6582.
(empty)
v5.1.0+
Indexer
INDEXER_TX_ACTIONS_REINDEX_PROTOCOLS
Comma-separated names of protocols which should be indexed or reindexed on historical blocks defined by the range. Example: uniswap_v3,zkbob - only these protocols will be indexed or reindexed for the defined block range. If the value is empty string (or not defined), all supported protocols will be indexed/reindexed. This option is not applicable to realtime and catchup fetchers (it always indexes all supported protocols). Implemented in #6582.
(empty)
v5.1.0+
Indexer
INDEXER_TX_ACTIONS_AAVE_V3_POOL_CONTRACT
Pool contract address for Aave v3 protocol. If not defined, Aave transaction actions are ignored by the indexer. Implemented in #7185.
(empty)
v5.1.3+
Indexer
INDEXER_TX_ACTIONS_UNISWAP_V3_FACTORY_CONTRACT
UniswapV3Factory contract address. Implemented in #7312.
0x1F98431c8aD98523631AE4a59f267346ea31F984
v5.1.4+
Indexer
INDEXER_TX_ACTIONS_UNISWAP_V3_NFT_POSITION_MANAGER_CONTRACT
NonfungiblePositionManager contract address for Uniswap v3. Implemented in #7312.
0xC36442b4a4522E871399CD717aBDD847Ab11FE88
v5.1.4+
Indexer
INDEXER_CATCHUP_MISSING_RANGES_BATCH_SIZE
Batch size for missing ranges collector. Implemented in #6583.
100000
v5.0.0+
Indexer
MIN_MISSING_BLOCK_NUMBER_BATCH_SIZE
Batch size for min missing block number updater. Implemented in #6583.
100000
v5.0.0+
API, Indexer
INDEXER_INTERNAL_TRANSACTIONS_TRACER_TYPE
Tracer type for debug_traceTransaction/debug_traceBlockByNumber requests for geth-like nodes. Possible values are: js to use custom Blockscout js tracer, call_tracer to use built-in callTracer geth tracer, opcode to use built-in Struct/opcode logger geth tracer, polygon_edge to work with Polygon edge nodes. Implemented in #6721, #7513
call_tracer
v5.1.0+
Indexer
INDEXER_TOKEN_INSTANCE_RETRY_MAX_REFETCH_INTERVAL
Maximum interval between attempts to fetch token instance metadata. Time format. Implemented in #10027.
168h
master
Indexer
INDEXER_TOKEN_INSTANCE_RETRY_EXPONENTIAL_TIMEOUT_BASE
Base to calculate exponential timeout. Implemented in #10027.
2
master
Indexer
INDEXER_TOKEN_INSTANCE_RETRY_EXPONENTIAL_TIMEOUT_COEFF
Coefficient to calculate exponential timeout. Implemented in #10027.
100
master
Indexer
INDEXER_TOKEN_INSTANCE_RETRY_CONCURRENCY
Concurrency for retry token instance fetcher. Implemented in #7286.
10
v5.1.4+
Indexer
INDEXER_TOKEN_INSTANCE_REALTIME_CONCURRENCY
Concurrency for realtime token instance fetcher. Implemented in #7286.
10
v5.1.4+
Indexer
INDEXER_TOKEN_INSTANCE_SANITIZE_CONCURRENCY
Concurrency for sanitize token instance fetcher. Implemented in #7286.
10
v5.1.4+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_RETRY_FETCHER
If true, retry token instance fetcher doesn't run
false
v5.1.4+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_REALTIME_FETCHER
If true, realtime token instance fetcher doesn't run
false
v5.1.4+
Indexer
INDEXER_TOKEN_INSTANCE_REALTIME_RETRY_ENABLED
If true, realtime token instance fetcher will retry once on 404 and 500 error. Implemented in #10036.
false
v6.6.0+
Indexer
INDEXER_TOKEN_INSTANCE_REALTIME_RETRY_TIMEOUT
Timeout for retry set by INDEXER_TOKEN_INSTANCE_REALTIME_RETRY_ENABLED. Time format. Implemented in #10036.
5s
v6.6.0+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_SANITIZE_FETCHER
If true, sanitize token instance fetcher doesn't run
false
v5.1.4+
Indexer
INDEXER_TOKEN_INSTANCE_USE_BASE_URI_RETRY
If true, and request to tokenURI(tokenId) failed with VM execution error, Blockscout will make request to baseURI and try to request metadata from baseURI + tokenId
false
v6.2.0+
Indexer
INDEXER_REALTIME_FETCHER_MAX_GAP
Max gap between consecutive latest blocks that will be filled by realtime fetcher. Implemented in #7393
1000
v5.1.5+
Indexer
INDEXER_DISABLE_WITHDRAWALS_FETCHER
If true, withdrawals fetcher is disabled. Implemented in #6694.
true
v5.1.5+
Indexer
WITHDRAWALS_FIRST_BLOCK
The block number, where import of withdrawals by catchup fetcher begins from. Should be the block where withdrawals upgrade occured on the chain. Implemented in #6694.
(empty)
v5.1.5+
Indexer
INDEXER_CATCHUP_BLOCK_INTERVAL
Interval between blocks catchup fetcher tasks. Implemented in #7489.
5s
v5.1.5+
Indexer
INDEXER_FETCHER_INIT_QUERY_LIMIT
Limit for all fetchers init queries. Implemented in #7697.
100
v5.2.0+
Indexer
INDEXER_TOKEN_INSTANCE_RETRY_BATCH_SIZE
Batch size for retry token instance fetcher. Implemented in #8313
10
v5.2.3+
Indexer
INDEXER_TOKEN_INSTANCE_REALTIME_BATCH_SIZE
Batch size for realtime token instance fetcher. Implemented in #8313.
1
v5.2.3+
Indexer
INDEXER_TOKEN_INSTANCE_SANITIZE_BATCH_SIZE
Batch size for sanitize token instance fetcher. Implemented in #8313.
10
v5.2.3+
Indexer
INDEXER_TOKEN_BALANCES_FETCHER_INIT_QUERY_LIMIT
Limit for token balance fetcher init queries. Implemented in #8459.
100000
v5.2.3+
Indexer
INDEXER_COIN_BALANCES_FETCHER_INIT_QUERY_LIMIT
Limit for coin balance fetcher init queries. Implemented in #7996.
2000
v5.3.0+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_LEGACY_SANITIZE_FETCHER
If true, legacy sanitize token instance fetcher doesn't run. Appeared in #8386
true
v5.3.0+
Indexer
INDEXER_TOKEN_INSTANCE_LEGACY_SANITIZE_CONCURRENCY
Concurrency for legacy sanitize token instance fetcher doesn't run. Appeared in #8386
2
v5.4.0+
Indexer
INDEXER_TOKEN_INSTANCE_LEGACY_SANITIZE_BATCH_SIZE
Batch size for legacy sanitize token instance fetcher doesn't run. Appeared in #8386
10
v5.3.0+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_ERC_1155_SANITIZE_FETCHER
If true, erc-1155-sanitize token instance fetcher doesn't run. Implemented in #9226.
false
v6.2.0+
Indexer
INDEXER_DISABLE_TOKEN_INSTANCE_ERC_721_SANITIZE_FETCHER
If true, erc-721-sanitize token instance fetcher doesn't run. Implemented in #9226.
false
v6.2.0+
Indexer
INDEXER_TOKEN_INSTANCE_ERC_1155_SANITIZE_CONCURRENCY
Concurrency for erc-1155-sanitize token instance fetcher. Implemented in #9226.
2
v6.2.0+
Indexer
INDEXER_TOKEN_INSTANCE_ERC_721_SANITIZE_CONCURRENCY
Concurrency for erc-721-sanitize token instance fetcher. Implemented in #9226.
2
v6.2.0+
Indexer
INDEXER_TOKEN_INSTANCE_ERC_1155_SANITIZE_BATCH_SIZE
Batch size for erc-1155-sanitize token instance fetcher. Implemented in #9226.
10
v6.2.0+
Indexer
INDEXER_TOKEN_INSTANCE_ERC_721_SANITIZE_BATCH_SIZE
Batch size for erc-721-sanitize token instance fetcher. Implemented in #9226.
10
v6.2.0+
Indexer
INDEXER_EMPTY_BLOCKS_SANITIZER_INTERVAL
Interval for empty block sanitizer. Implemented in #8658
5m
v5.3.0+
Indexer
ETHEREUM_JSONRPC_ARCHIVE_BALANCES_WINDOW
Max block number gap from latest for which balances requests can be processed when ETHEREUM_JSONRPC_DISABLE_ARCHIVE_BALANCES env var is set to true. Implemented in #8673
200
v5.3.1+
API, Indexer
DISABLE_CATCHUP_INDEXER
If true, catchup fetcher doesn't run
false
v5.3.2+
Indexer
TRACE_BLOCK_RANGES
Block ranges for traceable blocks. Example: TRACE_BLOCK_RANGES="1..3,123..500,30..50,500..latest". Implemented in #8960
(empty)
v5.4.0+
API, Indexer
ETHEREUM_JSONRPC_GETH_TRACE_BY_BLOCK
Enable tracing by block for geth variant. Implemented in #9072
false
v6.1.0+
Indexer
INDEXER_GRACEFUL_SHUTDOWN_PERIOD
Time that will be given to the block fetchers when stopping the application before they are killed. Implemented in #9729
5m
v6.5.0+
Indexer
MISSING_BALANCE_OF_TOKENS_WINDOW_SIZE
Minimal blocks count until the next token balance request will be executed for tokens that doesn't implement balanceOf function. Implemented in #10142
100
master
Indexer
ETHEREUM_JSONRPC_GETH_ALLOW_EMPTY_TRACES
Allow transactions to not have internal transactions. Implemented in #10200
false
master
Indexer
Denormalization management
Variable Required Description Default Version Application
DENORMALIZATION_MIGRATION_BATCH_SIZE
Number of transactions to denormalize (add block timestamp and consensus) in the batch.
500
v6.0.0-beta
API, Indexer
DENORMALIZATION_MIGRATION_CONCURRENCY
Number of parallel denormalization transaction batches processing.
10
v6.0.0-beta
API, Indexer
TOKEN_TRANSFER_TOKEN_TYPE_MIGRATION_BATCH_SIZE
Number of token transfers to denormalize (add token_type) in the batch.
100
v6.3.0+
API, Indexer
TOKEN_TRANSFER_TOKEN_TYPE_MIGRATION_CONCURRENCY
Number of parallel denormalization token transfer batches processing.
1
v6.3.0+
API, Indexer
SANITIZE_INCORRECT_NFT_BATCH_SIZE
Number of token transfers to sanitize in the batch.
100
v6.3.0+
API, Indexer
SANITIZE_INCORRECT_NFT_CONCURRENCY
Number of parallel sanitizing token transfer batches processing.
1
v6.3.0+
API, Indexer
Sanitizers management
Variable Required Description Default Version Application
SANITIZE_INCORRECT_WETH_BATCH_SIZE
Number of token transfers to sanitize in the batch. Implemented in #10134
100
master
API, Indexer
SANITIZE_INCORRECT_WETH_CONCURRENCY
Number of parallel sanitizing token transfer batches processing. Implemented in #10134
1
master
API, Indexer
Ethereum Management
Variable Required Description Default Version Application
INDEXER_BEACON_RPC_URL
The Beacon Chain RPC endpoint used to fetch blob sidecars. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #9168.
http://localhost:5052
v6.2.0+
Indexer
INDEXER_DISABLE_BEACON_BLOB_FETCHER
If true the fetcher of Beacon data blobs won't be started, new transaction and block fields still will be extracted. Implemented in #9168.
false
v6.2.0+
Indexer
INDEXER_BEACON_BLOB_FETCHER_SLOT_DURATION
Slot duration in the Beacon Chain in seconds. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #9168.
12
v6.2.0+
Indexer
INDEXER_BEACON_BLOB_FETCHER_REFERENCE_SLOT
Any past finalized Beacon Chain slot number. Used as reference for blob inclusion slot calculations. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #9168.
8000000
v6.2.0+
Indexer
INDEXER_BEACON_BLOB_FETCHER_REFERENCE_TIMESTAMP
UTC timestamp of the Beacon Chain slot specified in INDEXER_BEACON_BLOB_FETCHER_REFERENCE_SLOT. Used as reference for blob inclusion slot calculations. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #9168.
1702824023
v6.2.0+
Indexer
INDEXER_BEACON_BLOB_FETCHER_START_BLOCK
Beacon Chain blob fetcher start block. On start-up, indexer will only look for missed blobs beyond this block number. It's recommended to set this block to the first block after the Dencun hardfork. Implemented in #9168.
19200000
v6.2.0+
Indexer
INDEXER_BEACON_BLOB_FETCHER_END_BLOCK
Beacon Chain blob fetcher end block. On start-up, indexer will only look for missed blobs before this block number. If set to 0, then all recent till latest will be traversed. Implemented in #9168.
0
v6.2.0+
Indexer
Polygon Edge Management
Variable Required Description Default Version Application
INDEXER_POLYGON_EDGE_L1_RPC
The RPC endpoint for L1 used to fetch deposit or withdrawal events. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L1_EXIT_HELPER_CONTRACT
The address of ExitHelper contract on L1 (root chain) used to fetch withdrawal exits. Required for withdrawal events indexing. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L1_WITHDRAWALS_START_BLOCK
The number of start block on L1 (root chain) to index withdrawal exits. If the table of withdrawal exits is not empty, the process will continue indexing from the last indexed message. If empty or not defined, the withdrawal exits are not indexed. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L1_STATE_SENDER_CONTRACT
The address of StateSender contract on L1 (root chain) used to fetch deposits. Required for deposit events indexing. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L1_DEPOSITS_START_BLOCK
The number of start block on L1 (root chain) to index deposits. If the table of deposits is not empty, the process will continue indexing from the last indexed message. If empty or not defined, the deposits are not indexed. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L2_STATE_SENDER_CONTRACT
The address of L2StateSender contract on L2 (child chain) used to fetch withdrawals. Required for withdrawal events indexing. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L2_WITHDRAWALS_START_BLOCK
The number of start block on L2 (child chain) to index withdrawals. If the table of withdrawals is not empty, the process will fill gaps and then continue indexing from the last indexed message. If empty or not defined, the withdrawals are not indexed. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L2_STATE_RECEIVER_CONTRACT
The address of StateReceiver contract on L2 (child chain) used to fetch deposit executes. Required for deposit events indexing. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_L2_DEPOSITS_START_BLOCK
The number of start block on L2 (child chain) to index deposit executes. If the table of deposit executes is not empty, the process will fill gaps and then continue indexing from the last indexed message. If empty or not defined, the deposit executes are not indexed. Implemented in #8180.
(empty)
v5.3.0+
Indexer
INDEXER_POLYGON_EDGE_ETH_GET_LOGS_RANGE_SIZE
Block range size for eth_getLogs request in Polygon Edge indexer modules. Implemented in #8180.
(empty)
v5.3.0+
Indexer
Rootstock management
Variable Required Description Default Version Application
ROOTSTOCK_REMASC_ADDRESS
The address hash of remasc address on Rootstock chain. Implemented in #8542.
v5.3.0+
API
ROOTSTOCK_BRIDGE_ADDRESS
The address hash of bridge address on Rootstock chain. Implemented in #8542.
v5.3.0+
API
INDEXER_DISABLE_ROOTSTOCK_DATA_FETCHER
If true the fethcer of Rootstock specific fields for blocks that are already in the database won't be started, fields from new blocks will be extracted. Implemented in #8742.
v5.3.2+
Indexer
INDEXER_ROOTSTOCK_DATA_FETCHER_INTERVAL
The interval between fetching the next INDEXER_ROOTSTOCK_DATA_FETCHER_DB_BATCH_SIZE blocks from the database and the node, used to configure the load on the database and JSON-RPC node. Implemented in #8742.
v5.3.2+
Indexer
INDEXER_ROOTSTOCK_DATA_FETCHER_BATCH_SIZE
The number of requests in one JSON-RPC batch request, used to configure the load or RPS on JSON-RPC node. Implemented in #8742.
v5.3.2+
Indexer
INDEXER_ROOTSTOCK_DATA_FETCHER_CONCURRENCY
The number of simultaneous requests to the JSON-RPC node, used to configure the load or RPS on JOSN-RPC node. Implemented in #8742.
v5.3.2+
Indexer
INDEXER_ROOTSTOCK_DATA_FETCHER_DB_BATCH_SIZE
The number of blocks that are fetched from the database in one database query. Implemented in #8742.
v5.3.2+
Indexer
Shibarium Management
Variable Required Description Default Version Application
INDEXER_SHIBARIUM_L1_RPC
The RPC endpoint for L1 used to fetch deposit or withdrawal events. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_START_BLOCK
The number of start block on L1 to index L1 events. If the table of bridge operations is not empty, the process will continue indexing from the last indexed L1 event. If empty or not defined, the L1 events are not handled. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_DEPOSIT_MANAGER_CONTRACT
The address of DepositManagerProxy contract on L1 used to fetch BONE token deposits. Required for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_ETHER_PREDICATE_CONTRACT
The address of EtherPredicateProxy contract on L1 used to fetch ETH deposits and withdrawals. Required for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_ERC20_PREDICATE_CONTRACT
The address of ERC20PredicateProxy contract on L1 used to fetch ERC20 token deposits and withdrawals. Required for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_ERC721_PREDICATE_CONTRACT
The address of ERC721PredicateProxy contract on L1 used to fetch ERC721 token deposits and withdrawals. Optional for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_ERC1155_PREDICATE_CONTRACT
The address of ERC1155PredicateProxy contract on L1 used to fetch ERC1155 token deposits and withdrawals. Optional for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L1_WITHDRAW_MANAGER_CONTRACT
The address of WithdrawManagerProxy contract on L1 used to fetch BONE token withdrawals. Required for L1 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L2_START_BLOCK
The number of start block on L2 to index L2 events. If the table of bridge operations is not empty, the process will continue indexing from the last indexed L2 event. If empty or not defined, the L2 events are not handled. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L2_CHILD_CHAIN_CONTRACT
The address of ChildChain contract on L2 used to fetch BONE token deposits. Required for L2 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L2_WETH_CONTRACT
The address of WETH contract on L2 used to fetch ETH deposits and withdrawals. Required for L2 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
INDEXER_SHIBARIUM_L2_BONE_WITHDRAW_CONTRACT
The address of a contract which emits Withdraw event on L2. Used to fetch BONE token withdrawals. Required for L2 events indexing. Implemented in #8929.
(empty)
v6.1.0+
Indexer
Polygon zkEVM Rollup management
Variable Required Description Default Version Application
INDEXER_POLYGON_ZKEVM_BATCHES_ENABLED
Enables Polygon zkEVM batches fetcher. Implemented in #7584.
false
v5.3.1+
Indexer
INDEXER_POLYGON_ZKEVM_BATCHES_CHUNK_SIZE
The number of Polygon zkEVM batches in one chunk when reading them from RPC. Implemented in #7584.
20
v5.3.1+
Indexer
INDEXER_POLYGON_ZKEVM_BATCHES_RECHECK_INTERVAL
The latest batch rechecking interval, seconds. Implemented in #7584.
60
v5.3.1+
Indexer
INDEXER_POLYGON_ZKEVM_L1_RPC
The RPC endpoint for L1 used to fetch Deposit or Withdrawal bridge events. Implemented in #9098.
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_START_BLOCK
The number of a start block on L1 to index L1 bridge events. If the table of bridge operations is not empty, the process will continue indexing from the last indexed L1 event. If empty or not defined, the L1 events are not handled. Implemented in #9098.
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_CONTRACT
The address of PolygonZkEVMBridgeV2 contract on L1 used to fetch L1 bridge events. Required for L1 bridge events indexing. Implemented in #9098.
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_NETWORK_ID
L1 Network ID in terms of Polygon zkEVM bridge (0 = Ethereum Mainnet, 1 = Polygon zkEVM, 2 = Astar zkEVM, etc.). Required if INDEXER_POLYGON_ZKEVM_L1_BRIDGE_START_BLOCK or INDEXER_POLYGON_ZKEVM_L2_BRIDGE_START_BLOCK is defined. Implemented in #9637.
v6.4.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_ROLLUP_INDEX
L1 Rollup index in terms of Polygon zkEVM bridge (0 = Polygon zkEVM, 1 = Astar zkEVM, etc.). Not defined if L1 is Ethereum Mainnet. Required if L1 is not Ethereum Mainnet and INDEXER_POLYGON_ZKEVM_L1_BRIDGE_START_BLOCK or INDEXER_POLYGON_ZKEVM_L2_BRIDGE_START_BLOCK is defined. Implemented in #9637.
v6.4.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_NATIVE_SYMBOL
The symbol of the native coin on L1 to display it in the table of the bridge Deposits and Withdrawals on UI. Implemented in #9098.
ETH
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L1_BRIDGE_NATIVE_DECIMALS
The number of decimals to correctly display an amount of native coins for some Deposit or Withdrawal bridge operations on UI. Implemented in #9098.
18
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L2_BRIDGE_START_BLOCK
The number of a start block on L2 to index L2 bridge events. If the table of bridge operations is not empty, the process will continue indexing from the last indexed L2 event. If empty or not defined, the L2 events are not handled. Implemented in #9098.
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L2_BRIDGE_CONTRACT
The address of PolygonZkEVMBridgeV2 contract on L2 used to fetch L2 bridge events. Required for L2 bridge events indexing. Implemented in #9098.
v6.2.0+
Indexer
INDEXER_POLYGON_ZKEVM_L2_BRIDGE_NETWORK_ID
L2 Network ID in terms of Polygon zkEVM bridge (1 = Polygon zkEVM, 2 = Astar zkEVM, etc.). Required if INDEXER_POLYGON_ZKEVM_L1_BRIDGE_START_BLOCK or INDEXER_POLYGON_ZKEVM_L2_BRIDGE_START_BLOCK is defined. Implemented in #9637.
v6.4.0+
Indexer
INDEXER_POLYGON_ZKEVM_L2_BRIDGE_ROLLUP_INDEX
L2 Rollup index in terms of Polygon zkEVM bridge (0 = Polygon zkEVM, 1 = Astar zkEVM, etc.). Required if INDEXER_POLYGON_ZKEVM_L1_BRIDGE_START_BLOCK or INDEXER_POLYGON_ZKEVM_L2_BRIDGE_START_BLOCK is defined. Implemented in #9637.
v6.4.0+
Indexer
Optimism Rollup Management
Please note that these Optimism-related variables are only supported together with setting CHAIN_TYPE=optimism.
Variable Required Description Default Version Application
INDEXER_OPTIMISM_L1_RPC
The RPC endpoint for L1 used to fetch transaction batches, output roots, deposits, or withdrawal events. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_PORTAL_CONTRACT
The address of OptimismPortal contract on L1 used to fetch deposits and withdrawal events. Required for deposits and withdrawal events indexing. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_BATCH_START_BLOCK
The number of start block on L1 to index transaction batches. If the table of batches is not empty, the process will continue indexing from the last indexed batch. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_BATCH_INBOX
The inbox address to index transaction batches on L1. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_BATCH_SUBMITTER
The batch submitter address to index transaction batches on L1. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_BATCH_BLOCKSCOUT_BLOBS_API_URL
Defines a URL to Blockscout Blobs API to retrieve L1 blobs from that. Example for Sepolia: https://eth-sepolia.blockscout.com/api/v2/blobs. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is not empty. Implemented in #9571.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_BATCH_BLOCKS_CHUNK_SIZE
Blocks chunk size to send batch RPC requests. Implemented in #6980.
4
v6.3.0+
Indexer
INDEXER_OPTIMISM_L2_BATCH_GENESIS_BLOCK_NUMBER
L2 genesis block number for Optimism chain. Required if INDEXER_OPTIMISM_L1_BATCH_START_BLOCK is defined. The block number can be found at superchain registry. Example. Implemented in #9260.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_OUTPUT_ROOTS_START_BLOCK
The number of start block on L1 to index output roots. If the table of output roots is not empty, the process will continue indexing from the last indexed root. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_OUTPUT_ORACLE_CONTRACT
The address of OutputOracle contract on L1 used to fetch output roots. Required for output roots indexing when INDEXER_OPTIMISM_L1_OUTPUT_ROOTS_START_BLOCK is not empty. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_DEPOSITS_START_BLOCK
The number of the L1 block from which deposits will be fetched. Implemented in #6993.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_DEPOSITS_BATCH_SIZE
Number of blocks in a single eth_getLogs request. Implemented in #6993.
500
v6.3.0+
Indexer
INDEXER_OPTIMISM_L1_WITHDRAWALS_START_BLOCK
The number of start block on L1 to index withdrawal events. If the table of withdrawal events is not empty, the process will continue indexing from the last indexed withdrawal event. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L2_WITHDRAWALS_START_BLOCK
The number of start block on L2 to index withdrawals. If the table of withdrawals is not empty, the process will continue indexing from the last indexed withdrawal. Implemented in #6980.
(empty)
v6.3.0+
Indexer
INDEXER_OPTIMISM_L2_MESSAGE_PASSER_CONTRACT
The address of L2ToL1MessagePasser contract to index withdrawals. Required if INDEXER_OPTIMISM_L2_WITHDRAWALS_START_BLOCK is not empty. Implemented in #6980.
(empty)
v6.3.0+
Indexer
zkSync Rollup Management
Please note that these zkSync-related variables are only supported together with setting CHAIN_TYPE=zksync.
Variable Required Description Default Version Application
INDEXER_ZKSYNC_BATCHES_ENABLED
Enables Polygon zkEVM batches fetcher. Implemented in #9080.
false
v6.3.0+
Indexer
INDEXER_ZKSYNC_BATCHES_CHUNK_SIZE
The number of RPC calls in one request when reading data from RPC. Implemented in #9080.
50
v6.3.0+
Indexer
INDEXER_ZKSYNC_NEW_BATCHES_MAX_RANGE
Maximum amount of batches requested if Blockscout does not have all batches synced. Implemented in #9080.
50
v6.3.0+
Indexer
INDEXER_ZKSYNC_NEW_BATCHES_RECHECK_INTERVAL
The latest batch rechecking interval, seconds. Implemented in #9080.
60
v6.3.0+
Indexer
INDEXER_ZKSYNC_L1_RPC
The RPC endpoint for L1 used to fetch status of batches. Implemented in #9080.
(empty)
v6.3.0+
Indexer
INDEXER_ZKSYNC_BATCHES_STATUS_RECHECK_INTERVAL
The batches status rechecking interval, seconds. Implemented in #9080.
60
v6.3.0+
Indexer
Arbitrum Rollup Management
Please note that these Arbitrum-related variables are only supported together with setting CHAIN_TYPE=arbitrum.
Variable Required Description Default Version
INDEXER_ARBITRUM_ARBSYS_CONTRACT
The address of ArbSys contract on the rollup. Implemented in #9312.
0x0000000000000000000000000000000000000064
INDEXER_ARBITRUM_L1_RPC
The RPC endpoint for L1 used to fetch transaction batches, block confirmations, and cross-chain messages. Implemented in #9312.
INDEXER_ARBITRUM_L1_RPC_CHUNK_SIZE
The number of RPC calls in one request when reading data from RPC. Implemented in #9312.
20
INDEXER_ARBITRUM_L1_RPC_HISTORICAL_BLOCKS_RANGE
The block range size for the eth_getLogs request. Implemented in #9312.
1000
INDEXER_ARBITRUM_L1_ROLLUP_CONTRACT
The Arbitrum Rollup contract address on L1. Implemented in #9312.
INDEXER_ARBITRUM_L1_ROLLUP_INIT_BLOCK
The block number where the Arbitrum rollup contract has been deployed. Implemented in #9312.
1
INDEXER_ARBITRUM_L1_COMMON_START_BLOCK
The block number at which synchronization will commence. It will proceed in both directions: discovering new batches up to the chain head, and historical batches until INDEXER_ARBITRUM_L1_ROLLUP_INIT_BLOCK. If omitted, the sychronization starts from the latest block. Implemented in #9312.
latest block
INDEXER_ARBITRUM_ROLLUP_CHUNK_SIZE
The number of RPC calls in one request when reading data from RPC. Implemented in #9312.
20
INDEXER_ARBITRUM_BRIDGE_MESSAGES_TRACKING_ENABLED
Enables monitoring on L1 of cross-chain messages directed to L2 and catchup on L2 of historical cross-chain messages. Implemented in #9312.
INDEXER_ARBITRUM_MISSED_MESSAGES_RECHECK_INTERVAL
Interval to re-check on the rollup historical messages directed to and from the rollup, in seconds. Implemented in #9312.
3600
INDEXER_ARBITRUM_MISSED_MESSAGES_TO_L2_BLOCK_DEPTH
Amount of L2 blocks to revisit to identify historical L1-to-L2 messages in the messages catchup task by handling block transactions. Implemented in #9312.
50
INDEXER_ARBITRUM_MISSED_MESSAGES_TO_L1_BLOCK_DEPTH
Amount of L2 blocks to revisit to identify historical L2-to-L1 messages in the messages catchup task by handling logs in receipts. Implemented in #9312.
1000
INDEXER_ARBITRUM_TRACKING_MESSAGES_ON_L1_RECHECK_INTERVAL
Interval to re-check on L1 new messages directed to the rollup, in seconds. Implemented in #9312.
20
INDEXER_ARBITRUM_BATCHES_TRACKING_ENABLED
Enables monitoring of transaction batches, block confirmations, and L2-to-L1 messages executions. Implemented in #9312.
INDEXER_ARBITRUM_BATCHES_TRACKING_RECHECK_INTERVAL
Interval to re-check on L1 new and historical batches, confirmations, and executions, in seconds. Implemented in #9312.
20
INDEXER_ARBITRUM_BATCHES_TRACKING_L1_FINALIZATION_CHECK_ENABLED
Whether L1 transactions related to batches, confirmations, and executions need to be monitored for finalization or not. Implemented in #9312.
false
INDEXER_ARBITRUM_BATCHES_TRACKING_MESSAGES_TO_BLOCKS_SHIFT
Difference between the message count and actual rollup block numbers in the SequencerBatchDelivered event on L1. Applicable for ArbitrumOne only. Implemented in #9312.
0
INDEXER_ARBITRUM_CONFIRMATIONS_TRACKING_FINALIZED
Whether to choose safe (true) or latest (false) block to discover new confirmations. This setting is required to reduce latency between the actual confirmation transaction and its discovery. Recommended to have true on rollups which use Ethereum Mainnet as L1. Determines how fast new confirmations will be discovered. Implemented in #9312.
true
INDEXER_ARBITRUM_NEW_BATCHES_LIMIT
The number of batches to be handled and imported at once. This is applicable for cases when dozens of batches are found in one discovery iteration, and it is necessary to import them in chunks to avoid the entire process being aborted if any errors occur. Implemented in #9312.
10
Exchange rates management
Variable Required Description Default Version Application
DISABLE_EXCHANGE_RATES
Disables or enables fetching of coin price from Coingecko API.
false
v3.1.2+
API, Indexer
EXCHANGE_RATES_MARKET_CAP_SOURCE
This environment variable is used to set source for market cap fetching. Available values coin_gecko, mobula, coin_market_cap.
coin_gecko
v5.2.3+
API, Indexer
EXCHANGE_RATES_TVL_SOURCE
This environment variable is used to set source for TVL fetching. Available value is defillama.
(empty)
v5.3.0+
API, Indexer
EXCHANGE_RATES_PRICE_SOURCE
This environment variable is used to set source for price fetching. Available values are also crypto_compare, coin_gecko, mobula and coin_market_cap.
crypto_compare
v5.2.3+
API, Indexer
EXCHANGE_RATES_MOBULA_COIN_ID
Explicitly set Mobula coin ID.
(empty)
master
API, Indexer
EXCHANGE_RATES_MOBULA_SECONDARY_COIN_ID
Explicitly set Mobula coin ID for secondary coin market chart.
(empty)
master
API, Indexer
EXCHANGE_RATES_MOBULA_API_KEY
Mobula API key.
(empty)
master
API, Indexer
EXCHANGE_RATES_MOBULA_CHAIN_ID
Mobula chain id for which token prices are fetched, see full list in the Documentation.
ethereum
master
API, Indexer
EXCHANGE_RATES_COINGECKO_COIN_ID
Explicitly set CoinGecko coin ID.
(empty)
v4.1.4+
API, Indexer
EXCHANGE_RATES_COINGECKO_SECONDARY_COIN_ID
Explicitly set CoinGecko coin ID for secondary coin market chart. Implemented in #9483.
(empty)
v6.3.0+
API, Indexer
EXCHANGE_RATES_COINGECKO_API_KEY
CoinGecko API key.
(empty)
v4.1.4+
API, Indexer
EXCHANGE_RATES_COINMARKETCAP_API_KEY
CoinMarketCap API key. Required, if EXCHANGE_RATES_MARKET_CAP_SOURCE, EXCHANGE_RATES_PRICE_SOURCE is set to coin_market_cap.
(empty)
v4.1.4+
API, Indexer
EXCHANGE_RATES_COINMARKETCAP_COIN_ID
CoinMarketCap coin id.
(empty)
v5.2.1+
API, Indexer
EXCHANGE_RATES_COINMARKETCAP_SECONDARY_COIN_ID
CoinMarketCap coin id for secondary coin market chart. Implemented in #9483.
(empty)
v6.3.0+
API, Indexer
EXCHANGE_RATES_DEFILLAMA_COIN_ID
DefiLlama coin id.
(empty)
v5.3.0+
API, Indexer
EXCHANGE_RATES_FETCH_BTC_VALUE
if true explorer application will fetch btc_value for token exchange rates. Implemented in #5671.
(empty)
v4.1.5+
API, Indexer
EXCHANGE_RATES_COINGECKO_PLATFORM_ID
CoinGecko platform id for which token prices are fetched, see full list in /asset_platforms endpoint. Implemented in #6925.
ethereum
v5.1.2+
API, Indexer
TOKEN_EXCHANGE_RATE_INTERVAL
Interval between batch requests of token prices. Can be decreased in order to fetch prices faster if you have pro rate limit. Time format. Implemented in #6925.
5s
v5.1.2+
API, Indexer
TOKEN_EXCHANGE_RATE_REFETCH_INTERVAL
Interval between refetching token prices, responsible for the relevance of prices. Time format. Implemented in #6925.
1 hour
v5.1.2+
API, Indexer
TOKEN_EXCHANGE_RATE_MAX_BATCH_SIZE
Batch size of a single token price request. Implemented in #6925.
150
v5.1.2+
API, Indexer
DISABLE_TOKEN_EXCHANGE_RATE
If true disables fetching of token price. Implemented in #6925.
true
v5.1.2+
API, Indexer
EXCHANGE_RATES_CRYPTOCOMPARE_SECONDARY_COIN_SYMBOL
CryptoCompare coin symbol for secondary coin market chart. Implemented in #9483.
(empty)
v6.3.0+
API, Indexer
EXCHANGE_RATES_COINGECKO_BASE_URL
If set, overrides the Coingecko base URL. Implemented in #9679.
true
v6.4.0+
API, Indexer
EXCHANGE_RATES_COINGECKO_BASE_PRO_URL
If set, overrides the Coingecko Pro base URL. Implemented in #9679.
true
v6.4.0+
API, Indexer
EXCHANGE_RATES_COINMARKETCAP_BASE_URL
If set, overrides the CoinMarketCap base URL (Free and Pro). Implemented in #9679.
true
v6.4.0+
API, Indexer
Cache management
Variable Required Description Default Version Need recompile Application
CACHE_TXS_COUNT_PERIOD
Time interval to restart the task, which calculates the total txs count. Starting from release master, if the value is not set, ttl value gradually increases until the default value with growth of the block numbers. Time format.
2h
v4.1.3+
API, Indexer
CACHE_ADDRESS_SUM_PERIOD
Time to live of addresses sum (except burn address) cache. Time format. Starting from release master, if the value is not set, ttl value gradually increases until the default value with growth of the block numbers. Introduced in #2862.
1h
v4.1.3+
API, Indexer
CACHE_TOTAL_GAS_USAGE_PERIOD
Interval to restart the task, which calculates the total gas usage. Starting from release master, if the value is not set, ttl value gradually increases until the default value with growth of the block numbers. Time format.
2h
v4.1.3+
API, Indexer
CACHE_PBO_COUNT_PERIOD
Time interval to restart the task, which calculates the total pending_block_operations count. Time format.
20m
v5.2.0+
API, Indexer
CACHE_ADDRESS_TRANSACTIONS_GAS_USAGE_COUNTER_PERIOD
Interval to restart the task, which calculates gas usage at the address. Time format.
30m
v4.1.3+
API, Indexer
CACHE_TOKEN_HOLDERS_COUNTER_PERIOD
Interval to restart the task, which calculates holders count of the token. Time format.
1h
v4.1.3+
API, Indexer
CACHE_TOKEN_TRANSFERS_COUNTER_PERIOD
Interval to restart the task, which calculates transfers count of the token. Time format.
1h
v4.1.3+
API, Indexer
CACHE_ADDRESS_WITH_BALANCES_UPDATE_INTERVAL
Interval to restart the task, which calculates addresses with balances. Time format.
30m
v4.1.3+
✅
API, Indexer
TOKEN_METADATA_UPDATE_INTERVAL
Interval to restart the task which updates token metadata. Time format.
48h
v2.0.1+
API, Indexer
CACHE_AVERAGE_BLOCK_PERIOD
Update of average block period cache. Time format.
30m
v4.1.3+
API, Indexer
CACHE_MARKET_HISTORY_PERIOD
Update of market history cache. Time format.
6h
v4.1.3+
API, Indexer
CACHE_ADDRESS_TRANSACTIONS_COUNTER_PERIOD
Time to live of address' transactions counter. Time format. Introduced in #3330.
1h
v3.4.0+
API, Indexer
CACHE_ADDRESS_TOKENS_USD_SUM_PERIOD
Managing of cache invalidation period for the sum of USD value of tokens per tokens' holder address. Time format.
1h
v3.5.0+
API, Indexer
CACHE_EXCHANGE_RATES_PERIOD
Value which is to tune the time to live of exchange rates. Time format. Implemented in #5671.
10m
v4.1.5+
✅
API, Indexer
TOKEN_BALANCE_ON_DEMAND_FETCHER_THRESHOLD
A threshold to invalidate token balance cache. Time format.
1h
v5.1.2+
API, Indexer
COIN_BALANCE_ON_DEMAND_FETCHER_THRESHOLD
A threshold to invalidate coin balance cache. Time format.
1h
v5.1.2+
API, Indexer
CONTRACT_CODE_ON_DEMAND_FETCHER_THRESHOLD
An initial threshold (for exponential backoff) to fetch smart-contract bytecode on-demand. Time format. Implemented in #9708.
5s
v6.4.0+
API, Indexer
CACHE_ADDRESS_TOKEN_TRANSFERS_COUNTER_PERIOD
Interval to restart the task, which calculates the number of token transfers at the address. Time format. Implemented in #4699.
1h
v4.0.0+
API, Indexer
CACHE_BLOCK_COUNT_PERIOD
Time to live of blocks with consensus count cache. Starting from release master, if the value is not set, ttl value gradually increases until the default value with growth of the block numbers. Time format. Introduced in #1876.
2h
v4.1.3+
API, Indexer
CACHE_TOTAL_GAS_USAGE_COUNTER_ENABLED
if true, enables cache for total gas usage counter.
false
v5.1.3+
✅
API, Indexer
MARKET_HISTORY_FETCH_INTERVAL
Interval to update data for the last day in Market History table. Time format. Introduced in #9197.
1h
v6.1.0+
API, Indexer
CACHE_TRANSACTIONS_24H_STATS_PERIOD
Interval to update data for the last 24 hours transactions stats. Time format. Introduced in #9483.
1h
v6.3.0+
API, Indexer
CACHE_FRESH_PENDING_TRANSACTIONS_COUNTER_PERIOD
Interval to update count of pending transactions that appeared less than half an hour ago. Time format. Introduced in #9483.
5m
v6.3.0+
API, Indexer
CACHE_OPTIMISM_LAST_OUTPUT_ROOT_SIZE_COUNTER_PERIOD
Interval to update data for the last output root size counter. Time format. Introduced in #9532.
5m
v6.3.0+
API, Indexer
Gas price oracle management
Variable Required Description Default Version Application
GAS_PRICE_ORACLE_NUM_OF_BLOCKS
Gas price oracle: number of blocks to calculate average gas price from
200
v4.1.4+
API, Indexer
GAS_PRICE_ORACLE_SAFELOW_PERCENTILE
Gas price oracle: safelow percentile
35
v4.1.4+
API, Indexer
GAS_PRICE_ORACLE_AVERAGE_PERCENTILE
Gas price oracle: average percentile
60
v4.1.4+
API, Indexer
GAS_PRICE_ORACLE_FAST_PERCENTILE
Gas price oracle: fast percentile
90
v4.1.4+
API, Indexer
GAS_PRICE_ORACLE_CACHE_PERIOD
Gas price oracle: period of gas prices update. Time format.
30s
v4.1.4+
API, Indexer
GAS_PRICE_ORACLE_SIMPLE_TRANSACTION_GAS
Gas price oracle: amount of gas for a simple coin transfer. Introduced in #9044.
21000
v6.0.0+
API, Indexer
GAS_PRICE_ORACLE_SAFELOW_TIME_COEFFICIENT
Average block time multiplied by this coefficent for safelow gas price when time from pending transactions is not available. Floats may be used. Introduced in #9582.
5
v6.3.0+
API, Indexer
GAS_PRICE_ORACLE_AVERAGE_TIME_COEFFICIENT
Average block time multiplied by this coefficent for average gas price when time from pending transactions is not available. Floats may be used. Introduced in #9582.
3
v6.3.0+
API, Indexer
GAS_PRICE_ORACLE_FAST_TIME_COEFFICIENT
Average block time multiplied by this coefficent for fast gas price when time from pending transactions is not available. Floats may be used. Introduced in #9582.
1
v6.3.0+
API, Indexer
Main page dashboard management
Variable Required Description Default Version Application
GAS_PRICE
Gas price in Gwei. If the variable is present, gas price displays on the main page.
(empty)
v3.3.2+
API
TXS_STATS_ENABLED
Disables or enables txs per day stats gathering.
true
v5.1.3+
API
SHOW_PRICE_CHART
Disables or enables price and market cap of coin charts on the main page.
false
v3.1.2+
API
SHOW_PRICE_CHART_LEGEND
Allows to show price and market cap values under the chart even if price chart is not enabled via SHOW_PRICE_CHART env variable.
false
v5.1.4+
API
SHOW_TXS_CHART
Disables or enables txs count per day chart on the main page.
true
v3.1.2+
API
TXS_HISTORIAN_INIT_LAG
The initial delay in txs count history fetching in order to display txs count per day history chart on the main page. Time format.
0
v3.1.2+
API
TXS_STATS_DAYS_TO_COMPILE_AT_INIT
Number of days for fetching of history of txs count per day in order to display it in txs count per day history chart on the main page.
40
v3.1.2+
API
Header management
Variable Required Description Default Version Application
LOGO
Environment variable for the header logo image location. The logo files names for different chains can be found here.
/images/blockscout_logo.svg
all
API
SHOW_TESTNET_LABEL
Enables testnet label right after logo in the navigation panel. Implemented in #5732
(empty)
v4.1.6+
API
TESTNET_LABEL_TEXT
The text inside the test label. Implemented in #5732
Testnet
v4.1.6+
API
SUPPORTED_CHAINS
An array of supported chains that display in the footer and in the chains dropdown. This var was introduced in this PR #1900 and looks like an array of JSON objects.
[ { title: "POA", url: "https://blockscout.com/poa/core" }, { title: "Sokol", url: "https://blockscout.com/poa/sokol", test_net?: true }, { title: "Gnosis Chain", url: "https://gnosis.blockscout.com/" }, { title: "Ethereum Classic", url: "https://etc.blockscout.com", other?: true }, { title: "RSK", url: "https://rootstock.blockscout.com", other?: true } ]
v2.0.0+
API
APPS_MENU
true/false. If true, the Apps navigation menu item appears.
false
v3.3.1+
API
APPS
An array of embedded/external apps to display in Apps menu item. This var was introduced in this PR #3184 and looks like an array of JSON objects. An example of embedded link is described here #
(empty)
v5.0.0+
API
Footer management
Variable Required Description Default Version Application
FOOTER_LOGO
Environment variable for the footer logo image location. The logo files names for different chains can be found here.
/images/blockscout_logo.svg
API
RELEASE_LINK
The link to Blockscout release notes in the footer.
https: //github.com/poanetwork/ blockscout/releases/ tag/${BLOCKSCOUT_VERSION}
v1.3.5+
API
BLOCKSCOUT_VERSION
Added to the footer to signify the current BlockScout version.
(empty)
v1.3.4+
API
FOOTER_CHAT_LINK
Link in Chat menu item in the footer. Implemented in #5719.
https://discord.gg/3CtNAqVMRV
v4.1.6+
API
FOOTER_FORUM_LINK_ENABLED
Enable forum menu item in the footer.
false
v5.1.3+
API
FOOTER_FORUM_LINK
Link in Forum menu item in the footer. Implemented in #5719
https://forum.poa.network/c/blockscout
v4.1.6+
API
FOOTER_TELEGRAM_LINK_ENABLED
Enable Telegram menu item in the footer. Implemented in #7345.
false
v5.1.4+
API
FOOTER_TELEGRAM_LINK
Link in Telegram menu item in the footer. Implemented in #7345.
v5.1.4+
API
FOOTER_GITHUB_LINK
Github repository. Implemented in #5719.
https://github.com/blockscout/blockscout
v4.1.6+
API
FOOTER_LINK_TO_OTHER_EXPLORERS
true/false. If true, links to other explorers are added in the footer.
(empty)
v5.1.3+
API
FOOTER_OTHER_EXPLORERS
The list of alternative explorers.
(empty)
v5.1.3+
API
Contract management
Variable Required Description Default Version Application
CONTRACT_VERIFICATION_ALLOWED_SOLIDITY_EVM_VERSIONS
the comma-separated list of allowed EVM versions for Solidity contract verification. This var was introduced in #1964, updated in #7614.
"homestead,tangerineWhistle,spuriousDragon,byzantium,constantinople,petersburg,istanbul,berlin,london,paris,shanghai,default"
v5.2.0+
API
CONTRACT_VERIFICATION_ALLOWED_VYPER_EVM_VERSIONS
the comma-separated list of allowed EVM versions for Vyper contract verification. This var was introduced in #7614.
"byzantium,constantinople,petersburg,istanbul,berlin,paris,shanghai,default"
v5.2.0+
API
CONTRACT_VERIFICATION_MAX_LIBRARIES
Max amount of libraries to consider in smart-contract verification from flat/multi-part file(s). Implemented in #6204.
(empty)
v5.0.0+
API
CONTRACT_MAX_STRING_LENGTH_WITHOUT_TRIMMING
Hide long contract method data. For more details: #4667
2040
v4.0.0+
API
CONTRACT_DISABLE_INTERACTION
If true, contract interactions via "Write contract" or "Write proxy contract" tabs are disabled. Introduced in #7088.
(empty)
v5.1.2+
API
CONTRACT_PROXY_IMPLEMENTATION_TTL_VIA_AVG_BLOCK_TIME
If false, proxy contract implementation will be re-fetched immediately once someone opend proxy page bypassing average block time calculation. Implemented in #9155.
true
v6.1.0+
API
CONTRACT_AUDIT_REPORTS_AIRTABLE_URL
URL of AirTable to store audit reports from users. Implemented in #9120
(empty)
v6.1.0+
API
CONTRACT_AUDIT_REPORTS_AIRTABLE_API_KEY
Access token for CONTRACT_AUDIT_REPORTS_AIRTABLE_URL. Implemented in #9120
(empty)
v6.1.0+
API
CONTRACT_CERTIFIED_LIST
Comma-separated list of smart-contract addresses hashes, to which "certified" flag should be applied. Implemented in #9910
(empty)
v6.5.0+
API
WHITELISTED_WETH_CONTRACTS
Comma-separated list of smart-contract addresses hashes of WETH-like tokens which deposit and withdrawal events you'd like to index. Implemented in #10134
(empty)
master
API, Indexer
WETH_TOKEN_TRANSFERS_FILTERING_ENABLED
Toggle for WETH token transfers filtering which was introduced in #10134. Implemented in #10208
false
master
API, Indexer
Bridged tokens
Variable Required Description Default Version Need recompile Application
BRIDGED_TOKENS_ENABLED
Variable to enabled bridged tokens functionality. Introduced in #9169
(empty)
v6.1.0+
✅
API, Indexer
BRIDGED_TOKENS_ETH_OMNI_BRIDGE_MEDIATOR
OMNI bridge mediator for ETH tokens. Introduced in #9169
(empty)
v6.1.0+
API, Indexer
BRIDGED_TOKENS_BSC_OMNI_BRIDGE_MEDIATOR
OMNI bridge mediator for BSC tokens. Introduced in #9169
(empty)
v6.1.0+
API, Indexer
BRIDGED_TOKENS_POA_OMNI_BRIDGE_MEDIATOR
OMNI bridge mediator for POA tokens. Introduced in #9169
(empty)
v6.1.0+
API, Indexer
BRIDGED_TOKENS_AMB_BRIDGE_MEDIATORS
AMB bridge mediator. Introduced in #9169
(empty)
v6.1.0+
API, Indexer
BRIDGED_TOKENS_FOREIGN_JSON_RPC
Ethereum mainnet JSON RPC. Introduced in #9169
(empty)
v6.1.0+
API, Indexer
Misc UI management
Variable Required Description Default Version Need recompile Application
SHOW_ADDRESS_MARKETCAP_PERCENTAGE
Configures market cap percentage column on the top accounts page.
true
v2.1.1+
API
SHOW_MAINTENANCE_ALERT
Disables/enables announcement at the top of the explorer.
false
v3.6.0+
API
MAINTENANCE_ALERT_MESSAGE
Message text of the announcement at the top of the explorer.
(empty)
v3.6.0+
API
HIDE_BLOCK_MINER
Hides miner/validator/sequencer on block page and tiles if the value is `true` Implemented in #4611
(empty)
v4.0.0+
API
DISPLAY_TOKEN_ICONS
Displays token icons from TrustWallet assets repository if true. Implemented in #4596
(empty)
v4.0.0+
API
UNCLES_IN_AVERAGE_BLOCK_TIME
Include or exclude non-consensus blocks in avg block time calculation. Exclude if false.
false
v2.0.1+
API
COIN_BALANCE_HISTORY_DAYS
Number of days to consider at coin balance history chart.
10
v3.1.3+
API
ADMIN_PANEL_ENABLED
if true admin/\* routes are available. Implemented in #5208
(empty)
v4.1.2+
✅
API
DISABLE_ADD_TO_MM_BUTTON
If true, "Add chain to MM" button doesn't appear. Implemented in #6843
(empty)
v5.1.0+
API
PERMANENT_DARK_MODE_ENABLED
If true, permanent dark mode is enabled. Dark mode switcher is hidden in this case. Implemented in #6763
(empty)
v5.1.0+
API
PERMANENT_LIGHT_MODE_ENABLED
If true, permanent light mode is enabled. Dark mode switcher is hidden. Implemented in #6838
(empty)
v5.1.0+
API
CSV export
reCAPTCHA v2 and v3 keys for CSV export page. Do not use both v2/v3 keys. Only one version of reCAPTCHA should be used.
Variable Required Description Default Version Application
RE_CAPTCHA_SECRET_KEY
Google reCAPTCHA v2 secret key. Used by advanced CSV export. Implemented in #4747
(empty)
v4.0.0+
API
RE_CAPTCHA_CLIENT_KEY
Google reCAPTCHA v2 client key. Used by advanced CSV export. Implemented in #4747
(empty)
v4.0.0+
API
RE_CAPTCHA_V3_SECRET_KEY
Google reCAPTCHA v3 secret key. Used by advanced CSV export. Implemented in #7273
(empty)
v5.1.4+
API
RE_CAPTCHA_V3_CLIENT_KEY
Google reCAPTCHA v3 client key. Used by advanced CSV export. Implemented in #7273
(empty)
v5.1.4+
API
RE_CAPTCHA_DISABLED
Disable reCAPTCHA. Implemented in #7416
false
v5.1.5+
API
API rate limit management
Variable Required Description Default Version Need recompile Application
API_RATE_LIMIT
A global API rate limit: number or requests per second for all users. Implemented in #5030
50 req/sec
v4.1.1+
API
API_RATE_LIMIT_BY_KEY
A dedicated API rate limit per key for every type of API key (static or generated from Account module). Implemented in #5080
10 req/sec
v4.1.1+
API
API_RATE_LIMIT_WHITELISTED_IPS
Comma-separated whitelisted IPs list with dedicated rate limit. Implemented in #5090
(empty)
v4.1.1+
API
API_RATE_LIMIT_STATIC_API_KEY
Static API key with dedicated API rate limit. Implemented in #5080
(empty)
v4.1.1+
API
API_RATE_LIMIT_DISABLED
If true, any type of rate limit is ignored. Implemented in #6908
(empty)
v5.1.0+
API
API_RATE_LIMIT_IS_BLOCKSCOUT_BEHIND_PROXY
If true, then IP address of a client will be derived from proxy's headers (like X-Forwarded-For) using RemoteIp library. Implemented in #7148
false
v5.1.3+
API
API_RATE_LIMIT_BY_WHITELISTED_IP
A dedicated API rate limit for whitelisted IPs. Implemented in #5090
50 req/sec
v5.1.3+
API
API_RATE_LIMIT_BY_IP
Global rate limit for an IP address for API v2 requests sent from UI. #7148
3000
v5.1.3+
API
API_RATE_LIMIT_HAMMER_REDIS_URL
Redis DB URL for Hammer rate limit library. Implemented in #7148
(empty)
v5.1.3+
✅
API
API_RATE_LIMIT_UI_V2_WITH_TOKEN
Rate limit after submitting correct CAPTCHA. Implemented in #7148
5
v5.1.3+
API
API_RATE_LIMIT_TIME_INTERVAL
Time interval of rate limit. Time format. Implemented in #7148
1s
v5.1.3+
API
API_RATE_LIMIT_BY_IP_TIME_INTERVAL
Time interval of rate limit set by API_RATE_LIMIT_BY_IP. Time format. Implemented in #7148
5m
v5.1.3+
API
API_RATE_LIMIT_UI_V2_TOKEN_TTL_IN_SECONDS
TTL for token issued after submitting correct CAPTCHA for an API v2 requests from UI. In seconds. Implemented in #7148
18000
v5.1.3+
API
ETH_JSON_RPC_MAX_BATCH_SIZE
Max batch size for Eth JSON RPC requests. Implemented in #9409
5
v6.3.0+
API
GraphQL API management
Variable Required Description Default Version Need recompile Application
API_GRAPHQL_ENABLED
Enabling/disabling of GraphQL API. Implemented in #9751
true
v6.4.0+
API
API_GRAPHQL_MAX_COMPLEXITY
Query/schema max_complexity of GraphQL API. Implemented in #9751
215
v6.4.0+
✅
API
API_GRAPHQL_TOKEN_LIMIT
Query token_limit of Absinthe. Implemented in #9751
1000
v6.4.0+
✅
API
API_GRAPHQL_DEFAULT_TRANSACTION_HASH
Default transaction hash in a sample query to GraphiQL. Implemented in #9751.
0x69e3923eef50eada197c3336d546936d0c994211492c9f947a24c02827568f9f
v6.4.0+
✅
API
API_GRAPHQL_RATE_LIMIT
A global GraphQL API rate limit: number or requests per second for all users. Implemented in #9771
10 req/sec
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_BY_KEY
A dedicated GraphQL API rate limit per static key. If this limit is less than stated in API plan, then API_GRAPHQL_RATE_LIMIT_BY_KEY used for key generated from Account module. Implemented in #9771
5 req/sec
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_STATIC_API_KEY
Static GraphQL API key with dedicated GraphQL API rate limit. Implemented in #9771
(empty)
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_DISABLED
If true, any type of rate limit is ignored. Implemented in #9771
(empty)
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_BY_IP
Global rate limit for an IP address for GraphQL API requests. #9771
500
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_TIME_INTERVAL
Time interval of rate limit. Time format. Implemented in #9771
1s
v6.4.0+
API
API_GRAPHQL_RATE_LIMIT_BY_IP_TIME_INTERVAL
Time interval of rate limit set by API_GRAPHQL_RATE_LIMIT_BY_IP. Time format. Implemented in #9771
5m
v6.4.0+
API
Specific smart-contracts
Variable Required Description Default Version Application
METADATA_CONTRACT
This environment variable is specifically used by POA Network to obtain Validators information to display in the UI.
(empty)
all
API, Indexer
VALIDATORS_CONTRACT
This environment variable is specifically used by POA Network to obtain the list of current validators.
(empty)
all
API, Indexer
KEYS_MANAGER_CONTRACT
This environment variable is specifically used by POA Network to set KeysManager proxy contract in order to obtain payout key by mining key. This needs to identify distributed reward to the validator.
(empty)
v3.1.2+
API, Indexer
REWARDS_CONTRACT
Emission rewards contract address. This env var is used only if EMISSION_FORMAT is set to POA
0xeca443e8e1ab29971a45a9c57a6a9875701698a5
v2.0.4+
API, Indexer
TOKEN_BRIDGE_CONTRACT
Token bridge proxy contract. For `TokenBridge` supply module.
0x7301CFA0e1756B71869E93d4e4Dca5c7d0eb0AA6
v1.3.2+
API, Indexer
Account-related ENV variables
Variable Required Description Default Version Application
ACCOUNT_ENABLED
Turn on/off account functionality. If value istrue, account functionality is enabled.
(empty)
5.0.0
API
ACCOUNT_DATABASE_URL
Account DB connection string
value from DATABASE_URL
5.0.0
API
ACCOUNT_REDIS_URL
Account Redis connection string (for session storing configuration)
(empty)
5.0.0
API
ACCOUNT_POOL_SIZE
Account DB pool_size
50
5.0.0
API
ACCOUNT_AUTH0_DOMAIN
Domain for Ueberauth Auth0
(empty)
5.0.0
API
ACCOUNT_AUTH0_CLIENT_ID
Auth0 client ID Ueberauth Auth0
(empty)
5.0.0
API
ACCOUNT_AUTH0_CLIENT_SECRET
Auth0 client secret Ueberauth Auth0
(empty)
5.0.0
API
ACCOUNT_PUBLIC_TAGS_AIRTABLE_URL
Airtable URL for public tag requests functionality
(empty)
5.0.0
API
ACCOUNT_PUBLIC_TAGS_AIRTABLE_API_KEY
Airtable API key for public tag requests functionality
(empty)
5.0.0
API
ACCOUNT_SENDGRID_API_KEY
Sendgrid API key for watchlist notifications functionality
(empty)
5.0.0
API
ACCOUNT_SENDGRID_SENDER
Sendgrid sender email for watchlist notifications functionality
(empty)
5.0.0
API
ACCOUNT_SENDGRID_TEMPLATE
Sendgrid email template for watchlist notifications functionality
(empty)
5.0.0
API
ACCOUNT_CLOAK_KEY
Account DB encryption key. Instruction how to generate
(empty)
5.0.0
API
ACCOUNT_VERIFICATION_EMAIL_RESEND_INTERVAL
Time before resending confirmation email. Implemented in #7298. Time format
5m
v5.1.5+
API
ACCOUNT_PRIVATE_TAGS_LIMIT
Limit for address & transaction tags. Implemented in #8528.
2000
v5.3.1+
API
ACCOUNT_WATCHLIST_ADDRESSES_LIMIT
Limit for watch list addresses. Implemented in #8528.
15
v5.3.1+
API
ACCOUNT_WATCHLIST_NOTIFICATIONS_LIMIT_FOR_30_DAYS
Per account limit for watch list notifications sent for the last 30 days. Implemented in #8966.
1000
v5.3.3+
API
Integrations
Smart-contract verifier / Eth Bytecode DB
Variable Required Description Default Version Application
MICROSERVICE_SC_VERIFIER_ENABLED
If true, integration with Rust smart-contract verifier is enabled. true is the default value starting from version 6.4.0. Implemented in #5860
true
v5.1.3+
API
MICROSERVICE_SC_VERIFIER_URL
URL of Rust smart-contract verifier. Implemented in #5860
https://eth-bytecode-db.services.blockscout.com/
v5.1.3+
API
MICROSERVICE_ETH_BYTECODE_DB_INTERVAL_BETWEEN_LOOKUPS
Minimal time after unsuccessful check of smart contract's sources in Eth Bytecode DB. Implemented in #7187. Time format
10m
v5.1.3+
API
MICROSERVICE_SC_VERIFIER_TYPE
Type of smart contract microservice could be either eth_bytecode_db or sc_verifier. Implemented in #7187
eth_bytecode_db
v5.1.3+
API
MICROSERVICE_ETH_BYTECODE_DB_MAX_LOOKUPS_CONCURRENCY
Maximum amount of concurrent requests for fetching smart contract's sources in Eth Bytecode DB. Implemented in #8472
10
v5.3.0+
API
MICROSERVICE_SC_VERIFIER_API_KEY
API key for verification that metadata sent to verifier microservice from a trusted source. Implemented in #8750
(empty)
v5.3.2+
API
Sol2Uml
Variable Required Description Default Version Application
MICROSERVICE_VISUALIZE_SOL2UML_ENABLED
If true, integration with Rust sol2uml visualizer is enabled. Implemented in #6401
(empty)
v5.1.3+
API
MICROSERVICE_VISUALIZE_SOL2UML_URL
URL of Rust visualizer. Implemented in #6401
(empty)
v5.1.3+
API
Sig-provider
Variable Required Description Default Version Application
MICROSERVICE_SIG_PROVIDER_ENABLED
If true, integration with Rust sig-provider service is enabled. Implemented in #6541
(empty)
v5.1.3+
API
MICROSERVICE_SIG_PROVIDER_URL
URL of Rust sig-provider service. Implemented in #6541
(empty)
v5.1.3+
API
Blockscout ENS
Variable Required Description Default Version Application
MICROSERVICE_BENS_ENABLED
If true, integration with Blockscout ENS service is enabled. Implemented in #8972
(empty)
v5.4.0+
API
MICROSERVICE_BENS_URL
URL of Blockscout ENS service. Implemented in #8972
(empty)
v5.4.0+
API
Blockscout Account Abstraction
Variable Required Description Default Version Application
MICROSERVICE_ACCOUNT_ABSTRACTION_ENABLED
If true, integration with Blockscout Account Abstraction service is enabled. Implemented in #9145
(empty)
v6.1.0+
API
MICROSERVICE_ACCOUNT_ABSTRACTION_URL
URL of Blockscout ENS service. Implemented in #9145
(empty)
v6.1.0+
API
Tx Interpreter (Summary) Service
Variable Required Description Default Version Application
MICROSERVICE_TRANSACTION_INTERPRETATION_ENABLED
If true, integration with Tx Interpreter Service is enabled. Implemented in #8957
(empty)
v5.4.0+
API
MICROSERVICE_TRANSACTION_INTERPRETATION_URL
URL of Tx Interpreter Service. Implemented in #8957
(empty)
v5.4.0+
API
Metadata Service
Variable Required Description Default Version Application
MICROSERVICE_METADATA_ENABLED
If true, integration with Metadata Service is enabled. Implemented in #9706
(empty)
v6.4.0+
API
MICROSERVICE_METADATA_URL
URL of Metadata Service. Implemented in #9706
(empty)
v6.4.0+
API
Sourcify
Variable Required Description Default Version Application
SOURCIFY_INTEGRATION_ENABLED
Enables or disables verification of contracts through Sourcify.
false
v5.1.3+
API
SOURCIFY_SERVER_URL
URL to Sourcify backend.
https://sourcify.dev/server
v3.7.0+
API
SOURCIFY_REPO_URL
URL to Sourcify repository with fully verified contracts.
https://repo.sourcify.dev/contracts/*
\*before 3.7.1 https://repo.sourcify.dev/contracts/full_match/
v3.7.0+
API
Tenderly
Variable Required Description Default Version Application
SHOW_TENDERLY_LINK
if true, "Open in Tenderly" button is displayed on the transaction page. Implemented in #4656
(empty)
v4.0.0+
API
TENDERLY_CHAIN_PATH
Chain path to the transaction in Tenderly. For instance, for transactions in xDai, Tenderly link looks like this https://dashboard.tenderly.co/tx/xdai/0x..., then TENDERLY_CHAIN_PATH =/xdai. Implemented in #4656
(empty)
v4.0.0+
API
Datadog
Variable Required Description Default Version Application
DATADOG_HOST
Host configuration setting for Datadog integration.
(empty)
all
API
DATADOG_PORT
Port configuration setting for Datadog integration.
(empty}
all
API
Spandex
Variable Required Description Default Version Application
SPANDEX_BATCH_SIZE
Spandex and Datadog configuration setting.
(empty)
all
API
SPANDEX_SYNC_THRESHOLD
Spandex and Datadog configuration setting.
(empty)
all
API
Analytics
Variable Required Description Default Version Need recompile Application
MIXPANEL_TOKEN
Mixpanel project token.
(empty)
v5.0.0+
✅
API
MIXPANEL_URL
Url to use Mixpanel with proxy (Collection via Proxy).
(empty)
v5.0.0+
✅
API
AMPLITUDE_API_KEY
Amplitude API key.
(empty)
v5.0.0+
✅
API
AMPLITUDE_URL
Url to use Amplitude with proxy (Use Domain Proxy to Relay Events).
(empty)
v5.0.0+
✅
API
Solidityscan
Variable Required Description Default Version Application
SOLIDITYSCAN_CHAIN_ID
Solidityscan Internal chain id in Solidityscan. It may not match with actual chain ID. Implemented in #8908
(empty)
v5.3.3+
API
SOLIDITYSCAN_API_TOKEN
Solidityscan API token for usage of Solidityscan API.
(empty)
v5.3.3+
API
Noves.fi
Variable Required Description Default Version Application
NOVES_FI_BASE_API_URL
Noves.fi API base URL. Implemented in #9056.
https://blockscout.noves.fi
v6.1.0+
API
NOVES_FI_CHAIN_NAME
Noves.fi API chain name. Implemented in #9056.
(empty)
v6.1.0+
API
NOVES_FI_API_TOKEN
Noves.fi API token. Implemented in #9056.
(empty)
v6.1.0+
API
Zerion
Variable Required Description Default Version Application
ZERION_BASE_API_URL
Zerion API base URL. Implemented in #9896.
https://api.zerion.io/v1
v6.5.0+
API
ZERION_API_TOKEN
Zerion API token. Implemented in #9896.
(empty)
v6.5.0+
API
MUD framework
Variable Required Description Default Version Application
MUD_INDEXER_ENABLED
If true, integration with MUD is enabled. Implemented in #9869
(empty)
v6.6.0+
API
MUD_DATABASE_URL
MUD indexer DB connection URL.
value from DATABASE_URL
v6.6.0+
API
MUD_POOL_SIZE
MUD indexer DB pool_size
50
v6.6.0+
API
