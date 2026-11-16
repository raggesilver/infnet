# Escopo - Sistema de Agendamento VidaPet

Paulo Queiroz - Projeto de Bloco: Desenvolvimento Back End (PB) - TP1

## Objetivo da Entrega

Documentar os requisitos e os casos de uso do VidaPet e entregar um programa de console que cadastra animais e veterinários e valida o horário de uma consulta.

## Priorização

| Prioridade | Itens                                                      | Requisitos             |
| ---------- | ---------------------------------------------------------- | ---------------------- |
| Must       | Cadastrar animal, cadastrar veterinário e agendar consulta | RF01, RF02, RF03, RF04 |
| Should     | Validar dia, horário e data do agendamento                 | RF05, RF06, RF08       |
| Could      | Informar o motivo de cada recusa                           | RNF03                  |
| Won't      | Impedir horário duplicado do veterinário                   | RF07                   |
| Won't      | Cancelar consulta                                          | RF09, RF10             |
| Won't      | Consultar agenda do dia                                    | RF11                   |
| Won't      | Registrar atendimento                                      | RF12, RF13, RF14       |
| Won't      | Guardar dados entre execuções, autenticação e API          | RNF04, RNF05           |

## Justificativa

**Valor:** o problema da clínica é a agenda em caderno, e o núcleo da solução é agendar (RF04). Por isso o agendamento é Must. Impedir horários duplicados (RF07) é o maior ganho para a clínica, mas depende de guardar as consultas e fica para a etapa 4.

**Dependência:** não existe agendamento sem animal e veterinário cadastrados (RF01 e RF03 antes de RF04), e o programa recusa agendar sem eles. As validações de dia, horário e data (RF05, RF06, RF08) dependem do agendamento. Cancelar e registrar atendimento (RF09 a RF14) dependem de consultas guardadas.

**Risco:** RN02, RN04 e RN05 comparam a consulta com consultas já guardadas. Simular isso com variáveis soltas levaria a refazer tudo na etapa 4. RN01 e RN03 usam só o horário pedido e o relógio, então têm risco baixo e entram agora.

**Esforço:** o TP1 não permite classes nem coleções. O que cabe em variáveis, contadores e no último valor informado entra. O resto fica de fora, de forma explícita na tabela acima.

## Simplificações do Programa

- O agendamento usa o último animal e o último veterinário cadastrados, porque sem listas não há como escolher entre vários.
- A data e a hora atuais vêm do relógio da máquina.
- O programa não guarda dados entre execuções.

## Suposições

As suposições A01 a A10 estão em `requirements.md`.

## Uso de IA

Ferramentas de IA (Claude) foram usadas como apoio na redação, no código e na revisão. O autor definiu o escopo, revisou todo o conteúdo e executou o programa.
