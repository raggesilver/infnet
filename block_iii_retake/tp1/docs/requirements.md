# Requisitos - Sistema de Agendamento VidaPet

Paulo Queiroz - Projeto de Bloco: Desenvolvimento Back End (PB) - TP1

## Regras de Negócio

As regras vêm da especificação e existem independentemente do sistema.

| ID   | Descrição                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------ |
| RN01 | As consultas duram 30 minutos e só podem ser marcadas de segunda a sexta, das 8h às 18h.               |
| RN02 | Um veterinário não pode ter duas consultas agendadas no mesmo horário.                                 |
| RN03 | Não é possível agendar consultas em datas que já passaram.                                             |
| RN04 | Uma consulta só pode ser cancelada se ainda estiver como agendada.                                     |
| RN05 | Somente consultas agendadas podem ser marcadas como realizadas, e apenas pelo veterinário da consulta. |

## Requisitos Funcionais

Cada requisito descreve uma única ação. A coluna Origem indica a especificação, uma regra de negócio ou uma suposição.

| ID   | Descrição                                                                                                              | Origem        |
| ---- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| RF01 | O sistema deve permitir cadastrar um animal com nome, espécie, idade, nome do tutor e telefone do tutor.               | Especificação |
| RF02 | O sistema deve aceitar somente cão ou gato como espécie do animal.                                                     | Especificação |
| RF03 | O sistema deve permitir cadastrar um veterinário com nome e CRMV.                                                      | Especificação |
| RF04 | O sistema deve permitir agendar uma consulta para um animal e um veterinário em uma data e um horário.                 | Especificação |
| RF05 | O sistema deve recusar o agendamento fora de segunda a sexta, das 8h às 18h.                                           | RN01          |
| RF06 | O sistema deve recusar o agendamento cujo término, 30 minutos após o início, ultrapasse as 18h.                        | RN01, A01     |
| RF07 | O sistema deve recusar o agendamento de um veterinário que já tenha consulta agendada no mesmo horário.                | RN02          |
| RF08 | O sistema deve recusar o agendamento em data e horário que já passaram.                                                | RN03, A02     |
| RF09 | O sistema deve permitir cancelar uma consulta agendada.                                                                | Especificação |
| RF10 | O sistema deve recusar o cancelamento de uma consulta que não esteja agendada.                                         | RN04          |
| RF11 | O sistema deve permitir ao veterinário consultar sua agenda do dia.                                                    | Especificação |
| RF12 | O sistema deve permitir ao veterinário marcar uma consulta agendada como realizada, com as observações do atendimento. | Especificação |
| RF13 | O sistema deve recusar marcar como realizada uma consulta que não esteja agendada.                                     | RN05          |
| RF14 | O sistema deve recusar que uma consulta seja marcada como realizada por um veterinário que não seja o da consulta.     | RN05          |

## Requisitos Não Funcionais

| ID    | Categoria         | Descrição                                                                                                                                                                       | Origem                                                |
| ----- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| RNF01 | Desempenho        | A consulta da agenda do dia de um veterinário deve responder em até 2 segundos com 1.000 consultas cadastradas.                                                                 | Suposição                                             |
| RNF02 | Usabilidade       | A recepcionista deve conseguir agendar uma consulta em no máximo 5 passos: animal, veterinário, data, horário e confirmação.                                                    | Suposição                                             |
| RNF03 | Usabilidade       | Toda operação recusada deve informar o motivo da recusa, citando a regra violada.                                                                                               | RN01 a RN05                                           |
| RNF04 | Confiabilidade    | Nenhuma consulta agendada pode ser perdida ao encerrar e reiniciar o sistema.                                                                                                   | Especificação (agenda em caderno causa esquecimentos) |
| RNF05 | Segurança         | Somente a recepcionista pode cadastrar, agendar e cancelar, e somente o veterinário da consulta pode registrá-la como realizada. A tentativa de outro perfil deve ser recusada. | Especificação, RN05                                   |
| RNF06 | Restrição técnica | O sistema deve ser desenvolvido em C# com o .NET 10 SDK.                                                                                                                        | Enunciado do TP1                                      |

## Suposições

Pontos que a especificação não define. Ficam registrados para confirmação com o cliente.

| ID  | Suposição                                                                                                                                                |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | As consultas começam em horários :00 ou :30. A última começa às 17h30 e termina às 18h.                                                                  |
| A02 | "Data que já passou" é uma data e hora de início anterior ao momento atual.                                                                              |
| A03 | O sistema não impede que um animal tenha duas consultas no mesmo horário com veterinários diferentes. A especificação só restringe o veterinário (RN02). |
| A04 | Não há limite máximo de antecedência para agendar.                                                                                                       |
| A05 | Feriados não são tratados. Todo dia de segunda a sexta é dia de atendimento.                                                                             |
| A06 | O CRMV é único por veterinário. Nesta etapa não se valida o formato.                                                                                     |
| A07 | A idade do animal é informada em anos inteiros, de 0 em diante.                                                                                          |
| A08 | O horário de uma consulta cancelada fica livre para um novo agendamento.                                                                                 |
| A09 | As observações do atendimento são obrigatórias ao marcar a consulta como realizada.                                                                      |
| A10 | Enquanto não houver autenticação, o veterinário se identifica pelo CRMV.                                                                                 |
