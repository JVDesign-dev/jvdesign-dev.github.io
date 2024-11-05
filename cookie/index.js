function setCookie(name, value, days) {
    var expires = "";
    var date=new Date();
    if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function updateCookieValue(name, newValue) {
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(newValue);
    // Holen Sie sich alle vorhandenen Cookies
    var cookies = document.cookie.split(";");
    // Suchen Sie nach dem Cookie mit dem angegebenen Namen
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + "=") === 0) {
            // Aktualisieren Sie den Wert des gefundenen Cookies
            document.cookie = updatedCookie + cookie.substring(name.length + 1);
            break;
        }
    }
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


var iframe = document.createElement("iframe");
    iframe.src = "/cookie";
    iframe.width = "80%";
    iframe.height = "80%";
    iframe.style.border = 'none';
    iframe.style.position = "absolute";
    iframe.style.top = "10%";
    iframe.style.left = "10%";
    iframe.style.borderRadius = "20px";

function setAccept() {
    var acceptCookiesValue = getCookie("acceptCookies");
    if (acceptCookiesValue == '') {
        document.body.appendChild(iframe);
        document.getElementById("content").style.pointerEvents="none";
        window.addEventListener('message', function(event) {
            if (event.data === 'hideIframe') {
                document.body.removeChild(iframe);
                document.getElementById("content").style.pointerEvents="auto";
            }
            if (event.data === 'declined') {
                window.close();
                document.getElementById("content").style.pointerEvents="auto";
            }
        });
    }
}

function accept() {
    window.parent.postMessage('hideIframe', '*');
    setCookie("acceptCookies",true,31);
    setCookie("date",new Date(),31);
}
function decline() {
    window.parent.postMessage('hideIframe', '*');
}

function uiValues() {
    document.getElementById('date').innerHTML = new Date();
}

function checkEnvironment() {
    if (typeof cookieBanner !== "undefined" && cookieBanner) {
        uiValues();
        return;
    }

    setAccept();
}

checkEnvironment();