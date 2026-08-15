-- CreateEnum
CREATE TYPE "GlobalRole" AS ENUM ('student', 'teacher', 'external_evaluator');

-- CreateEnum
CREATE TYPE "ClassRole" AS ENUM ('student', 'external_evaluator');

-- CreateEnum
CREATE TYPE "ClassCycleStatus" AS ENUM ('locked', 'current', 'done');

-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('buy', 'sell');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('subscribe', 'redeem');

-- CreateEnum
CREATE TYPE "RecommendTag" AS ENUM ('值得追蹤', '需要補強');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "global_role" "GlobalRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "role_in_class" "ClassRole" NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycle_templates" (
    "cycle_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "day_notes" JSONB,

    CONSTRAINT "cycle_templates_pkey" PRIMARY KEY ("cycle_number")
);

-- CreateTable
CREATE TABLE "class_cycles" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "current_day" INTEGER NOT NULL DEFAULT 1,
    "status" "ClassCycleStatus" NOT NULL,
    "settled_at" TIMESTAMP(3),

    CONSTRAINT "class_cycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "securities" (
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "securities_pkey" PRIMARY KEY ("ticker")
);

-- CreateTable
CREATE TABLE "funds" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_holdings" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "shares" DECIMAL(18,4) NOT NULL,
    "avg_cost" DECIMAL(18,4),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "fund_holdings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_nav_snapshots" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "nav" DECIMAL(18,4) NOT NULL,
    "aum" DECIMAL(18,4),
    "cash" DECIMAL(18,4),
    "cumulative_return_pct" DECIMAL(8,4),
    "sharpe" DECIMAL(8,4),
    "mdd_pct" DECIMAL(8,4),

    CONSTRAINT "fund_nav_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "side" "TradeSide" NOT NULL,
    "shares" DECIMAL(18,4) NOT NULL,
    "price" DECIMAL(18,4) NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "reason_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prospectus_versions" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "version_no" INTEGER NOT NULL,
    "objective" TEXT,
    "strategy" TEXT,
    "suitable_investors" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prospectus_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager_statements" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "top_contributor" TEXT,
    "top_detractor" TEXT,
    "investor_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manager_statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager_responses" (
    "id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "question_ref_id" TEXT,
    "response" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manager_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor_positions" (
    "id" TEXT NOT NULL,
    "investor_id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "units" DECIMAL(18,4) NOT NULL,
    "cost_basis" DECIMAL(18,4),

    CONSTRAINT "investor_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "investor_id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "amount" DECIMAL(18,4) NOT NULL,
    "units" DECIMAL(18,4) NOT NULL,
    "reason_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor_ratings" (
    "id" TEXT NOT NULL,
    "investor_id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "question_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "investor_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_scores" (
    "id" TEXT NOT NULL,
    "rating_id" TEXT NOT NULL,
    "criterion_key" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "rating_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_evaluations" (
    "id" TEXT NOT NULL,
    "evaluator_id" TEXT NOT NULL,
    "fund_id" TEXT NOT NULL,
    "cycle_number" INTEGER NOT NULL,
    "fund_rating" INTEGER NOT NULL,
    "manager_rating" INTEGER NOT NULL,
    "recommend_tag" "RecommendTag",
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "external_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talent_evidence_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_evidence_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_evidence" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "skill_key" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "skill_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_class_id_key" ON "enrollments"("user_id", "class_id");

-- CreateIndex
CREATE UNIQUE INDEX "class_cycles_class_id_cycle_number_key" ON "class_cycles"("class_id", "cycle_number");

-- CreateIndex
CREATE UNIQUE INDEX "fund_nav_snapshots_fund_id_cycle_number_day_key" ON "fund_nav_snapshots"("fund_id", "cycle_number", "day");

-- CreateIndex
CREATE UNIQUE INDEX "prospectus_versions_fund_id_version_no_key" ON "prospectus_versions"("fund_id", "version_no");

-- CreateIndex
CREATE UNIQUE INDEX "investor_positions_investor_id_fund_id_key" ON "investor_positions"("investor_id", "fund_id");

-- CreateIndex
CREATE UNIQUE INDEX "investor_ratings_investor_id_fund_id_cycle_number_key" ON "investor_ratings"("investor_id", "fund_id", "cycle_number");

-- CreateIndex
CREATE UNIQUE INDEX "talent_evidence_profiles_user_id_class_id_key" ON "talent_evidence_profiles"("user_id", "class_id");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_cycles" ADD CONSTRAINT "class_cycles_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_cycles" ADD CONSTRAINT "class_cycles_cycle_number_fkey" FOREIGN KEY ("cycle_number") REFERENCES "cycle_templates"("cycle_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_holdings" ADD CONSTRAINT "fund_holdings_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_holdings" ADD CONSTRAINT "fund_holdings_ticker_fkey" FOREIGN KEY ("ticker") REFERENCES "securities"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_nav_snapshots" ADD CONSTRAINT "fund_nav_snapshots_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_ticker_fkey" FOREIGN KEY ("ticker") REFERENCES "securities"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prospectus_versions" ADD CONSTRAINT "prospectus_versions_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_statements" ADD CONSTRAINT "manager_statements_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_responses" ADD CONSTRAINT "manager_responses_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_responses" ADD CONSTRAINT "manager_responses_question_ref_id_fkey" FOREIGN KEY ("question_ref_id") REFERENCES "investor_ratings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_positions" ADD CONSTRAINT "investor_positions_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_positions" ADD CONSTRAINT "investor_positions_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_ratings" ADD CONSTRAINT "investor_ratings_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_ratings" ADD CONSTRAINT "investor_ratings_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_scores" ADD CONSTRAINT "rating_scores_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "investor_ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_evaluations" ADD CONSTRAINT "external_evaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_evaluations" ADD CONSTRAINT "external_evaluations_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_evidence_profiles" ADD CONSTRAINT "talent_evidence_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_evidence_profiles" ADD CONSTRAINT "talent_evidence_profiles_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_evidence" ADD CONSTRAINT "skill_evidence_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "talent_evidence_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
