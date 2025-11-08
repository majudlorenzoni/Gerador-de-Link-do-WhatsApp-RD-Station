import React from 'react';
import './benefits.css';
import LinkButton from '../link-button';
import CheckCircle from '../../assets/check-circle.png';
import ArrowRight from '../../assets/arrowright.png'

interface BenefitItem {
  id: number;
  text: string;
}

interface BenefitsProps {
  title?: string;
  description?: string;
  source?: string;
  benefits?: BenefitItem[];
}

const defaultBenefits: BenefitItem[] = [
  { id: 1, text: 'Otimiza a geração de Leads.' },
  { id: 2, text: 'Ofereça uma opção rápida e prática para tirar dúvidas sobre produtos e serviços.' },
  { id: 3, text: 'Oferece uma ótima experiência ao usuário.' }
];

const DefaultTitle = () => (
  <>
    Acelere suas conversas com o <span className="highlight-blue">Gerador de link de</span> <span className="highlight-green">WhatsApp</span>
  </>
);

const DefaultDescription = () => (
  <> 
    O WhatsApp é uma das plataformas preferidas pelos brasileiros — <b>são mais de 165 milhões de usuários</b>* (ou 96,4% da população que faz uso das redes sociais). Quando você traz um link de WhatsApp nas redes sociais ou site da sua empresa, só tem vantagens:
  </>
);

export const Benefits: React.FC<BenefitsProps> = ({
  title = <DefaultTitle />,
  description = <DefaultDescription />,
  source = '*Dados da pesquisa Digital 2022: Brazil',
  benefits = defaultBenefits
}) => {

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
    <div className="benefits-container">
      <div className='benefits-title'>
        <h1>{title}</h1>
      </div>

      <div className='benefits-info'>
        <h3>{description}</h3>
        <h5>{source}</h5>

        <div className="benefits-topic">
          <ul className="benefits-list">
            {benefits.map((benefit) => (
              <li key={benefit.id} className="benefits-item">
                <img src={CheckCircle} alt="Check" className="check-icon" />
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <LinkButton
        text="Gere seu link grátis"
        icon={ArrowRight}
        onClick={scrollToForm}
        className="generate-button"
      />
      
      </div>
    </div>
  );
};