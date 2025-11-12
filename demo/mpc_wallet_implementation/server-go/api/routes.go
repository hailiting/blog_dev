package api

import (
	"mpc-wallet-server/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RegisterRoutes 注册所有 API 路由
func RegisterRoutes(
	r *gin.Engine,
	keyService *service.KeyService,
	signService *service.SignatureService,
) {
	// 健康检查
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"service": "mpc-wallet-server",
		})
	})

	// API v1 路由组
	v1 := r.Group("/api")
	{
		// 钱包相关
		wallet := v1.Group("/wallet")
		{
			wallet.POST("/create", createWalletHandler(keyService))
			wallet.POST("/info", getWalletInfoHandler(keyService))
			wallet.GET("/list", listWalletsHandler(keyService))
		}

		// 签名相关
		signature := v1.Group("/signature")
		{
			signature.POST("/request", signatureRequestHandler(signService))
		}
	}
}

