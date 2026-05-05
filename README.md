# 🌐 IP Logger Container

Um container Docker simples e eficiente para registrar os endereços IPv4 de clientes que acessam um endpoint web.

Ideal para testes, auditoria básica de acesso, laboratórios de rede ou integrações com automações (como webhooks).


## 🚀 Como usar

Execute o container:

```bash
docker run -d -p 3000:3000 giao754/ip-logger
````

Acesse no navegador ou via curl:

```bash
http://localhost:3000
```

Cada acesso ao endpoint irá registrar o IPv4 do cliente.

---

## 📁 Como visualizar os logs

Para consultar os IPs registrados diretamente no container:

```bash
docker exec -it <container_id> cat /app/ips.log
```

---

## 💾 Persistência de logs (recomendado)

Por padrão, os logs ficam dentro do container (não persistem após remoção).

Para salvar os logs no host:

```bash
docker run -d -p 3000:3000 -v $(pwd)/logs:/app giao754/ip-logger
```

Os registros ficarão disponíveis em:

```bash
./logs/ips.log
```

---

## 📌 O que este container faz

* Captura requisições HTTP na porta 3000
* Extrai e registra apenas endereços IPv4 válidos
* Armazena logs com timestamp em arquivo local (`ips.log`)

---

## ⚠️ Observações

* Em ambientes com proxy (NGINX, Cloudflare, etc.), pode ser necessário ajustar headers para obter o IP real
* Acessos locais (Docker/localhost) podem registrar IPs internos (ex: 172.x.x.x)
* Não possui autenticação ou controle de acesso (uso recomendado para ambientes controlados)

---

## 🧪 Casos de uso

* Testes de rede
* Auditoria simples de acessos
* Integração com ferramentas como n8n
* Laboratórios de cibersegurança

---

## 📦 Imagem

Disponível em:

```bash
docker pull giao754/ip-logger
```
---

