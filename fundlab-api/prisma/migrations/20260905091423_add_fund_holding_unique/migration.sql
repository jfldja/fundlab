/*
  Warnings:

  - A unique constraint covering the columns `[fund_id,ticker]` on the table `fund_holdings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fund_holdings_fund_id_ticker_key" ON "fund_holdings"("fund_id", "ticker");
