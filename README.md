# Kalu — solicitação de visita

Página única, responsiva e sem dependências. O formulário permite selecionar vários móveis, informar o nome e o bairro/cidade, e abrir uma mensagem pronta para o WhatsApp **+55 67 98163-7566**.

## Testar localmente

Com Node.js instalado, abra esta pasta no terminal e execute:

```powershell
npm run dev
```

Abra **http://localhost:4173**. Para encerrar, pressione `Ctrl+C` no terminal. Também é possível abrir `index.html` diretamente no navegador; o servidor é a opção recomendada.

## Ajustes

- **Telefone e nome na mensagem:** `config.js`. O número precisa ter país, DDD e telefone, apenas dígitos.
- **Cores:** variáveis no início de `styles.css`.
- **Logo:** `assets/logo-kalu.png`, copiada da identidade existente da Kalu.
- **Perguntas e itens:** `index.html`.
- **Texto da mensagem:** `app.js`.

## Aparência

O botão no cabeçalho alterna entre os modos claro e escuro. A escolha fica salva neste navegador para as próximas visitas. Sem escolha salva, a página acompanha a preferência de cores do navegador e suas mudanças; quando essa preferência não está disponível, usa o modo escuro. O tema é aplicado antes de carregar o CSS para evitar um clarão ao abrir a página.

Se o navegador bloquear o armazenamento local, a alternância continua funcionando durante a visita. Apenas a preferência de tema é salva; as respostas do formulário não são armazenadas.

## Fluxo

O botão valida os campos, monta o link `wa.me` com as respostas e abre o WhatsApp em outra aba ou no aplicativo. A página mostra a conclusão e um botão para reabrir o WhatsApp caso a abertura seja bloqueada. As respostas ficam disponíveis ao escolher “Editar minhas respostas”.

**O link prepara a mensagem; o cliente precisa confirmar o envio no WhatsApp.** A conclusão não representa uma mensagem entregue nem uma visita já agendada.

Não há banco de dados, analytics, cookies, cadastro, fontes externas ou envio das respostas para um servidor. As respostas são usadas apenas para compor a conversa no WhatsApp. A página não guarda os dados após ser recarregada.

## Site publicado

O site é publicado pelo GitHub Pages em **https://lmello437-lgtm.github.io/kalu/**.

O GitHub Pages usa a branch `main`, pasta `/ (root)`. O arquivo `.nojekyll` mantém a publicação como site estático. Atualizações enviadas para `main` são publicadas automaticamente.

Use a URL acima nas publicações e na bio. O endereço `localhost` serve apenas para teste neste computador.
