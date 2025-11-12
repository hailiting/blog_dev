package config

import (
	"os"
)

// Config 服务器配置
type Config struct {
	ServerPort string
	DBPath     string
	LogLevel   string
}

// Load 加载配置
func Load() *Config {
	return &Config{
		ServerPort: getEnv("SERVER_PORT", "8080"),
		DBPath:     getEnv("DB_PATH", "./data/mpc_wallet.db"),
		LogLevel:   getEnv("LOG_LEVEL", "info"),
	}
}

// getEnv 获取环境变量，如果不存在则使用默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

