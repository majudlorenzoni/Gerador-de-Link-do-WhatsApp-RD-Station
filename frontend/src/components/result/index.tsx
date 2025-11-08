import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LinkButton from '../link-button';
import Copy from '../../assets/copy.png'
import ChevronLeft from '../../assets/chevron-left.png'
import ArrowRight from '../../assets/ArrowRightBlack.png'
import ChevronRight from '../../assets/chevron-right.png'
import LogoWpp from '../../assets/logo-wpp.png'
import Check from '../../assets/check.png'
import './results.css';

interface ResultData {
  whatsappLink: string;
  phone: string;
  message: string;
  name: string;
  role: string;
  generatedAt: string;
}

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const stateData = location.state as ResultData;
    
    if (stateData) {
      setResultData(stateData);
    } else {
      const storedData = sessionStorage.getItem('whatsappLinkData');
      if (storedData) {
        setResultData(JSON.parse(storedData));
      } else {
        navigate('/');
      }
    }
  }, [location, navigate]);

  const copyToClipboard = () => {
    if (resultData?.whatsappLink) {
      navigator.clipboard.writeText(resultData.whatsappLink)
        .then(() => {
          setIsCopied(true);
          // Volta ao estado original após 3 segundos
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        })
        .catch(err => {
          console.error('Erro ao copiar:', err);
        });
    }
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('whatsappLinkData');
    navigate('/');
  };

  if (!resultData) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="results-container">
      <div className="back-to-home">
        <button className="back-button" onClick={handleBackToHome}>
          <img src={ChevronLeft} alt="Voltar" className="back-icon" />
          Gerar outro link
        </button>
      </div>

      <div className="results-layout">
        <div className="results-left">
          <div className="results-content">
            <div className="results-header">
              <h1>Seu link de WhatsApp foi gerado com sucesso!</h1>
            </div>

            <div className="link-display">
              <div className="link-box">
                <div className="link-url">{resultData.whatsappLink}</div>
              </div>
              
              <div className="actions-row">
                <LinkButton
                  icon={isCopied ? Check : Copy}
                  text={isCopied ? "Link copiado" : "Copie seu link"}
                  onClick={copyToClipboard}
                  className={`copy-link-button ${isCopied ? 'copied' : ''}`}
                />

                <div className="rd-marketing">
                  <LinkButton
                    text="Adicione um botão de WhatsApp no site"
                    icon={ArrowRight}
                    className="whatsapp-button"
                    link="https://www.rdstation.com/teste-gratis/"
                  />
                  
                  <h5>Faça isso com o teste grátis do <b>RD Station Marketing</b></h5>
                </div>
              </div>

              <div className="rd-station-conversas">
                <div className="rd-conversas-content">
                  <h2 className="rd-conversas-title">
                    Quer aumentar em até 56% as suas vendas pelo WhatsApp?
                  </h2>
                  
                  <p className="rd-conversas-description">
                    Conheça o <b>RD Station Conversas</b>, uma solução oficial de WhatsApp API que te garante um atendimento mais eficiente, lucrativo e seguro. Com a nossa ferramenta você diminui os riscos de ter seu número bloqueado e ainda melhorar suas taxas de conversão.
                  </p>
                  
                  <div className="rd-conversas-cta">
                    <span className="rd-cta-text">Quer ficar por dentro sobre como nossa plataforma pode ajudar a sua empresa?</span>
                    <a 
                      href="https://www.rdstation.com/produtos/conversas/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="rd-cta-link"
                    >
                      Saiba mais
                      <img src={ChevronRight} alt="Saiba mais" className="cta-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="results-right">
          <img 
            src={LogoWpp} 
            alt="Ícone do WhatsApp - balão de fala verde com telefone branco" 
            className="icon-whatsapp" 
          />
        </div>
      </div>
    </div>
  );
};