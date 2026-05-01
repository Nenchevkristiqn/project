/**
 * AUTODEX - COMPLETE SYSTEM SCRIPT (2026)
 * Всички функционалности в един файл.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ГЛОБАЛНИ ЕЛЕМЕНТИ И НАВИГАЦИЯ ---
    const navAuth = document.querySelector('.nav-auth');
    const loggedUser = localStorage.getItem('user_name');
    const isCataloguePage = window.location.href.includes('catalogue.html');

    if (isCataloguePage && !loggedUser) {
        window.location.href = 'auth.html';
        return;
    }

    const cars = [
        { marque: 'ferrari', displayMarque: 'Ferrari', model: '488 GTB', year: 2023, category: 'sports', hp: 661, zero60: '3s', topSpeed: 205, image: 'img/ferrari.jpg' },
        { marque: 'porsche', displayMarque: 'Porsche', model: '911 GT3', year: 2024, category: 'sports', hp: 502, zero60: '3.2s', topSpeed: 197, image: 'img/porsche.jpg' },
        { marque: 'honda', displayMarque: 'Honda', model: 'Civic Type R', year: 2024, category: 'sedans', hp: 315, zero60: '5s', topSpeed: 169, image: 'img/honda.jpg' },
        { marque: 'bmw', displayMarque: 'BMW', model: 'X5 M', year: 2025, category: 'suv', hp: 600, zero60: '3.8s', topSpeed: 155, image: 'img/bmw.jpg' },
        { marque: 'mercedes', displayMarque: 'Mercedes', model: 'GLC 63', year: 2024, category: 'suv', hp: 503, zero60: '3.7s', topSpeed: 180, image: 'img/mercedes.avif' },
        { marque: 'audi', displayMarque: 'Audi', model: 'A6', year: 2023, category: 'sedans', hp: 335, zero60: '5.1s', topSpeed: 155, image: 'img/audi.avif' },
        { marque: 'volkswagen', displayMarque: 'Volkswagen', model: 'Golf R', year: 2022, category: 'sedans', hp: 315, zero60: '4.7s', topSpeed: 168, image: 'img/golf.jpg' },
        { marque: 'ford', displayMarque: 'Ford', model: 'Mustang GT', year: 2023, category: 'sports', hp: 450, zero60: '4.2s', topSpeed: 155, image: 'img/ford.jpg' },
        { marque: 'toyota', displayMarque: 'Toyota', model: 'Land Cruiser', year: 2025, category: 'suv', hp: 409, zero60: '6.5s', topSpeed: 137, image: 'img/toyota.jpg' },
        { marque: 'lamborghini', displayMarque: 'Lamborghini', model: 'Huracan Evo', year: 2025, category: 'sports', hp: 630, zero60: '2.9s', topSpeed: 202, image: 'img/lamborghini.jpg' },
        { marque: 'nissan', displayMarque: 'Nissan', model: 'GT-R', year: 2024, category: 'sports', hp: 565, zero60: '2.9s', topSpeed: 196, image: 'img/nissan.avif' },
        { marque: 'chevrolet', displayMarque: 'Chevrolet', model: 'Camaro SS', year: 2022, category: 'sports', hp: 455, zero60: '4.0s', topSpeed: 165, image: 'img/chevrolet.jpg' }
    ];

    const carContainer = document.getElementById('car-container');

    const renderCarCards = (carList) => {
        if (!carContainer) return;
        carContainer.innerHTML = carList.map(car => `
            <article class="car-card">
                <div class="car-image"><img src="${car.image}" alt="${car.displayMarque} ${car.model}"></div>
                <div class="car-info">
                    <p class="car-meta">${car.displayMarque} • ${car.year}</p>
                    <h3>${car.model}</h3>
                    <div class="car-specs">
                        <div class="spec"><span>HP</span><strong>${car.hp}</strong></div>
                        <div class="spec"><span>0-60</span><strong>${car.zero60}</strong></div>
                        <div class="spec"><span>TOP</span><strong>${car.topSpeed}</strong></div>
                    </div>
                </div>
            </article>
        `).join('');
    };

    const getYearMatches = (carYear, filterYear) => {
        if (filterYear === 'all') return true;
        if (filterYear === '2026') return carYear >= 2026;
        if (filterYear === '2020') return carYear >= 2020;
        if (filterYear === '2016') return carYear >= 2016;
        return true;
    };

    const renderAllCars = () => {
        if (carContainer) renderCarCards(cars);
    };

    renderAllCars();

    // Функция за проверка на сесията и обновяване на хедъра
    const updateNavigation = () => {
        const loggedUser = localStorage.getItem('user_name');
        const catalogueLink = document.querySelector('.nav-menu a[href="catalogue.html"]');
        
        // Show/hide catalogue link based on login status
        if (catalogueLink) {
            catalogueLink.style.display = loggedUser ? 'inline-block' : 'none';
        }
        
        if (loggedUser && navAuth) {
            // Показва името и бутон за изход, ако имаме записан акаунт
            navAuth.innerHTML = `
                <span style="font-size:10px; font-weight:800; letter-spacing:1px; color:#a67c52;">
                    HELLO, ${loggedUser.toUpperCase()}
                </span> 
                <button id="logout-btn" class="btn-dark" style="margin-left:20px; padding: 8px 15px; cursor:pointer;">
                    LOGOUT
                </button>
            `;

            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('user_name');
                updateNavigation(); // Refresh nav after logout
                window.location.href = 'index.html';
            });
        }
    };

    updateNavigation(); // Извиква се веднага при зареждане

    // --- 2. NOTIFICATION AND BUTTON HANDLERS ---
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: #0e0e0e;
            color: white;
            padding: 16px 24px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerText = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);

    // Handle catalogue and view all buttons
    const catalogueBtn = document.querySelector('.btn-dark-link');
    const viewAllBtn = document.querySelector('.view-all');
    
    if (catalogueBtn) {
        catalogueBtn.addEventListener('click', (e) => {
            if (!loggedUser) {
                e.preventDefault();
                showNotification('ВЛЕЗ ИЛИ СЕ РЕГИСТРИРАЙ, ЗА ДА ВИДИШ КАТАЛОГА');
                return false;
            }
        });
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            if (!loggedUser) {
                e.preventDefault();
                showNotification('ВЛЕЗ ИЛИ СЕ РЕГИСТРИРАЙ, ЗА ДА ВИДИШ КАТАЛОГА');
                return false;
            }
        });
    }

    // --- 2. AUTH ЛОГИКА (РЕГИСТРАЦИЯ И ЛОГИН) ---
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        const toggleBtn = document.getElementById('toggle-auth');
        const authTitle = document.getElementById('auth-title');
        const nameGroup = document.getElementById('name-group');
        const submitBtn = document.getElementById('submit-btn');
        const footerText = document.getElementById('footer-text');
        
        // Check if user came from login button via URL parameter
        const params = new URLSearchParams(window.location.search);
        let isLoginMode = params.get('mode') === 'login'; // Start in login mode if ?mode=login

        // Функция за инициализиране на формата
        const updateFormUI = () => {
            if (isLoginMode) {
                authTitle.innerText = "Вход";
                if (nameGroup) nameGroup.style.display = "none";
                submitBtn.innerText = "ВХОД";
                footerText.innerHTML = 'НЯМАТЕ ПРОФИЛ? <a href="#" id="toggle-link">НОВА РЕГИСТРАЦИЯ &rarr;</a>';
            } else {
                authTitle.innerText = "Регистрация";
                if (nameGroup) nameGroup.style.display = "block";
                submitBtn.innerText = "РЕГИСТРАЦИЯ";
                footerText.innerHTML = 'ВЕЧЕ ИМАТЕ ПРОФИЛ? <a href="#" id="toggle-link">ВХОД &rarr;</a>';
            }
            // Закачаме събитието на новия динамичен линк
            const link = document.getElementById('toggle-link');
            if (link) link.onclick = toggleUI;
        };

        // Функция за превключване на интерфейса
        const toggleUI = (e) => {
            if (e) e.preventDefault();
            isLoginMode = !isLoginMode;
            updateFormUI();
        };

        // Initialize the form based on starting mode
        updateFormUI();

        if (toggleBtn) toggleBtn.onclick = toggleUI;

        // Обработка на изпращането на формата
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isLoginMode) {
                // СЛУЧАЙ РЕГИСТРАЦИЯ: Автоматично създава акаунт и влиза
                const nameInput = authForm.querySelector('input[name="name"]');
                if (nameInput && nameInput.value.trim() !== "") {
                    localStorage.setItem('user_name', nameInput.value.trim());
                    // Влизаш веднага в акаунта и те пренасочва
                    window.location.href = 'index.html';
                } else {
                    alert("Please enter your name.");
                }
            } else {
                // СЛУЧАЙ ЛОГИН: Проверява дали има такъв акаунт (записано име)
                const savedUser = localStorage.getItem('user_name');
                if (savedUser) {
                    // Ако акаунтът съществува, те пуска вътре
                    window.location.href = 'index.html';
                } else {
                    alert("Акаунтът не е намерен. Моля, регистрирайте се първо.");
                    toggleUI(); // Връща го на регистрация
                }
            }
        });
    }

    // --- 3. КАТАЛОГ: ФИЛТРИ И ТЪРСЕНЕ ---
    const mFilter = document.getElementById('marque-filter');
    const cFilter = document.getElementById('category-filter');
    const yFilter = document.getElementById('year-filter');
    const sInput = document.getElementById('search-input');
    const resCount = document.getElementById('results-count');

    const applyFilters = () => {
        if (!resCount) return;

        const valM = mFilter ? mFilter.value.toLowerCase() : 'all';
        const valC = cFilter ? cFilter.value.toLowerCase() : 'all';
        const valY = yFilter ? yFilter.value.toLowerCase() : 'all';
        const valS = sInput ? sInput.value.toLowerCase() : '';

        const filteredCars = cars.filter(car => {
            const matchesM = valM === 'all' || car.marque === valM;
            const matchesC = valC === 'all' || car.category === valC;
            const matchesY = getYearMatches(car.year, valY);
            const matchesS = valS === '' || `${car.displayMarque} ${car.model} ${car.category} ${car.year}`.toLowerCase().includes(valS);
            return matchesM && matchesC && matchesY && matchesS;
        });

        renderCarCards(filteredCars);
        resCount.innerText = filteredCars.length === 0 ? '0 НАМЕРЕНИ МОДЕЛИ' : `${filteredCars.length} НАМЕРЕНИ МОДЕЛИ`;
    };

    // Активиране на слушателите само ако сме на страницата с каталога
    if (mFilter || sInput) {
        if (mFilter) mFilter.onchange = applyFilters;
        if (cFilter) cFilter.onchange = applyFilters;
        if (yFilter) yFilter.onchange = applyFilters;
        if (sInput) sInput.oninput = applyFilters;

        // Обработка на категориите от началната страница (SUV, Sedans, Sports)
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('cat');
        if (catParam && cFilter) {
            cFilter.value = catParam;
        }
        applyFilters(); // Първоначално филтриране
    }
});
