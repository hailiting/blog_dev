package crypto

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"math/big"

	"golang.org/x/crypto/ed25519"
	"golang.org/x/crypto/ripemd160"

	"github.com/btcsuite/btcutil/base58"
)

// Ed25519 曲线参数
var (
	// 群的阶 n (Ed25519)
	CurveOrder, _ = new(big.Int).SetString("1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed", 16)
)

// GenerateRandomBigInt 生成安全的随机大整数
func GenerateRandomBigInt() (*big.Int, error) {
	randomBytes := make([]byte, 32)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return nil, err
	}
	return new(big.Int).SetBytes(randomBytes), nil
}

// BigIntToSeed 将大整数转换为 32 字节种子
func BigIntToSeed(sk *big.Int) []byte {
	bytes := sk.Bytes()
	seed := make([]byte, 32)
	
	// 右对齐
	if len(bytes) <= 32 {
		copy(seed[32-len(bytes):], bytes)
	} else {
		copy(seed, bytes[len(bytes)-32:])
	}
	
	return seed
}

// DerivePublicKey 从私钥片段派生公钥
func DerivePublicKey(sk *big.Int) []byte {
	seed := BigIntToSeed(sk)
	privateKey := ed25519.NewKeyFromSeed(seed)
	publicKey := privateKey.Public().(ed25519.PublicKey)
	return publicKey
}

// AddPublicKeys 相加两个公钥点（简化实现）
// 注意：这是 Ed25519 点加法的简化版本，实际应用需要使用完整的椭圆曲线点运算
func AddPublicKeys(pk1, pk2 []byte) []byte {
	// 这里使用简化实现，实际应该使用 edwards25519 包进行点加法
	// 为了示例目的，我们这里做一个简单的组合
	result := make([]byte, 32)
	for i := 0; i < 32 && i < len(pk1) && i < len(pk2); i++ {
		result[i] = pk1[i] ^ pk2[i] // XOR 作为简化示例
	}
	return result
}

// GenerateAddress 从公钥生成钱包地址
func GenerateAddress(publicKey []byte) string {
	// SHA-256
	sha256Hash := sha256.Sum256(publicKey)
	
	// RIPEMD-160
	ripemd := ripemd160.New()
	ripemd.Write(sha256Hash[:])
	ripemd160Hash := ripemd.Sum(nil)
	
	// 添加版本字节 (0x00 for mainnet)
	versionedHash := append([]byte{0x00}, ripemd160Hash...)
	
	// 双重 SHA-256 生成校验和
	firstHash := sha256.Sum256(versionedHash)
	secondHash := sha256.Sum256(firstHash[:])
	checksum := secondHash[:4]
	
	// Base58Check 编码
	addressBytes := append(versionedHash, checksum...)
	return base58.Encode(addressBytes)
}

// SHA256Hash 计算 SHA-256 哈希
func SHA256Hash(data []byte) []byte {
	hash := sha256.Sum256(data)
	return hash[:]
}

// HexToBytes 十六进制转字节
func HexToBytes(hexStr string) ([]byte, error) {
	return hex.DecodeString(hexStr)
}

// BytesToHex 字节转十六进制
func BytesToHex(data []byte) string {
	return hex.EncodeToString(data)
}

// BigIntMod 大整数取模
func BigIntMod(a *big.Int) *big.Int {
	return new(big.Int).Mod(a, CurveOrder)
}

