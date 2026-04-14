---
name: i18n
description: |
  Agrega, actualiza o valida claves de traducción en los 4 idiomas del sitio (EN, ES, RU, AR).
  Garantiza que todos los messages/*.json tengan las mismas claves y traducciones de calidad.
  Usar cuando se agreguen claves nuevas, falten traducciones, se mencione "i18n", "traducir",
  "translation", "missing key", o cuando se vea un warning de next-intl en la consola.

when_to_use: |
  Activar cada vez que se agrega texto al sitio (las claves nuevas deben sincronizarse a
  los 4 idiomas inmediatamente). También cuando se valida la consistencia entre archivos.
  Usar PROACTIVAMENTE después de cualquier implementación de spec que agregue claves nuevas.

allowed-tools:
  - Read
  - Edit
  - Write
  - Bash(node *)
  - Bash(jq *)
  - Bash(diff *)

argument-hint: "[validate | sync | translate <key>]"

version: "1.0.0"
---

# i18n Skill

Garantiza que las traducciones EN/ES/RU/AR estén sincronizadas y completas.

## Antes de traducir nada

Leer SIEMPRE en este orden:
1. `docs/brand/voice.md` — voz de marca oficial del brandbook
2. `docs/brand/assets/Brandbook_Argentina_Passport.pdf` — fuente original
3. Este SKILL.md

La voz NO es negociable. Cita textual del brandbook:

> Argentina Passport habla con la autoridad de quien no necesita convencer, solo informar.
> Cuando comunica en otros idiomas mantiene el mismo registro, **nunca se vuelve más casual
> ni más rígida por el idioma**.

**REGLA NO NEGOCIABLE:** sin signos de exclamación. Ninguno. En ningún idioma. Ni siquiera
en CTAs. El brandbook es explícito sobre esto.

## Comandos del skill

### `validate`
Verifica que los 4 archivos `messages/*.json` tengan exactamente las mismas claves.

### `sync`
Toma `messages/en.json` como fuente de verdad. Para cualquier clave que falte en
los otros 3 archivos, agregarla con un placeholder visible (`[ES] valor en inglés`)
para que el traductor humano la identifique.

### `translate <key>`
Traduce una clave específica del inglés a los otros 3 idiomas.

## Procedimiento

### 1. Cargar el archivo fuente (EN)

```bash
cat messages/en.json | jq '.'
```

Inglés es el idioma base. Toda nueva clave nace en EN y se propaga.

### 2. Comparar estructuras

Usar `jq` para extraer paths de claves:

```bash
jq -r 'paths(scalars) | join(".")' messages/en.json | sort > /tmp/keys-en.txt
jq -r 'paths(scalars) | join(".")' messages/ar.json | sort > /tmp/keys-ar.txt
diff /tmp/keys-en.txt /tmp/keys-ar.txt
```

Cualquier diff = inconsistencia que hay que resolver.

### 3. Reglas de traducción por idioma

#### Español (es)
- Audiencia: inversores latinoamericanos.
- Tono: formal, profesional, sin tutear ("usted", no "tú").
- "you" → "usted".
- "investment" → "inversión".
- Mantener términos legales en su forma estándar argentina (ej: "Ministerio de Economía", no "Tesorería").

#### Ruso (ru)
- Audiencia: inversores rusos / hablantes nativos.
- Tono: formal ("Вы" capitalizado).
- Términos legales: usar transliteración común para nombres propios argentinos.
- Cifras y símbolos de moneda: mantener formato latino ($500K, no "500 тыс. долл.").

#### Árabe (ar)
- Audiencia: inversores de Medio Oriente.
- Tono: formal (Modern Standard Arabic / Fusha).
- **Dirección RTL** — el texto debe estar bien escrito, los componentes ya manejan la dirección.
- Cifras: usar números arábigos occidentales (1, 2, 3) que son los estándar de negocios — NO usar números arábigos orientales (٠١٢٣).
- Símbolos de moneda: mantener `$` antes del número.

### 4. Términos críticos — glosario fijo

Estos términos NO deben variar entre traducciones (consistencia de marca):

| EN | ES | RU | AR |
|----|----|----|----|
| Argentina Passport | Argentina Passport | Argentina Passport | Argentina Passport |
| citizenship by investment | ciudadanía por inversión | гражданство за инвестиции | الجنسية عن طريق الاستثمار |
| Ministry of Economy | Ministerio de Economía | Министерство экономики | وزارة الاقتصاد |
| white-glove | atención premium / servicio integral | сервис премиум-класса | خدمة استثنائية |
| Designed by Synera | Diseñado por Synera | Дизайн: Synera | تصميم Synera |

Nombres propios (Argentina, Mercosur, Patagonia, Buenos Aires, Teatro Colón) NO se traducen.

### 5. Aplicar y verificar

Después de actualizar los JSONs:

```bash
# Validación final
node -e "
  const en = require('./messages/en.json');
  const langs = ['es', 'ru', 'ar'];
  const flatten = (o, p='') => Object.entries(o).flatMap(([k,v]) =>
    typeof v === 'object' ? flatten(v, p+k+'.') : [p+k]);
  const enKeys = new Set(flatten(en));
  langs.forEach(l => {
    const data = require('./messages/'+l+'.json');
    const keys = new Set(flatten(data));
    const missing = [...enKeys].filter(k => !keys.has(k));
    const extra = [...keys].filter(k => !enKeys.has(k));
    console.log(l + ': missing=' + missing.length + ' extra=' + extra.length);
    if (missing.length) console.log('  missing:', missing);
    if (extra.length) console.log('  extra:', extra);
  });
"
```

Resultado esperado:
```
es: missing=0 extra=0
ru: missing=0 extra=0
ar: missing=0 extra=0
```

Si hay claves missing/extra, no terminar hasta resolver.

## Anti-patrones

- ❌ Traducir nombres propios.
- ❌ Cambiar el orden de las claves entre archivos.
- ❌ Inventar traducciones para términos legales sin verificar.
- ❌ Dejar claves marcadas con `[TODO]` o `[ES]` en archivos finales.
- ❌ Cambiar `.` por `,` en cifras (mantener formato internacional).

## Archivos de mensajes — estructura

```
messages/
├── en.json    ← fuente de verdad
├── es.json
├── ru.json
└── ar.json
```

Estado actual de claves:
!`for f in messages/*.json; do echo "=== $f ==="; jq -r 'paths(scalars) | join(".")' "$f" 2>/dev/null | wc -l; done`
