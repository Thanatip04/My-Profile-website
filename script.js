document.addEventListener("DOMContentLoaded", function () {
    //=====================================    Navbar scroll highlight    =================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    function setActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.navbar a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
    
    //========================= Toggle bar ===============================
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    if (navbar) {
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }
    
    //==================================== read more ====================================
    const readMoreBtn = document.querySelector('.read-more');
    const aboutText = document.querySelector('.about-text');

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            aboutText.classList.toggle('expanded');
            readMoreBtn.textContent = aboutText.classList.contains('expanded') 
                ? 'อ่านน้อยลง' 
                : 'อ่านเพิ่มเติม';
        });
    }

    //=================================== personal info , education ========================================
    // Toggle แสดง/ซ่อน info-grid บนมือถือ
    document.querySelectorAll('.toggle-section').forEach(header => {
    header.addEventListener('click', () => {
        // toggle active เฉพาะตอนจอเล็ก
        if (window.innerWidth <= 768) {
        const container = header.parentElement;
        container.classList.toggle('active');
        }
    });
    });


    
    //======================== Portfolio tab switching ====================================
    const navItems = document.querySelectorAll(".portfolio-nav .nav-item");
    const portfolioSections = document.querySelectorAll(".portfolio-tab");

    function showSection(targetId) {
        portfolioSections.forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const activeNav = document.querySelector(`.portfolio-nav .nav-item[data-target="${targetId}"]`);
        if (activeNav) {
            activeNav.classList.add("active");
        }
    }

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("data-target");
            showSection(targetId);
        });
    });
    showSection("Achievement-content");

    //==========================================  Certificate Pagination   ===========================================================
    const certPageLinks = document.querySelectorAll('.cert-page');
    const certPageContents = document.querySelectorAll('.cert-page-content');

    // ฟังก์ชันสำหรับจัดการการแสดงหน้าเกียรติบัตร
    function showCertPage(targetId) {
        // ซ่อนเนื้อหาของทุกหน้า
        certPageContents.forEach(content => content.classList.add('hidden'));

        // แสดงเฉพาะเนื้อหาที่ต้องการ
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }
    }
    
    // ทำให้หน้าแรกของเกียรติบัตรแสดงขึ้นมาเมื่อโหลดหน้า
    const firstCertPage = document.getElementById('cert-page1');
    if (firstCertPage) {
        firstCertPage.classList.remove('hidden');
    }

    // เพิ่ม Event Listener ให้กับลิงก์แบ่งหน้า
    certPageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');
            // เรียกฟังก์ชันแสดงหน้าตาม data-target
            showCertPage(targetId);

            // ลบ class 'active' จากทุกปุ่ม
            certPageLinks.forEach(item => item.classList.remove('active'));
            
            // เพิ่ม class 'active' ให้ทุกปุ่มที่มี data-target ตรงกัน
            document.querySelectorAll(`.cert-page[data-target="${targetId}"]`).forEach(btn => {
                btn.classList.add('active');
            });
        });
    });

    // ================================= Transcripts Modal ===========================================
    const transcriptModal = document.getElementById('transcript-modal');
    if (transcriptModal) {
        const closeBtn = transcriptModal.querySelector('.close-button');
        const modalTitle = transcriptModal.querySelector('#modal-title');
        const modalSubtitle = transcriptModal.querySelector('#modal-subtitle');
        const modalImage1 = transcriptModal.querySelector('#image1');
        const modalImage2 = transcriptModal.querySelector('#image2');

        document.querySelectorAll('.open-transcript-modal').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const title = button.dataset.title;
                const subtitle = button.dataset.subtitle;
                const image1 = button.dataset.image1;
                const image2 = button.dataset.image2;

                modalTitle.textContent = title;
                modalSubtitle.textContent = subtitle;
                modalImage1.src = image1;
                modalImage2.src = image2;
                
                transcriptModal.style.display = 'flex';
            });
        });

        closeBtn.addEventListener('click', () => {
            transcriptModal.style.display = 'none';
        });

        transcriptModal.addEventListener('click', (e) => {
            if (e.target.id === 'transcript-modal') {
                transcriptModal.style.display = 'none';
            }
        });
    }

    //================================== Certificate Modal ===========================================
    console.log("Certificate script is running."); // 1. เช็คว่าไฟล์ JS ทำงาน

    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certModalImg");
    const captionText = document.getElementById("certModalCaption");
    const closeModal = document.querySelector(".close-modal");

    if (modal && modalImg && captionText && closeModal) {
        console.log("Modal elements found successfully."); // 2. เช็คว่าหาองค์ประกอบของ modal เจอ

        const certificateCards = document.querySelectorAll(".certificate-card");
        console.log(`Found ${certificateCards.length} certificate cards.`); // 3. เช็คว่าหา card เจอหรือไม่

        certificateCards.forEach(card => {
            card.addEventListener("click", (e) => {
                console.log("Card has been clicked!"); // 4. เช็คว่าการคลิกทำงานหรือไม่
                e.stopPropagation();
            
                const img = card.querySelector("img");
                const title = card.querySelector(".cert-title")?.innerText || "";

                if (img) {
                    console.log("Image found, attempting to show modal.");
                    modal.classList.remove("modal-hidden");   // ✅ ใช้ class
                    modalImg.src = img.src;
                    captionText.innerText = title;
                } else {
                    console.error("Could not find image inside the clicked card.");
                }
            });
        });

        // ปิด modal
        closeModal.addEventListener("click", () => {
            modal.classList.add("modal-hidden");
        });

        // ปิด modal เวลา click ด้านนอกภาพ
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.add("modal-hidden");
            }
        });
    } else {
        console.error("One or more modal elements were not found in the HTML.");
    }
    
    //================================== Contact  ===========================================
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // ป้องกันการส่งฟอร์มจริง
            alert("ขอบคุณที่ติดต่อ! เราจะตอบกลับโดยเร็วที่สุด 😊");
            contactForm.reset(); // ล้างข้อมูลในฟอร์ม (ถ้าต้องการ)
        });
    }
});