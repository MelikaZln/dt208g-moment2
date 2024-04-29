# dt208g-moment2
I den här uppgiften skulle vi göra en enkel webbapplikation som är en ToDO-list, i appen ska man kunna skriva sina task, man ska också kunna prioritera sina task (nivå ett, två eller tre) och fram för varje lagrad task så ska man se när den var lagrad samt en radera-knapp så att man ska kunna ta bort tasken. Inför varje task finns det en tick-box så man kan markera om man är klar med en task. Här ska jag beskriva hur jag löst uppgiften.

I början har jag en interface som heter Todo, den specificerar vilken typ varje objekt ska ha. I den har vi en task:string som är en uppgift som man ska göra, vi har en completed:boolean, som visar om uppgiften är klar eller inte, vi har prioritet som kan innehålla tre siffror alltså vi har bara tre alternativ till det, och en createdAt:string, som visar tiden tasken är skapad. 

Efter interface, har vi en class som hanterar todo-listan. I början har vi arrayen todos, som lagrar alla tasks. och sedan har vi constructor () {...} som instansierar klassen, initialiserar todos-arrayen och laddar todos från lokal lagring. 
