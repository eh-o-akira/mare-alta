document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('meuformulário');
    const comentariosContainer = document.getElementById('comentarios-container');

    if (!form || !comentariosContainer) return;

    function carregarComentarios() {
        const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentariosContainer.innerHTML = '';

        if (comentariosSalvos.length === 0) {
            comentariosContainer.innerHTML = '<p style="text-align:center; color:#888;">Nenhum comentário ainda. Seja o primeiro!</p>';
            return;
        }

        comentariosSalvos.forEach(comentario => {
            const div = document.createElement('div');
            div.classList.add('comentario-item');
            div.style.backgroundColor = '#f9f9f9';
            div.style.padding = '15px';
            div.style.margin = '10px 0';
            div.style.borderRadius = '8px';
            div.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            div.innerHTML = `
                <strong>${comentario.nome} ${comentario.sobrenome}</strong> - ${comentario.data}<br>
                <em>"${comentario.mensagem}"</em><br>
                <small>
                    📧 ${comentario.email} | 📞 ${comentario.telefone || 'Não informado'} | 🎂 Nasc.: ${comentario.nascimento}
                </small>
            `;
            comentariosContainer.appendChild(div);
        });
    }

    function salvarComentario(comentario) {
        const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentariosSalvos.push(comentario);
        localStorage.setItem('comentarios', JSON.stringify(comentariosSalvos));
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome')?.value.trim();
        const sobrenome = document.getElementById('sobrenome')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const nascimento = document.getElementById('nascimento')?.value;
        const telefone = document.getElementById('telefone')?.value.trim();
        const mensagem = document.getElementById('mensagem')?.value.trim();

        if (!nome || !sobrenome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const novoComentario = {
            nome,
            sobrenome,
            email,
            nascimento,
            telefone,
            mensagem,
            data: new Date().toLocaleString('pt-BR')
        };

        salvarComentario(novoComentario);
        carregarComentarios();
        form.reset();
        alert('✅ Mensagem enviada com sucesso! Obrigado pelo seu feedback.');
    });

    carregarComentarios();
});