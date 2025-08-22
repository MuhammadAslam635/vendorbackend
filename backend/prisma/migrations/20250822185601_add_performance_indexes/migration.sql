-- CreateIndex
CREATE INDEX "SubscribePackage_status_idx" ON "SubscribePackage"("status");

-- CreateIndex
CREATE INDEX "SubscribePackage_endDate_idx" ON "SubscribePackage"("endDate");

-- CreateIndex
CREATE INDEX "Transaction_paymentStatus_idx" ON "Transaction"("paymentStatus");

-- CreateIndex
CREATE INDEX "Transaction_transactionId_idx" ON "Transaction"("transactionId");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "User_utype_idx" ON "User"("utype");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "User_packageActive_idx" ON "User"("packageActive");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
