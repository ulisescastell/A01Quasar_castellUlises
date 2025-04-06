
# 📘 Manual Tècnic de l’Aplicació de Catàleg d’Aliments

## 1. Components de Quasar Utilitzats

### Què són?
Els components de **Quasar Framework** són peces reutilitzables d’interfície d’usuari (UI) basades en Vue.js.

### Components destacats

| Component    | Descripció                                       | Motiu de selecció                       |
|--------------|--------------------------------------------------|-----------------------------------------|
| `q-page`     | Contenidor principal de la vista                 | Organització clara del contingut        |
| `q-toolbar`  | Barra superior                                   | Navegació i context de la vista         |
| `q-btn`      | Botons per accions (afegir, esborrar, etc.)      | Interacció intuïtiva                    |
| `q-table`    | Taula de dades                                   | Llistat ordenat de productes            |
| `q-input`    | Camp de text per cercar                          | Filtres útils i precisos                |
| `q-select`   | Selector desplegable                             | Filtrat de dades                        |
| `q-dialog`   | Diàleg modal per formularis                      | Experiència d’usuari fluida             |
| `q-img`      | Visualització d’imatges                          | Estètica i claredat visual              |
| `q-banner`   | Indicació d’estats buits                         | Comunicació clara                       |
| `q-footer`   | Peu de pàgina                                    | Informació de crèdit                    |

---

## 2. Props, Events i Methods Utilitzats

### Props
- `v-model` – vinculació bidireccional amb l’estat
- `:rows`, `:columns` – dades per `q-table`
- `:props` – accés a les dades de fila dins `q-td`

### Events
- `@click`, `@clear`, `@row-click`
- `@save`, `@cancel` – en formularis personalitzats

### Methods destacats
- `resetItems()` – buidar i reobtenir dades
- `addItem(newItem)` – afegir nou producte
- `fetchAPIItems()` – carregar des de l’API
- `toggleFavorite(id)` – afegir o treure de favorits
- `showDetails()` – navegació al detall

---

## 3. Documentació de l’API

### URL Principal
`https://www.themealdb.com/api/json/v1/1/search.php?s=`

### Exemple GET
```js
axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
```

### Resposta típica
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strCategory": "Chicken",
      "strInstructions": "Combine the chicken...",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
    }
  ]
}
```

> L’API només permet consultes `GET`. Totes les modificacions es guarden a `localStorage`.

---

## 4. Flux de l'Aplicació

### Estructura de Vistes
- `/items` – Llistat principal de productes
- `/items/:id` – Detall d’un producte
- `/wishlist` – Llista de productes preferits

### Funcionament
1. Carrega inicial: es consulta l’API (si no hi ha dades locals)
2. Es poden cercar, filtrar i afegir productes
3. Marcar/desmarcar productes com a favorits (wishlist)
4. Navegació a la vista de detall
5. Dades guardades i persistides a `localStorage`

### LocalStorage Clau-Valor
- `productos` → llista actual de productes
- `wishlist` → array d’IDs de productes favorits
