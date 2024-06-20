# BlockScout 浏览器搭建@

#

## 1. 准备

安装之前，我们需要准备运行 BlockScout 所需要的环境

安装 Homebrew (如果尚未安装)

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```shell
brew install erlang
brew install elixir
brew install postgresql
brew install node
brew install automake
brew install libtool
brew install inotify-tools
brew install gcc
brew install gmp



==> Downloading https://ghcr.io/v2/homebrew/core/node/blobs/sha256:acb56af4bf0e1
####################################################################       93.8%curl: (92) HTTP/2 stream 1 was not closed cleanly: PROTOCOL_ERROR (err 1)

Error: node: Failed to download resource "node"
Download failed: https://ghcr.io/v2/homebrew/core/node/blobs/sha256:acb56af4bf0e15ff4d6ef56fec98ecf5b4000910f0b7b298b9047b369431b4c2
```

查看 erlang 是否安装成功

```shell
brew install erlang
brew uninstall --ignore-dependencies erlang

erl
Erlang/OTP 21 [erts-10.0.5] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:1] [hipe]
Eshell V10.0.5  (abort with ^G)
```

查看 Elixir 是否安装成功

```shell
brew link --force erlang@24
brew install elixir
brew cleanup elixir
brew uninstall elixir
mix local.hex --uninstall
mix local.rebar --uninstall
brew uninstall elixir
rm -rf /usr/local/Cellar/elixir
rm -rf ~/.mix/
rm -rf ~/.hex/
rm -rf ~/.config/rebar3/
export PATH="$PATH:/opt/elixir/bin"

elixir -v
Erlang/OTP 21 [erts-10.0.5] [source] [64-bit] [smp:4:4] [ds:4:4:10] [async-threads:1] [hipe]

Elixir 1.9.4 (compiled with Erlang/OTP 20)
```

### PostgresSQL 安装

删除

```shell
# 停止 PostgreSQL 15 服务
brew services stop postgresql@15

# 卸载 PostgreSQL 15
brew uninstall postgresql@15

# 如果需要，删除 PostgreSQL 15 的数据目录（通常位于 /usr/local/var/postgres）
sudo rm -rf /usr/local/var/postgres@14

# 清理残留的缓存文件（可选，但推荐）
brew cleanup postgresql@15
```

- 安装

```shell

brew install postgresql@15

# postgresql@15 is keg-only, which means it was not symlinked into /usr/local,
# because this is an alternate version of another formula.

# If you need to have postgresql@15 first in your PATH, run:
#   echo 'export PATH="/usr/local/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc

# For compilers to find postgresql@15 you may need to set:
#   export LDFLAGS="-L/usr/local/opt/postgresql@15/lib"
#   export CPPFLAGS="-I/usr/local/opt/postgresql@15/include"

# To start postgresql@15 now and restart at login:
#   brew services start postgresql@15
# Or, if you don't want/need a background service you can just run:
#   LC_ALL="C" /usr/local/opt/postgresql@15/bin/postgres -D /usr/local/var/postgresql@15

# 查看postgresql版本
psql --version


# .zshrc 环境变量
export PATH="/usr/local/opt/postgresql@15/bin:$PATH"
export LDFLAGS="/usr/local/opt/postgresql@15/lib"
export CPPFLAGS="/usr/local/opt/postgresql@15/include"
export PKG_CONFIG_PATH="/usr/local/opt/postgresql@15/lib/pkconfig"

source ~/.zshrc

sudo bash -c 'cd /usr/local/var/postgres && vi pg_hba.conf'
sudo bash -c 'cd /usr/local/var/postgres && vi postgresql.conf'


# 启动PostgreSQL服务并设置开机启动
brew services start postgresql@15
# 重启
brew services restart postgresql@15
brew services stop postgresql@15
# # 使用一次性启动（不自动启动）
# pg_ctl -D /usr/local/opt/postgresql@15 -l /usr/local/opt/postgresql@15/server.log start # 启动
# pg_ctl -D /usr/local/opt/postgresql@15 stop -s -m fast  # 停止

# 给某个用户赋予 Superuser 权限 (此操作通常只对超级用户自身进行)
ALTER ROLE your_user_name SUPERUSER;

# 给某个用户赋予创建新角色的权限
ALTER ROLE your_user_name CREATEROLE;

# 给某个用户赋予创建数据库的权限
ALTER ROLE your_user_name CREATEDB;

# 给某个用户赋予复制权限（用于流复制等）
ALTER ROLE your_user_name REPLICATION;



createdb admin
psql
# 创建 postgres 用户，密码为 postgres
CREATE USER postgres WITH PASSWORD 'postgres';
# 将数据库所有权限赋予postgres用户：
GRANT ALL PRIVILEGES ON DATABASE postgres to postgres;
# 赋予所有表的权限
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
# 赋予所有序列的权限
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
# 赋予所有函数的权限
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

# 键入如下指令，修改密码，笔者将密码修改为 postgres
ALTER USER postgres WITH PASSWORD 'postgres';

ALTER USER postgres WITH PASSWORD '1234';

# 键入 “\q”退出SQL Shell，键入exit登出postgres账户
# \du  查看权限
# \c blockscout 进入 blockscout 数据库
# \dt 查看当前数据有哪些表
```

- Install icu4c version 63 with Homebrew

```shell
CREATE DATABASE blockscout;
# -- 首先，确保已连接到正确的数据库
\c blockscout
# -- 然后执行以下 SQL 语句来创建 blocks 表
CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(66) NOT NULL,
    consensus BOOLEAN NOT NULL,
    difficulty BIGINT,
    gas_limit BIGINT,
    gas_used BIGINT,
    nonce VARCHAR(66),
    number BIGINT,
    size BIGINT,
    timestamp TIMESTAMP,
    total_difficulty BIGINT,
    refetch_needed BOOLEAN,
    base_fee_per_gas VARCHAR(66),
    is_empty BOOLEAN,
    inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    miner_hash VARCHAR(66),
    parent_hash VARCHAR(66)
);



psql -U postgres -W -h localhost -c 'CREATE DATABASE blockscout;'
# Intel
cd $(brew --prefix)/Homebrew/Library/Taps/homebrew/homebrew-core/Formula
# M1
cd $(brew --prefix)/Library/Taps/homebrew/homebrew-core/Formula


git log --follow icu4c.rb
git checkout -b icu4c-63 e7f0f10dc63b1dc1061d475f1a61d01b70ef2cb7
brew uninstall icu4c
brew install icu4c@63
git checkout master
```

#### PostgresSQL 使用

```shell
# 初始化数据库
sudo rm -rf /usr/local/var/postgres
initdb /usr/local/var/postgres



# 修改服务数据库权限
# 1. 找到你的 PostgreSQL 数据库目录下的 pg_hba.conf 文件（默认位置取决于操作系统和安装路径，通常是类似 /var/lib/pgsql/data/pg_hba.conf 或者 /usr/local/var/postgres/pg_hba.conf）
vi /usr/local/var/postgres/pg_hba.conf

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     md5
host    replication     all             127.0.0.1/32            md5
host    replication     all             ::1/128                 md5




# 设置允许远程访问数据库
vi /usr/local/var/postgres/postgresql.conf

# - Connection Settings -
listen_addresses = "*"
port = 5432				# (change requires restart)
max_connections = 100			# (change requires restart)


# 创建名为 postgres 的用户和组
sudo dscl . -create /Users/postgres
sudo dscl . -create /Users/postgres UserShell /bin/bash
sudo dscl . -create /Users/postgres UniqueID 502 # 使用未被占用的UID
sudo dscl . -create /Users/postgres PrimaryGroupID 20 # 将其加入到 staff 组，也可以选择创建新的组
sudo dscl . -create /Users/postgres NFSHomeDirectory /Users/postgres # 创建家目录

# 设置密码（这里假设为 "your_password"）
sudo dscl . -passwd /Users/postgres postgres
sudo dscl . -passwd /Users/admin 1234

# 创建名为 postgres 的组（如果尚未存在）
# sudo dseditgroup -o create -g staff postgres

# 确保 PostgreSQL 数据目录的所有权正确
sudo chown -R postgres:staff /usr/local/var/postgres

# 设置密码（这里假设为 "your_password"）
sudo dscl . -passwd /Users/postgres postgres

# 重启数据库
sudo -u postgres /usr/local/pgsql/bin/pg_ctl restart -D /usr/local/var/postgres
brew services start postgresql@15
brew services restart postgresql@15

brew services stop postgresql@15
# pg_ctlcluster 15 main reload
pkill -HUP -u `whoami` postgres


rm -rf /usr/local/var/postgres # 或者其他 PostgreSQL 数据目录
initdb --locale=en_US.UTF-8 -E UTF8 -D /usr/local/var/postgres


SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' -- 或指定的模式名称
    AND table_name = 'your_table_name'
);

```

## 2. 部署 BlockScout

拉代码

```sh
git clone https://github.com/poanetwork/blockscout
cd blockscout
```

生成 secret_key_base ，时间比较久需要耐心等待

```sh


mix deps.get
# 可以运行以下命令生成一个新的 secret_key_base
mix phx.gen.secret

Generated phoenix_ecto app
6jxYPOI+YMac7ESrUaDeJLF0ex+i29aowSjk1D5a9BAAieL9xK1cbfyKRRqswPUI




# 如果您以前已经部署过，请从先前的版本中删除静态资源
mix phx.digest.clean

# 清理依赖项：运行以下命令清理依赖项
mix deps.clean prometheus_process_collector
# 再次运行编译命令
mix deps.compile prometheus_process_collector --force
# 尝试更新依赖项以获取最新版本
mix deps.update prometheus_process_collector
```

然后添加环境变量

```sh
export NETWORK="testnet"
# 数据库权限
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blockscout"
export DB_HOST=localhost
export DB_PASSWORD=postgres
export DB_PORT=5432
export DB_USERNAME=postgres

export SECRET_KEY_BASE="your key"
# BlockScout 目前支持 Parity, OpenEthereum, Geth, Nethermind, Hyperledger 客户端
export ETHEREUM_JSONRPC_VARIANT=geth
export ETHEREUM_JSONRPC_HTTP_URL="http://localhost:8545"
export ETHEREUM_JSONRPC_WS_URL="ws://localhost:8545"
export ETHEREUM_JSONRPC_TRACE_URL="http://localhost:8545"
export SUBNETWORK= MAINNET
export PORT=4000
export COIN="Test Coin"
```

安装 Mix 依赖和编译应用程序

```shell
mix do deps.get, local.rebar --force, deps.compile, compile

mix do deps.get
mix do local.rebar --force
mix do deps.compile
mix do compile
```

删除、创建和迁移数据库

```shell
mix do ecto.drop, ecto.create, ecto.migrate
```

安装 Node.js 依赖

```shell

# 获取和编译依赖
# mix deps.get
# mix deps.compile
brew services start postgresql@15 &&
cd apps/block_scout_web/assets &&
npm install && node_modules/webpack/bin/webpack.js --mode production &&
# 建立用于部署静态资产，执行命令
cd .. &&
mix phx.digest &&

# 启用 HTTPS
mix phx.gen.cert blockscout blockscout.local &&
# Start
cd ../.. &&
mix phx.server
```

```shell
cd apps/block_scout_web/assets &&
npm install && npm run deploy  &&
# npm install && node_modules/webpack/bin/webpack.js --mode production &&
# 建立用于部署静态资产，执行命令
cd .. &&
mix phx.digest &&

# 启用 HTTPS
mix phx.gen.cert blockscout blockscout.local &&
# Start
cd ../.. &&
mix phx.server
```

```shell
# shell.sh
# 设置Mac环境，确保HOMEBREW已安装
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/main/install.sh)"
fi

# 安装必要的依赖包
# brew install elixir erlang gmp openssl libtool automake inotify-tools autoconf python3 jq curl node npm

# 设置环境变量
export MIX_ENV=prod
export CACHE_EXCHANGE_RATES_PERIOD=$CACHE_EXCHANGE_RATES_PERIOD
export API_V1_READ_METHODS_DISABLED=$API_V1_READ_METHODS_DISABLED
export DISABLE_WEBAPP=$DISABLE_WEBAPP
export API_V1_WRITE_METHODS_DISABLED=$API_V1_WRITE_METHODS_DISABLED
export CACHE_TOTAL_GAS_USAGE_COUNTER_ENABLED=$CACHE_TOTAL_GAS_USAGE_COUNTER_ENABLED
export ADMIN_PANEL_ENABLED=$ADMIN_PANEL_ENABLED
export CACHE_ADDRESS_WITH_BALANCES_UPDATE_INTERVAL=$CACHE_ADDRESS_WITH_BALANCES_UPDATE_INTERVAL
export SESSION_COOKIE_DOMAIN=$SESSION_COOKIE_DOMAIN
export MIXPANEL_TOKEN=$MIXPANEL_TOKEN
export MIXPANEL_URL=$MIXPANEL_URL
export AMPLITUDE_API_KEY=$AMPLITUDE_API_KEY
export AMPLITUDE_URL=$AMPLITUDE_URL
export CHAIN_TYPE=$CHAIN_TYPE
export BRIDGED_TOKENS_ENABLED=$BRIDGED_TOKENS_ENABLED

# 创建并进入工作目录
mkdir -p /Users/admin/Desktop/blockscout/app
cd /Users/admin/Desktop/blockscout/app


# 将项目文件拷贝到本地构建目录
cp -R /Users/admin/Desktop/blockscout/blockscout/* .

# 安装Elixir Hex和Rebar
mix local.hex --force
mix local.rebar --force

# 获取和编译依赖
mix deps.get
mix deps.compile


# 安装并构建前端资源
cd /Users/admin/Desktop/blockscout/app/apps/block_scout_web/assets/
npm install
npm run deploy
cd /Users/admin/Desktop/blockscout/app/apps/explorer
npm install



cd /Users/admin/Desktop/blockscout/app
# 编译并执行Phoenix digest
mix compile
mix phx.digest


# 在本地构建Release（请注意，这与Docker中的分阶段构建不同）
# Mac上可能不需要构建到/opt/release目录下，而是直接在项目根目录下构建
mix release --env=prod

# # 假设你已经在某个地方构建好了release并想要复制到另一个目录
# # /Users/admin/Desktop/blockscout/blockscout
# cp -R /path/to/builder/output/blockscout /path/to/local/release
# cp -R /path/to/builder/apps/explorer/node_modules /path/to/local/node_modules
# cp /path/to/builder/config/config_helper.exs /path/to/local/config/config_helper.exs
# cp /path/to/builder/config/config_helper.exs /path/to/local/releases/${RELEASE_VERSION}/config_helper.exs
```

最后打开浏览器做测试
http://localhost:4000

/etc/hosts

```shell
vi /etc/hosts

::1 localhost   localhost.localdomain   localhost6  localhost6.localdomain6     blockscout blockscout.local
127.0.0.1   localhost   localhost.localdomain   localhost4  localhost4.localdomain4     blockscout blockscout.local
```

## 扩充

### Erlang 是一种专为构建高并发、分布式和容错系统而设计的编程语言

```shell
brew uninstall --ignore-dependencies erlang

brew install erlang
```

```erl
// hello_world.erl
-module(hello_world).
-export([start/0]).
start() ->
  io.fwrite("Hello, World! ~n").
```

```shell
# 编译
erlc hello_world.ert # 将会生成 .beam字节码文件
# 运行
erl -noshell -s hello_world start -init stop
```

### Elixir 是一种函数式、动态类型和并发性的编程语言

它运行在 Erlang 虚拟机(BEAM)之上，并充分利用`Erlang/OTP`平台的高并发性、容错性和分布式特性。

```exs
// hello.exs
IO.puts("Hello, World!")
```

```shell
# 运行
elixir hello.exs
```

## 最终的环境变量

浏览器配置
https://docs.blockscout.com/for-developers/information-and-settings/env-variables#misc-ui-management
前端配置
https://docs.blockscout.com/for-developers/information-and-settings/env-variables/frontend-common-envs

```.zshrc

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
# Java版本控制
if which jenv > /dev/null; then eval "$(jenv init - zsh)"; fi
export PATH=$PATH:/usr/local/go/bin
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet
# node版本控制
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


# postgresql
export PATH="/usr/local/Cellar/postgresql@15/15.6_1/bin:$PATH"
export LDFLAGS="/usr/local/Cellar/postgresql@15/15.6_1/lib"
export CPPFLAGS="/usr/local/Cellar/postgresql@15/15.6_1/include"
export PKG_CONFIG_PATH="/usr/local/Cellar/postgresql@15/15.6_1/lib/pkconfig"
export LD_LIBRARY_PATH="/usr/local/Cellar/postgresql@15/15.6_1/lib"
# export PATH="/usr/local/opt/postgresql@14/bin:$PATH"
# export LDFLAGS="/usr/local/opt/postgresql@14/lib"
# export CPPFLAGS="/usr/local/opt/postgresql@14/include"
# export PKG_CONFIG_PATH="/usr/local/opt/postgresql@14/lib/pkconfig"



# 数据库权限
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blockscout"
export DB_HOST=localhost
export DB_PASSWORD=postgres
export DB_PORT=5432
export DB_USERNAME=postgres

# BlockScout
export SECRET_KEY_BASE="9qIWIjHllaritKW7KdRtqUHEQNKoQP7FLGxq96W3bhU2XdXaMU7OoriTDo30SKqw"
export ETHEREUM_JSONRPC_VARIANT=geth
export ETHEREUM_JSONRPC_HTTP_URL="http://localhost:8545"
export ETHEREUM_JSONRPC_WS_URL="ws://localhost:8545"
export ETHEREUM_JSONRPC_TRACE_URL="http://localhost:8545"
export PORT=4000
export LOGO="/images/zytron_logo.svg"

export SUBNETWORK= "Zytron"
export NETWORK="testnet"
export NETWORK_ICON="_test_network_icon.html"
export COIN="Test Coin"


docker-compose up --build


# erlang
export ERLHOME=/usr/local/Cellar/erlang/26.2.2
export ERLANG_INCLUDE_PATH=$ERLHOME/lib/erlang/usr/include
export C_INCLUDE_PATH=$C_INCLUDE_PATH:$ERLANG_INCLUDE_PATH
export CPPFLAGS="-I$ERLANG_INCLUDE_PATH"
export PATH="/usr/local/Cellar/erlang/26.2.2/bin:$PATH"
export LDFLAGS="-L/usr/local/Cellar/erlang/26.2.2/lib"
# elixir
export PATH="/usr/local/Cellar/elixir/1.16.2/bin:$PATH"
```

远程

```sh
 ssh -i ~/.ssh/creator-generic-keys.pem ubuntu@34.217.13.183
scp -i ~/.ssh/creator-generic-keys.pem -r ubuntu@34.217.13.183:/opt/blockscout /Users/admin/Desktop/blockscout/ddd
```

```old
NEXT_PUBLIC_API_HOST=blockscout-zytron-testnet.zypher.game
NEXT_PUBLIC_API_PROTOCOL=http
NEXT_PUBLIC_STATS_API_HOST=http://blockscout-zytron-testnet.zypher.game:8080
NEXT_PUBLIC_NETWORK_NAME=zytron testnet
NEXT_PUBLIC_NETWORK_SHORT_NAME=zytron testnet
NEXT_PUBLIC_NETWORK_ID=80085
NEXT_PUBLIC_NETWORK_CURRENCY_NAME=Ether
NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL=ETH
NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS=18
NEXT_PUBLIC_API_BASE_PATH=/
NEXT_PUBLIC_APP_HOST=blockscout-zytron-testnet.zypher.game
NEXT_PUBLIC_APP_PROTOCOL=http
NEXT_PUBLIC_HOMEPAGE_CHARTS=['daily_txs']
NEXT_PUBLIC_VISUALIZE_API_HOST=http://blockscout-zytron-testnet.zypher.game:8081
NEXT_PUBLIC_IS_TESTNET=true
NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL=ws
NEXT_PUBLIC_API_SPEC_URL=https://raw.githubusercontent.com/blockscout/blockscout-api-v2-swagger/main/swagger.yaml
```

推 docker
git clone https://github.com/Blockscout836/frontend.git
cd frontend
docker build -t ghcr.io/blockscout836/frontend:my-version .
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
docker push ghcr.io/blockscout836/frontend:my-version
