# AnatoMatch: Jogo da Memória de Anatomia

Este é um jogo da memória desenvolvido para testar e aprimorar o conhecimento em anatomia. O objetivo é parear corretamente a imagem de uma estrutura anatômica com o seu nome correspondente.

---

### Regras do Jogo

O AnatoMatch é dividido em níveis progressivos, cada um com um limite de tempo e um número crescente de peças.

| Ação | Pontuação | Observação |
| :--- | :--- | :--- |
| **Acerto** (Pareamento correto) | +10 pontos | O par é travado e removido do jogo. |
| **Erro** (Pareamento incorreto) | -2 pontos | As cartas viram-se de volta após 1.5 segundo. |
| **Vitória** | Completar todos os pares do nível antes que o tempo se esgote. | Avança para o próximo nível, que é mais difícil. |
| **Derrota** | O tempo do nível se esgota. | O jogador deve tentar novamente ou retornar ao início. |

### Progressão dos Níveis

A dificuldade aumenta progressivamente, exigindo mais atenção e tempo de resposta.

| Nível | Pares | Total de Cartas | Limite de Tempo |
| :---: | :---: | :---: | :---: |
| 1 | 2 pares | 4 cartas | 30 segundos |
| 2 | 4 pares | 8 cartas | 60 segundos |
| 3 | 6 pares | 12 cartas | 90 segundos |
| 4 | 8 pares | 16 cartas | 120 segundos |
| 5 | 12 pares | 24 cartas | 180 segundos |

---

### Execução do Projeto

#### Configuração de Imagens

Este projeto utiliza referências de imagens para as peças anatômicas. Para o funcionamento correto, todas as imagens referenciadas (`Img1.png` a `Img12.jpg`) devem estar localizadas na pasta: `public/img/`

#### Como Iniciar

Assumindo que o ambiente Next.js e as dependências estejam instaladas:

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Execute o jogo:
    ```bash
    npm run dev
    ```
O jogo estará disponível em `http://localhost:3000`.