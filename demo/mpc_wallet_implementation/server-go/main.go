package main

import (
	"log"
	"mpc-wallet-server/api"
	"mpc-wallet-server/config"
	"mpc-wallet-server/service"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	cfg := config.Load()

	// 初始化服务
	keyService := service.NewKeyService()
	signService := service.NewSignatureService(keyService)

	// 创建 Gin 路由
	r := gin.Default()

	// 添加 CORS 中间件
	r.Use(corsMiddleware())

	// 注册 API 路由
	api.RegisterRoutes(r, keyService, signService)

	// 启动服务器
	log.Printf("🚀 MPC 钱包服务器启动在端口 %s", cfg.ServerPort)
	if err := r.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("服务器启动失败: %v", err)
	}
}

// CORS 中间件
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

