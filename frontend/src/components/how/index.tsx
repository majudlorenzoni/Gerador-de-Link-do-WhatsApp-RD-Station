import React from "react";
import IconCheck from '../../assets/Vector.png';
import './how.css';

export const How: React.FC = () => {
  const items = [
    {
      id: 1,
      description: "Deixe bem claro de qual empresa se trata mencione o nome do seu negócio logo na mensagem para reforçar a identificação com a marca."
    },
    {
      id: 2,
      description: "Informe claramente os próximos passos para evitar ansiedade. Por exemplo, um vendedor entrará em contato? Quanto tempo isso demora?"
    },
    {
      id: 3,
      description: "Faça uma comunicação humanizada ou seja, escreva como você estivesse falando com outra pessoa (até porque, está mesmo!), seguindo os padrões da sua marca."
    }
  ];

  return (
    <div className="how-container">
      <div className="how-header">
        <h1 className="how-title">Como criar mensagens automáticas para o WhatsApp</h1>
        <h2 className="how-subtitle">
          Agora que você viu como fazer link do WhatsApp é fácil, confira algumas ideias para mensagens que agilizam a comunicação!
        </h2>
      </div>

      <div className="how-content">
        {items.map((item) => (
          <div key={item.id} className="how-item">
            <img src={IconCheck} alt="Check" className="how-icon" />
            <div className="how-text">
              <p className="how-item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};