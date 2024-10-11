let newscount=1;
function news(n) {
    $("#newscount").html(n);
}
window.onload = function() {
    if (newscount==0) {
        $("#news").hide();
    }
    else {
        news(newscount);
    }
};

function updates() {
    if(document.getElementById('maindiv').style.display === 'none') {
        document.getElementById('maindiv').style.display = 'block';
        document.getElementById('updates').style.display = 'none';
        return;
    }
    document.getElementById('maindiv').style.display = 'none';
    document.getElementById('updates').style.display = 'block';
}