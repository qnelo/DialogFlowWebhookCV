import test from 'ava';
let replace = require('../src/replaceValues');

test('replaceValue Test with parameters and object', (t) => {

    const input = {
        text: 'hola $cv.nombreUsuario $cv.apellido como $saludo.insulto estas',
        object: [
            {
                'name': 'projects/camilocvapi2/agent/sessions/2881f78f/contexts/cv',
                'lifespanCount': 5,
                'parameters': {
                    'nombreUsuario': 'Huachimingo',
                    'nombreUsuario.original': 'Huachimingo',
                    'apellido': 'Policarpo',
                    'apellido.original': 'Policarpo'
                }
            },
            {
                'name': 'projects/camilocvapi2/agent/sessions/2881f78f/contexts/camilo',
                'lifespanCount': 3,
                'parameters': {
                    'nombreUsuario': 'Huachimingo',
                    'nombreUsuario.original': 'Huachimingo'
                }
            },
            {
                'name': 'projects/camilocvapi2/agent/sessions/2881f78f/contexts/saludo',
                'parameters': {
                    'insulto': 'xuxa',
                    'insulto.original': 'xuxa'
                }
            },
            {
                'name': 'projects/camilocvapi2/agent/sessions/2881f78f/contexts/generic',
                'lifespanCount': 4,
                'parameters': {
                    'telegram_chat_id': 187410268,
                    'nombreUsuario': 'Huachimingo',
                    'nombreUsuario.original': 'Huachimingo'
                }
            }
        ]
    };

    let output = replace(input.object, input.text);

    t.is(output, 'hola Huachimingo Policarpo como xuxa estas');

});

test('replaceValue Test with one parameters and object', (t) => {
    
    const input = {
        text: 'hola $cv.nombreUsuario como estas',
        object: [
            {
                'name': 'projects/camilocvapi2/agent/sessions/2881f78f/contexts/cv',
                'parameters': {
                    'nombreUsuario': 'Huachimingo',
                    'nombreUsuario.original': 'Huachimingo',
                    'apellido': 'Policarpo',
                    'apellido.original': 'Policarpo'
                },
                'lifespan': 4
            },
            {
                'name': 'saludo',
                'parameters': {
                    'insulto': 'xuxa',
                    'insulto.original': 'xuxa'
                },
                'lifespan': 4
            }
        ]
    };
    
    let output = replace(input.object, input.text);
    
    t.is(output, 'hola Huachimingo como estas');
    
});

test('replaceValue Test without parameters', (t) => {

    const input = {
        text: 'hola como estas',
        object: [
            {
                'name': 'cv',
                'parameters': {
                    'nombreUsuario': 'Huachimingo',
                    'nombreUsuario.original': 'Huachimingo'
                },
                'lifespan': 4
            }
        ]
    };

    let output = replace(input.object, input.text);

    t.is(output, 'hola como estas');

});

test('replaceValue Test without parameters and empty object', (t) => {

    const input = {
        text: 'hola como estas',
        object: []
    };

    let output = replace(input.object, input.text);

    t.is(output, 'hola como estas');

});