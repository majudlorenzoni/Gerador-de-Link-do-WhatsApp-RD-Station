import React from "react";
import './examples.css'
import LinkButton from "../link-button";
import ArrowRight from '../../assets/arrowright.png'

export const Examples: React.FC = () => {
  const examples = [
    {
      id: 1,
      title: "Opção 1",
      description: "Olá! Obrigado por seu interesse em falar com [Nome da Empresa]. Me conta qual é a sua dúvida para eu lhe fornecer as melhores informações!"
    },
    {
      id: 2,
      title: "Opção 2", 
      description: "Oi, tudo bem? Obrigado por entrar em contato com [Nome da Empresa]. Qual é a sua dúvida? Assim, eu consigo ajudar você rapidamente."
    },
    {
      id: 3,
      title: "Opção 3",
      description: "Olá! Seja bem-vindo a/ao [Nome da Empresa]! Meu nome é [Nome do Atendente], irei fazer o seu atendimento hoje. Me conta como posso ajudar você! 😍"
    }
  ];

    const scrollToForm = () => {
  
  const formSection = document.querySelector('section.form-section');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="examples-container">
      <div className="examples-header">
        <h1 className="examples-title">Exemplos de mensagem para WhatsApp</h1>
      </div>
      
      <div className="examples-content">
        {examples.map((example) => (
          <div key={example.id} className="example-box">
            <h3 className="example-title">{example.title}</h3>
            <p className="example-description">{example.description}</p>
          </div>
        ))}
      </div>

       <LinkButton
        text="Gere seu link grátis"
        icon={ArrowRight}
        onClick={scrollToForm}
        className="generate-button"
      />
    </div>
  );
};