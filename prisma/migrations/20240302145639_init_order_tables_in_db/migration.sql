-- CreateTable
CREATE TABLE "orderItem" (
    "id" SERIAL NOT NULL,
    "orderId" BIGINT NOT NULL,
    "groceryId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "orderId" BIGINT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdOn" TIMESTAMP(6),
    "updatedOn" TIMESTAMP(6),

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "groceris"("groceryId") ON DELETE RESTRICT ON UPDATE CASCADE;
