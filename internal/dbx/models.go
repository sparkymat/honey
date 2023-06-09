// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2

package dbx

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Account struct {
	ID          int64
	UserID      int64
	DisplayName pgtype.Text
	Bank        string
	CreatedAt   pgtype.Timestamptz
	UpdatedAt   pgtype.Timestamptz
}

type SchemaMigration struct {
	Version int64
	Dirty   bool
}

type User struct {
	ID                int64
	Username          pgtype.Text
	Name              string
	EncryptedPassword string
	CreatedAt         pgtype.Timestamptz
	UpdatedAt         pgtype.Timestamptz
}

type Withdrawal struct {
	ID             int64
	AccountID      int64
	AmountCents    int32
	AmountCurrency string
	TransactedAt   pgtype.Timestamptz
	CreatedAt      pgtype.Timestamptz
	UpdatedAt      pgtype.Timestamptz
}
