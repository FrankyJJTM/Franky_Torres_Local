document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // =========================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nombreInput = contactForm.querySelector('[name="nombre"]');
        const apellidoInput = contactForm.querySelector('[name="apellido"]');
        const telefonoInput = contactForm.querySelector('[name="telefono"]');
        const correoInput = contactForm.querySelector('[name="correo"]');
        const mensajeInput = contactForm.querySelector('[name="mensaje"]');

        function mostrarError(input, mensaje) {
            if (!input) return;
            const contenedor = input.parentElement;
            if (!contenedor) return;

            const errorElement = contenedor.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = mensaje;
                errorElement.classList.toggle('hidden', mensaje === '');
            }

            input.classList.toggle('ring-2', mensaje !== '');
            input.classList.toggle('ring-red-500', mensaje !== '');
        }

        function validarTexto(input, nombreCampo) {
            if (!input) return false;
            const valor = input.value.trim();
            const soloLetras = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]+$/;

            if (valor === '') {
                mostrarError(input, `Ingresa tu ${nombreCampo}`);
                return false;
            }
            if (!soloLetras.test(valor)) {
                mostrarError(input, `El ${nombreCampo} solo debe contener letras`);
                return false;
            }
            mostrarError(input, '');
            return true;
        }

        function validarTelefono() {
            if (!telefonoInput) return false;
            const telefono = telefonoInput.value.trim();

            if (!/^9[0-9]{8}$/.test(telefono)) {
                mostrarError(telefonoInput, 'El teléfono debe tener 9 dígitos y comenzar con 9');
                return false;
            }
            mostrarError(telefonoInput, '');
            return true;
        }

        function validarCorreo() {
            if (!correoInput) return false;
            const correo = correoInput.value.trim();
            const emailRegex = /^(?=.*[a-zA-Z])[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(correo)) {
                mostrarError(correoInput, 'El correo debe contener al menos una letra en el usuario');
                return false;
            }
            mostrarError(correoInput, '');
            return true;
        }

        function validarMensaje() {
            if (!mensajeInput) return false;
            if (mensajeInput.value.trim() === '') {
                mostrarError(mensajeInput, 'Ingresa un mensaje');
                return false;
            }
            mostrarError(mensajeInput, '');
            return true;
        }

        // Restricción de entrada en tiempo real (solo letras en nombre/apellido)
        [nombreInput, apellidoInput].forEach((input) => {
            if (!input) return;
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]/g, '');
            });
        });

        // Restricción de entrada en tiempo real (solo números en teléfono)
        if (telefonoInput) {
            telefonoInput.addEventListener('input', () => {
                telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, '').substring(0, 9);
            });
        }

        // Validación global al enviar el formulario
        contactForm.addEventListener('submit', (event) => {
            const nombreValido = validarTexto(nombreInput, 'nombre');
            const apellidoValido = validarTexto(apellidoInput, 'apellido');
            const telefonoValido = validarTelefono();
            const correoValido = validarCorreo();
            const mensajeValido = validarMensaje();

            const formularioValido = nombreValido && apellidoValido && telefonoValido && correoValido && mensajeValido;

            if (!formularioValido) {
                event.preventDefault();
            }
        });

        // Control del Modal de Confirmación
        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeSuccessModal');

        if (closeModalBtn && successModal) {
            closeModalBtn.addEventListener('click', () => {
                successModal.classList.add('hidden');
            });

            successModal.addEventListener('click', (event) => {
                if (event.target === successModal) {
                    successModal.classList.add('hidden');
                }
            });
        }
    }

    // =========================================================
    // CONTADOR DE CARACTERES DEL MENSAJE (300 Máx)
    // =========================================================
    const mensajeInputContador = document.getElementById('mensajeInput');
    const contadorMensaje = document.getElementById('contadorMensaje');

    if (mensajeInputContador && contadorMensaje) {
        const limiteMaximo = 300;

        const actualizarContador = () => {
            const caracteresEscritos = mensajeInputContador.value.length;
            contadorMensaje.textContent = `${caracteresEscritos}/${limiteMaximo}`;
            contadorMensaje.classList.toggle('limite-cerca', caracteresEscritos >= limiteMaximo - 20);
        };

        mensajeInputContador.addEventListener('input', actualizarContador);
        actualizarContador();
    }
});