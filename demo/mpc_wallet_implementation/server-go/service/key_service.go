package service

import (
	"encoding/hex"
	"errors"
	"log"
	"math/big"
	"mpc-wallet-server/crypto"
	"mpc-wallet-server/types"
	"sync"
)

// KeyService 密钥管理服务
type KeyService struct {
	// 使用内存存储（实际应用应该使用数据库）
	wallets map[string]*types.WalletKeyPair
	mu      sync.RWMutex
}

// NewKeyService 创建密钥服务实例
func NewKeyService() *KeyService {
	return &KeyService{
		wallets: make(map[string]*types.WalletKeyPair),
	}
}

// CreateWallet 创建新钱包
func (ks *KeyService) CreateWallet(pkUserHex string) (*types.WalletKeyPair, error) {
	ks.mu.Lock()
	defer ks.mu.Unlock()

	// 1. 解析客户端公钥
	pkUser, err := hex.DecodeString(pkUserHex)
	if err != nil {
		return nil, errors.New("无效的客户端公钥格式")
	}

	log.Printf("📥 收到客户端公钥: %s", pkUserHex)

	// 2. 生成服务端私钥片段
	skNode, err := crypto.GenerateRandomBigInt()
	if err != nil {
		return nil, err
	}

	log.Printf("✅ 服务端私钥片段生成: sk_node = %s", skNode.String())

	// 3. 计算服务端公钥片段
	pkNode := crypto.DerivePublicKey(skNode)
	log.Printf("✅ 服务端公钥片段: pk_node = %s", hex.EncodeToString(pkNode))

	// 4. 计算联合公钥 Pk_agg = Pk_user + Pk_node
	pkAgg := crypto.AddPublicKeys(pkUser, pkNode)
	log.Printf("✅ 联合公钥: pk_agg = %s", hex.EncodeToString(pkAgg))

	// 5. 生成钱包地址
	address := crypto.GenerateAddress(pkAgg)
	log.Printf("✅ 钱包地址: %s", address)

	// 6. 保存钱包信息
	wallet := &types.WalletKeyPair{
		Address: address,
		SkNode:  skNode,
		PkNode:  pkNode,
		PkUser:  pkUser,
		PkAgg:   pkAgg,
	}

	ks.wallets[address] = wallet
	ks.wallets[pkUserHex] = wallet // 同时用 pkUser 作为索引

	return wallet, nil
}

// GetWalletByAddress 根据地址获取钱包
func (ks *KeyService) GetWalletByAddress(address string) (*types.WalletKeyPair, error) {
	ks.mu.RLock()
	defer ks.mu.RUnlock()

	wallet, exists := ks.wallets[address]
	if !exists {
		return nil, errors.New("钱包不存在")
	}

	return wallet, nil
}

// GetWalletByPkUser 根据客户端公钥获取钱包
func (ks *KeyService) GetWalletByPkUser(pkUserHex string) (*types.WalletKeyPair, error) {
	ks.mu.RLock()
	defer ks.mu.RUnlock()

	wallet, exists := ks.wallets[pkUserHex]
	if !exists {
		return nil, errors.New("钱包不存在")
	}

	return wallet, nil
}

// ListWallets 列出所有钱包
func (ks *KeyService) ListWallets() []*types.WalletKeyPair {
	ks.mu.RLock()
	defer ks.mu.RUnlock()

	// 去重（因为同一个钱包有两个索引）
	seen := make(map[string]bool)
	wallets := make([]*types.WalletKeyPair, 0)

	for _, wallet := range ks.wallets {
		if !seen[wallet.Address] {
			seen[wallet.Address] = true
			wallets = append(wallets, wallet)
		}
	}

	return wallets
}

