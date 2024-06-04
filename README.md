# solution-factory
 stage opdracht
# Discussion Platform

Dit project is een discussieplatform waar gebruikers kunnen discussiëren over verschillende onderwerpen, reacties kunnen plaatsen op berichten en met elkaar in gesprek kunnen gaan via nested comments.

## Inhoudsopgave

- [Functies](#functies)
- [Technische Specificaties](#technische-specificaties)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)

## Functies

- Overzichtspagina met lijst van posts gesorteerd op tijdstip van plaatsing (nieuwste bovenaan).
- Infinite scroll voor het automatisch laden van nieuwe posts.
- Detailpagina voor elk post om de volledige inhoud en reacties te bekijken.
- Mogelijkheid voor gebruikers om reacties te plaatsen en te reageren op andere reacties (threaded reacties).
- Gebruik van Angular voor de front-end en ASP.NET Core voor de back-end.

## Technische Specificaties

### Front-end

- Angular framework
- Routing voor navigatie tussen de overzichtspagina en de detailpagina van een post
- Component-based architectuur

### Back-end

- ASP.NET Core API
- Entity Framework Core (EF Core) voor de database-interacties
- SQLite als database
- Paging en infinite scroll implementatie

## Installatie

### Vereisten

- Node.js en npm

### Stappen

1. **Clone het project:**

   ```bash
   git clone https://github.com/647825/solution-factory.git
   cd solution-factory
2. **Installeer de front-end afhankelijkheden:**  
    ```bash  
    cd DiscussionPlatform_frontend
    npm install
3. **Configureer de back-end:**

Open appsettings.json en stel je database-verbinding in:
    {
    "ConnectionStrings": {
        "DefaultConnection": "Data Source=DiscussionPlatform.db"
    },
    "Logging": {
        "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*"
    }
4. **Voer de database migraties uit:**
    ```bash  
    cd ..
    cd DiscussionPlatform_backend
    dotnet ef database update
5. **Start de back-end server:**
6. **Start de front-end applicatie:**
    ```bash  
    cd ..
    cd DiscussionPlatform_frontend
    ng serve

## Gebruik
* Navigeer naar http://localhost:4200 om de overzichtspagina te bekijken.
* Klik op "Create Post" om een nieuwe post te plaatsen.
* Klik op een post titel om de detailpagina te bekijken en reacties te plaatsen.

## API Endpoints
### Posts
        GET /api/posts - Haal een lijst van posts op met paginering.
        GET /api/posts/{id} - Haal een specifieke post op.
        POST /api/posts - Maak een nieuwe post aan.
##  Comments
        GET /api/comments/post/{postId} - Haal alle reacties op voor een specifieke post.
        POST /api/comments - Maak een nieuwe reactie aan.


    

