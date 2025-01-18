-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "mark" INTEGER;

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "obtainMark" DOUBLE PRECISION DEFAULT 0;
