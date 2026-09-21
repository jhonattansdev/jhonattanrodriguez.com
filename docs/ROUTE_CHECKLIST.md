# Checklist de rutas (verificación visual)

Tras cambios de UI, layout o metadatos, revisar manualmente. Copy del sitio sin raya em en puntuación.


| Ruta            | Qué comprobar                                      |
|-----------------|-----------------------------------------------------|
| `/`             | Home, hero, sección historia (#historia: foto + scrim, timeline con 7 hitos expandibles, fade antes de "Lo que hago"), tarjetas de servicios, CTA, tema claro/oscuro |
| `/growth`       | Sin hash → 3 cards cerradas (móvil y desktop); con #metaads/#presencia-rrss/#control-marca-rrss → card abierta; sesiones internas cerradas al abrir; hero/panel Meta Ads: «Agenda una llamada»; título «Entrenamiento Meta Ads» |
| `/filmmaker`    | Hero, problema, audiencia, planes expandibles, proceso |
| `/developer-ai` | Hero estilo terminal, stack, proyectos (galería de tarjetas con portada; al tocar abre una hoja modal, en móvil un drawer inferior con arrastre; captura arriba, listas "cómo funciona" y "tecnología" alineadas, ESC devuelve el foco a la tarjeta), services, sección filosofía (Kelly Johnson / Skunk Works) entre services y CTA, CTA |

Incluye navegación desde el navbar (4 rutas: Home, Dev, Growth, Film) y el botón "CV" del hero de Home, que hace scroll a #historia.

Enlaces sociales: editar solo `lib/cta-links.ts` → `SOCIAL_PROFILES`. Botón del hero por sección: Dev = GitHub, Growth = LinkedIn, Film = YouTube (`ROUTE_HERO_SOCIAL`). Instagram queda reservado para la futura sección de coach y por ahora solo aparece en el footer.
