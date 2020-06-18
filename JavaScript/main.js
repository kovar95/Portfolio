window.document.onscroll = () => {
    let header = document.querySelector("header");
    let home = document.querySelector(".home-title");
    let perc = document.querySelectorAll(".percentage");
    let percentages = ["85%", "90%", "90%", "85%", "80%", "85%", "75%", "70%"]
    if(window.pageYOffset > 58){
        header.style.backgroundColor = "rgba(0, 5, 44, 0.7)";
        header.style.borderBottom = "1px solid #00fff3";
    } else {
        header.style.backgroundColor = null;
        header.style.borderBottom = null;
    }

    if(window.pageYOffset > 500){
        home.style.display = "block";
    } 

    if(window.pageYOffset > 2350){
        perc.forEach((element, index) => {
            element.style.width = percentages[index];
            element.style.left = "0";
        })
    } 
}

const consoleText = (words, id) => {
    let visible = true;
    let con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById(id)
    window.setInterval(() => {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(() => {
                let usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(() => {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval( () => {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'
            visible = true;
        }
    }, 400)
}

consoleText(['Welcome to my online resume!', 'I hope you will enjoy', 'Take a look'], 'text');

const desc = [
    [
        "React",
        "Redux",
        "HTML",
        "CSS",
        "PHP",
        "SasS",
        "Firebase",
        "Git"
    ],
    [ 
        "Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
        "Redux is used mostly for application state management. To summarize it, Redux maintains the state of an entire application in a single immutable state tree (object), which can't be changed directly.",
        "Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.",
        "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.",
        "PHP is a popular general-purpose scripting language that is especially suited to web development.",
        "Sass is a style sheet language initially designed by Hampton Catlin and developed by Natalie Weizenbaum.",
        "Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.",
        "Git is a distributed version-control system for tracking changes in source code during software development.",
    ],
    [
        "#4e55d2",
        "#6047ad",
        "#ae3e3f",
        "#2088dd",
        "#607aaf",
        "#a35d91",
        "#daa533",
        "#c34e42"
    ],
    [
        "./img/react.png",
        "./img/redux.png",
        "./img/html.png",
        "./img/css.png",
        "./img/php.png",
        "./img/sass.png",
        "./img/firebase.png",
        "./img/git.png"
    ]
];

const home = document.querySelector(".home-title");
const homeTitle = document.querySelectorAll(".home-title span");
const stackIcons = document.querySelectorAll(".icon");
const logo = document.querySelector(".trans img");

stackIcons.forEach( (icon, index) => {
    icon.addEventListener("mouseover", () => {
        homeTitle[0].textContent = desc[0][index];
        homeTitle[0].style.color = desc[2][index];
        homeTitle[1].textContent = desc[1][index];
        home.style.display = "block";
        logo.setAttribute("src", desc[3][index]);
        logo.style.opacity = '1';
    } )

    icon.addEventListener("mouseout", () => {
        home.style.display = "none";
        logo.style.opacity = '0';
    } )
})

const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementsByTagName("textarea")[0];

const data = {
    name: '',
    email: '',
    subject: '',
    message: ''
}

name.addEventListener("keyup", e => {
  data.name = e.target.value;
})

email.addEventListener("keyup", e => {
    data.email = e.target.value;
})

subject.addEventListener("keyup", e => {
    data.subject = e.target.value;
})

message.addEventListener("keyup", e => {
    data.message = e.target.value;
})

const checkData = myData => {
    let myMessage = '';
    if(myData.name == ''){
        myMessage += "Name field should not be empty! ";
        name.style.border="1px solid red";
    } else {
        name.style.border="rgb(102, 140, 173)";
    }

    if(myData.email == ''){
        myMessage += "Email field should not be empty! ";
        email.style.border="1px solid red";
    } else {
        email.style.border="rgb(102, 140, 173)";
    }

    if(myData.subject == ''){
        myMessage += "Subject field should not be empty! ";
        subject.style.border="1px solid red";
    } else {
        subject.style.border="rgb(102, 140, 173)";
    }

    if(myData.message == ''){
        myMessage += "Message field should not be empty! ";
        message.style.border="1px solid red";
    } else {
        message.style.border="rgb(102, 140, 173)";
    }

    if(myMessage == '') {
        return true
    } else {
        alert(myMessage);
        return false
    }
}


const emptyData = () => {
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = 'Your message has been sent!';
}

const sendData = () => {
    checkData(data) && fetch("https://portfolio-84a25.firebaseio.com/messages.json", {
                            method: 'POST',
                            body: JSON.stringify(data)
                        })
                        .then ( response => {
                            if(response.ok) {
                                console.log("All good");
                                emptyData();
                            } else {
                                console.log("Not all good");
                            }
                        })
}