package route

import (
	"context"

	"github.com/sparkymat/honey/dbx"
)

type ConfigService interface {
	JWTSecret() string
	SessionSecret() string
	DatabaseURL() string
	DisableRegistration() bool
	ReverseProxyAuthentication() bool
	ProxyAuthUsernameHeader() string
	ProxyAuthNameHeader() string
}

//nolint:interfacebloat
type DatabaseService interface {
	FetchUserByUsername(ctx context.Context, email string) (dbx.User, error)
	CreateUser(ctx context.Context, arg dbx.CreateUserParams) (dbx.User, error)
}
