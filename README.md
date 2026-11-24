# Nilton City

Portfólio explorável de Nilton Luan. Uma cidade original em roxo e rosa, com carro controlável, torres baseadas em contribuições do GitHub e seis destinos de projetos públicos.

## Explorar

Use **WASD ou setas** para dirigir. **Shift** acelera. Perto de um projeto, use **E** ou o botão de visita. **Escape** sai da exploração ou fecha detalhes. No celular, use os botões de direção.

Você também pode abrir **Projetos** diretamente, sem jogar. A câmera automática pode ser pausada; reduzir movimento no sistema a desativa inicialmente.

## Dados reais, cenário original

`dist/data.json` contém um retrato do calendário de contribuições de `NiltonBarross`, consultado em 24/11/2026. São contribuições contabilizadas pelo GitHub, não apenas commits. Cada torre lilás corresponde a um dia com atividade. Projetos e cenário decorativo não entram nessa contagem.

O calendário é um snapshot: não se atualiza sozinho. Repositórios privados e credenciais não são incluídos. As descrições dos projetos foram conferidas nos seus READMEs públicos.

## Rodar e verificar

Sirva a pasta `dist/` por HTTP com um servidor estático. Não abra por `file://`, pois o navegador precisa carregar módulos e JSON.

```sh
node --test tests/domain.test.mjs
node --check dist/app.js
node --check dist/world.js
```

Requer navegador com WebGL2 para a cidade. A lista de projetos continua disponível se a inicialização gráfica falhar. Nenhum backend ou instalação é necessário para visitar o site.

## Estrutura

- `dist/`: site estático, dados, fontes e biblioteca gráfica local.
- `tests/`: regras de mapeamento e movimentação.
- `profile/`: README e banner do perfil.
- `specs/`: requisitos, plano e tarefas.
- `docs/`: capturas e registro de verificação.

## Créditos

Referências indicadas pelo usuário: GitGTA e daanrox/gtavi. O código da cidade e sua geometria são originais; não foram copiados assets desses projetos ou da Rockstar. Three.js 0.170.0 mantém sua licença MIT em `dist/vendor/LICENSE`; fontes Barlow e Barlow Condensed mantêm as licenças OFL em `dist/vendor/`.

O projeto apresentado como Job Hunter AI é um fork de `othiagom/automacao-busca-vagas`, identificado também no perfil. A seleção do portfólio reúne trabalho próprio e projetos explorados no GitHub, sem atribuir a autoria original de forks ao dono do perfil.
