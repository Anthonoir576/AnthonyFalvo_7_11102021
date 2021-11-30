
// date courte
export const dateShort = (value) => {

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    let newDate = Date.parse(value);
    let date    = new Date(newDate).toLocaleDateString('fr-FR', options)

    return date.toString();

};

// date longue
export const dateLong = (value) => {

    let options = {
        hour: '2-digit',
        minute: '2-digit',
        //second: '2-digit',
        //weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    let newDate = Date.parse(value);
    let date    = new Date(newDate).toLocaleDateString('fr-FR', options)


    return date.toString();

};

// date commentaire
export const dateComment = (value) => {

    let options = {
        hour: 'numeric',
        minute: 'numeric',
        //second: '2-digit',
        //weekday: 'long',
        year: '2-digit',
        month: '2-digit',
        day: 'numeric'
    };

    let newDate = Date.parse(value);
    let date    = new Date(newDate).toLocaleDateString('fr-FR', options)


    return date.toString();

};

// Interrogation true / false
export const isItBlank = (value) => {

    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length  === 0)
    );  

};