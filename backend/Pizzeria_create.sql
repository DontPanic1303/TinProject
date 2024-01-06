-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-06 17:05:03.203

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
    Pizzer integer NOT NULL,
    Zamowiania_Id_zam integer NOT NULL,
    Pizza_Id_pizzy integer NOT NULL,
    Ilosc integer NOT NULL,
    CONSTRAINT Pizza_do_zamowienia_pk PRIMARY KEY (Zamowiania_Id_zam,Pizza_Id_pizzy),
    CONSTRAINT Pizza_do_zamowienia_Osoba FOREIGN KEY (Pizzer)
    REFERENCES Osoba (Id_osoba),
    CONSTRAINT Pizza_do_zamowienia_Zamowiania FOREIGN KEY (Zamowiania_Id_zam)
    REFERENCES Zamowiania (Id_zam),
    CONSTRAINT Pizza_do_zamowienia_Pizza FOREIGN KEY (Pizza_Id_pizzy)
    REFERENCES Pizza (Id_pizzy)
);

-- Table: Zamowiania
CREATE TABLE Zamowiania (
    Id_zam integer NOT NULL CONSTRAINT Zamowiania_pk PRIMARY KEY,
    data datetime NOT NULL,
    Dostawca integer NOT NULL,
    Odbiorca integer NOT NULL,
    CONSTRAINT Zamowiania_Osoba1 FOREIGN KEY (Dostawca)
    REFERENCES Osoba (Id_osoba),
    CONSTRAINT Zamowiania_Osoba FOREIGN KEY (Odbiorca)
    REFERENCES Osoba (Id_osoba)
);

-- End of file.

