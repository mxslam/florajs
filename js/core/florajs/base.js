const themeColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--main-color'
);
document
  .querySelector('meta[name="theme-color"]')
  .setAttribute('content', themeColor);

document.addEventListener('DOMContentLoaded', () => {
  Init();
});
function Init() {}

async function ImportComponent(name, dir = 'body', prepend = false) {
  try {
    let filePath = `/components/${name}/${name}.html`;
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erreur: Impossible de charger le fichier ${filePath}`);
    }
    const htmlContent = await response.text();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    const template = tempContainer.querySelector('template');
    const style = tempContainer.querySelector('style');
    const script = tempContainer.querySelector('script');
    if (template) {
      const directory = document.querySelector(dir);
      if (directory) {
        if (prepend) {
          directory.insertBefore(
            template.content.cloneNode(true),
            directory.firstChild
          );
        } else {
          directory.appendChild(template.content.cloneNode(true));
        }
      }
    }
    if (style) {
      document.head.appendChild(style.cloneNode(true));
    }
    if (script) {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    }
  } catch (error) {
    console.error("Erreur lors de l'import du fichier HTML :", error);
  }
}

async function ImportPage(
  filePath,
  targetElement = 'body',
  replaceContent = true
) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Erreur: Impossible de charger le fichier ${filePath}`);
    }
    const htmlContent = await response.text();

    // Créer un nouveau parser DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Gestion des éléments <link> (seulement les feuilles de style)
    const links = doc.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      document.head.appendChild(link.cloneNode(true));
    });

    // Gestion des éléments <style>
    const styles = doc.querySelectorAll('style');
    styles.forEach((style) => {
      document.head.appendChild(style.cloneNode(true));
    });

    // Gestion du contenu du <body>
    const bodyContent = doc.body;
    if (bodyContent) {
      const target = document.querySelector(targetElement);
      if (target) {
        if (replaceContent) {
          target.innerHTML = ''; // Vider le contenu existant si nécessaire
        }
        [...bodyContent.children].forEach((child) => {
          target.appendChild(child.cloneNode(true));
        });
      }
    }

    // Gestion des éléments <script>
    const scripts = doc.querySelectorAll('script');
    for (const script of scripts) {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = false; // Assurer l'ordre d'exécution
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    }
  } catch (error) {
    console.error("Erreur lors de l'import du fichier HTML :", error);
  }
}
