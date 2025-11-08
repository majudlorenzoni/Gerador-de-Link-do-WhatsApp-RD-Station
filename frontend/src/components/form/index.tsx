import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

export const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [linkResult, setLinkResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const roles = [
    'Sócio(a) / CEO / Proprietário(a)',
    'Diretor(a) de Vendas',
    'Diretor(a) de Marketing',
    'Diretor(a) Outras Áreas',
    'Gerente de Marketing',
    'Gerente de Vendas',
    'Coordenador(a)/Supervisor(a) de Marketing',
    'Coordenador(a)/Supervisor(a) de Vendas',
    'Analista/Assistente de Marketing',
    'Analista/Assistente de Vendas',
    'Vendedor(a) / Executivo(a) de Contas',
    'Estudante',
    'Outros Cargos',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLinkResult(null);

    console.log('Payload enviado para backend:', { name, phone, message, role });

    try {
      const response = await axios.post('http://localhost:3000/link', {
        name,
        phone,
        message,
        role,
      });

      console.log('Resposta do backend:', response.data);

      setLinkResult(response.data.link);
    } catch (err: any) {
      console.error('Erro no request:', err);

      setError(err.response?.data?.message || 'Erro ao gerar o link');
    }
  };

  const handleCopy = () => {
    if (linkResult) {
      navigator.clipboard.writeText(linkResult);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setMessage('');
    setRole('');
    setLinkResult(null);
    setError(null);
  };

  return (
    <section className="form-section">
      <h1 className="form-title">Gerador de Link do WhatsApp</h1>
      <p className="form-subtitle">Crie seu link de WhatsApp e inicie conversas com um clique nos seus canais digitais!</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            required
            minLength={2}
          />
        </label>

        <label>
          Número de WhatsApp
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(99) 99999-9999"
            required
          />
        </label>

        <label>
          Mensagem Padrão
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensagem que será enviada"
            required
          />
        </label>

        <label>
          Cargo
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Selecione</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <p className="privacy-note">
        Ao preencher o formulário, concordo * em receber comunicações de acordo com meus interesses.
        Ao informar meus dados, eu concordo com a Política de privacidade. Você pode alterar suas permissões de comunicação a qualquer tempo.
        </p>

        <button type="submit" className="generate-button">Gerar Link Grátis</button>
      </form>

      {linkResult && (
        <div className="result">
          <p>Seu link:</p>
          <input type="text" readOnly value={linkResult} />
          <button onClick={handleCopy}>Copiar link</button>
          <button onClick={handleReset}>Gerar novo link</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default Form;
