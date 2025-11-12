package api

import (
	"log"
	"mpc-wallet-server/service"
	"mpc-wallet-server/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

// signatureRequestHandler 签名请求处理器
func signatureRequestHandler(signService *service.SignatureService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.SignatureRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, types.ErrorResponse{
				Error:   "invalid_request",
				Message: "请求参数无效: " + err.Error(),
			})
			return
		}

		log.Println("\n" + "=".repeat(60))
		log.Println("🔐 收到签名请求")
		log.Println("=".repeat(60))

		// 处理签名
		response, err := signService.ProcessSignatureRequest(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, types.ErrorResponse{
				Error:   "signature_failed",
				Message: err.Error(),
			})
			return
		}

		log.Println("\n✅ 签名处理完成")
		log.Println("=".repeat(60))

		c.JSON(http.StatusOK, response)
	}
}

