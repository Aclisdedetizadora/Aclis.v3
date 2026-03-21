import React, { useState } from 'react';

export default function App() {
  // --- LÓGICA DA CALCULADORA (TABELA OFICIAL ACLIS) ---
  const tabelaPrecos = [
    { m2: 'Até 50m²', tabela: 280, vista: 266 },
    { m2: 'Até 70m²', tabela: 340, vista: 323 },
    { m2: 'Até 90m²', tabela: 400, vista: 380 },
    { m2: 'Até 110m²', tabela: 470, vista: 446.50 },
    { m2: 'Até 130m²', tabela: 540, vista: 513 },
    { m2: 'Até 150m²', tabela: 620, vista: 589 },
    { m2: 'Até 170m²', tabela: 700, vista: 665 },
    { m2: 'Até 190m²', tabela: 790, vista: 750.50 },
    { m2: 'Até 210m²', tabela: 850, vista: 807.50 },
  ];

  const regioesSp = [
    { nome: 'Vila Maria, Guilherme, Santana ou Tucuruvi', taxa: 0, zona: 'VERDE' },
    { nome: 'Zona Norte (Outros), Centro ou Próximo à ZL', taxa: 40, zona: 'AMARELA' },
    { nome: 'Zona Oeste, Zona Sul (Pinheiros/Itaim) ou Guarulhos', taxa: 70, zona: 'LARANJA' },
    { nome: 'Extremo Sul, Extremo Leste ou ABC', taxa: 100, zona: 'VERMELHA' },
  ];

  const [dados, setDados] = useState({ nome: '', indexPreco: 0, indexZona: 0 });

  const servicoBase = tabelaPrecos[dados.indexPreco];
  const taxaDeslocamento = regioesSp[dados.indexZona].taxa;
  const totalParcelado = servicoBase.tabela + taxaDeslocamento;
  const valorParcela = totalParcelado / 6;
  const totalVista = servicoBase.vista + taxaDeslocamento;

  const enviarCotacao = (e) => {
    e.preventDefault();
    const mensagem = `Olá Aclis! Gostaria de agendar um serviço:\n👤 Nome: ${dados.nome}\n🏠 Metragem: ${servicoBase.m2}\n📍 Região: ${regioesSp[dados.indexZona].nome}\n💳 Opção Parcelada: 6x de R$ ${valorParcela.toFixed(2).replace('.', ',')}\n💰 Opção à Vista: R$ ${totalVista.toFixed(2).replace('.', ',')}`;
    window.open(`https://wa.me/5511947030789?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  return (
    <div className="aclis-site-container">
      <style>{`
        :root {
            --verde-aclis: #2d914b;
            --verde-escuro: #1e6333;
            --verde-whats: #25d366;
            --branco: #ffffff;
            --cinza-claro: #f4f7f5;
        }

        body { 
            font-family: 'Montserrat', sans-serif; 
            margin: 0; 
            padding: 0; 
            color: #333; 
            line-height: 1.8; /* Aumentado para melhor leitura */
            scroll-behavior: smooth; 
            background-color: var(--branco); 
            font-size: 18px; /* Aumentado o padrão do site */
        }
        
        header {
            background-color: var(--verde-aclis);
            padding: 15px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        .logo { height: 70px; width: auto; }
        header nav ul { list-style: none; display: flex; gap: 25px; margin: 0; padding: 0; align-items: center; }
        header nav a { text-decoration: none; color: var(--branco); font-weight: 600; font-size: 1.1rem; }
        .btn-nav-whatsapp { background: var(--branco); color: var(--verde-aclis) !important; padding: 12px 25px; border-radius: 50px; font-weight: 700; }

        .secao-promocional-fundo {
            background-color: #0b2b16; 
            background-image: linear-gradient(rgba(11, 43, 22, 0.7), rgba(11, 43, 22, 0.7)), url('/1.jpg');
            
            /* 1. VOLTAMOS PARA O COVER (Para preencher tudo com impacto) */
            background-size: cover; 
            
            /* 2. O PULO DO GATO: Alinhamos pelo TOPO e não pelo centro */
            /* Isso garante que a parte de cima da imagem (com os dizeres) sempre apareça */
            background-position: center top; 
            
            background-repeat: no-repeat;
            background-attachment: fixed; 
            
            /* 3. AJUSTE DE ESPAÇAMENTO: Damos mais espaço no topo */
            padding: 120px 5% 80px 5%; 
            
            text-align: center;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 700px; /* Garante altura para a imagem se mostrar */
        }

        .container-calculadora {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 100%;
            max-width: 550px;
            margin-top: 25px;
            border: 3px dashed #2d914b; 
            color: #333;
            text-align: left;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .form-inputs { display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px; }
        .form-inputs label { font-size: 1rem; font-weight: 700; color: #2d914b; }
        .form-inputs input, .form-inputs select { padding: 15px; border: 2px solid #eee; border-radius: 10px; font-family: 'Montserrat'; font-size: 1.1rem; width: 100%; box-sizing: border-box; }

        .box-resultado { background: #f9fffb; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px; border: 2px solid #e0f2e5; }
        .btn-confirmar { background-color: #25d366; color: white; border: none; padding: 20px; border-radius: 50px; font-weight: 800; width: 100%; cursor: pointer; text-transform: uppercase; font-size: 1.1rem; transition: 0.3s; }
        .btn-confirmar:hover { background-color: #1ebc5a; transform: scale(1.02); }

        #hero { background: linear-gradient(135deg, var(--verde-aclis) 0%, var(--verde-escuro) 100%); padding: 120px 10%; text-align: center; color: var(--branco); }
        #hero h1 { font-size: 3.5rem; margin-bottom: 30px; line-height: 1.1; font-weight: 700; }
        #hero p { font-size: 1.5rem; margin-bottom: 40px; opacity: 0.95; max-width: 900px; margin-left: auto; margin-right: auto; }
        
        .btn-cta-principal { background-color: var(--branco); color: var(--verde-aclis); padding: 20px 50px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 1.3rem; box-shadow: 0 6px 20px rgba(0,0,0,0.2); display: inline-block; }
        
        #diferenciais { display: flex; justify-content: space-around; padding: 100px 10%; background: var(--cinza-claro); text-align: center; gap: 40px; flex-wrap: wrap; }
        .diferencial-item { flex: 1; min-width: 300px; background: white; padding: 45px; border-radius: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
        .diferencial-item span { font-size: 4rem; display: block; margin-bottom: 20px; }
        .diferencial-item h4 { margin: 15px 0; color: var(--verde-aclis); font-size: 1.5rem; }
        .diferencial-item p { font-size: 1.1rem; }

        #servicos h2 { font-size: 2.5rem; }
        .servicos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; margin-top: 50px; }
        .card-servico { background: #fff; padding: 50px; border-radius: 20px; border-bottom: 8px solid var(--verde-aclis); font-size: 1.1rem; }
        .card-servico h3 { font-size: 1.8rem; }

        #faq h2 { font-size: 2.5rem; }
        .faq-container { max-width: 1000px; margin: 0 auto; text-align: left; }
        details { background: #fff; padding: 20px 30px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #eee; cursor: pointer; }
        summary { font-weight: 700; color: var(--verde-aclis); font-size: 1.3rem; list-style: none; display: flex; justify-content: space-between; align-items: center; }
        details p, details ul { margin-top: 20px; font-size: 1.15rem; color: #444; }

        #sobre h2 { font-size: 2.5rem; }
        #sobre p { font-size: 1.25rem; }
        .pet-safety-box { background: #f0fdf4; border-left: 10px solid var(--verde-aclis); padding: 40px; margin-top: 60px; border-radius: 15px; text-align: left; }
        .pet-safety-box h3 { font-size: 1.8rem; }
        .pet-safety-box p { font-size: 1.2rem !important; }

        footer { background-color: #1a1a1a; color: var(--branco); padding: 80px 10%; text-align: center; font-size: 1.1rem; }
        footer h3 { font-size: 2rem; }
        footer a { font-size: 1.1rem; }
        footer { background-color: #1a1a1a; color: var(--branco); padding: 60px 10%; text-align: center; }
        footer a { color: gray; text-decoration: none; font-weight: bold; }
        .whatsapp-fixed { position: fixed; bottom: 30px; right: 30px; width: 65px; z-index: 9999; }

        .whatsapp-fixed { position: fixed; bottom: 40px; right: 40px; width: 80px; z-index: 9999; }
      `}</style>

      <header>
        <a href="/"><img src="ACLIS.png" alt="Aclis Dedetizadora" className="logo" /></a>
        <nav>
          <ul>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#faq">Dúvidas</a></li>
            <li><a href="#sobre">Sobre nós</a></li>
            <li><a href="https://wa.me/5511947030789" className="btn-nav-whatsapp">Orçamento</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* SEÇÃO PROMOCIONAL - LETRAS AUMENTADAS */}
        <section className="secao-promocional-fundo">
            <h2 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px'}}>🍂 BLINDAGEM DE OUTONO 2026</h2>
            <p style={{fontSize: '1.3rem', fontWeight: 500}}>Aproveite nossas condições especiais para proteger sua família nesta estação.</p>
            <p style={{fontStyle: 'italic', fontSize: '1.1rem', opacity: 0.9}}>*Promoção válida de 20/03/2026 a 21/06/2026</p>

            <div className="container-calculadora">
                <form onSubmit={enviarCotacao}>
                    <div className="form-inputs">
                        <label>SEU NOME:</label>
                        <input type="text" placeholder="Como podemos te chamar?" required onChange={(e) => setDados({...dados, nome: e.target.value})} />
                        <label>TAMANHO DO IMÓVEL:</label>
                        <select onChange={(e) => setDados({...dados, indexPreco: e.target.value})}>
                            {tabelaPrecos.map((item, index) => <option key={index} value={index}>{item.m2}</option>)}
                        </select>
                        <label>SUA LOCALIZAÇÃO:</label>
                        <select onChange={(e) => setDados({...dados, indexZona: e.target.value})}>
                            {regioesSp.map((regiao, index) => <option key={index} value={index}>{regiao.nome}</option>)}
                        </select>
                    </div>
                    <div className="box-resultado">
                        <span style={{color: '#2d914b', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase'}}>💳 6x de R$ {valorParcela.toFixed(2).replace('.', ',')}</span>
                        <span style={{fontSize: '3rem', fontWeight: 800, color: '#2d914b', display: 'block'}}>R$ {totalVista.toFixed(2).replace('.', ',')}</span>
                        <span style={{fontSize: '1rem', fontWeight: 700, color: '#666'}}>À Vista no Pix</span>
                    </div>
                    <button type="submit" className="btn-confirmar">CONFIRMAR E AGENDAR</button>
                </form>
            </div>
        </section>

        <section id="hero">
            <h1>Controle Profissional de Pragas</h1>
            <p>Soluções técnicas eficazes no controle de pragas urbanas para sua residência ou empresa.</p>
            <a href="https://wa.me/5511947030789" className="btn-cta-principal">Solicitar Orçamento Técnico</a>
        </section>

        <section id="diferenciais">
            <div className="diferencial-item"><span>🛡️</span><h4>Garantia Técnica</h4><p>Assistência com reforço incluso conforme contrato.</p></div>
            <div className="diferencial-item"><span>🚀</span><h4>Agilidade</h4><p>Logística preparada para atendimento rápido em São Paulo, ABC e Região Metropolitana</p></div>
            <div className="diferencial-item"><span>🧪</span><h4>Segurança</h4><p>Uso de saneantes registrados e de baixa toxicidade ambiental.</p></div>
        </section>

               <section id="servicos">
            <h2 style={{color: 'var(--verde-aclis)', textAlign: 'center'}}>Soluções Especializadas</h2>
            <div className="servicos-grid">
                <article className="card-servico"><h3>Residencial</h3><p>Proteção técnica contra insetos e roedores, preservando a saúde e higiene do ambiente doméstico.</p></article>
                <article className="card-servico"><h3>Comercial</h3><p>Gestão sanitária rigorosa para empresas, assegurando conformidade com as normas técnicas.</p></article>
                <article className="card-servico"><h3>Predial</h3><p>Tratamento estratégico de áreas comuns em condomínios com foco em prevenção e manutenção.</p></article>
            </div>
        </section>

        <section id="faq">
            <h2 style={{color: 'var(--verde-aclis)', marginBottom: '40px', textAlign: 'center'}}>Dúvidas e Orientações Técnicas</h2>
            <div className="faq-container">
                <details><summary>🛡️ Como funciona a Garantia e o Reforço?</summary><p>Oferecemos garantia de 3 a 6 meses conforme a praga contratada. O produto leva até <strong>15 dias (período de maturação)</strong> para atingir o efeito total na colônia. O reforço é realizado após esse prazo caso haja infestação ativa</p></details>
                <details><summary>⏱️ Qual o tempo de afastamento seguro?</summary><p><strong>2 HORAS:</strong> Adultos e pets saudáveis de médio/grande porte.<br/><strong>6 HORAS:</strong> Crianças, idosos, gestantes, alérgicos e pets sensíveis (Pug, Shih-Tzu, raças pequenas ou idosos).</p></details>
                <details><summary>🐾 Tenho pets (Gatos, Pássaros, Peixes, Hamsters). É seguro?</summary><p><strong>Sim, desde que seguidas as normas técnicas:</strong></p><ul><li><strong>Cães e Gatos:</strong> Afastamento padrão conforme o tempo indicado.</li><li><strong>Pássaros:</strong> São extremamente sensíveis. Devem ser removidos do ambiente por 24h ou mantidos em local totalmente isolado da aplicação.</li><li><strong>Peixes:</strong> Aquários devem ser cobertos e as bombas de ar desligadas durante a aplicação.</li><li><strong>Hamsters e Coelhos:</strong> Devem seguir o tempo de afastamento de crianças e alérgicos (6 horas).</li></ul></details>
                <details><summary>🚫 O que pode causar a perda da garantia?</summary><ul><li>Limpeza com produtos químicos pesados antes de 7 dias;</li><li>Reformas, pinturas ou raspagem de piso após a aplicação;</li><li>Falta de higiene ou acúmulo de entulhos no local.</li></ul></details>
                <details><summary>🪳 Vi insetos vivos após a aplicação, e agora?</summary><p>O aparecimento de insetos lentos prova que o veneno está funcionando. Eles já foram contaminados e morrerão em breve. A barreira química protege o local, mas insetos vindos da rua podem entrar e morrerão ao tocar nas superfícies tratadas.</p></details>
            </div>
        </section>

        <section id="sobre">
            <h2 style={{color: 'var(--verde-aclis)', textAlign: 'center'}}>Sobre a Aclis Dedetizadora</h2>
            <div style={{maxWidth: '1000px', margin: '0 auto', textAlign: 'center'}}>
                <p>A <strong>Aclis Dedetizadora</strong> é uma empresa especializada no controle estratégico de pragas urbanas, com ampla expertise em diversos segmentos. Atuamos com rigor técnico e conformidade sanitária em <strong>residências, condomínios, estabelecimentos comerciais, indústrias e galpões logísticos</strong> em toda a Grande São Paulo e região metropolitana.</p>
                <p>Nosso trabalho é fundamentado na aplicação de soluções inteligentes e personalizadas para a necessidade de cada ambiente, desde o cuidado minucioso em áreas domésticas até operações complexas em grandes perímetros industriais. Utilizamos metodologias avançadas e saneantes devidamente registrados, garantindo intervenções precisas, limpas e seguras.</p>
                <p>Com foco em resultados duradouros e transparência operacional, a Aclis oferece suporte técnico completo e monitoramento pós-serviço, estabelecendo um padrão de excelência, confiança e versatilidade no setor de controle de pragas.</p>
            </div>
            <div className="pet-safety-box">
                <h3 style={{color: '#1e6333', marginTop: 0}}>🧪 Rigor Técnico e Segurança</h3>
                <p>Seguimos protocolos estritos de segurança para todos os perfis de ocupantes. Nossa equipe fornece as orientações necessárias para garantir a preservação da saúde e do ambiente antes, durante e após a execução de cada serviço.</p>
            </div>
        </section>

        <section id="google-reviews" style={{padding:'80px 10%', textAlign:'center', background:'var(--cinza-claro)'}}>
            <h2 style={{color: 'var(--verde-aclis)', fontSize:'2.5rem'}}>Confiança Comprovada</h2>
            <p style={{fontSize:'1.3rem', marginBottom:'30px'}}>Nossa qualidade é atestada por quem já contratou.</p>
            <a href="https://share.google/Eb27icEkZAgki40KY" target="_blank" style={{color: 'var(--verde-aclis)', fontWeight: 'bold', textDecoration: 'none', border: '3px solid var(--verde-aclis)', padding: '20px 40px', borderRadius: '12px', display: 'inline-block', fontSize: '1.2rem'}}>Ver avaliações no Google ★★★★★</a>
        </section>
      </main>

      <footer>
        <h3>Aclis Dedetizadora</h3>
        <p>São Paulo, ABC e Região Metropolitana.</p>
        <p>Atendimento Comercial: Segunda a Sábado - 09h às 18h</p>
        <p>aclis@aclisdedetizadora.com.br</p>
        <p><p>Telefone: (11) 94703-0789 </p>
          <a href="https://www.instagram.com/aclisdedetizadora/">INSTAGRAM</a> | <a href="https://www.facebook.com/profile.php?id=61571279486510">FACEBOOK</a>
        
        </p>
        <p style={{marginTop:'40px', fontSize: '1rem', opacity: 0.6}}>&copy; 2026 Aclis Dedetizadora. Todos os direitos reservados.</p>
      </footer>

      <a href="https://wa.me/5511947030789" className="whatsapp-fixed" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </div>
  );
}
