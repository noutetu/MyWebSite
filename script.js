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
    
    // =================== 編集モード機能 ===================
    
    // 編集モードのトグル機能
    let isEditMode = false;
    
    // 編集モードボタンを作成
    const createEditModeToggle = () => {
        const editButton = document.createElement('button');
        editButton.id = 'edit-mode-toggle';
        editButton.innerHTML = '編集モード: OFF';
        editButton.style.position = 'fixed';
        editButton.style.right = '20px';
        editButton.style.bottom = '20px';
        editButton.style.zIndex = '1000';
        editButton.style.padding = '10px 15px';
        editButton.style.backgroundColor = 'var(--primary-color)';
        editButton.style.color = 'white';
        editButton.style.border = 'none';
        editButton.style.borderRadius = '5px';
        editButton.style.cursor = 'pointer';
        editButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        document.body.appendChild(editButton);
        
        // 保存ボタンを作成
        const saveButton = document.createElement('button');
        saveButton.id = 'save-changes';
        saveButton.innerHTML = '変更を保存';
        saveButton.style.position = 'fixed';
        saveButton.style.right = '20px';
        saveButton.style.bottom = '70px';
        saveButton.style.zIndex = '1000';
        saveButton.style.padding = '10px 15px';
        saveButton.style.backgroundColor = '#4CAF50';
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.borderRadius = '5px';
        saveButton.style.cursor = 'pointer';
        saveButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        saveButton.style.display = 'none';
        
        document.body.appendChild(saveButton);

        // HTMLに直接保存するボタン
        const exportButton = document.createElement('button');
        exportButton.id = 'export-html';
        exportButton.innerHTML = 'HTMLとして保存';
        exportButton.style.position = 'fixed';
        exportButton.style.right = '20px';
        exportButton.style.bottom = '120px';
        exportButton.style.zIndex = '1000';
        exportButton.style.padding = '10px 15px';
        exportButton.style.backgroundColor = '#ff9800';
        exportButton.style.color = 'white';
        exportButton.style.border = 'none';
        exportButton.style.borderRadius = '5px';
        exportButton.style.cursor = 'pointer';
        exportButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        exportButton.style.display = 'none';
        
        document.body.appendChild(exportButton);
        
        // 編集モードのトグル処理
        editButton.addEventListener('click', () => {
            isEditMode = !isEditMode;
            editButton.innerHTML = isEditMode ? '編集モード: ON' : '編集モード: OFF';
            editButton.style.backgroundColor = isEditMode ? '#f44336' : 'var(--primary-color)';
            saveButton.style.display = isEditMode ? 'block' : 'none';
            exportButton.style.display = isEditMode ? 'block' : 'none';
            
            toggleEditableElements(isEditMode);
        });
        
        // 変更を保存する処理（ローカルストレージに保存）
        saveButton.addEventListener('click', () => {
            // 編集したテキストを保存
            const editedTexts = {};
            document.querySelectorAll('[data-original-text]').forEach(element => {
                const id = element.getAttribute('data-edit-id');
                editedTexts[id] = element.innerHTML;
            });
            localStorage.setItem('editedTexts', JSON.stringify(editedTexts));
            
            // 編集した画像を保存
            const editedImages = {};
            document.querySelectorAll('[data-original-src]').forEach(element => {
                const id = element.getAttribute('data-edit-id');
                editedImages[id] = element.getAttribute('src');
            });
            localStorage.setItem('editedImages', JSON.stringify(editedImages));
            
            alert('変更がブラウザに保存されました！（ローカルストレージに保存されています）');
        });

        // HTMLファイルとして保存する処理
        exportButton.addEventListener('click', () => {
            // 編集モードをいったん無効にして、編集用の属性やスタイルを削除
            isEditMode = false;
            toggleEditableElements(false);
            
            // 編集用の属性を完全に削除
            document.querySelectorAll('[data-edit-id], [data-original-text], [data-original-src]').forEach(element => {
                element.removeAttribute('data-edit-id');
                element.removeAttribute('data-original-text');
                element.removeAttribute('data-original-src');
                element.removeAttribute('contenteditable');
                element.style.border = '';
                element.style.padding = '';
            });
            
            // 編集ボタン類を一時的に非表示
            const editControls = [editButton, saveButton, exportButton];
            editControls.forEach(button => button.style.display = 'none');
            
            // 現在のHTMLをエクスポート
            const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
            
            // ダウンロード用のリンクを作成
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
            downloadLink.setAttribute('download', 'index.html');
            
            // クリックイベントをトリガーして保存
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // 編集ボタンを再表示
            setTimeout(() => {
                editControls.forEach(button => {
                    if (button === editButton) {
                        button.style.display = 'block';
                    }
                });
                editButton.innerHTML = '編集モード: OFF';
                editButton.style.backgroundColor = 'var(--primary-color)';
                
                alert('HTMLファイルがダウンロードされました。このファイルを元のindex.htmlと置き換えてください。');
            }, 100);
        });
    };
    
    // 編集可能な要素を特定してイベントリスナーを設定
    const toggleEditableElements = (isEditable) => {
        // テキスト要素（見出し、段落など）を編集可能にする
        const editableTextElements = document.querySelectorAll('h1, h2, h3, p:not(.copyright), .skill-name, .skill-percent, .screenshot-caption, .section-subtitle, .work-title, .work-category');
        
        editableTextElements.forEach((element, index) => {
            // 要素のIDを設定
            if (!element.hasAttribute('data-edit-id')) {
                element.setAttribute('data-edit-id', `text-${index}`);
            }
            
            if (isEditable) {
                element.setAttribute('contenteditable', 'true');
                element.setAttribute('data-original-text', element.innerHTML);
                element.style.border = '1px dashed #f44336';
                element.style.padding = '5px';
                element.style.borderRadius = '3px';
                
                // 編集のヒントを表示
                element.title = 'クリックして編集';
            } else {
                element.removeAttribute('contenteditable');
                element.style.border = '';
                element.style.padding = '';
            }
        });
        
        // 画像を編集可能にする
        const editableImageElements = document.querySelectorAll('img');
        
        editableImageElements.forEach((element, index) => {
            // 要素のIDを設定
            if (!element.hasAttribute('data-edit-id')) {
                element.setAttribute('data-edit-id', `image-${index}`);
            }
            
            if (isEditable) {
                // 画像の元のsrcを保存
                element.setAttribute('data-original-src', element.getAttribute('src'));
                
                // 画像をクリックしたときの処理
                element.style.cursor = 'pointer';
                element.style.border = '2px dashed #f44336';
                element.style.padding = '3px';
                
                element.title = 'クリックして画像を変更';
                
                // クリックイベントで画像変更ができるようにする
                element.addEventListener('click', handleImageClick);
            } else {
                element.style.cursor = '';
                element.style.border = '';
                element.style.padding = '';
                
                // クリックイベントを削除
                element.removeEventListener('click', handleImageClick);
            }
        });
    };
    
    // 画像クリック時のハンドラ
    const handleImageClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const imgElement = this;
        const newSrc = prompt('新しい画像URLを入力してください:', imgElement.getAttribute('src'));
        
        if (newSrc !== null && newSrc.trim() !== '') {
            imgElement.setAttribute('src', newSrc);
        }
    };
    
    // 保存されたテキストと画像の復元
    const restoreSavedContent = () => {
        try {
            const editedTexts = JSON.parse(localStorage.getItem('editedTexts')) || {};
            Object.keys(editedTexts).forEach(id => {
                const element = document.querySelector(`[data-edit-id="${id}"]`);
                if (element) {
                    element.innerHTML = editedTexts[id];
                }
            });
            
            const editedImages = JSON.parse(localStorage.getItem('editedImages')) || {};
            Object.keys(editedImages).forEach(id => {
                const element = document.querySelector(`[data-edit-id="${id}"]`);
                if (element) {
                    element.setAttribute('src', editedImages[id]);
                }
            });
        } catch (error) {
            console.error('保存されたコンテンツの復元中にエラーが発生しました:', error);
        }
    };
    
    // ヘルプ情報を表示するボタン
    const createHelpButton = () => {
        const helpButton = document.createElement('button');
        helpButton.id = 'edit-help';
        helpButton.innerHTML = '?';
        helpButton.style.position = 'fixed';
        helpButton.style.right = '20px';
        helpButton.style.bottom = '170px';
        helpButton.style.zIndex = '1000';
        helpButton.style.width = '40px';
        helpButton.style.height = '40px';
        helpButton.style.borderRadius = '50%';
        helpButton.style.backgroundColor = '#2196F3';
        helpButton.style.color = 'white';
        helpButton.style.border = 'none';
        helpButton.style.fontSize = '20px';
        helpButton.style.cursor = 'pointer';
        helpButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        document.body.appendChild(helpButton);
        
        helpButton.addEventListener('click', () => {
            alert(`編集モードの使い方:

1. 「編集モード: OFF」ボタンをクリックして編集モードをオンにします
2. 点線枠で囲まれたテキストをクリックして内容を編集できます
3. 画像をクリックすると、新しい画像URLを入力できます
4. 「変更を保存」ボタンで編集内容をブラウザに保存（一時的）
5. 「HTMLとして保存」ボタンで編集済みのHTMLファイルをダウンロード
6. ダウンロードしたHTMLファイルを元のindex.htmlと置き換えてください

注意: ブラウザ保存はこのブラウザでのみ有効です。恒久的な変更には「HTMLとして保存」を使用してください。`);
        });
    };
    
    // 編集モードボタンの作成と保存したコンテンツの復元
    createEditModeToggle();
    createHelpButton();
    restoreSavedContent();
});