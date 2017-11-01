import test from 'ava';
let replace = require('../replaceValues');

test('replaceValue Test with parameters and object', (t) => {

    const input = {
        text: 'hola $cv.nombreUsuario $cv.apellido como $saludo.insulto estas',
        object: [
            {
                'name': 'cv',
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

    t.is(output, 'hola Huachimingo Policarpo como xuxa estas');

});

test('replaceValue Test with one parameters and object', (t) => {
    
    const input = {
        text: 'hola $cv.nombreUsuario como estas',
        object: [
            {
                'name': 'cv',
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