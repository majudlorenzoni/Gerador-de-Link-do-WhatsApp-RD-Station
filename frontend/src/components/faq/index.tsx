import React, { useState } from "react";
import ArrowRight from '../../assets/ArrowRightBlack.png';
import ChevronDown from '../../assets/chevron-down.png';
import './faq.css';

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0, 1, 2, 3, 4]); // Todos abertos por padrão

  const items = [
    {
      id: 1,
      question: "O que é o Gerador de link para WhatsApp?",
      answer: "O plano Light não tem tempo de permanência mínima nem multa por cancelamento. Você pode cancelar quando quiser. Ficaremos tristes, mas você pode cancelar a qualquer momento, com poucos cliques. É só entrar no painel de configurações da sua conta e lá você terá essa opção. O cancelamento da sua conta não acontece de forma automática por falta de uso, por isso, se não quiser mais usar sua conta lembre-se de cancelar para que você não pague se não estiver usando."   
    },
    {
      id: 2,
      question: "Onde posso usar o link do WhatsApp?",
      answer: "O seu link de Whatsapp pode ser usado no link da bio das suas redes sociais, em mensagens de email, chats e qualquer que você possa usar para compartilhar o link direto para o seu WhatsApp."    
    },
    {
      id: 3,
      question: "Quais as vantagens de ter um link do seu WhatsApp?",
      answer: "O link do WhatsApp permite que você compartilhe o seu contato de WhatsApp de forma prática, com clientes e pessoas interessadas nos seus produtos ou serviços. Dessa forma, você consegue tirar dúvidas, ajudar no processo de compra e estreitar o relacionamento com essas pessoas."    
    },
    {
      id: 4,
      question: "Como gerar link para WhatsApp?",
      answer: "Para gerar o seu link no WhatsApp usando o gerador, basta acessar a ferramenta, preencher o seu número de WhatsApp e inserir o seu email e o seu cargo. Depois, caso queira, crie uma mensagem que vai facilitar a interação com seus contatos. As informações de email e cargo não aparecem para quem acessar o seu link de WhatsApp, apenas o seu número e mensagem são compartilhados."
    }
  ];

  const toggleItem = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(itemId => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const closeAll = () => {
    setOpenItems([]);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <button className="close-all-btn" onClick={closeAll}>
          Fechar todos
          <img src={ArrowRight} alt="Fechar todos" className="close-all-icon" />
        </button>
      </div>
      
      <div className="faq-content">
        <div className="faq-left">
          <h1 className="faq-title">Perguntas mais comuns</h1>
        </div>
        
        <div className="faq-right">
          {items.map((item) => (
            <div key={item.id} className="faq-item">
              <div 
                className="faq-question" 
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="question-title">{item.question}</h3>
                <img 
                  src={ChevronDown} 
                  alt="Expandir/Recolher" 
                  className={`arrow ${openItems.includes(item.id) ? 'open' : ''}`}
                />
              </div>
              
              {openItems.includes(item.id) && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};