-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "restaurant_id" UUID NOT NULL,
    "dish_name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "waiter_id" UUID NOT NULL,
    "status" VARCHAR NOT NULL,
    "order_type" VARCHAR NOT NULL,
    "total_price" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" VARCHAR,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "roq_user_id" VARCHAR NOT NULL,
    "tenant_id" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_waiter_id_fkey" FOREIGN KEY ("waiter_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

