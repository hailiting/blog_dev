package main

import (
	"bytes"
	"encoding/json"
	"mpc-wallet-server/api"
	"mpc-wallet-server/service"
	"mpc-wallet-server/types"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()

	keyService := service.NewKeyService()
	signService := service.NewSignatureService(keyService)

	api.RegisterRoutes(r, keyService, signService)

	return r
}

func TestHealthCheck(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/health", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	
	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)
	
	assert.Equal(t, "ok", response["status"])
	assert.Equal(t, "mpc-wallet-server", response["service"])
}

func TestCreateWallet(t *testing.T) {
	router := setupRouter()

	// 构造请求
	reqBody := types.CreateWalletRequest{
		PkUser: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
	}
	jsonData, _ := json.Marshal(reqBody)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/wallet/create", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

	var response types.CreateWalletResponse
	json.Unmarshal(w.Body.Bytes(), &response)

	assert.NotEmpty(t, response.Address)
	assert.NotEmpty(t, response.PkNode)
	assert.NotEmpty(t, response.PkAgg)
}

func TestGetWalletInfo(t *testing.T) {
	router := setupRouter()

	// 先创建钱包
	pkUser := "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
	createReq := types.CreateWalletRequest{PkUser: pkUser}
	jsonData, _ := json.Marshal(createReq)

	w1 := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/api/wallet/create", bytes.NewBuffer(jsonData))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w1, req1)

	// 获取钱包信息
	infoReq := types.WalletInfoRequest{PkUser: pkUser}
	jsonData2, _ := json.Marshal(infoReq)

	w2 := httptest.NewRecorder()
	req2, _ := http.NewRequest("POST", "/api/wallet/info", bytes.NewBuffer(jsonData2))
	req2.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w2, req2)

	assert.Equal(t, 200, w2.Code)

	var response types.CreateWalletResponse
	json.Unmarshal(w2.Body.Bytes(), &response)

	assert.NotEmpty(t, response.Address)
}

func TestListWallets(t *testing.T) {
	router := setupRouter()

	// 创建两个钱包
	wallets := []string{
		"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
		"fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
	}

	for _, pkUser := range wallets {
		reqBody := types.CreateWalletRequest{PkUser: pkUser}
		jsonData, _ := json.Marshal(reqBody)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/api/wallet/create", bytes.NewBuffer(jsonData))
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)
	}

	// 列出钱包
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/wallet/list", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)

	count := int(response["count"].(float64))
	assert.GreaterOrEqual(t, count, 2)
}

func TestSignatureRequest(t *testing.T) {
	router := setupRouter()

	// 先创建钱包
	pkUser := "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
	createReq := types.CreateWalletRequest{PkUser: pkUser}
	jsonData, _ := json.Marshal(createReq)

	w1 := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/api/wallet/create", bytes.NewBuffer(jsonData))
	req1.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w1, req1)

	var createResp types.CreateWalletResponse
	json.Unmarshal(w1.Body.Bytes(), &createResp)

	// 发起签名请求
	signReq := types.SignatureRequest{
		TxHash:  "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
		RUser:   "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
		Address: createResp.Address,
	}
	jsonData2, _ := json.Marshal(signReq)

	w2 := httptest.NewRecorder()
	req2, _ := http.NewRequest("POST", "/api/signature/request", bytes.NewBuffer(jsonData2))
	req2.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w2, req2)

	assert.Equal(t, 200, w2.Code)

	var signResp types.SignatureResponse
	json.Unmarshal(w2.Body.Bytes(), &signResp)

	assert.NotEmpty(t, signResp.RNode)
	assert.NotEmpty(t, signResp.SNode)
	assert.NotEmpty(t, signResp.R)
}

func TestInvalidRequests(t *testing.T) {
	router := setupRouter()

	// 测试无效的创建钱包请求
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/wallet/create", bytes.NewBuffer([]byte("{}")))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w, req)

	assert.Equal(t, 400, w.Code)

	// 测试不存在的钱包
	infoReq := types.WalletInfoRequest{
		PkUser: "nonexistent",
	}
	jsonData, _ := json.Marshal(infoReq)

	w2 := httptest.NewRecorder()
	req2, _ := http.NewRequest("POST", "/api/wallet/info", bytes.NewBuffer(jsonData))
	req2.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(w2, req2)

	assert.Equal(t, 404, w2.Code)
}

