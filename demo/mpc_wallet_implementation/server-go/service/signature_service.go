package service

import (
	"encoding/hex"
	"errors"
	"log"
	"math/big"
	"mpc-wallet-server/crypto"
	"mpc-wallet-server/types"
)

// SignatureService 签名服务
type SignatureService struct {
	keyService *KeyService
}

// NewSignatureService 创建签名服务实例
func NewSignatureService(keyService *KeyService) *SignatureService {
	return &SignatureService{
		keyService: keyService,
	}
}

// ProcessSignatureRequest 处理签名请求
func (ss *SignatureService) ProcessSignatureRequest(req *types.SignatureRequest) (*types.SignatureResponse, error) {
	log.Printf("\n🔐 收到签名请求")
	log.Printf("   地址: %s", req.Address)
	log.Printf("   交易哈希: %s", req.TxHash)
	log.Printf("   R_user: %s", req.RUser)

	// 1. 获取钱包信息
	wallet, err := ss.keyService.GetWalletByAddress(req.Address)
	if err != nil {
		return nil, errors.New("钱包不存在")
	}

	// 2. 解析交易哈希和客户端临时公钥点
	txHashBytes, err := hex.DecodeString(req.TxHash)
	if err != nil {
		return nil, errors.New("无效的交易哈希")
	}

	rUserBytes, err := hex.DecodeString(req.RUser)
	if err != nil {
		return nil, errors.New("无效的 R_user 格式")
	}

	// 将交易哈希转换为大整数
	h := new(big.Int).SetBytes(txHashBytes)
	log.Printf("✅ 交易哈希整数: h = %s", h.String())

	// 3. 生成服务端临时随机数
	kNode, err := crypto.GenerateRandomBigInt()
	if err != nil {
		return nil, err
	}
	log.Printf("✅ 服务端临时随机数: k_node = %s", kNode.String())

	// 4. 计算服务端临时公钥点 R_node = k_node × G
	rNode := crypto.DerivePublicKey(kNode)
	log.Printf("✅ 服务端临时公钥点: R_node = %s", hex.EncodeToString(rNode))

	// 5. 计算联合临时点 R = R_user + R_node
	rPoint := crypto.AddPublicKeys(rUserBytes, rNode)
	log.Printf("✅ 联合临时点: R = %s", hex.EncodeToString(rPoint))

	// 6. 提取 r 值（取 x 坐标）
	// 简化：直接将点的前 32 字节作为 r 值
	r := new(big.Int).SetBytes(rPoint)
	log.Printf("✅ r 值: r = %s", r.String())

	// 7. 计算服务端部分签名
	// s_node = (k_node × h + r × sk_node) mod n
	sNode := new(big.Int).Mul(kNode, h)
	temp := new(big.Int).Mul(r, wallet.SkNode)
	sNode.Add(sNode, temp)
	sNode.Mod(sNode, crypto.CurveOrder)

	log.Printf("✅ 服务端部分签名: s_node = %s", sNode.String())

	// 8. 返回响应
	response := &types.SignatureResponse{
		RNode: hex.EncodeToString(rNode),
		SNode: sNode.Text(16), // 十六进制
		R:     r.Text(16),     // 十六进制
	}

	log.Printf("📤 返回签名响应")
	return response, nil
}

// VerifyPartialSignature 验证部分签名（可选）
func (ss *SignatureService) VerifyPartialSignature(
	sNode *big.Int,
	r *big.Int,
	h *big.Int,
	wallet *types.WalletKeyPair,
) bool {
	// 这里可以添加零知识证明验证逻辑
	// 验证 s_node 确实是用 sk_node 计算的
	// 实际应用中应该实现完整的 ZK 证明
	return true
}

