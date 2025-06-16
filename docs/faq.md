# Najczęściej Zadawane Pytania (FAQ)

## Technologie i Instalacja

### Jak zacząć korzystać z naszych rozwiązań?

Wszystkie nasze wtyczki i motywy są dostarczane z szczegółową dokumentacją instalacji. Poniżej znajdziesz podstawowe informacje o wymaganiach i procesie instalacji dla każdej z wykorzystywanych technologii.

## WordPress

### Jakie są wymagania systemowe dla wtyczek WordPress?

Nasze wtyczki WordPress wymagają:
- WordPress w wersji 5.8 lub wyższej
- PHP 7.4 lub nowszy
- MySQL 5.6 lub MariaDB 10.1 lub nowsze
- Mod_rewrite dla przyjaznych linków

### Jak zainstalować wtyczkę WordPress?

1. Pobierz plik .zip z wtyczką
2. W panelu WordPress przejdź do Wtyczki -> Dodaj nową
3. Kliknij "Wyślij wtyczkę" i wybierz pobrany plik
4. Aktywuj wtyczkę po instalacji

### Jak zainstalować motyw WordPress?

1. Pobierz plik .zip z motywem
2. W panelu WordPress przejdź do Wygląd -> Motywy
3. Kliknij "Dodaj nowy" a następnie "Wyślij motyw"
4. Po instalacji kliknij "Włącz"

## OctoberCMS

### Jakie są wymagania systemowe dla OctoberCMS?

Do instalacji naszych rozwiązań OctoberCMS potrzebujesz:
- PHP 7.4 lub wyższy
- PDO PHP Extension
- cURL PHP Extension
- OpenSSL PHP Extension
- GD PHP Extension
- Serwer Apache lub Nginx

### Jak zainstalować wtyczkę OctoberCMS?

Masz kilka opcji instalacji:

1. Przez Marketplace OctoberCMS
2. Przez Composer:

```bash
composer require nazwavendora/nazwaplugin
```

3. Ręcznie przez FTP, kopiując pliki do folderu plugins/

### Jak zainstalować motyw OctoberCMS?

1. Skopiuj pliki motywu do folderu themes/
2. Aktywuj motyw w ustawieniach administratora
3. Wykonaj migracje jeśli są wymagane:

```bash
php artisan october:up
```

## Wsparcie Techniczne

### Gdzie znajdę dokumentację techniczną?

Dokumentacja jest dostępna w następujących miejscach:
- W zakładce dokumentacji każdej wtyczki
- W repozytorium kodu (jeśli publiczne)
- W plikach README.md
- W komentarzach w kodzie

### Co zrobić w przypadku problemów technicznych?

W przypadku problemów technicznych:
1. Sprawdź dokumentację rozwiązywania problemów
2. Przejrzyj logi błędów
3. Skontaktuj się z naszym wsparciem przez:
   - Email: biuro@depcore.pl
   - System zgłoszeń w panelu klienta
   - GitHub Issues (jeśli dostępne)

### Jak zgłosić sugestię lub błąd?

Możesz zgłaszać sugestie i błędy:
- Przez system zgłoszeń
- Przez email wsparcia
- Przez GitHub Issues
- W dokumentacji produktu

## WordPress

### Jakie są wymagania systemowe dla wtyczek WordPress?
Nasze wtyczki WordPress wymagają:
- WordPress w wersji 5.8 lub wyższej
- PHP 7.4 lub nowszy
- MySQL 5.6 lub MariaDB 10.1 lub nowsze
- Mod_rewrite dla przyjaznych linków

### Jak zainstalować wtyczkę WordPress?
1. Pobierz plik .zip z wtyczką
2. W panelu WordPress przejdź do Wtyczki -> Dodaj nową
3. Kliknij "Wyślij wtyczkę" i wybierz pobrany plik
4. Aktywuj wtyczkę po instalacji

### Jak zainstalować motyw WordPress?
1. Pobierz plik .zip z motywem
2. W panelu WordPress przejdź do Wygląd -> Motywy
3. Kliknij "Dodaj nowy" a następnie "Wyślij motyw"
4. Po instalacji kliknij "Włącz"

### Jakie funkcje oferują motywy WordPress?
Nasze motywy WordPress zawierają:
- Pełną responsywność
- Optymalizację SEO
- Zintegrowany builder stron
- Kompatybilność z popularnymi wtyczkami
- Dostosowywanie przez Customizer

## OctoberCMS

### Jakie są wymagania systemowe dla OctoberCMS?
Do instalacji naszych rozwiązań OctoberCMS potrzebujesz:
- PHP 7.4 lub wyższy
- PDO PHP Extension
- cURL PHP Extension
- OpenSSL PHP Extension
- GD PHP Extension
- Serwer Apache lub Nginx

### Jak zainstalować wtyczkę OctoberCMS?
Masz kilka opcji instalacji:
1. Przez Marketplace OctoberCMS
2. Przez Composer:
```bash
composer require nazwavendora/nazwaplugin
```
3. Ręcznie przez FTP, kopiując pliki do folderu plugins/

### Jak zainstalować motyw OctoberCMS?
1. Skopiuj pliki motywu do folderu themes/
2. Aktywuj motyw w ustawieniach administratora
3. Wykonaj migracje jeśli są wymagane:
```bash
php artisan october:up
```

## Techniczne Aspekty

### Czy wtyczki wpływają na wydajność strony?
Nasze wtyczki są zoptymalizowane pod kątem wydajności:
- Wykorzystują cachowanie
- Minimalizują zapytania do bazy danych
- Ładują zasoby tylko gdy są potrzebne
- Wspierają kompresję i minifikację

### Jak aktualizować wtyczki i motywy?
Dla WordPress:
- Aktualizacje pojawiają się w panelu administracyjnym
- Zalecamy wykonanie kopii zapasowej przed aktualizacją
- Aktualizacje można włączyć automatycznie

Dla OctoberCMS:
- Przez panel administracyjny
- Przez composer: `composer update`
- Przez konsolę: `php artisan october:update`

### Jak mogę dostosować wtyczkę do swoich potrzeb?
Wszystkie nasze rozwiązania oferują:
- Filtry i akcje do modyfikacji zachowania
- Dokumentację API dla programistów
- Możliwość nadpisywania szablonów
- System konfiguracji przez plik config

## Rozwiązywanie Problemów

### Gdzie znajdę dokumentację techniczną?
- W zakładce dokumentacji każdej wtyczki
- W repozytorium kodu (jeśli publiczne)
- W plikach README.md
- W komentarzach w kodzie

### Co zrobić w przypadku konfliktów z innymi wtyczkami?
1. Sprawdź logi błędów
2. Wyłącz inne wtyczki aby zlokalizować konflikt
3. Skontaktuj się z naszym wsparciem technicznym
4. Sprawdź kompatybilność wersji

### Jak zgłosić problem techniczny?
Problemy możesz zgłaszać:
- Przez system zgłoszeń w panelu klienta
- Przez email na adres wsparcia
- Przez formularz kontaktowy na stronie
- Przez GitHub Issues (jeśli dostępne)

## WordPress

### Dlaczego warto wybrać WordPress?
WordPress to najbardziej popularny system zarządzania treścią na świecie, który oferuje:
- Łatwość obsługi dla administratorów
- Ogromną bazę wtyczek i motywów
- Regularne aktualizacje bezpieczeństwa
- Elastyczność w rozbudowie funkcjonalności

### Czy mogę samodzielnie zarządzać stroną na WordPress?
Tak, WordPress posiada intuicyjny panel administracyjny, który pozwala na samodzielne zarządzanie treścią, dodawanie wpisów, zdjęć i aktualizacji.

## OctoberCMS

### Co wyróżnia OctoberCMS?
OctoberCMS to nowoczesny system CMS, który oferuje:
- Wysoką wydajność
- Elastyczność w dostosowywaniu funkcjonalności
- Przejrzysty interfejs administracyjny
- Możliwość tworzenia zaawansowanych aplikacji webowych

### Dla kogo przeznaczony jest OctoberCMS?
OctoberCMS sprawdzi się szczególnie w projektach wymagających:
- Wysokiej wydajności
- Niestandardowych funkcjonalności
- Zaawansowanej personalizacji
- Skalowalności

## Wsparcie Techniczne

### Jakie formy wsparcia oferuje DEPCORE?
Oferujemy:
- Konsultacje techniczne
- Wsparcie w rozwoju i utrzymaniu stron
- Optymalizację wydajności
- Aktualizacje zabezpieczeń
- Pomoc w rozwiązywaniu problemów technicznych

### Jak mogę uzyskać pomoc techniczną?
Możesz skontaktować się z nami:
- Email: biuro@depcore.pl
- Telefon: +48 783 342 094
- Przez formularz kontaktowy na stronie

## Rozwój i Utrzymanie

### Czy oferujecie wsparcie po wdrożeniu strony?
Tak, zapewniamy pełne wsparcie po wdrożeniu, w tym:
- Monitoring działania strony
- Regularne aktualizacje
- Optymalizację wydajności
- Rozwiązywanie problemów technicznych

### Czy mogę rozwijać stronę w przyszłości?
Tak, wszystkie nasze rozwiązania są projektowane z myślą o przyszłym rozwoju. Możesz dodawać nowe funkcjonalności i rozszerzać możliwości strony w miarę rozwoju Twojego biznesu.