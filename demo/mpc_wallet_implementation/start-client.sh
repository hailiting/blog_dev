#!/bin/bash

# MPC 钱包客户端启动脚本

echo "🎯 启动 MPC 钱包客户端示例..."
echo "================================"

cd client-typescript

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js。请先安装 Node.js 16+"
    echo "   下载地址：https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 安装依赖..."
    npm install
fi

# 运行示例
echo ""
echo "🎯 运行客户端示例..."
echo "================================"
echo ""

npm run dev

