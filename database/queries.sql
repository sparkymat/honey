-- name: FetchUserByUsername :one
SELECT u.*
  FROM users u
  WHERE u.username = @email::text LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (
  name, username, encrypted_password
) VALUES (
  @name::text, @username::text, @encrypted_password::text
) RETURNING *;

-- name: CreateAccount :one
INSERT INTO accounts (
  user_id, bank, display_name
) VALUES (
  @user_id::bigint, @bank::text, @display_name::text
) RETURNING *;

-- name: ListAccounts :many
SELECT *
  FROM accounts a
  WHERE a.user_id = @user_id::bigint
  ORDER BY COALESCE(a.display_name, a.bank) ASC
  LIMIT @page_limit::int
  OFFSET @page_offset::int;

-- name: DeleteAccount :exec
DELETE FROM accounts WHERE id = @id::bigint AND user_id = @user_id::bigint;
