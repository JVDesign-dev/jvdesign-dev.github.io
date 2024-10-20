const updateMessages = [
    {
        date: new Date(Date.UTC(2024,10,20)),
        title: `Gradia - the modern grade calculator`,
        content: `Today I was finally able to release my first app - Gradia. 
                I've been working on it for a long time and now I can finally say, I've successfully managed to include every feature for it to fit my needs. 
                I already have a ton more features in mind that I could add, but that's nothing to talk about yet. Currently, these are the features that make Gradia a great app:
                <ul><li>Grade management over multiple school years</li>
                <li>Freely adjustable grade weights</li>
                <li>On-device data storage</li>
                <li>Offline mode without any restrictions</li></ul>
                If this sounds like an app useful to you, don't hesitate any longer and jump right into <a href="/gradia">Gradia</a>, 
                input your grades and never lose track of your school performance again.`
    },
    {
        date: new Date(Date.UTC(2024, 10, 11)),
        title: `Welcome to JVDesign`,
        content: `This is the first post here, <br>its intention's clear: <br>It provides some content <br>without being nonsense. <br>It will not stay the last and only one, <br>very soon - I hope - more posts will come.<br>So stay tuned and see, what I already got<br>and I will end this poem with a dot.`
    }
]

function news(n) {
    document.getElementById('newscount').textContent = n;
}

window.onload = init();

function init() {
    const newscount = calculateUnseenMessages();
    if (newscount == 0) {
        $("#news").hide();
    }
    else {
        news(newscount);
    }

    renderUpdates();
}

function updates() {
    if(document.getElementById('maindiv').style.display === 'none') {
        document.getElementById('maindiv').style.display = 'block';
        document.getElementById('updates').style.display = 'none';
        return;
    }
    document.getElementById('maindiv').style.display = 'none';
    document.getElementById('updates').style.display = 'flex';
}

function renderUpdates() {
    const updatesDiv = document.getElementById('updates');
    updateMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        const messageDate = document.createElement('h2');
        const messageTitle = document.createElement('h1');
        const messageContent = document.createElement('p');

        messageDate.textContent = message.date.toLocaleDateString();
        messageTitle.innerHTML = message.title;
        messageContent.innerHTML = message.content;

        messageDiv.appendChild(messageDate);
        messageDiv.appendChild(messageTitle);
        messageDiv.appendChild(messageContent);
        
        updatesDiv.appendChild(messageDiv);
    });
}

function calculateUnseenMessages() {
    const lastVisit = Date.parse(getCookie('date'));
    let unseenCounter = 0;
    updateMessages.forEach(message => {
        if(message.date > lastVisit) unseenCounter ++;
    });
}