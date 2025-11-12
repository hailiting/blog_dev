package types

import "math/big"

// WalletKeyPair 钱包密钥对
type WalletKeyPair struct {
	Address string   // 钱包地址
	SkNode  *big.Int // 服务端私钥片段（不对外暴露）
	PkNode  []byte   // 服务端公钥片段
	PkUser  []byte   // 客户端公钥片段
	PkAgg   []byte   // 联合公钥
}

// CreateWalletRequest 创建钱包请求
type CreateWalletRequest struct {
	PkUser string `json:"pkUser" binding:"required"`
}

// CreateWalletResponse 创建钱包响应
type CreateWalletResponse struct {
	Address string `json:"address"`
	PkNode  string `json:"pkNode"`
	PkAgg   string `json:"pkAgg"`
}

// WalletInfoRequest 钱包信息请求
type WalletInfoRequest struct {
	PkUser string `json:"pkUser" binding:"required"`
}

// SignatureRequest 签名请求
type SignatureRequest struct {
	TxHash  string `json:"txHash" binding:"required"`
	RUser   string `json:"rUser" binding:"required"`
	Address string `json:"address" binding:"required"`
}

// SignatureResponse 签名响应
type SignatureResponse struct {
	RNode string `json:"rNode"` // 服务端临时公钥点
	SNode string `json:"sNode"` // 服务端部分签名
	R     string `json:"r"`     // 最终 r 值
}

// ErrorResponse 错误响应
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

