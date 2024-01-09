-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-09 13:16:58.559

-- tables
-- Table: Osoba
CREATE TABLE Osoba (
    Id_osoba integer NOT NULL CONSTRAINT Osoba_pk PRIMARY KEY,
    Imie varchar(40) NOT NULL,
    Nazwisko varchar(60) NOT NULL,
    Login varchar(50) NOT NULL,
    Haslo varchar(50) NOT NULL,
    Rodzaj varchar(50) NOT NULL,
    Adres varchar(100) NOT NULL
);

-- Table: Pizza
CREATE TABLE Pizza (
    Id_pizzy integer NOT NULL CONSTRAINT Pizza_pk PRIMARY KEY,
    Nazwa varchar(30) NOT NULL,
    cena integer NOT NULL,
    rozmiar integer NOT NULL,
    Skladniki varchar(130) NOT NULL
);

-- Table: Pizza_do_zamowienia
CREATE TABLE Pizza_do_zamowienia (
    Pizzer integer,
    Id_zam integer NOT NULL,
    Id_pizzy integer NOT NULL,
    Ilosc integer NOT NULL,
    CONSTRAINT Pizza_do_zamowienia_pk PRIMARY KEY (Id_zam,Id_pizzy),
    CONSTRAINT Pizza_do_zamowienia_Zamowiania FOREIGN KEY (Id_zam)
    REFERENCES Zamowiania (Id_zam),
    CONSTRAINT Pizza_do_zamowienia_Pizza FOREIGN KEY (Id_pizzy)
    REFERENCES Pizza (Id_pizzy),
    CONSTRAINT Pizza_do_zamowienia_Osoba FOREIGN KEY (Pizzer)
    REFERENCES Osoba (Id_osoba)
);

-- Table: Zamowiania
CREATE TABLE Zamowiania (
    Id_zam integer NOT NULL CONSTRAINT Zamowiania_pk PRIMARY KEY,
    data datetime NOT NULL,
    Dostawca integer,
    Odbiorca integer NOT NULL,
    CONSTRAINT Zamowiania_Osoba FOREIGN KEY (Odbiorca)
    REFERENCES Osoba (Id_osoba),
    CONSTRAINT Zamowiania_Osoba1 FOREIGN KEY (Dostawca)
    REFERENCES Osoba (Id_osoba)
);

-- End of file.

