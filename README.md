# TODO-kalender
## Andreas, Joacim, Mathias

---

### Övergripande - funktionalitet hemsidan
- Knappen nere i vänstra hörnet lägger till en ny todo.
- I kalendern så visas en siffra beroende på hur många todos som finns på ett datum. Om en todo sträcker sig över en längre period kommer den att lägga till 1 i varje ruta i kalendern som datumet sträcker sig. Om det är flera på samma datum ökar värdet med så många todo det finns på ett datum.
- Om man klickar på ett datum i kalendern får man ut alla todos (till vänster på hemsidan) för just det datumet. Om man klickar på samma datum igen (avmarkerar ett datum) så visas alla todos.
- I mobil-vyn försvinner kalendern och kvar är endast alla todos.
- Vi har funktionalitet för att ändra en todo till “done”. Var inget krav men den finns där och ändrar värdet på den bool som heter “isDone” (se todo.js). Finns möjligheter att utvidga funktionaliteten för denna i framtiden.

---

### Övergripande - kod
- Finns kommentarer i koden.
- main.js - Här all Javascript börjar att läsas in. Innehåller ett state-objekt. Kallar på init-funktioner i bland annat Calendar.js och todo.js. Funktionen reloadContent() används av vissa funktioner för att ladda om innehållet på sidan.
- Calendar.js har hand om allt Javascript för kalendern.
- todo.js gör allt med todo-containern (kolumnen till vänster på sidan).
- calendar-change-months.js har funktionalitet för att ändra en månad. Se raden med månad och år ovanför kalendern.
- welcome-clock.js har funktionalitet för att uppdatera tiden och dagens datum uppe i vänstra hörnet på sidan.
- Använder Bootstrap för mycket av grund-designen men gör viss CSS själva (se base.css). Bland annat används bootstrap för att få sidan responsiv, rita upp en modal (skapa och editera-rutan) och för att designa de flesta knappar.
- Kalendern är beroende av API:et (https://sholiday.faboul.se) för att fungera.
