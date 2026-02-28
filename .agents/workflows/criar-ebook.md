---
description: Como criar um novo Ebook Interativo a partir de um arquivo Markdown
---

# Workflow: `/criar-ebook`

Use este workflow sempre que o usuário quiser criar e adicionar um novo Ebook Interativo à estante **EbookOS** baseado em um arquivo de texto (geralmente Markdown).

**Uso Sugerido:**
O usuário chamará o comando passando as seguintes informações (que você deve deduzir do contexto se não forem explícitas):
1. **Nome do Arquivo Markdown de Origem** (ex: `meu-texto.md`)
2. **Título do Novo Ebook** (ex: "Mentalidade de Sucesso")
3. **Slug URL** (ex: `mentalidade-de-sucesso`)
4. **Cores/Tema Principal** (ex: "Indigo", "Emerald", "Blue")
5. **Descrição Curta e Imagem de Capa** (para o card na home)

---

## 🛠️ Passos do Workflow

Siga rigorosamente estes passos para garantir que a aplicação React mantenha seu padrão estrutural.

### Passo 1: Analisar o Conteúdo de Origem
Utilize a ferramenta `view_file` no arquivo `.md` ou `.txt` fornecido pelo usuário.
- Entenda a estrutura lógica do texto.
- Identifique os grandes blocos ou capítulos (geralmente marcados por `H2` ou `H3` no Markdown).
- Formule um rascunho mental de como quebrar esse conteúdo em módulos (aproximadamente 5 a 10 módulos).

### Passo 2: Criar os Componentes React dos Módulos (`Modulo<Nome>X.tsx`)
Crie arquivos na pasta `src/pages/` chamados `Modulo<SlugAbreviado>1.tsx`, `Modulo<SlugAbreviado>2.tsx`, etc.
- **Regra de Ouro:** Não cole blocos gigantes de texto estático. Utilize o componente `<PageLayout>` já existente para moldar a página.
- **UI/UX:** Quebre parágrafos longos, adicione listas, use os componentes do `lucide-react` para ilustrar pontos chaves.
- **Atenção Visual:** Crie alertas usando o TailwindCSS para gerar interesse (ex: `<div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl">...</div>`). Adeque as cores (indigo, orange, emerald, zinc) ao contexto da leitura e ao tema escolhido pelo usuário.

### Passo 3: Criar o Leitor Específico (`<Nome>Reader.tsx`)
Crie na pasta `src/pages/` um novo arquivo agregador, similar a um `LeitorDeEbookPrincipal`.
1.  Importe o componente `<PageLayout>`.
2.  Importe todos os módulos que você criou no Passo 2.
3.  Defina o array constante `PAGES` que mapeia cada página/capítulo aos componentes importados. Exemplo:
    ```javascript
    const PAGES = [
      { id: 1, title: 'Capa', component: ModuloNome1_Capa, module: 'Introdução', icon: Target },
      { id: 2, title: 'Capítulo 1...', component: ModuloNome1_Cap1, module: 'Introdução', icon: Target },
       //...
    ];
    ```
4.  Copie toda a lógica de paginação, navegação lateral (Sidebar), estados (`currentIndex`) e framer-motion (`AnimatePresence`) do arquivo base (você pode se referenciar no arquivo `MetodoEMPReader.tsx` caso precise lembrar do design exato do leitor).

### Passo 4: Atualizar o Mapeamento de Módulos (Drip Content)
Utilize a ferramenta para editar o arquivo `src/config/ebookModules.ts`.
- Adicione uma nova propriedade ao objeto `EBOOK_MODULES` usando o **slug** do ebook como chave.
- O valor será um Array de strings com os nomes exatos únicos de cada "module" que você definiu no Passo 3. Isso garante que o Painel Admin consiga listar as Regras de Drip automaticamente.

### Passo 5: Atualizar as Rotas no `App.tsx`
Utilize a ferramenta para editar o `src/App.tsx`.
- Importe o leitor recém-criado.
- Adicione uma rota explícita para o novo ebook na área de STUDENT ROUTES.
  ```javascript
  <Route path="/<slug-passado-pelo-usuario>" element={<ProtectedStudentRoute requiredSlug="<slug>"><NovoEbookReader /></ProtectedStudentRoute>} />
  ```

### Passo 6: Cadastrar o Ebook no Supabase
O `EbookOS` agora lê da tabela `ebooks` do Supabase de forma protegida. Só o Produtor (via `owner_id`) tem acesso de gestão aos cursos.
- Como Agente, você pode não ter o ID do usuário em mãos para injetar no banco via API do React usando ferramentas, por isso a forma mais SEGURA é você **entregar o script SQL pronto para o usuário rodar no painel SQL do Supabase.**
- O script DEVE buscar automaticamente o UID do usuário Admin (já que só existe um Produtor no sistema) na subquery. Exemplo que você deve mandar para o usuário preenchendo as informações:
  ```sql
  -- 1. Cria o livro e atrela ao produtor
  INSERT INTO public.ebooks (owner_id, title, slug, description, cover_url, theme_color)
  VALUES (
      (SELECT id FROM auth.users LIMIT 1),
      'Mentalidade de Sucesso', 
      'mentalidade-sucesso', 
      'Aprenda os pilares...', 
      'url-foto', 
      'indigo'
  );

  -- 2. (OPCIONAL) Inserir um "Aluno Teste Mestre" já vinculado
  -- Você pode ensinar o usuário que, após rodar o comando acima, ele entra no Dashboard do livro pelo App, vai na aba de "Alunos" e adiciona manualmente, OU rodar a query abaixo substituindo pelo id retornado.
  ```

### Passo 6: Verificação de Erros de Sintaxe
Rode o comando `npm run lint` ou verifique atentamente se você não esqueceu de exportar os componentes e se todos os ícones `lucide-react` usados nos arquivos `ModuloX.tsx` foram devidamente importados no topo do arquivo.

### Passo 7: Notificar o Usuário
Acione a ferramenta `notify_user` informando que o ebook novo foi criado, informando o URL local e os temas utilizados. Peça que ele teste a leitura clicando no novo card do painel inicial.
