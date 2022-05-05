# proof Of Existence 例子

https://docs.substrate.io/tutorials/v3/proof-of-existence/

## git clone

`git clone -b v3.0.0 --depth 1 https://github.com/substrate-developer-hub/substrate-node-template`

`cd substrate-node-template`

- cargo update -p parity-db
- cargo run | cargo build --release
- gst 查看代码改动
- 使用远端编译的模式
  - cargo remote -r root@srv2210S.dus4.fastwebserver.de -- build --release
- `ssh -L 9944:127.0.0.1:9944 root@srv22105.dus4.fastwebserver.de`
  - `~/remote-builds/substrate-node-template# ./target/release/node-template --dev --tmp`
