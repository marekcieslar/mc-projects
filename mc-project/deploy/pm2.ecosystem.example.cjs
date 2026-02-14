module.exports = {
  apps: [
    {
      name: "dart-backend",
      script: "./server.js", // albo "npm" z args: ["start"]
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000, // backend słucha na 3000, Nginx robi reverse proxy z /dart
      },
    },
    {
      name: "school-backend",
      script: "./server.js", // w katalogu school
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001, // backend słucha na 3001, Nginx robi reverse proxy z /school
      },
    },
    // Przykład Next.js
    {
      name: "next-app",
      cwd: "/srv/next-app", // katalog aplikacji Next
      script: "node_modules/next/dist/bin/next", // lub po prostu "next" jeśli w PATH
      args: "start -p 3002", // Next nasłuchuje na 3002
      instances: 1,
      autorestart: true,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
