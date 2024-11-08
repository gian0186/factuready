-- CreateTable
CREATE TABLE "Bedrijf" (
    "id" SERIAL NOT NULL,
    "bedrijfsnaam" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "stad" TEXT NOT NULL,
    "btwNummer" TEXT NOT NULL,
    "kvkNummer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,
    "kleineondernemersregeling" BOOLEAN NOT NULL,
    "kleur1" TEXT NOT NULL,
    "kleur2" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bedrijf_pkey" PRIMARY KEY ("id")
);
