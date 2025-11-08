# Gerador de Link do WhatsApp

Uma aplicação completa para gerar links personalizados do WhatsApp, desenvolvida com React + TypeScript no frontend e NestJS no backend. 
Desenvolvido como desafio técnico para RD Station.  

## 🚀 Funcionalidades

- **Formulário Intuitivo**: Validação de nome, telefone, mensagem e cargo
- **Link Personalizado**: Geração automática de links no formato `https://wa.me/55XXXXXXXXXX?text=Mensagem`
- **Design Responsivo**: Adaptado para mobile e desktop seguindo o Figma
- **Integração com Zapier**: Envio automático dos dados para webhook
- **Feedback Visual**: Estados de sucesso e erro nas validações

## 🚀 **Como Iniciar o Projeto**

### **Backend**
```bash
cd backend  
npm install
npm start
```

### **Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Variáveis de Ambiente
No backend, configure:
```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/13309391/uie4g8v/
```


## 🧪 Testes

```bash
# Backend
npm run test
```

## 🔗 API

**POST** `/link`
```json
{
  "name": "Nome do Usuário",
  "phone": "(11) 99999-9999", 
  "message": "Mensagem personalizada",
  "role": "Cargo do usuário"
}
```

**Resposta:**
```json
{
  "link": "https://wa.me/5511999999999?text=Mensagem%20Formatada"
}
```

## 🛠️ **Tecnologias Utilizadas**

### **Frontend (React + TypeScript)**
- ⚛️ **React 18** - Biblioteca principal
- 🔷 **TypeScript** - Tipagem estática
- 🛣️ **React Router DOM** - Roteamento entre páginas
- 📡 **Axios** - Cliente HTTP para API
- 🎨 **CSS Modules** - Estilização com escopo local
- ⚡ **Vite** - Build tool e dev server

### **Backend (NestJS)**
- 🏗️ **NestJS** - Framework Node.js
- 🧪 **Jest** - Framework de testes
- 🔧 **TypeScript** - Tipagem no backend
- 📨 **Integração com Zapier** - Webhooks

### **Ferramentas de Desenvolvimento**
- 📦 **npm** - Gerenciador de pacotes
- 🐙 **Git** - Controle de versão
- 🎯 **Figma** - Design e protótipo

## 📁 **Estrutura do Projeto**
```
Gerador-de-Link-do-WhatsApp-RD-Station/
├── frontend/          # Aplicação React
├── backend/           # API NestJS
└── README.md
```

