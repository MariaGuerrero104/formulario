document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('registrationForm');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Campos requeridos
    const requiredFields = form.querySelectorAll('[required]');
    const checkboxes = form.querySelectorAll('input[type="checkbox"][name="interests"]');
    
    // Validación en tiempo real
    form.addEventListener('input', function(e) {
        validateField(e.target);
        updateProgress();
    });
    
    // Validación al cambiar checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Función para validar un campo individual
    function validateField(field) {
        const errorElement = field.nextElementSibling?.classList.contains('error-message') 
            ? field.nextElementSibling 
            : field.parentElement.querySelector('.error-message');
        
        if (!errorElement) return;
        
        errorElement.textContent = '';
        
        if (field.validity.valid) {
            field.classList.remove('invalid');
            return true;
        }
        
        field.classList.add('invalid');
        
        if (field.validity.valueMissing) {
            errorElement.textContent = 'Este campo es requerido';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                errorElement.textContent = 'Ingresa un email válido';
            }
        } else if (field.validity.tooShort) {
            errorElement.textContent = `Mínimo ${field.minLength} caracteres`;
        } else if (field.validity.patternMismatch) {
            errorElement.textContent = 'Formato incorrecto';
        } else if (field.id === 'confirmPassword' && field.value !== document.getElementById('password').value) {
            errorElement.textContent = 'Las contraseñas no coinciden';
        }
        
        return false;
    }
    
    // Función para validar todo el formulario
    function validateForm() {
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validar checkboxes
        const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
        if (checkedBoxes.length === 0) {
            const checkboxError = document.querySelector('.checkbox-group .error-message') || 
                document.createElement('span');
            checkboxError.className = 'error-message';
            checkboxError.textContent = 'Selecciona al menos un interés';
            if (!document.querySelector('.checkbox-group .error-message')) {
                document.querySelector('.checkbox-group').appendChild(checkboxError);
            }
            isValid = false;
        } else {
            const existingError = document.querySelector('.checkbox-group .error-message');
            if (existingError) existingError.remove();
        }
        
        // Validar confirmación de contraseña
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        if (password.value !== confirmPassword.value) {
            const confirmError = confirmPassword.nextElementSibling?.classList.contains('error-message') 
                ? confirmPassword.nextElementSibling 
                : confirmPassword.parentElement.querySelector('.error-message');
            confirmError.textContent = 'Las contraseñas no coinciden';
            confirmPassword.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Función para actualizar la barra de progreso
    function updateProgress() {
        let completedFields = 0;
        const totalFields = requiredFields.length + 1; // +1 para los checkboxes
        
        // Campos requeridos completados
        requiredFields.forEach(field => {
            if (field.type === 'checkbox') return;
            
            if (field.value.trim() !== '') {
                if (field.id === 'confirmPassword') {
                    if (field.value === document.getElementById('password').value) {
                        completedFields++;
                    }
                } else {
                    completedFields++;
                }
            }
        });
        
        // Checkboxes (cuentan como 1 campo completo si al menos 1 está seleccionado)
        const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
        if (checkedBoxes.length > 0) {
            completedFields++;
        }
        
        // Calcular porcentaje
        const percent = Math.round((completedFields / totalFields) * 100);
        
        // Actualizar barra de progreso
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${percent}% completado`;
        
        // Cambiar color según progreso
        if (percent < 30) {
            progressBar.style.backgroundColor = '#f72585'; // Rojo
        } else if (percent < 70) {
            progressBar.style.backgroundColor = '#f8961e'; // Naranja
        } else if (percent < 100) {
            progressBar.style.backgroundColor = '#4895ef'; // Azul
        } else {
            progressBar.style.backgroundColor = '#4cc9f0'; // Verde/azul
        }
        
        // Habilitar botón si todo está completo
        if (percent === 100) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    // Función para enviar el formulario (simulado)
    function submitForm() {
        btnText.style.visibility = 'hidden';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simular envío al servidor
        setTimeout(() => {
            btnLoader.style.display = 'none';
            btnText.style.visibility = 'visible';
            btnText.textContent = '¡Registro Completado!';
            
            // Mostrar mensaje de éxito
            alert('Registro exitoso. Bienvenido!');
            
            // Resetear formulario (opcional)
            setTimeout(() => {
                form.reset();
                updateProgress();
                btnText.textContent = 'Completar Registro';
            }, 2000);
        }, 1500);
    }
    
    // Inicializar progreso
    updateProgress();
});