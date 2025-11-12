#!/bin/bash

# 同时启动服务器和客户端

echo "🚀 MPC 钱包完整演示"
echo "================================"
echo ""

# 启动服务器（后台运行）
echo "1️⃣  启动服务器..."
./start-server.sh &
SERVER_PID=$!

echo "⏳ 等待服务器启动..."
sleep 3

# 检查服务器是否启动成功
if curl -s http://localhost:8080/health > /dev/null; then
    echo "✅ 服务器启动成功"
else
    echo "❌ 服务器启动失败"
    kill $SERVER_PID
    exit 1
fi

echo ""
echo "2️⃣  启动客户端..."
echo ""

# 启动客户端
./start-client.sh

# 清理
echo ""
echo "🛑 停止服务器..."
kill $SERVER_PID
echo "✅ 演示结束"

