const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'estudagyn.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

// Criar tabelas
db.serialize(() => {
    // Tabela de usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            cargo TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de matérias
    db.run(`
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cargo TEXT NOT NULL,
            nome TEXT NOT NULL,
            questoes INTEGER NOT NULL,
            peso INTEGER NOT NULL
        )
    `);

    // Tabela de tópicos
    db.run(`
        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_id INTEGER NOT NULL,
            texto TEXT NOT NULL,
            ordem INTEGER NOT NULL,
            FOREIGN KEY (subject_id) REFERENCES subjects(id)
        )
    `);

    // Tabela de progresso do usuário
    db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            topic_id INTEGER NOT NULL,
            is_studied BOOLEAN DEFAULT 0,
            is_reviewed BOOLEAN DEFAULT 0,
            last_update DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (topic_id) REFERENCES topics(id),
            UNIQUE(user_id, topic_id)
        )
    `);

    // Tabela de histórico de estudos (para gráfico de evolução)
    db.run(`
        CREATE TABLE IF NOT EXISTS study_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date DATE NOT NULL,
            topics_studied INTEGER DEFAULT 0,
            hours_studied REAL DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    console.log('Tabelas criadas com sucesso!');
});

module.exports = db;
