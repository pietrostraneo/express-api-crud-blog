# Express API CRUD Blog

## Descrizione

Questo esercizio si concentra sulla creazione di due rotte per un blog usando Express.js:
- `POST /` per creare un nuovo post
- `DELETE /:slug` per eliminare un post esistente

## Funzionalità

### Rotte

#### [POST] /

- **Descrizione**: Questa rotta riceve i dati di un nuovo post e lo crea.
- **Formato dei dati**: `application/x-www-urlencoded`
- **Risposta**: 
  - In caso di richiesta HTML, restituisce un redirect.
  - In caso contrario, restituisce il JSON dell'elemento appena creato.

#### [DELETE] /:slug

- **Descrizione**: Questa rotta elimina un post specifico.
- **Middleware**: Controlla se il post esiste e restituisce un 404 se non viene trovato.
- **Risposta**:
  - In caso di richiesta HTML, restituisce un redirect.
  - In caso contrario, restituisce un testo con scritto "post eliminato".

### Middleware Globale

- Gestisce gli errori a livello globale.

## Controller

Tutte le funzioni delle rotte sono scritte nel controller dedicato.

## Test

Testare le rotte tramite Postman.

## Bonus

- Salvare l'array dei post in un file `.json`.
- Nella funzione `store`, permettere di passare i dati nel formato `multipart/form-data` tramite `multer`.
- Permettere l'upload dell'immagine principale del post.