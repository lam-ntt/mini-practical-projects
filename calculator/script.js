let expressionToShow = "", expressionToCal = "";

renderResult();

document.querySelectorAll(".js-number-button").forEach((element) => {
    element.addEventListener("click", () => {
        if(expressionToShow.length < 12){
            expressionToShow += element.innerHTML;
            expressionToCal += element.innerHTML;
            renderResult();
        }else{
            alert("Expression only contains 12 letter")
        }
    });
});

document.querySelectorAll(".js-operator-button").forEach((element) => {
    element.addEventListener("click", () => {
        expressionToShow += element.innerHTML;
        expressionToCal += element.id;
        renderResult();
    });
});

document.querySelector(".js-equal-button").addEventListener("click", () => { 
    expressionToCal = Math.round(eval(expressionToCal)*1e9)/1e9;
    expressionToShow = expressionToCal;
    renderResult(true);
});

document.querySelector(".js-delete-button").addEventListener("click", () => {
    expressionToShow = expressionToShow.substring(0, expressionToShow.length-1);
    expressionToCal = expressionToCal.substring(0, expressionToCal.length-1);
    renderResult(true);
});

document.querySelector(".js-clear-button").addEventListener("click", () => {
    expressionToShow = "";
    expressionToCal = "";
    renderResult(true);
});

function renderResult(hire=false){
    document.querySelector(".js-expression").innerHTML = expressionToShow;

    if(hire){
        document.querySelector(".js-result").innerHTML = "";
        return;
    }

    if(eval(expressionToCal)){
        document.querySelector(".js-result").innerHTML = Math.round(eval(expressionToCal)*1e9)/1e9;
    }
}