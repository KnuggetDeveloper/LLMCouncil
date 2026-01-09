-- CreateTable
CREATE TABLE "user_wallet" (
    "user_id" TEXT NOT NULL,
    "balance_microcredits" BIGINT NOT NULL DEFAULT 1500000000,
    "subscription_status" TEXT NOT NULL DEFAULT 'free',
    "current_period_end" TIMESTAMPTZ,
    "cap_microcredits" BIGINT NOT NULL DEFAULT 40000000000,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_wallet_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "subscription_payments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "payment_provider" TEXT NOT NULL,
    "payment_provider_id" TEXT NOT NULL,
    "amount_paid_cents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "grant_microcredits" BIGINT NOT NULL,
    "balance_before_microcredits" BIGINT NOT NULL,
    "balance_after_microcredits" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscription_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_usage" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "openrouter_generation_id" TEXT,
    "model_used" TEXT,
    "activity_type" TEXT NOT NULL,
    "cost_microusd" BIGINT NOT NULL,
    "debit_microcredits" BIGINT NOT NULL,
    "token_usage" JSONB,
    "balance_before_microcredits" BIGINT NOT NULL,
    "balance_after_microcredits" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_wallet_subscription_status_idx" ON "user_wallet"("subscription_status");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_payments_payment_provider_id_key" ON "subscription_payments"("payment_provider_id");

-- CreateIndex
CREATE INDEX "subscription_payments_user_id_created_at_idx" ON "subscription_payments"("user_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "credit_usage_request_id_key" ON "credit_usage"("request_id");

-- CreateIndex
CREATE INDEX "credit_usage_user_id_created_at_idx" ON "credit_usage"("user_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "user_wallet" ADD CONSTRAINT "user_wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_payments" ADD CONSTRAINT "subscription_payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_wallet"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_usage" ADD CONSTRAINT "credit_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_wallet"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
