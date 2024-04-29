# dt208g-moment2
I den här uppgiften skulle vi göra en enkel webbapplikation som är en ToDO-list, i appen ska man kunna skriva sina task, man ska också kunna prioritera sina task (nivå ett, två eller tre) och fram för varje lagrad task så ska man se när den var lagrad samt en radera-knapp så att man ska kunna ta bort tasken. Inför varje task finns det en tick-box så man kan markera om man är klar med en task. Här ska jag beskriva hur jag löst uppgiften.

I början har jag en interface som heter Todo, den specificerar vilken typ varje objekt ska ha. I den har vi en task:string som är en uppgift som man ska göra, vi har en completed:boolean, som visar om uppgiften är klar eller inte, vi har prioritet som kan innehålla tre siffror alltså vi har bara tre alternativ till det, och en createdAt:string, som visar tiden tasken är skapad. 

Efter interface, har vi en class som hanterar todo-listan. I början har vi arrayen todos, som lagrar alla tasks. och sedan har vi constructor () {...} som instansierar klassen, initialiserar todos-arrayen och laddar todos från lokal lagring.     addTodo(task: string, priority: number): boolean {...} lägger till en ny task till listan men först kontrollerar den att tasken ska inte vara tom (task.length === 0) och att det ska ha prioritet mellan 1 till 3. När en ny tasks läggs till så är det icke-completed by defualt (det låter rimligt man skriver inte en task som man redan har gjort) och så använder jag Date().toLocalString() som lägger till tid för när tasken är gjort. Sedan läggs tasken till todos arrayen och allt sparas i localStorage.
markTodoCompleted(todoIndex: number): void {... } här markerar man om man har gjort en task, baserad på dess index i listan och sedan sparas det till lokalStorage. Alltså markTodoCompleted(todoIndex) är en metod i TodoList- klassen som tar emot ett index för den todo som ska markeas avklarad, först kontrolleras indexet så att det ska finnas i vår lista (index ska inte vara todoIndex < 0 || todoIndex >= this.todos.length) om det inte finns i listan så ska inget hända, och om den finns med så får det värdet completed till true, så det betyder att det är avklarad och till sist sparas det till loclaStorage. 
getTodos(): Todo[] {...} Sedan retureras alla todo alltså arrayen todos. 
saveToLocalStorage(): void {...} todos sparas i loclaStorage här.
loadFromLocalStorage(): void {...} todos från localStorage laddas när sidan laddas. localStorage.getItem('todos'); den här delen hämtar data från loclastorage. if (savedTodos !== null) {...} här kontrolleras att listan inte är null alltså att det innehåller sparade data, om den innehåller data så måste det förvandlas från sträng till objekt för att det ska användas i appen , så jag har JSON.parse() och this.todos uppdaterar listan med sparade todos. 
removeTodo(index: number): void {...} som sagt ska vi kunna tabort en task om vi vill , med den metoden kan man göra det, först undersöks det om tasken är med i listan och sedan tas den bort baserad på dess index och till sist sparas det till localstorage. 

Sedan skapar jag instans av todolist-klassen genom new-nyckelordet, detta ger tillgäng till alla metoder och egenskaper i TodoList-klassen. const todoList = new TodoList();
Sedan har jag händelsehantering för formuläret 
const form = document.getElementById('todoForm') as HTMLFormElement;
form.addEventListener('submit', function(event) {...}); först hämtas referens till formuläret med id "todoForm" från DOM och tilldelar det till variabeln 'form', sedan läggs en händelselyssnare på formuläret för händelsen 'submit' så när användaren skickar fomruläret aktiveras denna funktion. 
vent.preventDefault() förhindrar standardbeteendet för formuläret, vilket är att skicka data till en server och ladda om sidan. 
sedan hämtas referenser till inmatningsfälten (taskInput) och prioritet (priorityInput) från DOM.
värden hämtas från inmatningsfält och eventuella extra mellan slag trimmas bort. 
todoList.addTodo() används för att försöka lägga till en ny todo med den angivna uppgiften och prioriteten. om det lyckas så renderas sidan på nytt och inmatningsfältet rensas annars visas felmeddelandet. 

Till slut finns det en funktion som skapar renderar todo-element på webbsidan. 
const todoListElement = document.getElementById('todoList') as HTMLUListElement: här hämtas referensen till det html-element där todo-listan kommer att renderas. det förväntas att elementen är 'ul' och det konverteras till HTMLUListElement,
todoListElement.innerHTML = '': med denna kod töms innehållet i todo-listan för att rensa den innan det börjar renderas om.  Det förhindrar att tidigare innehåll dupliceras när man uppdaterar listan. 
todoList.getTodos().forEach((todo, index) => { ... }): här används forEach() för att loopa igenom varje todo i todo-listan som returneras av todoList.getTodos(), till varje todo skapas ett li-element.
const listItem = document.createElement('li'): här skapas ett nytt li-element för varje todo i listan.
listItem.innerHTML = ... här byggs den sträng som representerar varje todo-element. jag har inkluderat en check box för att markera uppgiften är gjort eller ej, uppgiftens namn, prioritet och skapad datum samt radera-kanpp finns med. 
const checkbox = listItem.querySelector(#todo${index}) as HTMLInputElement | null: 

