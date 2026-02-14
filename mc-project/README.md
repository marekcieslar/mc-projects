# mc-project

Frontend główny (Vite + React) + konfiguracje deploy na VPS z Alpine Linux, Nginx i PM2.

## Lokalny development

```bash
npm install
npm run dev
```

## Deploy / update na serwerze (Alpine Linux)

Poniżej kroki **za każdym razem**, gdy chcesz zdeployować nową wersję mc-project na VPS (zakładamy, że Nginx i Node/PM2 są już raz skonfigurowane zgodnie z katalogiem deploy/).

### 1. Lokalne zmiany i push

Na swoim komputerze (lokalnie):

```bash
git status                # sprawdź zmiany
git add .                 # dodaj pliki
git commit -m "update mc-project"  # opisz zmianę
git push                  # wyślij na zdalne repo
```

### 2. Wejście na serwer

Na VPS (Alpine), zaloguj się SSH:

```bash
ssh user@twoj-serwer
```

Jeśli projekt jest w /opt/mc-projects/mc-project (dostosuj jeśli używasz innej ścieżki):

```bash
cd /opt/mc-projects/mc-project
```

### 3. Pobranie najnowszego kodu

```bash
git pull
```

Jeśli to pierwszy raz na tym serwerze, zainstaluj zależności:

```bash
apk update
apk add nodejs npm git
```

### 4. Instalacja zależności i build

```bash
npm install
npm run build
```

Po tym w katalogu mc-project powstanie katalog dist/ z produkcyjnym buildem.

### 5. Podmiana statycznych plików serwowanych przez Nginx

Zakładamy, że Nginx serwuje mc-project z katalogu /srv/http/mc-project (tak jak w deploy/nginx.mc-project.conf).

```bash
mkdir -p /srv/http/mc-project
cp -r dist/* /srv/http/mc-project/
chown -R nginx:nginx /srv/http
```

### 6. Restart / reload Nginx (jeśli zmieniałeś config)

Jeśli **nie zmieniałeś** plików konfiguracyjnych Nginx (deploy/nginx.mc-project.conf), wystarczy podmiana plików w /srv/http/mc-project – Nginx sam zacznie serwować nową wersję bez przeładowania.

Jeśli zmieniłeś konfigurację Nginx i skopiowałeś ją do /etc/nginx/http.d/mc-project.conf, wykonaj:

```bash
nginx -t                      # sprawdzenie poprawności configu
rc-service nginx reload       # przeładowanie Nginx na Alpine
```

### 7. PM2 (backendy /dart, /school itp.)

Jeśli zmiany dotyczyły **tylko frontu mc-project**, PM2 nie wymaga żadnej akcji.

Jeśli zaktualizowałeś backendy, które są zarządzane przez PM2 (według pliku deploy/pm2.ecosystem.example.cjs lub własnego ecosystem.config.cjs):

```bash
pm2 restart all       # restart wszystkich procesów PM2
# albo konkretną aplikację, np.:
pm2 restart dart-backend
```

Po pierwszej konfiguracji PM2 na serwerze warto też wykonać:

```bash
pm2 save
pm2 startup openrc    # wygeneruje komendę, którą trzeba wkleić, aby PM2 startował po reboocie
```

Po wykonaniu powyższych kroków mc-project będzie zaktualizowany na serwerze, a Nginx nadal będzie przekierowywał /dart, /school itd. na odpowiednie backendy działające pod PM2.
