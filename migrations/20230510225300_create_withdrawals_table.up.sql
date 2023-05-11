CREATE TABLE withdrawals (
    id BIGSERIAL PRIMARY KEY,
    account_id BIGINT NOT NULL,
    amount_cents INT NOT NULL,
    amount_currency TEXT NOT NULL,
    transacted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(account_id) REFERENCES accounts(id)
);
CREATE TRIGGER withdrawals_updated_at
  BEFORE UPDATE
  ON withdrawals
  FOR EACH ROW
    EXECUTE FUNCTION moddatetime(updated_at);
