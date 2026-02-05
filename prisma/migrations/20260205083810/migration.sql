/*
  Warnings:

  - A unique constraint covering the columns `[seatNumber]` on the table `bus_seats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bus_seats_seatNumber_key" ON "bus_seats"("seatNumber");
