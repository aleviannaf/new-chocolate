CREATE TABLE IF NOT EXISTS chocolates(
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(45) NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" DECIMAL(6,2) NOT NULL,
    "cocoa_percentage" INTEGER NOT NULL,
    "in_stock" INTEGER NOT NULL,
    "more_ingredients" VARCHAR(60)
);


