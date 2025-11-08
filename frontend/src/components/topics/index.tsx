import React from "react";
import BoltLighting from '../../assets/boltlightning.png'
import MessageCaptions from '../../assets/messagecaptions.png'
import ExternalLinkalt from '../../assets/externallinkalt.png'
import Image from '../../assets/image.jpg'
import './topics.css'

export const Topics: React.FC = () => {
  const modulesData = [
    {
      icon: BoltLighting,
      title: 'Atalho rumo às vendas',
      text: 'O Gerador de link do WhatsApp faz com que usuários se transformem em contatos (Leads) e iniciem conversas certeiras com sua marca.'
    },
    {
      icon: MessageCaptions,
      title: 'Mensagem automática',
      text: 'Você automatiza mensagens estimulando o início da conversa, o que facilita a vida dos usuários e clientes.'
    },
    {
      icon: ExternalLinkalt,
      title: 'Rápido e 100% gratuito',
      text: 'Não sabe como fazer link de WhatsApp? O Gerador da RD Station é fácil de usar e permite gerar links em segundos!'
    },

    {
      image: Image,
    }
  ];

    return (
    <div className="modules-column">
      {modulesData.map((module, index) => (
        <div key={index} className="module">
          {module.icon && (
            <div className="module-icon">
              <img src={module.icon} alt={`Ícone ${module.title}`} />
            </div>
          )}
          <div className="module-content">
            {module.title && <h3 className="module-title">{module.title}</h3>}
            {module.text && <p className="module-text">{module.text}</p>}
          </div>
          {module.image && (
              <img src={module.image} alt="Imagem ilustrativa" className="img-phone"/>
          )}
        </div>
      ))}
    </div>
  );
};