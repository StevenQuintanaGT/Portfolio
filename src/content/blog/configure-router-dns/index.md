---
title: configure-router-dns
description: Guía paso a paso para usar los DNS de Cloudflare (1.1.1.1) en un router.
date: 2026-10-26
tags:
  - redes
  - dns
  - cloudflare
lang: es
draft: true
---
# Cómo cambiar los DNS de tu módem Huawei de fibra (aunque las opciones estén bloqueadas)

Si tienes internet por fibra óptica en Guatemala, es muy probable que tu proveedor te haya instalado un **módem Huawei** como este. Hace poco quise cambiar los DNS del mío y me encontré con que la opción estaba bloqueada. Después de investigar, encontré cómo hacerlo, y en esta guía te explico paso a paso cómo lograrlo, aunque no tengas experiencia en redes.

<!-- IMAGEN: foto del módem Huawei (vista general o puertos traseros) -->

Módem de fibra Huawei

---

## Primero: ¿qué es un DNS y por qué cambiarlo?

Cuando escribes `google.com` en el navegador, tu computadora no sabe dónde está ese sitio. Necesita preguntarle a un **servidor DNS**, que funciona como una **agenda de contactos de internet**: tú le das el nombre del sitio y él te devuelve su "número" (la dirección IP).

Por defecto, usas el DNS de tu proveedor de internet. Cambiarlo por uno público como **Cloudflare** tiene algunas ventajas:

- ✅ **Más confiable:** si el DNS de tu proveedor falla, puedes quedarte "sin internet" aunque la conexión funcione.
- ✅ **Más privacidad:** tu proveedor deja de ser quien responde tus consultas.
- ✅ **Muy rápido** y gratuito.

> **¿Me va a dar más velocidad de descarga o menos lag en juegos?** No. El DNS solo ayuda a _encontrar_ los sitios; no cambia tu velocidad de internet ni tu ping dentro de un juego.

---

## Lo que vas a necesitar

- Una **computadora** conectada a tu WiFi o por cable al módem.
- El **usuario y contraseña** del módem (vienen en la etiqueta que tiene debajo).
- 15 minutos.

> ⚠️ **Antes de empezar:** cambia solo lo que se indica en esta guía. Si modificas otras opciones podrías quedarte sin internet. Y **no presiones el botón de Reset** del módem: borra toda la configuración que dejó tu proveedor.

---

## Paso 1: Entrar al panel del módem

1. Abre tu navegador (Chrome, Edge, Firefox).
2. En la barra de direcciones escribe: `192.168.1.1` y presiona Enter.
3. Ingresa el **usuario y contraseña** de la etiqueta del módem.

<!-- IMAGEN: etiqueta del módem (tapar contraseñas y números de serie) -->

Etiqueta del módem con usuario y contraseña

<!-- IMAGEN: pantalla de inicio de sesión del panel -->

Pantalla de inicio de sesión

> Si el navegador dice "No es seguro", es normal: es la página interna de tu módem.

---

## Paso 2: Ir a la configuración de DNS

1. Entra a **Advanced Configuration** (Configuración avanzada).
2. En el menú de la izquierda, abre **LAN**.
3. Haz clic en **DHCP Server**.

Vas a ver los campos **Primary DNS Server** y **Secondary DNS Server**. Lo más probable es que aparezcan **en gris** y no te dejen escribir. 😤

<!-- IMAGEN: pantalla DHCP Server con los campos de DNS en gris -->

Campos de DNS bloqueados

Tu proveedor bloquea esa opción en la cuenta de usuario normal. Pero ese bloqueo **solo está en la página**, así que podemos quitarlo.

---

## Paso 3: Desbloquear los campos

1. Haz **clic derecho** sobre el campo **Primary DNS Server** y elige **Inspeccionar**.
2. Se abrirá un panel con código. La línea del campo quedará resaltada y verás algo como `disabled` o `disabled="disabled"`.
3. Haz **doble clic** sobre la palabra `disabled`, bórrala y presiona Enter.
4. Haz lo mismo con el campo **Secondary DNS Server**.

<!-- IMAGEN: panel de inspeccionar mostrando la palabra disabled resaltada -->

Quitar la palabra disabled en Inspeccionar

¡Listo! Ahora los campos ya te dejan escribir.

> **¿Esto es seguro?** Sí. Solo estás cambiando cómo se ve la página en _tu_ navegador; no estás modificando el módem por dentro. Si cierras la página sin guardar, todo queda igual.

---

## Paso 4: Escribir los nuevos DNS

En los campos que acabas de desbloquear escribe:

|Campo|Valor|
|---|---|
|**Primary DNS Server**|`1.1.1.1`|
|**Secondary DNS Server**|`9.9.9.9`|

Luego haz clic en **Apply**.

<!-- IMAGEN: campos de DNS con los valores escritos -->

DNS configurados

> 💡 **¿Por qué dos DNS de empresas distintas?** `1.1.1.1` es de **Cloudflare** y `9.9.9.9` es de **Quad9**. Si uno de los dos llega a fallar, el otro sigue funcionando. Si prefieres usar solo Cloudflare, en el secundario puedes poner `1.0.0.1`.

Recarga la página: si los números siguen ahí, **el cambio se guardó**. 🎉

---

## Paso 5: No te olvides de IPv6 (el paso que casi todos se saltan)

Muchos módems de fibra ya usan **IPv6**, la versión nueva de las direcciones de internet. Funciona en paralelo con la versión de siempre (IPv4), y **tiene sus propios DNS**. Si solo cambias los del paso anterior, una parte de tu navegación seguirá usando el DNS de tu proveedor.

1. En el mismo menú **LAN**, entra a **DHCPv6 Server**.
2. Busca la opción **DNS Source on the LAN Side**. Seguramente dice **DNS agent**.
3. Cámbiala a la opción **Static** (o "estático").
4. Aparecerán campos para los DNS. Escribe:

|Campo|Valor|
|---|---|
|**DNS primario**|`2606:4700:4700::1111`|
|**DNS secundario**|`2620:fe::fe`|

5. Haz clic en **Apply**.

<!-- IMAGEN: pantalla DHCPv6 Server con la opción DNS Source -->

Configurar DNS de IPv6

> Si esa opción también está en gris, usa el mismo truco de **Inspeccionar** del Paso 3.

> ⚠️ En esta pantalla **solo cambia la parte de DNS**. Las demás opciones son las que hacen funcionar IPv6.

---

## Paso 6: Comprobar que funciona

1. **Desconecta y vuelve a conectar** el WiFi en tu computadora o celular, para que tome los nuevos DNS.
2. Entra a 👉 **[1.1.1.1/help](https://1.1.1.1/help)**
3. Si dice **"Connected to 1.1.1.1: Yes"**, todo quedó bien.

<!-- IMAGEN: resultado de 1.1.1.1/help -->

Comprobación en 1.1.1.1/help

Desde ahora, **todos los dispositivos de tu casa** usan los nuevos DNS automáticamente, sin configurar nada en cada uno.

> Si tu proveedor actualiza o reinicia el módem de forma remota, la configuración podría regresar a como estaba. Si notas que pasó, solo repite esta guía.

---

## Extra: protege tu celular también fuera de casa

Lo que configuraste en el módem solo funciona en tu casa. Si usas WiFi públicos (cafés, hoteles, universidad) o datos móviles, puedes activar el **DNS privado** en tu celular Android:

1. **Ajustes → Conexiones → Más opciones de conexión → DNS privado.**
2. Elige **Nombre de host del proveedor de DNS privado**.
3. Escribe: `one.one.one.one` y guarda.

<!-- IMAGEN: pantalla de DNS privado en Android -->

DNS privado en Android

Este además **cifra** tus consultas, así que nadie en esa red puede ver qué sitios visitas por medio del DNS.

> Si en algún WiFi público no te aparece la página para iniciar sesión, desactiva el DNS privado un momento, inicia sesión y vuelve a activarlo.