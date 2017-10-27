module.exports = (responseText, requestSource) => {

    let output = {};
    output.speech = responseText.text;
    output.displayText = responseText.text;
    output.data = {};
    output.data[requestSource] = {
        'text': responseText.text,
        'reply_markup': {
            'keyboard': responseText.quickReply.map(reply => [reply]),
            'one_time_keyboard': true,
            'resize_keyboard': true
        }
    };
    //output."messages": [
    // {
    //     "type": 0,
    //     "platform": "telegram",
    //     "id": "d4ce8743-b304-416f-afa5-a8ef3fc173fa",
    //     "speech": "Camilo ha tenido varios trabajos, te los cuento desde el mas reciente al mas antiguo"
    //   },
    //   {
    //     "type": 0,
    //     "platform": "telegram",
    //     "id": "9f349701-0387-4e63-860a-2d081171c728",
    //     "speech": "Agile Senior Full Stack Developer en Becual, desde junio del 2016 a la actualidad\n\nAgile Full Stack Developer en kuCloud desde mayo del 2015 hasta la actualidad\n\nAnalista Funcional en \"As Consultores\" desde julio del 2013 hasta marzo del 2016\n\nBack End Developer en \"Computación Group Service Ltda\" desde diciembre del 2012 hasta junio del 2013\n\nFull Stack Developer en \"Workmate Ltda.\" desde el 2011 hasta el 2012\n\t\nFull Stack Developer como Independiente entre los años 2010 y 2012\n\nDesarrollador y Administrador de Plataformas  en \"BIGNISS LTDA.\"  entre los años 2007 y 2010\n\nAdministrador de Plataformas en \"Empresa DRC\", Outsourcing para ENTEL S.A. entre los años 2005 y 2006"
    //   },
    //   {
    //     "type": 0,
    //     "platform": "telegram",
    //     "id": "6e2fc07e-9feb-4813-a26e-b00cc92181ed",
    //     "speech": "Si quieres puedes consultar sobre algún trabajo en particular"
    //   },
    //   {
    //     "type": 2,
    //     "platform": "telegram",
    //     "id": "57c2d235-73b5-4ee0-a458-addf606529ff",
    //     "title": "quickTrabajos",
    //     "replies": [
    //       "Becual",
    //       "kuCloud",
    //       "AS Consultores",
    //       "Service Group"
    //     ]
    //   },
    //   {
    //     "type": 0,
    //     "id": "d4ce8743-b304-416f-afa5-a8ef3fc173fa",
    //     "speech": "Camilo ha tenido varios trabajos, te los cuento desde el mas reciente al mas antiguo"
    //   },
    //   {
    //     "type": 0,
    //     "id": "9f349701-0387-4e63-860a-2d081171c728",
    //     "speech": "Agile Senior Full Stack Developer en Becual, desde junio del 2016 a la actualidad\n\nAgile Full Stack Developer en kuCloud desde mayo del 2015 hasta la actualidad\n\nAnalista Funcional en \"As Consultores\" desde julio del 2013 hasta marzo del 2016\n\nBack End Developer en \"Computación Group Service Ltda\" desde diciembre del 2012 hasta junio del 2013\n\nFull Stack Developer en \"Workmate Ltda.\" desde el 2011 hasta el 2012\n\t\nFull Stack Developer como Independiente entre los años 2010 y 2012\n\nDesarrollador y Administrador de Plataformas  en \"BIGNISS LTDA.\"  entre los años 2007 y 2010\n\nAdministrador de Plataformas en \"Empresa DRC\", Outsourcing para ENTEL S.A. entre los años 2005 y 2006"
    //   },
    //   {
    //     "type": 0,
    //     "id": "6e2fc07e-9feb-4813-a26e-b00cc92181ed",
    //     "speech": "Si quieres puedes consultar sobre algún trabajo en particular"
    //   }
    // ]

    return output;
};