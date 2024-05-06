export default async ( req,res, next ) => {
    try {
        const { username, repeatPassword, email, password } = req.body;

        const validatePasword = () => {
            if (!username || !password || !email ) {
                console.error('Hay campos incompletos.');
                return {validation: false, message: 'Hay campos incompletos.'};
              }

              if (password !== repeatPassword) {
                console.error('Las contraseñas no coinciden.');
                return {validation: false, message: 'Las contraseñas no coinciden.'};
              }


              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(email)) {
                console.error('Email inválido.');
                return {validation: false, message: 'Email inválido'};
              }
      
              const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$-_!%*?&])[A-Za-z\d@$!%-_*?&]{8,}$/;
              if (!passwordPattern.test(password)) {
                console.error('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
                return {validation: false, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'};
              }

              return {validation: true, message: 'Validación correcta'};
            }

            // EXPRESIONES REGULARES
            // (?=.*[a-z]): Al menos una letra minúscula.
            // (?=.*[A-Z]): Al menos una letra mayúscula.
            // (?=.*\d): Al menos un dígito (número).
            // (?=.*[@$!%*?&]): Al menos un carácter especial.
            // {8,}: Al menos 8 caracteres en total.

            req.validatePassword = validatePasword();
            next();
    } catch (error) {
        console.error('Ocurrio un error en middleware validatePasword(). Error: ', error)
        return;
    }
}