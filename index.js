const updateMessages = [
    {
        date: new Date('2025-07-10'),
        title: `Gradia 1.1 – Update with new features`,
        content: `Today marks the first major update of <a href="/gradia">Gradia</a> since its release. 
                After a lot of internal improvements and smaller commits, the new version 1.1 is finally ready. 
                It introduces several features that make managing your grades even more convenient and efficient:
                <ul>
                    <li>Partial data deletion: Settings and grades can now be removed independently</li>
                    <li>Downloadable grade files in .grd/.grde format</li>
                    <li>Version history: update information is now shown directly within the app</li>
                    <li>Automatic table sorting for easier grade navigation</li>
                </ul>
                Along the way, I restructured the internal data handling — which also led to the creation of <a href="https://datamanager.js.org">datamanager.js</a>, 
                which I recently released as a standalone module. All changes are bundled into this clean release. 
                If you're already using Gradia, make sure to update and try out the new tools. 
                If you haven’t tried it yet, there’s no better time to start: head over to <a href="/gradia">Gradia</a> and take control of your grades.`
    },
    {
        date: new Date('2025-06-03'),
        title: `Introducing datamanager.js`,
        content: `While working on Gradia, I needed a consistent and reusable way to manage client-side data. 
                That's how <a href="https://datamanager.js.org">datamanager.js</a> came to be.  
                It quietly handles the full data flow of a web app — file uploads and downloads, localStorage interaction, and internal data integrity.  
                No UI, no noise — just a small module doing what needs to be done.  
                If you're building a JavaScript project and need a simple, reliable layer to manage persistent data, <a href="https://datamanager.js.org">give it a look</a>.`
    },
    {
        date: new Date('2024-10-20'),
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
        date: new Date('2024-10-11'),
        title: `Welcome to JVDesign`,
        content: `This is the first post here, <br>its intention's clear: <br>It provides some content <br>without being nonsense. <br>It will not stay the last and only one, <br>very soon - I hope - more posts will come.<br>So stay tuned and see, what I already got<br>and I will end this poem with a dot.`
    }
]

window.onload = init();

function init() {
    setNewsCounter();
}

function setNewsCounter() {
    const newscount = calculateUnseenMessages();
    if (newscount !== 0) {
        document.getElementById('newscount').textContent = newscount;
        document.getElementById('news').style.display = 'block';
    }
    else document.getElementById('news').style.display = 'none';

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
    setCookie("date",new Date(),31);
    setNewsCounter();
}

function renderUpdates() {
    const updatesDiv = document.getElementById('updates');
    updatesDiv.innerHTML = '';
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
    const lastVisit = new Date(getCookie('date'));
    let unseenCounter = 0;
    updateMessages.forEach(message => {
        if(message.date > lastVisit) unseenCounter ++;
    });
    console.log(unseenCounter);
    return unseenCounter;
}
