-- 1. Criação da Tabela de Catálogo de Ebooks (Painel EbookOS)
-- Esta tabela armazena os ebooks criados. Cada ebook pertence a um usuário administrador (Supabase Auth).
CREATE TABLE public.ebooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Linka o Ebook ao Administrador (Painel EbookOS)
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_url TEXT,
    theme_color TEXT DEFAULT 'indigo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Segurança) e criar políticas para o Admin
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins podem gerenciar seus próprios ebooks" 
    ON public.ebooks FOR ALL 
    USING (auth.uid() = owner_id);
-- Permitir leitura pública dos dados vitais do ebook (para a tela de login do aluno)
CREATE POLICY "Leitura pública de dados dos ebooks" 
    ON public.ebooks FOR SELECT 
    USING (true);


-- 2. Criação da Tabela de Alunos (Modo Planilha por Ebook)
-- Cada linha representa o acesso de um aluno a um Ebook específico. 
-- Se ele comprar 2 ebooks, terá 2 linhas (uma para cada ebook_id).
CREATE TABLE public.alunos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE, -- Amarra o aluno a UM ebook específico
    email TEXT NOT NULL,
    password TEXT NOT NULL, -- Senha simples "Modo Planilha"
    data_compra TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(ebook_id, email) -- Um mesmo email só pode ter 1 acesso ativo por Ebook
);

-- Como os alunos logam via API pura no Frontend, vamos permitir leitura/escrita condicional
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
-- Admin pode ver e editar todos os seus alunos
CREATE POLICY "Admins podem ver alunos dos seus ebooks" 
    ON public.alunos FOR ALL 
    USING (
        auth.uid() IN (SELECT owner_id FROM public.ebooks WHERE id = public.alunos.ebook_id)
    );
-- Query pública apenas para o momento do login (filtrada via Frontend eq('email').eq('password'))
CREATE POLICY "Permitir leitura para validação de login modo planilha" 
    ON public.alunos FOR SELECT 
    USING (true);


-- 3. Criação da Tabela de Regras de Liberação (Drip Content)
-- Regras de cadeado vinculadas a um ebook específico.
CREATE TABLE public.modulos_regras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE, -- Amarra a regra ao ebook
    modulo_nome TEXT NOT NULL,
    dias_liberacao INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(ebook_id, modulo_nome)
);

ALTER TABLE public.modulos_regras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins podem gerenciar regras de seus ebooks" 
    ON public.modulos_regras FOR ALL 
    USING (
        auth.uid() IN (SELECT owner_id FROM public.ebooks WHERE id = public.modulos_regras.ebook_id)
    );
CREATE POLICY "Leitura pública das regras para o Leitor do Aluno" 
    ON public.modulos_regras FOR SELECT 
    USING (true);


-- 4. Tabela de Conteúdo de Ebooks (Para Leitura Dinâmica / IA)
-- Armazena o JSON completo gerado pela IA (Estrutura de Módulos e Páginas em Markdown)
CREATE TABLE public.ebook_contents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE UNIQUE, -- 1 Conteúdo por Ebook
    content_json JSONB NOT NULL, -- Exemplo: [ { "module": "Nome", "pages": [ { "title": "Pág", "markdown": "Texto" } ] } ]
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ebook_contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins podem editar os conteúdos de seus ebooks" 
    ON public.ebook_contents FOR ALL 
    USING (
        auth.uid() IN (SELECT owner_id FROM public.ebooks WHERE id = public.ebook_contents.ebook_id)
    );
CREATE POLICY "Leitura pública do conteúdo do ebook para o Aluno" 
    ON public.ebook_contents FOR SELECT 
    USING (true);


-- INSERTS DE TESTE (Para você brincar logo de cara após rodar o SQL)
-- 1. Inserir os Ebooks Catalogo (Como donos não existem ainda, deixamos owner_id = null inicialmente para teste, depois você ajusta)
INSERT INTO public.ebooks (title, slug, description, theme_color) VALUES 
('Método EMP', 'metodoEMP', 'O guia completo do Método EMP.', 'indigo'),
('O Método Base', 'o-metodo', 'O livro base.', 'emerald');

-- 2. Inserir um Aluno Teste na Planilha do Ebook "metodoEMP" (Note que precisa pegar o ID gerado acima, o que faremos via App.tsx dps, mas pode forçar no painel)
-- 3. Inserir uma Regra Teste na Planilha do Ebook
