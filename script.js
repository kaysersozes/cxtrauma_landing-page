// ========================================
// Global Variables and Configuration
// ========================================

const MEDICAL_CENTERS = [
    {
        id: 'clinica-vina',
        name: 'Clínica Viña del Mar',
        location: 'Viña del Mar',
        doctor: 'Dr. Silva López',
        specialty: 'Traumatología'
    },
    {
        id: 'hospital-quillota',
        name: 'Hospital Quillota',
        location: 'Quillota',
        doctor: 'Dr. Morales Castro',
        specialty: 'Traumatología'
    },
    {
        id: 'hospital-osorno',
        name: 'Hospital Osorno',
        location: 'Osorno',
        doctor: 'Dr. Ramírez Soto',
        specialty: 'Traumatología'
    }
];

// ========================================
// Map Markers Initialization
// ========================================

function initializeMapMarkers() {
    const markers = document.querySelectorAll('.map-marker');
    const centerCards = document.querySelectorAll('.center-card');

    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const centerId = this.getAttribute('data-center');
            openFormModal(centerId);
            highlightCenter(centerId);
        });
    });

    // Add interaction for center cards in info panel
    centerCards.forEach(card => {
        card.addEventListener('click', function() {
            const centerId = this.getAttribute('data-center');
            highlightMapMarker(centerId);
            openFormModal(centerId);
        });

        card.addEventListener('mouseenter', function() {
            const centerId = this.getAttribute('data-center');
            highlightMapMarker(centerId, true);
        });

        card.addEventListener('mouseleave', function() {
            const centerId = this.getAttribute('data-center');
            highlightMapMarker(centerId, false);
        });
    });
}

function highlightMapMarker(centerId, highlight = true) {
    const marker = document.querySelector(`[data-center="${centerId}"]`);
    if (marker && marker.classList.contains('map-marker')) {
        if (highlight) {
            marker.style.transform = 'translate(-50%, -100%) scale(1.2)';
            marker.style.zIndex = '20';
        } else {
            marker.style.transform = 'translate(-50%, -100%) scale(1)';
            marker.style.zIndex = '10';
        }
    }
}

function highlightCenter(centerId) {
    // Remove previous highlights
    document.querySelectorAll('.center-card').forEach(card => {
        card.classList.remove('highlighted');
    });

    // Add highlight to selected center
    const centerCard = document.querySelector(`.center-card[data-center="${centerId}"]`);
    if (centerCard) {
        centerCard.classList.add('highlighted');
        // Scroll to the card
        centerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ========================================
// Form Modal Management
// ========================================

const modalOverlay = document.getElementById('modal-overlay');
const formModal = document.getElementById('form-modal');
const formClose = document.querySelector('.form-close');
const openFormBtn = document.getElementById('open-form-btn');

function openFormModal(centerId = '') {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pre-select center if provided
    if (centerId) {
        const centerSelect = document.getElementById('center');
        centerSelect.value = centerId;
    }

    // Reset form and hide success message
    resetForm();
}

function closeFormModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
}

// Open form from button
openFormBtn.addEventListener('click', () => openFormModal());

// Close form on close button click
formClose.addEventListener('click', closeFormModal);

// Close form on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeFormModal();
    }
});

// Close form on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeFormModal();
    }
});

// ========================================
// Form Validation Utilities
// ========================================

// Validate Chilean RUT
function validateRUT(rut) {
    // Remove dots and hyphens
    const cleanRUT = rut.replace(/\./g, '').replace(/-/g, '');

    if (cleanRUT.length < 2) return false;

    const body = cleanRUT.slice(0, -1);
    const verifier = cleanRUT.slice(-1).toUpperCase();

    // Calculate verification digit
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedVerifier = 11 - (sum % 11);
    let calculatedVerifier;

    if (expectedVerifier === 11) calculatedVerifier = '0';
    else if (expectedVerifier === 10) calculatedVerifier = 'K';
    else calculatedVerifier = expectedVerifier.toString();

    return verifier === calculatedVerifier;
}

// Format RUT as user types
function formatRUT(rut) {
    // Remove all non-numeric characters except K
    let cleanRUT = rut.replace(/[^0-9kK]/g, '');

    if (cleanRUT.length === 0) return '';

    // Separate body and verifier
    const body = cleanRUT.slice(0, -1);
    const verifier = cleanRUT.slice(-1);

    // Format body with dots
    let formattedBody = '';
    for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
        if (j > 0 && j % 3 === 0) {
            formattedBody = '.' + formattedBody;
        }
        formattedBody = body[i] + formattedBody;
    }

    return formattedBody + (verifier ? '-' + verifier : '');
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Chilean phone
function validatePhone(phone) {
    // Chilean mobile: +56 9 XXXX XXXX or 9 XXXX XXXX
    const cleanPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(\+?56)?9\d{8}$/;
    return phoneRegex.test(cleanPhone);
}

// Format phone as user types
function formatPhone(phone) {
    let cleanPhone = phone.replace(/\D/g, '');

    // Ensure it starts with 56 9 if starting with +
    if (phone.startsWith('+')) {
        if (!cleanPhone.startsWith('56')) {
            cleanPhone = '569' + cleanPhone;
        }

        if (cleanPhone.length >= 11) {
            return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 7)} ${cleanPhone.slice(7, 11)}`;
        } else if (cleanPhone.length >= 7) {
            return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3, 7)} ${cleanPhone.slice(7)}`;
        } else if (cleanPhone.length >= 3) {
            return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 3)} ${cleanPhone.slice(3)}`;
        } else {
            return `+${cleanPhone}`;
        }
    } else {
        // Format as 9 XXXX XXXX
        if (cleanPhone.length >= 5) {
            return `${cleanPhone.slice(0, 1)} ${cleanPhone.slice(1, 5)} ${cleanPhone.slice(5, 9)}`;
        } else if (cleanPhone.length >= 1) {
            return `${cleanPhone.slice(0, 1)} ${cleanPhone.slice(1)}`;
        }
    }

    return phone;
}

// Show field error
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.form-error');

    field.classList.add('error');
    errorElement.textContent = message;
}

// Clear field error
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.form-error');

    field.classList.remove('error');
    errorElement.textContent = '';
}

// ========================================
// Form Event Handlers
// ========================================

const orderForm = document.getElementById('order-form');
const rutInput = document.getElementById('rut');
const phoneInput = document.getElementById('phone');

// Auto-format RUT
rutInput.addEventListener('input', (e) => {
    const cursorPosition = e.target.selectionStart;
    const oldValue = e.target.value;
    const newValue = formatRUT(oldValue);

    e.target.value = newValue;

    // Maintain cursor position
    if (newValue.length > oldValue.length) {
        e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    } else {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
    }

    clearError('rut');
});

// Auto-format phone
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value;

    // If user is typing and doesn't have +56, prepend it
    if (value && !value.startsWith('+')) {
        value = '+56 ' + value.replace(/^\+56\s*/, '');
    }

    e.target.value = formatPhone(value);
    clearError('phone');
});

// Start with +56 in phone field
phoneInput.addEventListener('focus', (e) => {
    if (!e.target.value) {
        e.target.value = '+56 9 ';
    }
});

// Clear errors on input
document.getElementById('full-name').addEventListener('input', () => clearError('full-name'));
document.getElementById('email').addEventListener('input', () => clearError('email'));
document.getElementById('center').addEventListener('change', () => clearError('center'));

// ========================================
// Form Submission
// ========================================

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear all errors
    ['full-name', 'rut', 'phone', 'email', 'center'].forEach(clearError);

    // Get form values
    const formData = {
        fullName: document.getElementById('full-name').value.trim(),
        rut: document.getElementById('rut').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        center: document.getElementById('center').value
    };

    // Validate all fields
    let isValid = true;

    // Validate full name
    if (!formData.fullName || formData.fullName.length < 3) {
        showError('full-name', 'Por favor ingrese su nombre completo');
        isValid = false;
    }

    // Validate RUT
    if (!validateRUT(formData.rut)) {
        showError('rut', 'RUT inválido. Verifique el formato (Ej: 12.345.678-9)');
        isValid = false;
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
        showError('phone', 'Teléfono inválido. Use formato +56 9 XXXX XXXX');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
        showError('email', 'Email inválido. Verifique el formato');
        isValid = false;
    }

    // Validate center
    if (!formData.center) {
        showError('center', 'Por favor seleccione un centro médico');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Show loading state
    const submitButton = orderForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnSpinner = submitButton.querySelector('.btn-spinner');

    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-block';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get center information
    const selectedCenter = MEDICAL_CENTERS.find(c => c.id === formData.center);

    // Prepare data for submission
    const submissionData = {
        ...formData,
        centerName: selectedCenter.name,
        centerLocation: selectedCenter.location,
        doctor: selectedCenter.doctor,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    // Log to console (mock backend)
    console.log('='.repeat(50));
    console.log('NUEVA SOLICITUD DE ORDEN MÉDICA');
    console.log('='.repeat(50));
    console.log('Datos del Paciente:');
    console.log(`  Nombre: ${submissionData.fullName}`);
    console.log(`  RUT: ${submissionData.rut}`);
    console.log(`  Teléfono: ${submissionData.phone}`);
    console.log(`  Email: ${submissionData.email}`);
    console.log('');
    console.log('Centro Médico Seleccionado:');
    console.log(`  Centro: ${submissionData.centerName}`);
    console.log(`  Ubicación: ${submissionData.centerLocation}`);
    console.log(`  Especialista: ${submissionData.doctor}`);
    console.log('');
    console.log(`Fecha de Solicitud: ${new Date(submissionData.timestamp).toLocaleString('es-CL')}`);
    console.log(`Estado: ${submissionData.status.toUpperCase()}`);
    console.log('='.repeat(50));

    // Save to localStorage
    const savedRequests = JSON.parse(localStorage.getItem('cxtrauma_requests') || '[]');
    savedRequests.push(submissionData);
    localStorage.setItem('cxtrauma_requests', JSON.stringify(savedRequests));

    // Show success message
    submitButton.disabled = false;
    btnText.style.display = 'inline-block';
    btnSpinner.style.display = 'none';

    orderForm.style.display = 'none';
    document.getElementById('success-message').style.display = 'flex';

    // Close modal after 4 seconds
    setTimeout(() => {
        closeFormModal();
    }, 4000);
});

// ========================================
// Form Reset
// ========================================

function resetForm() {
    orderForm.reset();
    orderForm.style.display = 'flex';
    document.getElementById('success-message').style.display = 'none';

    // Clear all errors
    ['full-name', 'rut', 'phone', 'email', 'center'].forEach(clearError);
}

// ========================================
// Shopping Cart Functionality
// ========================================

const cart = {
    items: [],
    
    addItem(exam) {
        const existingItem = this.items.find(item => item.id === exam.id);
        if (!existingItem) {
            this.items.push(exam);
            this.updateCart();
        }
    },
    
    removeItem(examId) {
        this.items = this.items.filter(item => item.id !== examId);
        this.updateCart();
    },
    
    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    },
    
    getCount() {
        return this.items.length;
    },
    
    clear() {
        this.items = [];
        this.updateCart();
    },
    
    updateCart() {
        updateCartUI();
        updateCartBadge();
    }
};

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Update cart items
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">No hay exámenes seleccionados</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-code">${item.code}</div>
                </div>
                <div class="cart-item-price">${item.price > 0 ? '$' + item.price.toLocaleString('es-CL') : 'Gratis'}</div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    // Update total
    const total = cart.getTotal();
    cartTotalAmount.textContent = total > 0 ? '$' + total.toLocaleString('es-CL') : 'Gratis';
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    const count = cart.getCount();
    
    if (count > 0) {
        cartBadge.textContent = count;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }
}

function removeFromCart(examId) {
    // Uncheck the checkbox
    const checkbox = document.getElementById(`exam-${examId}`);
    if (checkbox) {
        checkbox.checked = false;
    }
    
    // Remove from cart
    cart.removeItem(examId);
}

// ========================================
// Exam Selection Handlers
// ========================================

function initializeExamCheckboxes() {
    const examItems = document.querySelectorAll('.exam-item');
    
    examItems.forEach(item => {
        const checkbox = item.querySelector('.exam-input');
        const examId = item.getAttribute('data-exam-id');
        const examPrice = parseInt(item.getAttribute('data-price'));
        const examCode = item.getAttribute('data-code');
        const examNameElement = item.querySelector('.exam-name');
        const examName = examNameElement.textContent.trim();
        
        // Add click handler to the entire item
        item.addEventListener('click', (e) => {
            // Don't toggle if clicking on the checkbox itself or info icon
            if (e.target.classList.contains('exam-input') || 
                e.target.closest('.exam-status') ||
                e.target.classList.contains('checkbox-custom')) {
                return;
            }
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        });
        
        // Add change handler to checkbox
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                cart.addItem({
                    id: examId,
                    name: examName,
                    price: examPrice,
                    code: examCode
                });
            } else {
                cart.removeItem(examId);
            }
        });
    });
}

// ========================================
// Cart Toggle Functionality
// ========================================

function initializeCartToggle() {
    const cartToggle = document.getElementById('cart-toggle');
    const shoppingCart = document.getElementById('shopping-cart');
    const closeCart = document.getElementById('close-cart');
    
    cartToggle.addEventListener('click', () => {
        shoppingCart.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        shoppingCart.classList.remove('active');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (shoppingCart.classList.contains('active') &&
            !shoppingCart.contains(e.target) &&
            !cartToggle.contains(e.target)) {
            shoppingCart.classList.remove('active');
        }
    });
}

// ========================================
// Checkout Functionality
// ========================================

function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length === 0) return;
        
        // Create order summary
        const orderSummary = {
            exams: cart.items,
            total: cart.getTotal(),
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        console.log('='.repeat(50));
        console.log('SOLICITUD DE EXÁMENES');
        console.log('='.repeat(50));
        console.log('Exámenes solicitados:');
        orderSummary.exams.forEach(exam => {
            console.log(`- ${exam.name} (${exam.code}) - ${exam.price > 0 ? '$' + exam.price : 'Gratis'}`);
        });
        console.log('');
        console.log(`Total: $${orderSummary.total.toLocaleString('es-CL')}`);
        console.log(`Fecha: ${new Date(orderSummary.timestamp).toLocaleString('es-CL')}`);
        console.log('='.repeat(50));
        
        // Show success message
        alert(`¡Solicitud enviada!\n\nHas solicitado ${cart.items.length} examen(es).\nTotal: ${orderSummary.total > 0 ? '$' + orderSummary.total.toLocaleString('es-CL') : 'Gratis'}\n\nRecibirás tu orden médica por correo electrónico.`);
        
        // Clear cart
        cart.clear();
        
        // Clear all checkboxes
        document.querySelectorAll('.exam-input').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Close cart
        document.getElementById('shopping-cart').classList.remove('active');
    });
}

// ========================================
// Scroll Animation Observer
// ========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// Initialize Application
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMapMarkers();
    initializeExamCheckboxes();
    initializeCartToggle();
    initializeCheckout();
    initializeScrollAnimations();

    console.log('CxTrauma - Plataforma Médica de Órdenes de Resonancia Magnética');
    console.log('Sistema inicializado correctamente');
    console.log('');
    console.log('Centros médicos disponibles:');
    MEDICAL_CENTERS.forEach(center => {
        console.log(`- ${center.name} (${center.location})`);
    });
});

