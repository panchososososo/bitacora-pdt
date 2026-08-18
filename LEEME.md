# Bitácora PDT — instalación en PC y celular con sincronización

Cuatro archivos: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.
Van todos juntos en la misma carpeta, sin subcarpetas.

---

## PARTE 1 — Publicar la app en GitHub Pages (una vez, ~10 min)

Se necesita porque un archivo suelto en el disco no se puede instalar como app en el celular.
El repositorio puede ser **privado**; Pages igual sirve la página, y en todo caso aquí no hay datos: solo el programa.

1. Entra a github.com → **New repository**.
2. Nombre: `bitacora-pdt`. Marca **Add a README file**. Crea el repo.
3. Dentro del repo: **Add file → Upload files**. Arrastra los 5 archivos. **Commit changes**.
4. Ve a **Settings → Pages** (menú lateral).
5. En *Source* elige **Deploy from a branch**; en *Branch* elige `main` y carpeta `/ (root)`. **Save**.
6. Espera 1–2 minutos y recarga esa página: aparece la URL, del estilo
   `https://TU-USUARIO.github.io/bitacora-pdt/`
7. Ábrela. Debería cargar la bitácora. **Guarda esa URL**: es la que usarás en ambos dispositivos.

---

## PARTE 2 — Crear el token de GitHub (una vez, ~3 min)

Es lo que le permite a la app leer y escribir tus datos en un Gist privado.

1. github.com → foto de perfil (arriba a la derecha) → **Settings**.
2. Abajo del todo en el menú lateral: **Developer settings**.
3. **Personal access tokens → Fine-grained tokens → Generate new token**.
4. Rellena:
   - *Token name*: `bitacora-pdt`
   - *Expiration*: elige el plazo más largo que te ofrezca (cuando venza, la app avisará con un error de sincronización y solo tendrás que generar otro y pegarlo).
   - *Repository access*: **Public Repositories** basta; no toca repos.
   - *Permissions → Account permissions* → busca **Gists** → ponlo en **Read and write**.
     Es el único permiso que necesita. No le des ninguno más.
5. **Generate token** y **cópialo ahora** (`github_pat_...`): GitHub no lo vuelve a mostrar.
   Pégalo en una nota temporal, lo necesitas dos veces (PC y celular).

---

## PARTE 3 — Configurar el PC

1. Abre la URL de Pages en Chrome o Edge.
2. Barra superior → botón **Configurar sync**.
3. Pega el **token**. En el segundo cuadro (ID del Gist) **deja vacío y acepta**.
4. La app crea un Gist privado y te muestra su **ID**. **Anótalo**: lo necesitas para el celular.
5. Instálala como app: en la barra de direcciones aparece un ícono de instalar (o menú ⋮ → **Instalar app**).
   Queda con ícono propio en el escritorio y ventana sin pestañas.
6. Opcional pero recomendado: pestaña **Datos** → *Elegir carpeta de respaldo*, para tener además una
   copia en un archivo de tu disco, independiente de GitHub.

## PARTE 4 — Configurar el celular

1. Abre la misma URL en el navegador del teléfono.
2. Instálala:
   - **Android (Chrome):** menú ⋮ → *Instalar aplicación* / *Añadir a pantalla principal*.
   - **iPhone (Safari, obligatoriamente Safari):** botón Compartir → *Añadir a pantalla de inicio*.
3. Ábrela desde el ícono nuevo → **Configurar sync**.
4. Pega el **mismo token** y esta vez sí pega el **ID del Gist** que anotaste.
5. Debería decir *Sincronizado*. Listo: los dos dispositivos comparten datos.

Cuando termines, borra la nota donde guardaste el token.

---

## Cómo se comporta día a día

- **En el lab, sin wifi:** funciona igual. Registras y guardas normal; abajo dirá
  *"Sin conexión — los cambios se suben al recuperar red"*.
- **Al recuperar señal:** sube sola. También sincroniza al abrir la app, cada 5 minutos,
  y cada vez que guardas un día.
- **Si editas el mismo día en los dos equipos estando offline:** al reconectar gana la versión
  guardada más tarde. Días distintos nunca chocan.
- **Si borras un día:** queda marcado como borrado y no reaparece desde el otro dispositivo.
  Pero si después vuelves a llenar esa misma fecha, el registro nuevo sí se conserva.

## Actualizar la app más adelante

Sube el archivo nuevo al repo y, en `sw.js`, cambia `bitacora-pdt-v1` por `v2` (y así sucesivamente).
Sin ese cambio los dispositivos siguen usando la versión guardada en caché.
Tus datos no se tocan al actualizar.

## Notas de seguridad

- El token vive solo en el almacenamiento local de cada dispositivo, nunca se publica en el repo.
- Aun así, un token en el navegador es un token expuesto si alguien tiene acceso físico al equipo
  desbloqueado. Por eso solo tiene permiso de Gists: en el peor caso alcanza para leer y escribir
  tus gists, no para tocar tus repositorios ni tu cuenta.
- Si pierdes el teléfono o el PC: entra a GitHub → Developer settings → borra ese token.
  Se corta el acceso al instante; generas uno nuevo y lo pegas en el dispositivo que conservas.
- El Gist es privado (no aparece en tu perfil ni en búsquedas), pero "privado" en Gists significa
  *no listado*: quien tenga la URL exacta puede verlo. Para datos de laboratorio de rutina es
  razonable; no metas ahí nada que no pueda salir del lab.
