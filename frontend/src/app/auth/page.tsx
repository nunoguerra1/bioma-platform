'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErro('');

        try {
            if (isLogin) {
                const res = await fetch('http://localhost:3333/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }),
                });

                if (!res.ok) throw new Error('Credenciais inválidas. O ecossistema não reconheceu você.');

                const data = await res.json();

                localStorage.setItem('@bioma:token', data.access_token);
                localStorage.setItem('@bioma:user', JSON.stringify(data.usuario));

                router.push('/');

            } else {
                const resRegistro = await fetch('http://localhost:3333/usuarios/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha }),
                });

                if (!resRegistro.ok) throw new Error('Este email já germinou em outro jardim.');

                const resLogin = await fetch('http://localhost:3333/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }),
                });

                const data = await resLogin.json();
                localStorage.setItem('@bioma:token', data.access_token);
                localStorage.setItem('@bioma:user', JSON.stringify(data.usuario));

                router.push('/dashboard');
            }
        } catch (error: any) {
            setErro(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-bioma-dark overflow-hidden flex items-center justify-center p-4">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20 transition-all duration-1000"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop)',
                    filter: 'blur(8px) saturate(120%)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-bioma-dark via-bioma-dark/90 to-bioma-dark/95 z-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-md relative z-10 p-10 bg-bioma-dark/60 backdrop-blur-2xl border border-bioma-moss/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="mb-10 text-center">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-bioma-leaf block mb-3">Bioma Platform</span>
                    <h1 className="font-title text-4xl text-bioma-water font-light">
                        {isLogin ? 'Retornar.' : 'Cultivar.'}
                    </h1>
                </div>

                {/* Mensagem de Erro */}
                <AnimatePresence>
                    {erro && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 text-red-400 text-xs text-center border border-red-900/50 bg-red-900/10 p-3 rounded"
                        >
                            {erro}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleAuth} className="flex flex-col gap-6">

                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, x: -20, height: 0 }}
                                className="flex flex-col gap-2"
                            >
                                <label className="text-[10px] uppercase tracking-[0.2em] text-bioma-water/60">Como devemos te chamar?</label>
                                <input
                                    type="text"
                                    required={!isLogin}
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="bg-transparent border-b border-bioma-moss/50 text-bioma-water p-2 focus:outline-none focus:border-bioma-leaf transition-colors"
                                    placeholder="Nome do botânico"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-bioma-water/60">Credencial (Email)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-b border-bioma-moss/50 text-bioma-water p-2 focus:outline-none focus:border-bioma-leaf transition-colors"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-bioma-water/60">Chave de Acesso (Senha)</label>
                        <input
                            type="password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="bg-transparent border-b border-bioma-moss/50 text-bioma-water p-2 focus:outline-none focus:border-bioma-leaf transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-4 bg-transparent border border-bioma-leaf/50 text-bioma-leaf uppercase tracking-[0.2em] text-xs font-bold hover:bg-bioma-leaf hover:text-bioma-dark transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sincronizando...' : isLogin ? 'Acessar Ecossistema' : 'Iniciar Cultivo'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErro('');
                        }}
                        className="text-[10px] tracking-[0.1em] text-bioma-water/50 hover:text-bioma-leaf transition-colors"
                    >
                        {isLogin ? 'Não possui um jardim? Criar conta.' : 'Já possui um jardim? Fazer login.'}
                    </button>
                </div>
            </motion.div>
        </main>
    );
}