-- CreateTable
CREATE TABLE "groceris" (
    "groceryId" BIGINT NOT NULL,
    "groceryName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "inventoryQuantity" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(6),
    "updatedOn" TIMESTAMP(6),

    CONSTRAINT "groceris_pkey" PRIMARY KEY ("groceryId")
);
