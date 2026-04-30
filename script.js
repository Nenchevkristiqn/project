/**
 * AUTODEX - COMPLETE SYSTEM SCRIPT (2026)
 * Всички функционалности в един файл.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ГЛОБАЛНИ ЕЛЕМЕНТИ И НАВИГАЦИЯ ---
    const navAuth = document.querySelector('.nav-auth');
    
    // Функция за проверка на сесията и обновяване на хедъра
    const updateNavigation = () => {
        const loggedUser = localStorage.getItem('user_name');
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
                window.location.href = 'index.html';
            });
        }
    };

    updateNavigation(); // Извиква се веднага при зареждане

    // --- 2. AUTH ЛОГИКА (РЕГИСТРАЦИЯ И ЛОГИН) ---
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        const toggleBtn = document.getElementById('toggle-auth');
        const authTitle = document.getElementById('auth-title');
        const nameGroup = document.getElementById('name-group');
        const submitBtn = document.getElementById('submit-btn');
        const footerText = document.getElementById('footer-text');
        
        let isLoginMode = false; // По подразбиране сме на "Create account"

        // Функция за превключване на интерфейса
        const toggleUI = (e) => {
            if (e) e.preventDefault();
            isLoginMode = !isLoginMode;

            if (isLoginMode) {
                authTitle.innerText = "Login.";
                if (nameGroup) nameGroup.style.display = "none";
                submitBtn.innerText = "LOGIN";
                footerText.innerHTML = 'NOT A MEMBER? <a href="#" id="toggle-link">CREATE ACCOUNT &rarr;</a>';
            } else {
                authTitle.innerText = "Create account.";
                if (nameGroup) nameGroup.style.display = "block";
                submitBtn.innerText = "CREATE ACCOUNT";
                footerText.innerHTML = 'ALREADY A MEMBER? <a href="#" id="toggle-link">LOGIN &rarr;</a>';
            }
            // Закачаме събитието на новия динамичен линк
            const link = document.getElementById('toggle-link');
            if (link) link.onclick = toggleUI;
        };

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
                    alert("Account not found. Please register first.");
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
    const carCards = document.querySelectorAll('.car-card');

    const applyFilters = () => {
        if (!resCount) return;

        const valM = mFilter ? mFilter.value.toLowerCase() : 'all';
        const valC = cFilter ? cFilter.value.toLowerCase() : 'all';
        const valY = yFilter ? yFilter.value.toLowerCase() : 'all';
        const valS = sInput ? sInput.value.toLowerCase() : "";

        let count = 0;

        carCards.forEach(card => {
            // Вземаме целия текст от картата за по-лесно търсене
            const cardContent = card.innerText.toLowerCase();
            
            const matchesM = valM === 'all' || cardContent.includes(valM);
            const matchesC = valC === 'all' || cardContent.includes(valC);
            const matchesY = valY === 'all' || cardContent.includes(valY);
            const matchesS = valS === '' || cardContent.includes(valS);

            if (matchesM && matchesC && matchesY && matchesS) {
                card.style.display = "block";
                count++;
            } else {
                card.style.display = "none";
            }
        });

        // Обновяваме брояча на резултатите
        resCount.innerText = count === 0 ? "0 ENTRIES FOUND" : `${count} ENTRIES`;
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