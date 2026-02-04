const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'estudagyn_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

// ============== ROTAS DE AUTENTICAÇÃO ==============

// Registro de usuário
app.post('/api/register', async (req, res) => {
    const { email, password, name, cargo } = req.body;

    if (!email || !password || !name || !cargo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO users (email, password, name, cargo) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, cargo],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ error: 'Email já cadastrado' });
                    }
                    return res.status(500).json({ error: 'Erro ao criar usuário' });
                }

                const token = jwt.sign(
                    { id: this.lastID, email, cargo },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                res.status(201).json({
                    message: 'Usuário criado com sucesso',
                    token,
                    user: { id: this.lastID, email, name, cargo }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, cargo: user.cargo },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({
                message: 'Login realizado com sucesso',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    cargo: user.cargo
                }
            });
        }
    );
});

// ============== ROTAS DE CONTEÚDO ==============

// Obter todas as matérias por cargo
app.get('/api/subjects/:cargo', authenticateToken, (req, res) => {
    const { cargo } = req.params;

    db.all(
        'SELECT * FROM subjects WHERE cargo = ? ORDER BY id',
        [cargo],
        (err, subjects) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar matérias' });
            }
            res.json(subjects);
        }
    );
});

// Obter tópicos de uma matéria
app.get('/api/subjects/:subjectId/topics', authenticateToken, (req, res) => {
    const { subjectId } = req.params;

    db.all(
        'SELECT * FROM topics WHERE subject_id = ? ORDER BY ordem',
        [subjectId],
        (err, topics) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar tópicos' });
            }
            res.json(topics);
        }
    );
});

// Obter currículo completo por cargo
app.get('/api/curriculum/:cargo', authenticateToken, (req, res) => {
    const { cargo } = req.params;

    db.all(
        'SELECT * FROM subjects WHERE cargo = ? ORDER BY id',
        [cargo],
        (err, subjects) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar currículo' });
            }

            const promises = subjects.map(subject => {
                return new Promise((resolve, reject) => {
                    db.all(
                        'SELECT * FROM topics WHERE subject_id = ? ORDER BY ordem',
                        [subject.id],
                        (err, topics) => {
                            if (err) reject(err);
                            resolve({ ...subject, topicos: topics });
                        }
                    );
                });
            });

            Promise.all(promises)
                .then(curriculum => res.json(curriculum))
                .catch(() => res.status(500).json({ error: 'Erro ao montar currículo' }));
        }
    );
});

// ============== ROTAS DE PROGRESSO ==============

// Obter progresso do usuário
app.get('/api/progress', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.all(
        'SELECT * FROM user_progress WHERE user_id = ?',
        [userId],
        (err, progress) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar progresso' });
            }
            res.json(progress);
        }
    );
});

// Atualizar progresso de um tópico
app.post('/api/progress', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { topic_id, is_studied, is_reviewed } = req.body;

    db.run(
        `INSERT INTO user_progress (user_id, topic_id, is_studied, is_reviewed, last_update)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, topic_id) 
         DO UPDATE SET 
            is_studied = ?,
            is_reviewed = ?,
            last_update = CURRENT_TIMESTAMP`,
        [userId, topic_id, is_studied ? 1 : 0, is_reviewed ? 1 : 0, is_studied ? 1 : 0, is_reviewed ? 1 : 0],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar progresso' });
            }
            res.json({ message: 'Progresso atualizado', id: this.lastID });
        }
    );
});

// Obter estatísticas do usuário
app.get('/api/stats', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const cargo = req.user.cargo;

    // Total de tópicos
    db.get(
        `SELECT COUNT(*) as total FROM topics t
         JOIN subjects s ON t.subject_id = s.id
         WHERE s.cargo = ?`,
        [cargo],
        (err, totalRow) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao calcular estatísticas' });
            }

            // Tópicos estudados
            db.get(
                `SELECT 
                    COUNT(*) as studied,
                    SUM(CASE WHEN is_reviewed = 1 THEN 1 ELSE 0 END) as reviewed
                 FROM user_progress
                 WHERE user_id = ? AND is_studied = 1`,
                [userId],
                (err, progressRow) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao calcular progresso' });
                    }

                    res.json({
                        total: totalRow.total,
                        studied: progressRow.studied || 0,
                        reviewed: progressRow.reviewed || 0,
                        percentage: totalRow.total > 0 
                            ? ((progressRow.studied || 0) / totalRow.total * 100).toFixed(1)
                            : 0
                    });
                }
            );
        }
    );
});

// Obter dados para gráficos
app.get('/api/charts', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const cargo = req.user.cargo;

    // Dados por matéria
    db.all(
        `SELECT 
            s.id,
            s.nome,
            s.peso,
            s.questoes,
            COUNT(t.id) as total_topics,
            SUM(CASE WHEN up.is_studied = 1 THEN 1 ELSE 0 END) as studied_topics
         FROM subjects s
         LEFT JOIN topics t ON t.subject_id = s.id
         LEFT JOIN user_progress up ON up.topic_id = t.id AND up.user_id = ?
         WHERE s.cargo = ?
         GROUP BY s.id`,
        [userId, cargo],
        (err, subjectsData) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao gerar dados dos gráficos' });
            }

            res.json({
                subjects: subjectsData.map(s => ({
                    ...s,
                    progress: s.total_topics > 0 
                        ? ((s.studied_topics || 0) / s.total_topics * 100).toFixed(0)
                        : 0
                }))
            });
        }
    );
});

// Sugestão da IA
app.get('/api/suggestion', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const cargo = req.user.cargo;

    db.all(
        `SELECT 
            s.id as subject_id,
            s.nome as subject_name,
            s.peso,
            s.questoes,
            t.id as topic_id,
            t.texto as topic_text,
            COALESCE(up.is_studied, 0) as is_studied
         FROM subjects s
         JOIN topics t ON t.subject_id = s.id
         LEFT JOIN user_progress up ON up.topic_id = t.id AND up.user_id = ?
         WHERE s.cargo = ?
         ORDER BY t.ordem`,
        [userId, cargo],
        (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao gerar sugestão' });
            }

            let maxScore = 0;
            let suggestion = null;

            const subjects = {};
            data.forEach(row => {
                if (!subjects[row.subject_id]) {
                    subjects[row.subject_id] = {
                        name: row.subject_name,
                        peso: row.peso,
                        questoes: row.questoes,
                        notStudied: []
                    };
                }

                if (row.is_studied === 0) {
                    subjects[row.subject_id].notStudied.push({
                        id: row.topic_id,
                        text: row.topic_text
                    });
                }
            });

            Object.values(subjects).forEach(subject => {
                if (subject.notStudied.length > 0) {
                    const score = subject.peso * subject.questoes * subject.notStudied.length;
                    if (score > maxScore) {
                        maxScore = score;
                        suggestion = {
                            materia: subject.name,
                            topico: subject.notStudied[0].text,
                            topic_id: subject.notStudied[0].id
                        };
                    }
                }
            });

            if (!suggestion) {
                suggestion = {
                    materia: 'Parabéns!',
                    topico: 'Você estudou todos os tópicos! Continue revisando.',
                    topic_id: null
                };
            }

            res.json(suggestion);
        }
    );
});

// ============== ROTA DA PÁGINA ==============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============== INICIAR SERVIDOR ==============

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor EstudaGyn rodando em http://localhost:${PORT}`);
    console.log(`📊 Banco de dados: estudagyn.db`);
    console.log(`\n✅ API pronta para receber requisições!\n`);
});
