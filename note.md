### Principales end points de la api 

| Acción                     | Endpoint                            |
| -------------------------- | ----------------------------------- |
| Películas populares        | `/movie/popular`                    |
| Películas en cartelera     | `/movie/now_playing`                |
| Más valoradas              | `/movie/top_rated`                  |
| Próximos estrenos          | `/movie/upcoming`                   |
| Detalles de una película   | `/movie/{movie_id}`                 |
| Buscar por título          | `/search/movie?query=nombre`        |
| Créditos (actores, equipo) | `/movie/{movie_id}/credits`         |
| Videos/tráilers            | `/movie/{movie_id}/videos`          |
| Recomendaciones            | `/movie/{movie_id}/recommendations` |
| Similares                  | `/movie/{movie_id}/similar`         |


| Acción                  | Endpoint                             |
| ----------------------- | ------------------------------------ |
| Series populares        | `/tv/popular`                        |
| En emisión actualmente  | `/tv/on_the_air`                     |
| Más valoradas           | `/tv/top_rated`                      |
| Buscar serie por título | `/search/tv?query=nombre`            |
| Detalles de serie       | `/tv/{tv_id}`                        |
| Episodios de temporada  | `/tv/{tv_id}/season/{season_number}` |
| Créditos                | `/tv/{tv_id}/credits`                |


| Acción                          | Endpoint                               |
| ------------------------------- | -------------------------------------- |
| Buscar persona (actor/director) | `/search/person?query=nombre`          |
| Detalles de persona             | `/person/{person_id}`                  |
| Créditos (pelis/series)         | `/person/{person_id}/combined_credits` |


| Acción                      | Endpoint            |
| --------------------------- | ------------------- |
| Listar géneros de películas | `/genre/movie/list` |
| Listar géneros de series    | `/genre/tv/list`    |


#### Repetar la estructura de carpetas echa por features
- cada feture puede tener, stores o store slices, hooks, componentes y sus propias rutas