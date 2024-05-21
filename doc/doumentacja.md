# Specyfikacja aplikacji korepetycje
**Jakub Pluczak 2P**

## Spis treści
1. [Przeznaczenie aplikacji](#przeznaczenie-aplikacji)
2. [Wymagania](#wymagania)
   - [Wymagania niefunkcjonalne](#wymagania-niefunkcjonalne)
   - [Wymagania funkcjonalne](#wymagania-funkcjonalne)
3. [Konto](#konto)
4. [Użytkownicy](#użytkownicy)
   - [Korepetytor](#korepetytor)
   - [Uczeń](#uczen)
5. [Interfejs i działanie modułów](#interfejs-i-dzialanie-modulow)
   - [Strona główna](#strona-glowna)
   - [Logowanie/Rejestracja](#logowanierejestracja)
   - [Profil](#profil)
   - [Notatki](#notatki)
   - [Kompetencje](#kompetencje)
   - [Opinie](#opinie)
   - [Kalendarz](#kalendarz)
   - [Korepetycje/Korepetytorzy](#korepetycjekorepetytorzy)
6. [Baza danych](#baza-danych)
7. [Struktura i działanie systemu](#struktura-i-dzialanie-systemu)
8. [Wygląd aplikacji](#wyglad-aplikacji)

## Przeznaczenie aplikacji
Aplikacja służy do udzielania lub wyszukiwania korepetycji przez uczniów szkoły, działając wyłącznie w jej obrębie. Jest zaprojektowana, aby umożliwić uczniom wzajemną pomoc w zrozumieniu trudnego materiału oraz przygotowania do egzaminów. Aplikacja jest dostępna na różne platformy: na komputery jako strona internetowa i na telefony komórkowe jako aplikacja mobilna, zapewniając szeroki dostęp i elastyczność w korzystaniu z zasobów edukacyjnych bez względu na miejsce i czas.

Cele aplikacji to poprawa wyników edukacyjnych poprzez głębsze zrozumienie materiału i lepsze przygotowanie do testów, rozwijanie kompetencji oraz zwiększenie pewności siebie i poczucia kompetencji w procesie nauczania. Użytkownicy potrzebują dostępu do personalizowanych korepetycji, łatwości w znajdowaniu korepetytorów oraz bezpiecznej platformy do wymiany pytań i doświadczeń. Istnieją obawy dotyczące przeszkód w uczeniu się, jakości wsparcia edukacyjnego oraz ryzyka negatywnych ocen od innych.

## Wymagania

### Wymagania niefunkcjonalne
1. **Bezpieczeństwo:** Stosowanie zaawansowanego szyfrowania dla danych osobowych zgodnie z normami ochrony danych.
2. **Wydajność:** Optymalizacja czasu reakcji i ładowania, gwarantująca płynność pracy nawet pod dużym obciążeniem.
3. **Intuicyjność:** Łatwy w użyciu interfejs, minimalizujący czas potrzebny nowym użytkownikom na adaptację.
4. **Dostępność offline:** Dostęp do określonych funkcji bez połączenia z internetem.

### Wymagania funkcjonalne
1. **Zarządzanie profilem:** Edycja i aktualizacja profilu, w tym danych osobowych i kompetencji przez uczniów i korepetytorów.
2. **Rejestracja i autoryzacja:** Proces tworzenia konta z użyciem adresu email domeny ZSTI.
3. **Wyszukiwanie:** Funkcja wyszukiwania umożliwiająca filtrowanie korepetytorów i materiałów na podstawie różnych kryteriów.
4. **Oceny:** Dodawanie opinii dotyczących korepetycji, wspomagające podejmowanie decyzji przez innych użytkowników.
5. **Notatki edukacyjne:** Wymiana wiedzy poprzez publikację i przeglądanie notatek uczniowskich, które mogą być oceniane i komentowane.
6. **Kreowanie ofert korepetycji:** Umożliwienie uczniom zamieszczania ogłoszeń korepetycyjnych z opisem ich umiejętności.
7. **Prywatność danych:** Zapewnienie prywatności i bezpieczeństwa informacji zgodnie z przepisami o ochronie danych.

## Konto
Aplikacja oferuje zintegrowane konta dla korepetytorów i uczniów, z różnymi poziomami dostępu i uprawnieniami. Rejestracja w aplikacji wymaga założenia konta, które jest weryfikowane poprzez domenę mailową szkolną ZSTI, zapewniając, że tylko uczniowie i nauczyciele szkoły mają dostęp. Każdy użytkownik może edytować swoje dane na profilu, dodawać swoje osiągnięcia edukacyjne oraz zarządzać ustawieniami prywatności. Ponadto, w profilu można ustawić powiadomienia o nadchodzących korepetycjach i ocenach.

## Użytkownicy

### Korepetytor
Korepetytor dodaje dostępne terminy korepetycji do kalendarza aplikacji, które są widoczne dla wszystkich uczniów. Deklaruje zakres przedmiotów, z których jest w stanie prowadzić lekcje, podając swoje kompetencje i specjalizacje. Korepetytor może również zarządzać swoimi notatkami z lekcji, które mogą być udostępniane uczniom. Jest w stanie przeglądać i zarządzać ocenami wystawionymi przez uczniów, a także wnosić sprzeciwy w przypadku niezgodności.

### Uczeń
Uczeń ma możliwość wyszukiwania korepetytorów według konkretnej dziedziny wiedzy lub tematu. Może zapisać się na dostępne terminy i oceniać odbyte korepetycje, co pomaga w utrzymaniu wysokiej jakości nauczania. Uczniowie mają dostęp do historii swoich korepetycji oraz mogą otrzymywać rekomendacje na podstawie ich edukacyjnych preferencji i potrzeb.

## Interfejs i działanie modułów

### Strona główna
Strona główna jest centrum informacyjnym aplikacji, gdzie użytkownicy otrzymują aktualności szkolne, ogłoszenia oraz mogą uczestniczyć w szkolnych forach dyskusyjnych. Strona dostarcza spersonalizowane powiadomienia związane z nadchodzącymi wydarzeniami oraz korepetycjami.

### Logowanie/Rejestracja
Proces logowania wymaga podania adresu email z domeny szkolnej ZSTI oraz hasła. Proces rejestracji jest zabezpieczony dwuetapową weryfikacją, która wymaga potwierdzenia adresu email i silnego hasła. Strona logowania zawiera również opcję odzyskiwania zapomnianych haseł oraz pomoc techniczną.

### Profil
Profil użytkownika zawiera nie tylko podstawowe informacje kontaktowe, ale także szczegółowe dane o kompetencjach korepetytora czy preferencjach ucznia. Profil korepetytora dodatkowo zawiera sekcję z opiniami uczniów, co pozwala na lepsze dopasowanie korepetytorów do potrzeb uczniów. Znajdują się tam również odniesienia do innych modułów aplikacji.

### Notatki
Sekcja notatek umożliwia użytkownikom tworzenie, edycję i organizowanie notatek według przedmiotów i tematów. Notatki mogą być prywatne lub udostępniane wybranym osobom, co ułatwia współpracę i dzielenie się wiedzą. Jest to również dobra alternatywa dla uczniów, którzy nie są w stanie otrzymać korepetycji, a potrzebują się czegoś nauczyć/douczyć.

### Kompetencje
W module kompetencji korepetytorzy mogą dodawać i aktualizować swoje kompetencje (zakres materiału z danego przedmiotu lub przedmiotów, z których są w stanie udzielać korepetycji), co pozwala na lepsze dopasowanie ofert korepetycji do aktualnych potrzeb edukacyjnych uczniów.

### Opinie
Moduł opinii pozwala na przeglądanie i zarządzanie ocenami oraz komentarzami na temat korepetycji, co jest kluczowe dla utrzymania transparentności i jakości nauczania w aplikacji. Istnieje również ocena korepetycji, która może być wyrażona w skali 5-gwiazdkowej lub oceny w postaci od 1 do 5.

### Kalendarz
Kalendarz interaktywny wyświetla wszystkie nadchodzące wydarzenia edukacyjne, terminy korepetycji, a także pozwala na łatwe planowanie i rezerwowanie sesji korepetycyjnych. Widoczne są

 w nim zarówno terminy już obowiązujące nas korepetycji, jak i terminy korepetycji, w których możemy wziąć udział (dotyczy wyłącznie ucznia).

### Korepetycje/Korepetytorzy
Ta sekcja pozwala na wyszukiwanie korepetytorów według specjalizacji, przedmiotu lub tematu. Użytkownicy mogą przeglądać profile korepetytorów, w tym ich oceny i opinie, co ułatwia wybór odpowiedniej osoby do nauki. Dzięki odpowiedniej filtracji wyników, każdy z uczniów jest w stanie znaleźć to czego szuka.

## Baza danych
Baza danych aplikacji jest kluczowym elementem, który przechowuje wszelkie informacje związane z działaniem systemu, w tym dane użytkowników, szczegółowe informacje o korepetycjach, notatki, opinie i inne istotne dane. Została zaprojektowana, aby zapewnić szybki dostęp do potrzebnych informacji i umożliwić efektywne zarządzanie danymi przez użytkowników i administratorów systemu. 

Bezpieczeństwo przechowywania danych jest priorytetem w projektowaniu i utrzymaniu bazy danych. Wszystkie hasła są przechowywane w postaci zaszyfrowanej, używając algorytmów szyfrowania, co zapewnia ich ochronę przed nieautoryzowanym dostępem. Wymagania dotyczące haseł są surowe: każde hasło musi składać się z co najmniej 8 znaków, w tym przynajmniej jednej dużej litery, jednego znaku specjalnego i jednej cyfry, co dodatkowo zwiększa bezpieczeństwo.

System bazy danych jest również zaprojektowany z myślą o skalowalności, aby mógł efektywnie obsługiwać rosnącą liczbę użytkowników i wzrastające obciążenie danych w miarę rozwoju aplikacji. Dzięki zastosowaniu nowoczesnych technologii bazodanowych, aplikacja może szybko przetwarzać zapytania i aktualizacje danych, co jest kluczowe dla płynnego działania funkcji takich jak wyszukiwanie korepetytorów, zarządzanie notatkami i przeglądanie opinii.

## Struktura i działanie systemu
System edukacyjny został zaprojektowany z myślą o wsparciu uczniów, korepetytorów i administratorów poprzez bogaty zestaw funkcjonalności. Jako pierwszy krok, goście mogą się rejestrować i logować, aby stać się uczniami lub korepetytorami. Uczniowie posiadają możliwość przeglądania i wyszukiwania korepetycji według różnorodnych kryteriów, co ułatwia znalezienie odpowiednich zajęć. Dodatkowo, mogą oni oceniać i komentować doświadczenia z korepetycji, tworzyć i edytować notatki, a także zgłaszać wszelkie nieodpowiednie treści. Funkcjonalność ta jest wspierana przez klasę Notatki, która umożliwia przechowywanie treści oraz przypisanych do nich mediów.

Korepetytorzy, wzbogaceni o klasę Kompetencje, mogą prezentować swoje umiejętności i oferty edukacyjne, dodawać i zarządzać swoimi korepetycjami, a także planować terminy za pośrednictwem kalendarza. Są również w stanie dodawać i edytować kompetencje, które mogą być wyszukiwane i przeglądane przez uczniów, tworząc platformę dla efektywnej wymiany usług edukacyjnych.

Administrator systemu pełni rolę nadzorczą, z możliwością przeglądania zgłoszeń i zarządzania kontami użytkowników, w tym blokowania i usuwania kont w razie naruszenia zasad platformy. Funkcje te są reprezentowane w klasie Admin, która udostępnia metody do interakcji z danymi użytkowników i zgłoszeniami.

System zapewnia przestrzeń dla wszystkich użytkowników do wymiany opinii i doświadczeń, co pomaga w budowaniu wspólnoty edukacyjnej i zwiększa poczucie pewności siebie uczniów w ich edukacyjnej podróży. Jego struktura klas opisuje szczegółowo atrybuty i zachowania, które są integralną częścią zarządzania profilami, treściami i interakcjami między użytkownikami.

## Wygląd aplikacji
Link do figmy: [Figma - Aplikacja do korepetycji](https://www.figma.com/file/HfakK5aa9qwecYwOnvC8fA/aplikacja_do_korepetycji?type=design&mode=design&t=8xI9SFBYA04TvHIp-1)