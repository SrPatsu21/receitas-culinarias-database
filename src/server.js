const express = require('express');
const path = require('path');
const app = express();
const PORT = 8050;

app.use(express.json());

// Lista inicial de receitas
let receitas = [
    { id: 1, nome: 'Bolo de Chocolate', ingredientes: ['chocolate', 'açúcar', 'farinha'], tipo: 'sobremesa', descricao:" farinha, ovo, chocolate."},
    { id: 2, nome: 'Feijoada', ingredientes: ['feijão', 'carne', 'linguiça'], tipo: 'prato principal', descricao:" feijao, carne."},
    // Adicione mais receitas conforme necessário
];

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, './index.html'));
});

// Rota para listar todas as receitas
app.get('/receitas', (req, res) => {
    res.json(receitas);
});

// Rota para obter uma receita por ID
app.get('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (!receita) return res.status(404).send('Receita não encontrada');
    res.json(receita);
});

// Rota para adicionar uma nova receita
app.post('/receitas', (req, res) => {
    const novaReceita = {
        id: receitas.length + 1,
        nome: req.body.nome,
        ingredientes: req.body.ingredientes,
        tipo: req.body.tipo,
        descricao: req.body.descricao
    };
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});

// Rota para atualizar uma receita
app.put('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (!receita) return res.status(404).send('Receita não encontrada');

    receita.nome = req.body.nome || receita.nome;
    receita.ingredientes = req.body.ingredientes || receita.ingredientes;
    receita.tipo = req.body.tipo || receita.tipo;
    receita.descricao = req.body.descricao || receita.descricao;

    //* retorna receita
    res.json(receita);
});

// Rota para remover uma receita
app.delete('/receitas/:id', (req, res) => {
    const receitaIndex = receitas.findIndex(r => r.id === parseInt(req.params.id));
    if (receitaIndex === -1) return res.status(404).send('Receita não encontrada');

    receitas.splice(receitaIndex, 1);
    res.status(204).send();
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando\nhttp://127.0.0.1:${PORT}/`);
});
