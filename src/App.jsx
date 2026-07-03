import React, { useState } from 'react';

export default function App() {
  // Mude para 'true' quando quiser ativar a Blindagem de Outono novamente
  const exibirPromocao = false; 

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

  const servicoBase = tabelaPrecos[dados.indexPreco] || tabelaPrecos[0];
  const taxaDeslocamento = regioesSp[dados.indexZona]?.taxa || 0;
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
            --cinza-escuro: #333333;
        }

        body { 
            font-family: 'Montserrat', sans-serif; 
            margin: 0; 
            padding: 0; 
            color: var(--cinza-escuro); 
            line-height: 1.8;
            scroll-behavior: smooth; 
            background-color: var(--branco); 
            font-size: 18px;
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
        .btn-nav-whatsapp { background: var(--branco); color: var(--verde-aclis) !important; padding: 12px 25px; border-radius: 50px; font-weight: 700; transition: 0.3s; }
        .btn-nav-whatsapp:hover { background: var(--cinza-claro); }

        /* Estilos da Seção Promocional (Ocultável) */
        .secao-promocional-fundo {
            background-color: #0b2b16; 
            background-image: linear-gradient(rgba(11, 43, 22, 0.7), rgba(11, 43, 22, 0.7)), url('/1.jpg');
            background-size: cover; 
            background-position: center top; 
            background-repeat: no-repeat;
            background-attachment: fixed; 
            padding: 120px 5% 80px 5%; 
            text-align: center;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 700px;
        }

        .container-calculadora {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 100%;
            max-width: 550px;
            margin-top: 25px;
            border: 3px dashed var(--verde-aclis); 
            color: #333;
            text-align: left;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }

        .form-inputs { display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px; }
        .form-inputs label { font-size: 1rem; font-weight: 700; color: var(--verde-aclis); }
        .form-inputs input, .form-inputs select { padding: 15px; border: 2px solid #eee; border-radius: 10px; font-family: 'Montserrat'; font-size: 1.1rem; width: 100%; box-sizing: border-box; }

        .box-resultado { background: #f9fffb; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px; border: 2px solid #e0f2e5; }
        .btn-confirmar { background-color: var(--verde-whats); color: white; border: none; padding: 20px; border-radius: 50px; font-weight: 800; width: 100%; cursor: pointer; text-transform: uppercase; font-size: 1.1rem; transition: 0.3s; }
        .btn-confirmar:hover { background-color: #1ebc5a; transform: scale(1.02); }

        /* Nova Estrutura de Layout Principal */
        #hero { 
            background: linear-gradient(135deg, var(--verde-aclis) 0%, var(--verde-escuro) 100%); 
            padding: 140px 10%; 
            text-align: center; 
            color: var(--branco); 
        }
        #hero h1 { font-size: 3.5rem; margin-bottom: 25px; line-height: 1.2; font-weight: 800; }
        #hero p { font-size: 1.4rem; margin-bottom: 40px; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto; }
        
        .btn-cta-principal { background-color: var(--branco); color: var(--verde-aclis); padding: 20px 50px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.3rem; box-shadow: 0 6px 20px rgba(0,0,0,0.15); display: inline-block; transition: 0.3s; }
        .btn-cta-principal:hover { background-color: var(--cinza-claro); transform: translateY(-2px); }
        
        #diferenciais { display: flex; justify-content: space-around; padding: 100px 10%; background: var(--cinza-claro); text-align: center; gap: 40px; flex-wrap: wrap; }
        .diferencial-item { flex: 1; min-width: 280px; background: white; padding: 45px; border-radius: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
        .diferencial-item span { font-size: 4rem; display: block; margin-bottom: 20px; }
        .diferencial-item h4 { margin: 15px 0; color: var(--verde-aclis); font-size: 1.5rem; font-weight: 700; }

        #servicos { padding: 100px 10%; text-align: center; }
        .servicos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 50px; }
        .card-servico { background: #fff; padding: 50px; border-radius: 20px; border-bottom: 8px solid var(--verde-aclis); box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
        .card-servico h3 { font-size: 1.8rem; margin-top: 0; color: var(--verde-escuro); }

        #faq { padding: 100px 10%; background: var(--cinza-claro); }
        .faq-container { max-width: 900px; margin: 0 auto; text-align: left; }
        details { background: #fff; padding: 20px 30px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #eee; cursor: pointer; transition: 0.3s; }
        summary { font-weight: 700; color: var(--verde-aclis); font-size: 1.3rem; }
        details p, details ul { margin-top: 20px; font-size: 1.15rem; color: #555; }

        #sobre { padding: 100px 10%; }
        .pet-safety-box { background: #f0fdf4; border-left: 10px solid var(--verde-aclis); padding: 40px; margin-top: 60px; border-radius: 15px; text-align: left; }

        footer { background-color: #1a1a1a; color: var(--branco); padding: 60px 10%; text-align: center; }
        footer a { color: #aaa; text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.3s; }
        footer a:hover { color: var(--branco); }
        
        .whatsapp-fixed { position: fixed; bottom: 40px; right: 40px; width: 70px; z-index: 9999; transition: 0.3s; }
        .whatsapp-fixed:hover { transform: scale(1.1); }
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
        {/* SEÇÃO PROMOCIONAL CONDICIONAL */}
        {exibirPromocao && (
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
                        <select onChange={(e) => setDados({...dados, indexPreco: parseInt(e.target.value)})}>
                            {tabelaPrecos.map((item, index) => <option key={index} value={index}>{item.m2}</option>)}
                        </select>
                        <label>SUA LOCALIZAÇÃO:</label>
                        <select onChange={(e) => setDados({...dados, indexZona: parseInt(e.target.value)})}>
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
        )}

        {/* HERO PRINCIPAL (AGORA NO TOPO QUANDO A PROMO ESTÁ OCULTA) */}
        <section id="hero">
            <h1>Controle Profissional de Pragas</h1>
            <p>Soluções técnicas eficazes no controle de pragas urbanas para sua residência ou empresa com a máxima segurança sanitária.</p>
            <a href="https://wa.me/5511947030789" className="btn-cta-principal">Solicitar Orçamento Técnico</a>
        </section>

        <section id="diferenciais">
            <div className="diferencial-item"><span>🛡️</span><h4>Garantia Técnica</h4><p>Assistência com reforço incluso conforme termo de garantia contratual.</p></div>
            <div className="diferencial-item"><span>🚀</span><h4>Agilidade</h4><p>Logística estruturada para atendimento imediato em São Paulo, ABC e Região Metropolitana.</p></div>
            <div className="diferencial-item"><span>🧪</span><h4>Segurança</h4><p>Utilização exclusiva de saneantes regulamentados pela ANVISA de baixa toxicidade.</p></div>
        </section>

        <section id="servicos">
            <h2 style={{color: 'var(--verde-aclis)', fontSize: '2.5rem'}}>Soluções Especializadas</h2>
            <div className="servicos-grid">
                <article className="card-servico"><h3>Residencial</h3><p>Proteção técnica contra insetos e roedores, preservando a saúde e higiene do ambiente doméstico.</p></article>
                <article className="card-servico"><h3>Comercial</h3><p>Gestão sanitária rigorosa para empresas, assegurando total conformidade com as normas vigentes.</p></article>
                <article className="card-servico"><h3>Predial</h3><p>Tratamento estratégico de áreas comuns em condomínios com foco em prevenção e manutenção contínua.</p></article>
            </div>
        </section>

        <section id="faq">
            <h2 style={{color: 'var(--verde-aclis)', marginBottom: '40px', textAlign: 'center', fontSize: '2.5rem'}}>Dúvidas e Orientações Técnicas</h2>
            <div className="faq-container">
                <details><summary>🛡️ Como funciona a Garantia e o Reforço?</summary><p>Oferecemos garantia técnica customizada conforme a praga-alvo. O produto aplicado demanda até <strong>15 dias (período de maturação)</strong> para atingir o efeito máximo de controle no foco. O reforço é executado sem custos adicionais caso persista atividade biológica após este prazo.</p></details>
                <details><summary>⏱️ Qual o tempo de afastamento seguro?</summary><p><strong>2 HORAS:</strong> Adultos e pets de médio/grande porte saudáveis.<br/><strong>6 HORAS:</strong> Crianças, idosos, gestantes, indivíduos asmáticos/alérgicos e pets de pequeno porte ou com sensibilidade respiratória.</p></details>
                <details><summary>🐾 Tenho pets (Gatos, Pássaros, Peixes, Hamsters). É seguro?</summary><p><strong>Sim, mediante cumprimento estrito das recomendações técnicas de isolamento:</strong></p><ul><li><strong>Cães e Gatos:</strong> Afastamento do local tratado conforme cronograma de horas indicado.</li><li><strong>Pássaros:</strong> Altamente sensíveis. Devem ser movidos da residência por 24 horas ou mantidos em isolamento hermético.</li><li><strong>Aquários:</strong> Devem ser cobertos com filme plástico e ter os aeradores/bombas de oxigênio desligados durante a operação.</li><li><strong>Pequenos Roedores:</strong> Seguem o protocolo restritivo de 6 horas mínimos de afastamento.</li></ul></details>
                <details><summary>🚫 O que acarreta a perda da garantia?</summary><ul><li>Higienização com produtos químicos agressivos/corrosivos nas áreas tratadas antes de 7 dias;</li><li>Intervenções estruturais como reformas, pinturas ou raspagem de pisos pós-aplicação;</li><li>Condições críticas de acúmulo de insumos ou estocagem inadequada de lixo.</li></ul></details>
                <details><summary>🪳 Avistei insetos ativos após o procedimento, o que significa?</summary><p>A visualização de espécimes com movimentos lentos aponta a eficácia operacional: o desalojamento químico está ocorrendo e os insetos contaminados cessarão atividade em breve. A barreira residual segue ativa nas superfícies.</p></details>
            </div>
        </section>

        <section id="sobre">
            <h2 style={{color: 'var(--verde-aclis)', textAlign: 'center', fontSize: '2.5rem'}}>Sobre a Aclis Dedetizadora</h2>
            <div style={{maxWidth: '1000px', margin: '0 auto', textAlign: 'center'}}>
                <p>A <strong>Aclis Dedetizadora</strong> é uma corporação especializada no controle estratégico e manejo integrado de pragas urbanas. Atuamos com rigor técnico corporativo e conformidade sanitária em <strong>residências, condomínios, estabelecimentos comerciais, indústrias e complexos logísticos</strong> em toda a Grande São Paulo.</p>
                <p>Nossa metodologia é fundamentada no emprego de soluções de engenharia sanitária personalizadas para cada cenário, unindo a segurança técnica necessária para ambientes familiares até operações logísticas complexas de grande escala. Cooperamos apenas com insumos devidamente homologados.</p>
            </div>
            <div className="pet-safety-box">
                <h3 style={{color: '#1e6333', marginTop: 0}}>🧪 Rigor Técnico e Segurança Coletiva</h3>
                <p>Operamos sob protocolos estritos voltados ao bem-estar animal e humano. Fornecemos suporte instrutivo pré e pós-execução, mitigando riscos ecológicos e assegurando máxima eficácia residual no ambiente tratado.</p>
            </div>
        </section>

        <section id="google-reviews" style={{padding:'80px 10%', textAlign:'center', background:'var(--cinza-claro)'}}>
            <h2 style={{color: 'var(--verde-aclis)', fontSize:'2.5rem'}}>Confiança Comprovada</h2>
            <p style={{fontSize:'1.3rem', marginBottom:'30px'}}>Nossa qualidade operacional avaliada diretamente por nossos clientes.</p>
            <a href="https://share.google/Eb27icEkZAgki40KY" target="_blank" rel="noreferrer" style={{color: 'var(--verde-aclis)', fontWeight: 'bold', textDecoration: 'none', border: '3px solid var(--verde-aclis)', padding: '20px 40px', borderRadius: '12px', display: 'inline-block', fontSize: '1.2rem'}}>Ver avaliações no Google ★★★★★</a>
        </section>
      </main>

      <footer>
        <h3>Aclis Dedetizadora</h3>
        <p>São Paulo, ABC e Região Metropolitana.</p>
        <p>Atendimento Comercial: Segunda a Sábado - 09h às 18h</p>
        <p>aclis@aclisdedetizadora.com.br | Telefone: (11) 94703-0789</p>
        <div style={{marginTop: '20px'}}>
          <a href="https://www.instagram.com/aclisdedetizadora/">INSTAGRAM</a> | <a href="https://www.facebook.com/profile.php?id=61571279486510">FACEBOOK</a>
        </div>
        <p style={{marginTop:'40px', fontSize: '1rem', opacity: 0.6}}>&copy; 2026 Aclis Dedetizadora. Todos os direitos reservados.</p>
      </footer>

      <a href="https://wa.me/5511947030789" className="whatsapp-fixed" target="_blank" rel="noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </div>
  );
}
