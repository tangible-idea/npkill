<p align="center">
  <img src="./docs/npkill-text-clean.svg" width="380" alt="flutterkill logo" />
</p>
<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/flutterkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/flutterkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/flutterkill.svg">
</p>

### Encontre e **remova** facilmente artefatos de build do Flutter :sparkles:

Esta ferramenta permite que você liste os diretórios de build do Flutter/Dart (`build`, `.dart_tool`, `.gradle`, `Pods`, etc.) em seu sistema, bem como o espaço que ocupam. Então você pode selecionar quais deles deseja apagar para liberar espaço.

> Baseado em **npkill** ([github.com/voidcosmos/npkill](https://github.com/voidcosmos/npkill))

## i18n

Estamos fazendo esforço para internacionalizar a documentação do Flutterkill. Aqui está uma lista das traduções disponíveis:

- [Español](./README.es.md)
- [Indonesian](./README.id.md)
- [한국어](./README.ko.md)
- [Português](./README.pt.md)
- [Turkish](./README.tr.md)

## Table of Contents

- [Funcionalidades](#features)
- [Instalação](#installation)
- [Utilização](#usage)
  - [Opções](#options)
  - [Exemplos](#examples)
- [Configurar localmente](#setup-locally)
- [Roteiro](#roadmap)
- [Problemas conhecidos](#known-bugs)
- [Contribuindo](#contributing)
- [Compre-nos um café](#donations)
- [Licença](#license)

<a name="features"></a>

# :heavy_check_mark: Funcionalidades

- **Liberar espaço:** Livre-se dos antigos e empoeirados artefatos de build do Flutter que ocupam espaço em sua máquina.

- **Varredura inteligente do Flutter:** Apenas escaneia diretórios com `pubspec.yaml` (projetos Flutter reais). Exclui automaticamente o SDK do Flutter.

- **Último Uso do Espaço de Trabalho**: Verifique quando foi a última vez que você modificou um arquivo no espaço de trabalho (indicado na coluna **última_modificação**).

- **Muito rápido:** O Flutterkill é escrito em TypeScript, mas as pesquisas são realizadas em um nível baixo, melhorando muito o desempenho.

- **Fácil de usar:** Diga adeus aos comandos longos. Usar o flutterkill é tão simples quanto ler uma lista de suas pastas build e pressionar Delete para se livrar delas. Pode ser mais fácil do que isso? ;)

- **Minificado:** Ele mal possui dependências.

<a name="installation"></a>

# :cloud: Instalação

Você nem precisa instalá-lo para usar!
Basta usar o seguinte comando:

```bash
$ npx flutterkill
```

Ou, se por algum motivo você realmente deseja instalá-lo:

```bash
$ npm i -g flutterkill
# Usuários do Unix podem precisar executar o comando com sudo. Tome cuidado.
```

<a name="usage"></a>

# :clipboard: Utilização

```bash
$ npx flutterkill
# ou apenas flutterkill se você instalou globalmente
```

Por padrão, o flutterkill fará a varredura em busca de artefatos de build do Flutter a partir do local onde o comando flutterkill é executado.

Para mover entre as pastas listadas, utilize as teclas <kbd>↓</kbd> e <kbd>↑</kbd>, e use <kbd>Space</kbd> ou <kbd>Del</kbd> para excluir a pasta selecionada.
Você também pode usar <kbd>j</kbd> e <kbd>k</kbd> para se mover entre os resultados.

Para abrir o diretório onde o resultado selecionado está localizado, pressione <kbd>o</kbd>.

Para sair, use <kbd>Q</kbd> ou <kbd>Ctrl</kbd> + <kbd>c</kbd> se você estiver se sentindo corajoso.

**Importante!** Excluir pastas `build` ou `.dart_tool` significa que o próximo build exigirá `flutter pub get` e uma recompilação completa. O Flutterkill irá destacar diretórios sensíveis exibindo um :warning: para que você tenha cuidado.

<a name="options"></a>

## Opções

| Comando                          | Descrição                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c, --bg-color                   | Troca a cor de destaque da linha. _(Disponível: **blue**, cyan, magenta, white, red e yellow)_                                                                      |
| -d, --directory                  | Defina o diretório a partir do qual iniciar a pesquisa. Por padrão, o ponto de partida é a raiz is .                                                                |
| -D, --delete-all                 | Exclui automaticamente todos os node_modules encontrados. Recomendado para usar junto com `-x`                                                                      |
| -e, --hide-errors                | Oculta erros                                                                                                                                                        |
| -E, --exclude                    | Excluir diretórios da pesquisa (a lista de diretórios deve estar entre aspas duplas "", com cada diretório separado por vírgula ','). Exemplo: "ignorar1, ignorar2" |
| -f, --full                       | Iniciar a pesquisa a partir do diretório pessoal do usuário (exemplo: "/home/user" no Linux)                                                                        |
| -gb                              | Mostra as pastas em Gigabytes ao invés de Megabytes.                                                                                                                |
| -h, --help, ?                    | Mostrar a página de ajuda e sair                                                                                                                                    |
| -nu, --no-check-update           | Não verificar atualizações na inicialização                                                                                                                         |
| -s, --sort                       | Ordenar resultados por: `size` (tamanho), `path`(localização) ou `last-mod`(última modificação)                                                                     |
| -t, --target                     | Especifique o nome dos diretórios que deseja pesquisar (por padrão, é node_modules)                                                                                 |
| -x, --exclude-hidden-directories | Excluir diretórios ocultos ("diretórios com ponto") da pesquisa.                                                                                                    |
| --dry-run                        | Não exclui nada (irá simular com um atraso aleatório).                                                                                                              |
| -v, --version                    | Mostrar versão do flutterkill                                                                                                                                       |

**Aviso:** _No futuro alguns comandos podem mudar_

<a name="examples"></a>

## Examples

- Busque artefatos de build do Flutter no seu diretório de projetos:

```bash
flutterkill -d ~/projetos

# alternativa:
cd ~/projetos
flutterkill
```

- Exclua diretórios específicos da busca:

```bash
flutterkill -d ~/projetos --exclude "flutter_sdk, ignorar"
```

- Exclua automaticamente todos os artefatos de build do Flutter nos seus backups:

```bash
flutterkill -d ~/backups/ --delete-all
```

<a name="setup-locally"></a>

# :pager: Configurar localmente

```bash
# -- Primeiramente, clone o repositório
git clone https://github.com/tangible-idea/npkill.git

# -- Acesse a pasta
cd npkill

# -- Instale as dependências
npm install

# -- E rode!
npm run start


# -- Se você deseja executá-lo com algum parâmetro, você terá que adicionar "--" como no seguinte exemplo:
npm run start -- -f -e
```

<a name="roadmap"></a>

# :crystal_ball: Roteiro

- [x] Lançamento 0.1.0 !
- [x] Melhorias de código
  - [x] Melhorias de performance
  - [ ] Ainda mais melhorias de performance!
- [x] Ordenação de resultados por tamanho e localização
- [x] Permitir a pesquisa por outros tipos de diretórios (alvo)
- [ ] Reduzir as dependências para tornar o módulo mais minimalista
- [ ] Permitir filtrar por diretórios que não foram usados em um período de tempo
- [ ] Criar opção para mostrar as pastas em formato de árvore
- [x] Adicionar menus
- [x] Adicionar logs
- [ ] Limpeza automatizada periódica (?)

<a name="known-bugs"></a>

# :bug: Problemas conhecidos :bug:

- Às vezes, a CLI fica bloqueada enquanto a pasta está sendo excluída.
- Alguns terminais que não utilizam TTY (como o git bash no Windows) não funcionam.
- A ordenação, especialmente por rotas, pode deixar o terminal mais lento quando há muitos resultados ao mesmo tempo.
- Às vezes, os cálculos de tamanho são maiores do que deveriam ser.
- (RESOLVIDO) Problemas de desempenho ao pesquisar em diretórios de alto nível (como / no Linux).
- (RESOLVIDO) Às vezes, o texto se desfaz ao atualizar a interface de linha de comando (CLI).
- (RESOLVIDO) A análise do tamanho dos diretórios leva mais tempo do que deveria.

> Se você encontrar algum erro, não hesite em abrir uma solicitação (via issue) :)

<a name="contributing"></a>

# :revolving_hearts: Contribuindo

Se você quer contribuir confira o [CONTRIBUTING.md](.github/CONTRIBUTING.md)

<a name="donations"></a>

# :coffee: Compre-nos um café

<img align="right" width="300" src="https://npkill.js.org/img/cat-donation-cup.png">
O npkill original foi desenvolvido por [Nya García Gallardo](https://github.com/NyaGarcia) e [Juan Torres Gómez](https://github.com/zaldih). Flutterkill é um fork focado em Flutter por [Mark Choi](https://github.com/tangible-idea).

<a name="license"></a>

# :scroll: Licença

MIT © [Mark Choi](https://github.com/tangible-idea)

> npkill original: MIT © [Nya García Gallardo](https://github.com/NyaGarcia) e [Juan Torres Gómez](https://github.com/zaldih)

---
