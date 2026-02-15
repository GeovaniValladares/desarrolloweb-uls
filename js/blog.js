// js/blog.js

const apiKey = '88b936db01ff467c8f3aa940bd23c53c';
const container = document.getElementById('news-container');
const loader = document.getElementById('loader');

// Imagen por defecto (Por si la noticia no trae imagen o falla al cargar)
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";

// --- DATOS DE RESPALDO (Con URLs reales para que funcionen los clics) ---
const backupNews = [
    { 
        title: "El auge de la IA Generativa en 2024", 
        category: "ia", 
        source: "TechCrunch", 
        url: "https://techcrunch.com/category/artificial-intelligence/", 
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" 
    },
    { 
        title: "Guía de Ciberseguridad para Estudiantes", 
        category: "seguridad", 
        source: "HackerNews", 
        url: "https://thehackernews.com/", 
        img: "https://images.unsplash.com/photo-1563206767-5b1d97289374?w=800" 
    },
    { 
        title: "Python 3.13: Novedades y Mejoras", 
        category: "dev", 
        source: "Python.org", 
        url: "https://www.python.org/blogs/", 
        img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800" 
    },
    { 
        title: "Google Gemini y el futuro del código", 
        category: "ia", 
        source: "Google Blog", 
        url: "https://blog.google/technology/ai/", 
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800" 
    },
    { 
        title: "Ataques Ransomware: Cómo protegerse", 
        category: "seguridad", 
        source: "CyberSec", 
        url: "https://www.cisa.gov/stopransomware", 
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" 
    },
    { 
        title: "Desarrollo Web Moderno: Adiós a las Cookies", 
        category: "web", 
        source: "Mozilla", 
        url: "https://developer.mozilla.org/es/", 
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
    },
    { 
        title: "Computación Cuántica explicada", 
        category: "hardware", 
        source: "Nature", 
        url: "https://www.nature.com/subjects/quantum-computing", 
        img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800" 
    },
    { 
        title: "Tendencias Frontend 2024", 
        category: "dev", 
        source: "CSS Tricks", 
        url: "https://css-tricks.com/", 
        img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800" 
    },
    { 
        title: "Deepfakes y Ética Digital", 
        category: "ia", 
        source: "Wired", 
        url: "https://www.wired.com/tag/artificial-intelligence/", 
        img: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800" 
    },
    { 
        title: "Linux: El núcleo del mundo server", 
        category: "dev", 
        source: "Linux Fdn", 
        url: "https://www.linuxfoundation.org/", 
        img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800" 
    }
];

// Función principal de filtrado
function filterNews(topic) {
    updateActiveButton(topic);
    getNews(topic);
}

// Actualizar botones visualmente
function updateActiveButton(topic) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Lógica simple para saber qué botón activar
    if (topic.includes('inteligencia')) {
        document.getElementById('btn-ai').classList.add('active');
    } else if (topic.includes('ciberseguridad')) {
        document.getElementById('btn-sec').classList.add('active');
    } else {
        document.getElementById('btn-all').classList.add('active');
    }
}

// Obtener noticias de la API
async function getNews(query) {
    container.innerHTML = '';
    loader.style.display = 'block';

    const url = `https://newsapi.org/v2/everything?q=${query}&language=es&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error") throw new Error(data.message);
        if (!data.articles || data.articles.length === 0) throw new Error("No hay artículos");

        renderNews(data.articles);

    } catch (error) {
        console.warn("⚠️ Usando respaldo (API falló o bloqueada):", error);
        renderBackupNews(query);
    } finally {
        loader.style.display = 'none';
    }
}

// Renderizar noticias API
function renderNews(articles) {
    // Filtramos artículos rotos ("Removed")
    const validArticles = articles.filter(art => art.title !== "[Removed]");

    // Tomamos hasta 12 noticias
    validArticles.slice(0, 12).forEach(article => {
        // Usamos la imagen de la API o la Default si viene null
        const imageUrl = article.urlToImage || DEFAULT_IMAGE;
        
        const card = createCard(
            article.title,
            article.description,
            imageUrl,
            article.url, // AQUÍ está el enlace real
            article.source.name,
            article.publishedAt
        );
        container.appendChild(card);
    });
}

// Renderizar noticias de Respaldo (Backup)
function renderBackupNews(query) {
    let filtered = backupNews;
    
    // Simulamos el filtro
    if (query.includes('inteligencia')) {
        filtered = backupNews.filter(n => n.category === 'ia');
    } else if (query.includes('ciberseguridad')) {
        filtered = backupNews.filter(n => n.category === 'seguridad');
    }
    
    filtered.forEach(news => {
        const card = createCard(
            news.title, 
            "Resumen: Esta es una noticia destacada seleccionada para propósitos académicos.", 
            news.img, 
            news.url, // Enlace real del backup
            news.source, 
            new Date().toISOString()
        );
        container.appendChild(card);
    });
}

// Función Creadora de Tarjetas (HTML)
function createCard(title, desc, img, link, source, dateStr) {
    const card = document.createElement('article');
    card.className = 'astro-card';
    
    const date = new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    // Corrección de imagen: agregamos onerror
    // Corrección de link: nos aseguramos que href tenga valor
    const safeLink = link ? link : "#"; 

    card.innerHTML = `
        <div style="overflow:hidden; border-radius: 8px 8px 0 0; position: relative;">
            <img src="${img}" 
                 alt="News Image" 
                 class="news-img" 
                 onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}';"
                 style="transition: transform 0.3s; width: 100%; display: block;">
        </div>
        <div style="padding-top: 1rem;">
            <span class="news-date">${date} • <span style="color:var(--secondary-glow)">${source}</span></span>
            <h3 style="font-size: 1.1rem; margin: 0.5rem 0; line-height: 1.4;">${title}</h3>
            <p style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 1rem;">
                ${desc ? desc.substring(0, 80) + '...' : 'Clic para leer los detalles completos de esta noticia tecnológica...'}
            </p>
            <a href="${safeLink}" target="_blank" class="btn-glow" style="width:100%; text-align:center; font-size: 0.8rem; padding: 0.6rem; display: block; text-decoration: none;">
                Leer Noticia &rarr;
            </a>
        </div>
    `;
    
    // Efecto Hover Zoom
    const imgEl = card.querySelector('img');
    card.addEventListener('mouseenter', () => imgEl.style.transform = 'scale(1.1)');
    card.addEventListener('mouseleave', () => imgEl.style.transform = 'scale(1.0)');

    return card;
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => filterNews('tecnologia'));
