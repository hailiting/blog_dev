package api

import (
	"encoding/hex"
	"log"
	"mpc-wallet-server/service"
	"mpc-wallet-server/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

// createWalletHandler 创建钱包处理器
func createWalletHandler(keyService *service.KeyService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.CreateWalletRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, types.ErrorResponse{
				Error:   "invalid_request",
				Message: "请求参数无效: " + err.Error(),
			})
			return
		}

		log.Println("\n" + "=".repeat(60))
		log.Println("📥 收到创建钱包请求")
		log.Println("=".repeat(60))

		// 创建钱包
		wallet, err := keyService.CreateWallet(req.PkUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, types.ErrorResponse{
				Error:   "wallet_creation_failed",
				Message: err.Error(),
			})
			return
		}

		// 返回响应
		response := types.CreateWalletResponse{
			Address: wallet.Address,
			PkNode:  hex.EncodeToString(wallet.PkNode),
			PkAgg:   hex.EncodeToString(wallet.PkAgg),
		}

		log.Println("\n✅ 钱包创建成功")
		log.Println("=".repeat(60))

		c.JSON(http.StatusOK, response)
	}
}

// getWalletInfoHandler 获取钱包信息处理器
func getWalletInfoHandler(keyService *service.KeyService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.WalletInfoRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, types.ErrorResponse{
				Error:   "invalid_request",
				Message: "请求参数无效: " + err.Error(),
			})
			return
		}

		// 获取钱包
		wallet, err := keyService.GetWalletByPkUser(req.PkUser)
		if err != nil {
			c.JSON(http.StatusNotFound, types.ErrorResponse{
				Error:   "wallet_not_found",
				Message: "钱包不存在",
			})
			return
		}

		// 返回响应
		response := types.CreateWalletResponse{
			Address: wallet.Address,
			PkNode:  hex.EncodeToString(wallet.PkNode),
			PkAgg:   hex.EncodeToString(wallet.PkAgg),
		}

		c.JSON(http.StatusOK, response)
	}
}

// listWalletsHandler 列出所有钱包处理器
func listWalletsHandler(keyService *service.KeyService) gin.HandlerFunc {
	return func(c *gin.Context) {
		wallets := keyService.ListWallets()

		// 转换为响应格式
		response := make([]types.CreateWalletResponse, 0, len(wallets))
		for _, wallet := range wallets {
			response = append(response, types.CreateWalletResponse{
				Address: wallet.Address,
				PkNode:  hex.EncodeToString(wallet.PkNode),
				PkAgg:   hex.EncodeToString(wallet.PkAgg),
			})
		}

		c.JSON(http.StatusOK, gin.H{
			"count":   len(response),
			"wallets": response,
		})
	}
}

