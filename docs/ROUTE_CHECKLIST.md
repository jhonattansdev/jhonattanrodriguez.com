# Checklist de rutas (verificación visual)

Tras cambios de UI, layout o metadatos, revisar manualmente. Copy del sitio sin raya em en puntuación.


| Ruta            | Qué comprobar                                      |
|-----------------|-----------------------------------------------------|
| `/`             | Home, hero, sección historia (#historia: foto + scrim, timeline con 6 hitos expandibles y línea que se dibuja con el scroll, fade antes de "Lo que hago"), tarjetas de servicios, CTA, tema claro/oscuro |
| `/growth`       | Hero, imagen de sesiones en marco de terminal y selector de servicios (mini-cards con nombre, precio y duración; un solo panel de detalle debajo; en móvil la fila se desliza con dedo, rueda y trackpad; flechas, Inicio y Fin cambian de servicio; "Siguiente servicio" al final del panel). Sin hash → Meta Ads seleccionado; #metaads/#presencia-rrss/#control-marca-rrss → ese servicio y scroll al selector; "Ver ofertas" (#servicios) → selector; sesiones internas cerradas al abrir; hero/panel Meta Ads: «Agenda una llamada»; título «Entrenamiento Meta Ads» |
| `/filmmaker`    | Hero, problema, planes (en móvil y tablet carrusel en bucle infinito que arranca centrado en el plan destacado, con dedo, mouse, rueda horizontal y teclado; desde `lg` cuadrícula de 3), proceso, portafolio de videos (lightbox), metodología, resultados, CTA |
| `/developer-ai` | Hero estilo terminal, stack, proyectos (galería de tarjetas con portada; al tocar abre una hoja modal, en móvil un drawer inferior con arrastre; captura arriba, listas "cómo funciona" y "tecnología" alineadas, ESC devuelve el foco a la tarjeta), imagen de eventos en marco de terminal entre proyectos y services, services, sección filosofía (Kelly Johnson / Skunk Works) entre services y CTA, CTA |

Animaciones (`components/shared/reveal.tsx`, `typed-text.tsx`, `app/template.tsx`): al recorrer cada ruta no debe quedar nada oculto (anclas y recarga a media página incluidas), las etiquetas de terminal se escriben una vez, la línea de tiempo de Home se dibuja con el scroll, y con "reducir movimiento" todo aparece sin animar. Un `Reveal` nunca envuelve a un elemento con `backdrop-filter` (la clase va en ese mismo elemento) ni a las slides de Embla.

Incluye navegación desde el navbar (4 rutas: Home, Dev, Growth, Film) y el botón "CV" del hero de Home, que hace scroll a #historia.

Enlaces sociales: editar solo `lib/cta-links.ts` → `SOCIAL_PROFILES`. Botón del hero por sección: Dev = GitHub, Growth = LinkedIn, Film = YouTube (`ROUTE_HERO_SOCIAL`). Instagram queda reservado para la futura sección de coach y por ahora solo aparece en el footer.
