
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
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    let newDate = Date.parse(value);
    let date    = new Date(newDate).toLocaleDateString('fr-FR', options)


    return date.toString();

};