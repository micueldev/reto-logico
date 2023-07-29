const personFields = `
    {
        _id
        about
        address
        age
        balance
        company
        email
        eyeColor
        favoriteFruit
        friends {
        id
        name
        }
        gender
        greeting
        guid
        index
        isActive
        latitude
        longitude
        phone
        name
        picture
        registered
        tags
    }
`;

const buttons = document.querySelectorAll('.button');
const buttonData = {
  button1: { title: 'Obtener emails invalidos', query: 'getInvalidEmails', fields:'' },
  button2: { title: 'Obtener emails que no existan en las personas', query: 'getEmailsWithoutPerson' , fields:'' },
  button3: { title: 'Obtener las personas que tendan dirección y ordenadas por nombre', query: 'getAllPersonsWithAddress', fields:personFields },
  button4: { title: 'Obtener las personas que tendan edad entre 20 y 30 años y su nombre empiece por "H" o "L"', query: 'getAllPersonsInRange', fields:personFields },
  button5: { title: 'Obtener las personas que se le puede enviar email', query: 'getAllPersonsToSendEmail', fields:personFields }
};

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const buttonId = button.id;
        const data = buttonData[buttonId];
        
        const titleElement = document.getElementById('title');
        const contentElement = document.getElementById('content');

        titleElement.textContent = data.title;
        contentElement.textContent = JSON.stringify(await fetchData(data.query, data.fields), null, 2);
    });
});  

async function fetchData(query, fields) {
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    ${query} ${fields}
                }
            `,
        }),
    });

    const responseData = await response.json();
    return responseData.data[query];
}
