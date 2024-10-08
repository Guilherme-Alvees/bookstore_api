import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Função para validar as variáveis de ambiente
const validateEnvVariables = () => {
  const requiredEnv = [
    "PGUSER",
    "PGHOST",
    "PGDATABASE",
    "PGPASSWORD",
    "PGPORT",
  ];
  requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(
        `⛔ Error: The environment variable ${envVar} is not defined!`
      );
      process.exit(1); // Finaliza o processo se uma variável importante não estiver definida
    }
  });
};

validateEnvVariables();

// Configuração do pool de conexões com tratamento de erros
const db_app = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
  max: 10, // Tamanho do pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Timeout de conexão
});

// Função para tentar conectar ao banco com várias tentativas
const connectWithRetry = (retries = 5, delay = 3000) => {
  db_app
    .connect()
    .then(() => {
      console.log("✅ Database connected successfully!");
    })
    .catch((err) => {
      if (retries === 0) {
        console.error(
          "⛔ Critical error: Failed to connect to database after multiple attempts."
        );
        console.error("Erro:", err.message || err); // Log do erro detalhado
        process.exit(1); // Finaliza o processo em caso de falha persistente
      } else {
        console.warn(
          `⛔ Error connecting to the bank. Trying again at ${
            delay / 1000
          } seconds... (${retries} remaining attempts)`
        );
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      }
    });
};

connectWithRetry(); // Inicia a tentativa de conexão com o banco

// Tratamento de erro quando há algum problema no pool de conexões
db_app.on("error", (err) => {
  console.error("⛔ Connection pool error: ", err.message || err);
  process.exit(1); // Finaliza o processo em caso de erro crítico no pool
});

export default db_app;
