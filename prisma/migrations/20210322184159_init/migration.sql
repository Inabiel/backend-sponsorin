-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(35) NOT NULL,
    "email" TEXT NOT NULL,
    "noTelpon" VARCHAR(14) NOT NULL,
    "password" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "rolesId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "proposal" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doneAt" TIMESTAMP(3) NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "finishAt" TIMESTAMP(3) NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(35) NOT NULL,
    "deskripsi" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventImages" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "path" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listKeperluan" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "namaKeperluan" VARCHAR(40) NOT NULL,
    "jumlahKeperluan" INTEGER NOT NULL,
    "UOM" VARCHAR(15) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategoriEvent" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(20) NOT NULL,
    "deskripsi" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventTokategoriEvent" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTokategoriEvent_AB_unique" ON "_EventTokategoriEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTokategoriEvent_B_index" ON "_EventTokategoriEvent"("B");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventImages" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listKeperluan" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTokategoriEvent" ADD FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTokategoriEvent" ADD FOREIGN KEY ("B") REFERENCES "kategoriEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
