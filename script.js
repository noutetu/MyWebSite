/**
 * ポートフォリオウェブサイトのJavaScript
 */

// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    // ローディング画面
    const loadingScreen = document.querySelector('.loading-screen');
    
    // ページが完全に読み込まれたらローディング画面を非表示
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    });
    
    // スクロールアニメーション
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // スクロール時のアニメーション処理
    const scrollAnimation = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
    };
    
    // 初期表示時にも実行
    scrollAnimation();
    
    // スクロール時にアニメーション処理を実行
    window.addEventListener('scroll', scrollAnimation);
    
    // ナビゲーションのスクロール処理
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // モバイルナビゲーションの開閉
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // ナビリンクをクリックした時の処理
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // モバイルメニューを閉じる
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // ダークモード切り替え
    const themeToggle = document.querySelector('.theme-toggle');
    
    // 保存されたテーマを取得
    const savedTheme = localStorage.getItem('theme');
    
    // 保存されたテーマがあれば適用
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // テーマ切り替えボタンのクリック処理
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // テーマを適用
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // テーマをローカルストレージに保存
        localStorage.setItem('theme', newTheme);
        
        // アイコンを更新
        updateThemeIcon(newTheme);
    });
    
    // テーマアイコンの更新
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // 制作実績フィルター
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // アクティブなボタンのクラスを削除
            document.querySelector('.filter-btn.active').classList.remove('active');
            
            // クリックされたボタンをアクティブにする
            button.classList.add('active');
            
            // 選択されたカテゴリー
            const category = button.getAttribute('data-filter');
            
            // 作品をフィルタリング
            workItems.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // スキルのプログレスバーアニメーション
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const percent = skill.getAttribute('data-percent');
            skill.style.width = percent + '%';
        });
    }
    
    // Intersection Observerでスキルセクションが見えたときにアニメーション開始
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // スクリーンショットモーダル
    const screenshotContainers = document.querySelectorAll('.screenshot-container');
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    
    // スクリーンショットをクリックしたときの処理
    screenshotContainers.forEach(container => {
        container.addEventListener('click', () => {
            const imgSrc = container.querySelector('img').getAttribute('src');
            modalImage.setAttribute('src', imgSrc);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロール無効化
        });
    });
    
    // モーダルを閉じる
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // スクロール有効化
    });
    
    // ESCキーでもモーダルを閉じられるように
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData);
            
            // ここに実際のフォーム送信処理を追加
            // 例: fetch APIを使った送信など
            
            // 仮の処理（実際のプロジェクトでは適切な送信処理に置き換える）
            console.log('フォームデータ:', formValues);
            
            // 送信成功メッセージ表示
            alert('お問い合わせありがとうございます。メッセージが送信されました。');
            
            // フォームをリセット
            contactForm.reset();
        });
    }
    
    // モーダルトリガー要素の処理（クラス名があれば）
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    
    if (modalTriggers.length > 0 && modal) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const imgSrc = trigger.getAttribute('src');
                modalImage.setAttribute('src', imgSrc);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
});