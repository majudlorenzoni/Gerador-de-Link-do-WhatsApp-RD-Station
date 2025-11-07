````markdown
# Gerador de Link do WhatsApp – RD Station

Aplicação backend em **NestJS** que gera links personalizados do WhatsApp com base nos dados do usuário e envia informações para o **Zapier**.

## Funcionalidades

- Validação de campos: nome, telefone, mensagem e cargo.
- Geração de link WhatsApp no formato: `https://wa.me/55XXXXXXXXXX?text=Mensagem`.
- Integração com Zapier para envio dos dados.
- Testes unitários e de controller com **Jest**.

## Instalação

```bash
npm install
````

## Rodando a aplicação

```bash
npm run start:dev
```

## Rodando os testes

```bash
npm run test
```

## Variáveis de ambiente

* `ZAPIER_WEBHOOK_URL` – URL do webhook do Zapier para envio dos dados.