module.exports = (intent) => {
    const responses = {
        'anoExperiencia': {
            text: 'Camilo tiene 12 años de experiencia trabajando en distintas empresas del sector tecnológico, de los cuales, los últimos 8 años tienen relación con el desarrollo de software.',
            quickReply: [
                'Último Trabajo de Camilo',
                'Estudios de Camilo',
                '¿Donde vive Camilo?',
                '¿Que es un chatbot?'
            ]
        }
    };
    return responses[intent];
};