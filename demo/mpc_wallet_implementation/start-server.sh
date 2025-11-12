#!/bin/bash

# MPC 钱包服务器启动脚本

echo "🚀 启动 MPC 钱包服务器..."
echo "================================"

cd server-go

# 检查 Go 是否安装
if ! command -v go &> /dev/null; then
    echo "❌ 错误：未找到 Go。请先安装 Go 1.21+"
    echo "   下载地址：https://golang.org/dl/"
    exit 1
fi

echo "✅ Go 版本: $(go version)"

# 下载依赖
echo ""
echo "📦 下载依赖..."
go mod download

# 运行服务器
echo ""
echo "🎯 启动服务器（端口 8080）..."
echo "================================"
echo ""

go run main.go

