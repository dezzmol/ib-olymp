# Сервис для проведения соревнований по информационной безопасности
## Предназначение
Данный сервис разработан для проведения соревнований по информационной безопаснсоти на базе ФГБОУ ВО "АГТУ". 
Данный сервис направлен на развитие компетенций в сфере информацинной безопасности, а также для привлечения студентов в участии в других подобных соревнованиях, в том числе и на международном уровне.

## Техническое описание
Данный сервис представляет собой fullstack приложение.
### Стек:
- Java 21
- Spring boot 3
- PostgreSQL
- React
- TypeScript
- Docker

## Методика оценивания
В данный сервис внедрена многоуровневая методика оценивания. Итоговый балл за задание определяется по следующим критериям:
1. Балл за сложность раздела. Каждый раздел требует определенный набор компетенций и чем их больше, тем большим количеством компетенций должен обладать участник соревнования.
2. Балл за трудоемкость решения. Также как и в случае с сложностью раздела, чем более трудоемким решением обладает задача, тем больше компетенций требуется от участника.
3. Динамически изменяемый балл. Итоговый балл за сложность раздела плюс балл за трудоемкость решения может быть снижен в случае в зависимости от количества команд, решившую эту задачу. Т.е. чем больше команд решит определенную задачу, тем меьншее количество баллов получит команда.
4. Дополнительные баллы за время выполнения. Для каждого раздела определенные собственные дополнительные баллы за определенное время выполнения
5. Балл за креативность решения задачи. Часть задач требуют развернутого ответа для оценивания которого привлекается эксперт. Эксперт по итогу оценивания выставляет коэффициент креативности решения задачи (от 1 до 2).

Пусть динамически изменяемый балл равен $B_i$ , дополнительный балл за время выполнения задания равен $T_i$ , балл за креативность решения вычисляется как $\beta * C_i$, где $\beta$ - коэффициент креативности.
<br>Итоговая формула будет выглядеть следующим образом:
$$P = \sum_{i=1}^{N} (B_i + T_i + \beta C_i)$$

## Внедренная методика оценивания
Внедренная методика оценивания находится в пакете Olympiads, в сервисе OlympiadsService. <br>
### Метод для вычисления итогового балла:
```java
private void setFinalMarkForAnswers(List<Answer> answers, Olympiad olympiad) {
        int N = olympiad.getTeams().size();
        for (Task task : olympiad.getTasks()) {
            int Ns = 0;
            for (Answer answer : answers) {
                if (answer.getTask() == task) {
                    if (Objects.equals(answer.getAns(), task.getRightAnswer())) {
                        Ns++;
                    }
                }
            }

            double q = task.getMark() + task.getCategory().getMark();
            double B = q / (1 + (double) Ns / N);
            System.out.println(task.getId() + ": q:" + q + " B:" + B);
            for (Answer answer : answers) {
                if (answer.getTask() == task) {
                    answer.setFinalMark(B);
                }
            }
        }
    }
```

### Метод для сохранения и получения итоговых баллов:
```java
private List<Result> setResults(List<Answer> answers, Olympiad olympiad) {
        List<Result> results = new ArrayList<>(olympiad.getTeams().size());

        for (Team team : olympiad.getTeams()) {
            double score = 0;
            for (Answer answer : answers) {
                if (team == answer.getTeam()) {
                    if (Objects.equals(answer.getAns(), answer.getTask().getRightAnswer())) {
                        score += answer.getFinalMark();

                        if (answer.getIsCreativeSolution()) {
                            BigDecimal extraPoints = new BigDecimal(answer.getTask().getExtraPointsForCreativeSolution());

                            score += answer.getCreativeRate().multiply(extraPoints).doubleValue();
                        }

                        Duration duration = Duration.between(answer.getStartTime(), answer.getEndTime());
                        long minutes = duration.toMinutes();

                        if (minutes < answer.getTask().getCategory().getTime()) {
                            score += answer.getTask().getCategory().getExtraPoints();
                        }

                    }

                }
            }

            Result result = Result.builder()
                    .team(team)
                    .resultScore(BigDecimal.valueOf(score))
                    .olympiad(olympiad)
                    .build();

            results.add(result);
        }

        results.sort(Comparator.comparing(Result::getResultScore).reversed());
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setFinalPlace(i + 1);
        }

        resultRepo.saveAll(results);
        return results;
    }
```
